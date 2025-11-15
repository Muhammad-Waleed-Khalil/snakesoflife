/**
 * ABYSSAL VIPER CULT - Canvas Effects
 * The visual manifestation of the Void
 */

export class BloodFogCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 50 + 20,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.1 + 0.02,
      });
    }
  }

  start(): void {
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around
      if (particle.x < -particle.radius) particle.x = this.canvas.width + particle.radius;
      if (particle.x > this.canvas.width + particle.radius) particle.x = -particle.radius;
      if (particle.y < -particle.radius) particle.y = this.canvas.height + particle.radius;
      if (particle.y > this.canvas.height + particle.radius) particle.y = -particle.radius;

      // Draw particle
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius
      );
      gradient.addColorStop(0, `rgba(139, 0, 0, ${particle.opacity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(this.animate);
  };
}

export class SnakeCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snakes: Snake[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initSnakes();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initSnakes(): void {
    const snakeCount = 5;
    for (let i = 0; i < snakeCount; i++) {
      this.snakes.push({
        segments: this.createSnakeSegments(),
        speed: Math.random() * 0.5 + 0.2,
        color: `rgba(139, 0, 0, ${Math.random() * 0.3 + 0.3})`,
      });
    }
  }

  private createSnakeSegments(): Point[] {
    const segments: Point[] = [];
    const startX = Math.random() * this.canvas.width;
    const startY = Math.random() * this.canvas.height;
    const segmentCount = 30;

    for (let i = 0; i < segmentCount; i++) {
      segments.push({ x: startX, y: startY });
    }
    return segments;
  }

  start(): void {
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.snakes.forEach((snake) => {
      const head = snake.segments[0];
      const time = Date.now() * 0.001 * snake.speed;

      // Slithering motion along edges
      const edge = Math.floor(time / 5) % 4;
      switch (edge) {
        case 0: // Top edge
          head.x = ((time % 5) / 5) * this.canvas.width;
          head.y = Math.sin(time * 3) * 20 + 20;
          break;
        case 1: // Right edge
          head.x = this.canvas.width - 20 + Math.sin(time * 3) * 20;
          head.y = ((time % 5) / 5) * this.canvas.height;
          break;
        case 2: // Bottom edge
          head.x = this.canvas.width - ((time % 5) / 5) * this.canvas.width;
          head.y = this.canvas.height - 20 + Math.sin(time * 3) * 20;
          break;
        case 3: // Left edge
          head.x = 20 + Math.sin(time * 3) * 20;
          head.y = this.canvas.height - ((time % 5) / 5) * this.canvas.height;
          break;
      }

      // Update segments
      for (let i = snake.segments.length - 1; i > 0; i--) {
        snake.segments[i].x = snake.segments[i - 1].x;
        snake.segments[i].y = snake.segments[i - 1].y;
      }

      // Draw snake
      this.ctx.strokeStyle = snake.color;
      this.ctx.lineWidth = 5;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(snake.segments[0].x, snake.segments[0].y);

      for (let i = 1; i < snake.segments.length; i++) {
        this.ctx.lineTo(snake.segments[i].x, snake.segments[i].y);
      }

      this.ctx.stroke();

      // Draw eyes
      this.ctx.fillStyle = '#ff0000';
      this.ctx.beginPath();
      this.ctx.arc(head.x - 2, head.y, 2, 0, Math.PI * 2);
      this.ctx.arc(head.x + 2, head.y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(this.animate);
  };
}

export class PentagramCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pentagrams: Pentagram[] = [];
  private animationId: number | null = null;
  private lastActivityTime: number = Date.now();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateActivity(): void {
    this.lastActivityTime = Date.now();
    this.pentagrams = [];
  }

  start(): void {
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    const inactiveDuration = Date.now() - this.lastActivityTime;

    if (inactiveDuration > 10000 && this.pentagrams.length === 0) {
      // Spawn pentagrams
      for (let i = 0; i < 3; i++) {
        this.pentagrams.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 100 + 50,
          rotation: Math.random() * Math.PI * 2,
          opacity: 0,
        });
      }
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.pentagrams.forEach((pentagram) => {
      if (inactiveDuration > 10000) {
        pentagram.opacity = Math.min(0.2, pentagram.opacity + 0.002);
        pentagram.rotation += 0.001;
      } else {
        pentagram.opacity = Math.max(0, pentagram.opacity - 0.05);
      }

      this.drawPentagram(pentagram);
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  private drawPentagram(pentagram: Pentagram): void {
    this.ctx.save();
    this.ctx.translate(pentagram.x, pentagram.y);
    this.ctx.rotate(pentagram.rotation);
    this.ctx.strokeStyle = `rgba(139, 0, 0, ${pentagram.opacity})`;
    this.ctx.lineWidth = 2;

    const points: Point[] = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI / 5) - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * pentagram.size,
        y: Math.sin(angle) * pentagram.size,
      });
    }

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i <= 5; i++) {
      this.ctx.lineTo(points[i % 5].x, points[i % 5].y);
    }
    this.ctx.stroke();

    // Draw circle
    this.ctx.beginPath();
    this.ctx.arc(0, 0, pentagram.size, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

interface Point {
  x: number;
  y: number;
}

interface Snake {
  segments: Point[];
  speed: number;
  color: string;
}

interface Pentagram {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}
