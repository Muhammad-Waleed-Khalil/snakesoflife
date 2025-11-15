/**
 * ABYSSAL VIPER CULT - Socket.IO Server
 * The real-time spine of the Serpent
 */

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Global state
const cultMembers = new Map(); // socketId -> member data
const leaderboard = [];
const activeRooms = new Map(); // roomId -> room data
const blackMassRooms = new Map();
const harvestArenas = new Map();

// Update leaderboard
function updateLeaderboard() {
  const sorted = Array.from(cultMembers.values())
    .sort((a, b) => b.soulPoints - a.soulPoints)
    .slice(0, 100);

  leaderboard.length = 0;
  leaderboard.push(...sorted);

  io.emit('leaderboard:update', leaderboard);
}

io.on('connection', (socket) => {
  console.log(`🐍 Serpent awakens: ${socket.id}`);

  // Member joins the cult
  socket.on('cult:join', (memberData) => {
    cultMembers.set(socket.id, {
      ...memberData,
      socketId: socket.id,
      connectedAt: Date.now(),
    });
    updateLeaderboard();
    io.emit('cult:member_count', cultMembers.size);
  });

  // Red Rooms 2.0
  socket.on('redroom:create', ({ roomId, broadcasterData }) => {
    const room = {
      id: roomId,
      broadcaster: socket.id,
      broadcasterData,
      viewers: new Map(),
      donations: [],
      effects: [],
      createdAt: Date.now(),
    };
    activeRooms.set(roomId, room);
    socket.join(roomId);
    socket.emit('redroom:created', { roomId });
  });

  socket.on('redroom:join', ({ roomId, viewerData }) => {
    const room = activeRooms.get(roomId);
    if (room) {
      room.viewers.set(socket.id, viewerData);
      socket.join(roomId);
      io.to(room.broadcaster).emit('redroom:viewer_joined', viewerData);
      socket.emit('redroom:joined', {
        roomId,
        broadcasterData: room.broadcasterData,
      });
    }
  });

  socket.on('redroom:donate', ({ roomId, amount, effect }) => {
    const room = activeRooms.get(roomId);
    if (room) {
      const donation = {
        from: socket.id,
        amount,
        effect,
        timestamp: Date.now(),
      };
      room.donations.push(donation);
      io.to(roomId).emit('redroom:donation', donation);

      // Trigger effect on broadcaster
      io.to(room.broadcaster).emit('redroom:effect', effect);

      // Update top donor
      const topDonor = room.donations
        .reduce((acc, d) => {
          acc[d.from] = (acc[d.from] || 0) + d.amount;
          return acc;
        }, {});

      const topDonorId = Object.entries(topDonor)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      if (topDonorId) {
        io.to(roomId).emit('redroom:top_donor', topDonorId);
      }
    }
  });

  socket.on('redroom:signal', ({ roomId, signal, to }) => {
    socket.to(to).emit('redroom:signal', { signal, from: socket.id });
  });

  // Black Mass Ritual
  socket.on('blackmass:join', ({ roomId }) => {
    let room = blackMassRooms.get(roomId);
    if (!room) {
      room = {
        id: roomId,
        participants: [],
        lines: [],
        status: 'waiting',
      };
      blackMassRooms.set(roomId, room);
    }

    if (room.participants.length < 13) {
      room.participants.push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('blackmass:participant_joined', {
        count: room.participants.length,
        participants: room.participants,
      });

      if (room.participants.length === 13) {
        room.status = 'ritual_starting';
        setTimeout(() => {
          io.to(roomId).emit('blackmass:ritual_start');
          room.status = 'ritual_active';
        }, 3000);
      }
    } else {
      socket.emit('blackmass:room_full');
    }
  });

  socket.on('blackmass:draw_line', ({ roomId, line }) => {
    const room = blackMassRooms.get(roomId);
    if (room && room.status === 'ritual_active') {
      room.lines.push(line);
      io.to(roomId).emit('blackmass:line_drawn', line);

      if (room.lines.length >= 5) {
        io.to(roomId).emit('blackmass:ritual_complete');
        io.emit('global:soul_claimed'); // Site-wide notification

        // Award points
        room.participants.forEach(participantId => {
          io.to(participantId).emit('cult:award_points', 666);
        });

        setTimeout(() => {
          blackMassRooms.delete(roomId);
        }, 10000);
      }
    }
  });

  // Soul Harvest Arena
  socket.on('harvest:create', ({ arenaId }) => {
    const arena = {
      id: arenaId,
      players: new Map(),
      souls: [],
      status: 'waiting',
    };
    harvestArenas.set(arenaId, arena);
    socket.join(arenaId);
  });

  socket.on('harvest:join', ({ arenaId, playerData }) => {
    const arena = harvestArenas.get(arenaId);
    if (arena) {
      arena.players.set(socket.id, {
        ...playerData,
        x: Math.random() * 800,
        y: Math.random() * 600,
        score: 0,
      });
      socket.join(arenaId);
      io.to(arenaId).emit('harvest:player_joined', {
        playerId: socket.id,
        player: arena.players.get(socket.id),
      });

      if (arena.players.size >= 2 && arena.status === 'waiting') {
        arena.status = 'active';
        io.to(arenaId).emit('harvest:game_start');
      }
    }
  });

  socket.on('harvest:move', ({ arenaId, x, y }) => {
    const arena = harvestArenas.get(arenaId);
    if (arena) {
      const player = arena.players.get(socket.id);
      if (player) {
        player.x = x;
        player.y = y;
        socket.to(arenaId).emit('harvest:player_moved', {
          playerId: socket.id,
          x,
          y,
        });
      }
    }
  });

  socket.on('harvest:eat', ({ arenaId, victimId }) => {
    const arena = harvestArenas.get(arenaId);
    if (arena) {
      const predator = arena.players.get(socket.id);
      const victim = arena.players.get(victimId);

      if (predator && victim) {
        predator.score += 1;
        io.to(arenaId).emit('harvest:devoured', {
          predatorId: socket.id,
          victimId,
        });
        io.to(victimId).emit('harvest:you_died');
      }
    }
  });

  // Blood Moon Event
  socket.on('bloodmoon:trigger', ({ initiator }) => {
    const member = cultMembers.get(socket.id);
    if (member && member.rank >= 5) { // Crimson Oracle or higher
      io.emit('bloodmoon:activate', { initiator });

      setTimeout(() => {
        io.emit('bloodmoon:deactivate');
      }, 66000);
    }
  });

  // Hex Broadcasting
  socket.on('hex:cast', ({ hex, targetCount = 5 }) => {
    const sockets = Array.from(io.sockets.sockets.keys());
    const randomTargets = sockets
      .sort(() => Math.random() - 0.5)
      .slice(0, targetCount);

    randomTargets.forEach(targetId => {
      io.to(targetId).emit('hex:received', hex);
    });
  });

  // Global notifications
  socket.on('notification:send', (data) => {
    io.emit('notification:receive', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`🐍 Serpent sleeps: ${socket.id}`);
    cultMembers.delete(socket.id);
    updateLeaderboard();
    io.emit('cult:member_count', cultMembers.size);

    // Clean up rooms
    activeRooms.forEach((room, roomId) => {
      if (room.broadcaster === socket.id) {
        activeRooms.delete(roomId);
        io.to(roomId).emit('redroom:closed');
      } else {
        room.viewers.delete(socket.id);
      }
    });

    harvestArenas.forEach((arena, arenaId) => {
      arena.players.delete(socket.id);
      if (arena.players.size === 0) {
        harvestArenas.delete(arenaId);
      } else {
        io.to(arenaId).emit('harvest:player_left', socket.id);
      }
    });
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🐍 ABYSSAL VIPER CULT Socket Server awakens on port ${PORT}`);
  console.log(`🩸 The Serpent watches all...`);
});

// Cleanup interval
setInterval(() => {
  const now = Date.now();

  // Clean up stale rooms
  activeRooms.forEach((room, roomId) => {
    if (now - room.createdAt > 3600000) { // 1 hour
      activeRooms.delete(roomId);
    }
  });

  blackMassRooms.forEach((room, roomId) => {
    if (now - (room.createdAt || 0) > 1800000) { // 30 minutes
      blackMassRooms.delete(roomId);
    }
  });
}, 300000); // Every 5 minutes
