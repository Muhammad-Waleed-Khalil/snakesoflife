'use client';

import { useEffect, useState } from 'react';
import { cultRankManager, CultMember, RANK_REQUIREMENTS } from '@/lib/cultRank';
import TextGlitch from './TextGlitch';

export default function CultRankDisplay() {
  const [member, setMember] = useState<CultMember | null>(null);
  const [showRankUp, setShowRankUp] = useState(false);
  const [newRankName, setNewRankName] = useState('');

  useEffect(() => {
    const initMember = async () => {
      await cultRankManager.init();
      let m = await cultRankManager.getMember();
      if (!m) {
        m = await cultRankManager.createMember();
      }
      setMember(m);
    };

    initMember();

    // Listen for rank up events
    const handleRankUp = (e: CustomEvent) => {
      setNewRankName(e.detail.name);
      setShowRankUp(true);
      setTimeout(() => setShowRankUp(false), 5000);
    };

    window.addEventListener('rankUp', handleRankUp as EventListener);

    // Periodic refresh
    const interval = setInterval(async () => {
      const m = await cultRankManager.getMember();
      if (m) setMember(m);
    }, 5000);

    return () => {
      window.removeEventListener('rankUp', handleRankUp as EventListener);
      clearInterval(interval);
    };
  }, []);

  if (!member) return null;

  const rankInfo = RANK_REQUIREMENTS[member.rank];
  const nextRank = RANK_REQUIREMENTS[member.rank + 1];
  const progress = nextRank
    ? ((member.actions / nextRank.actions) * 100)
    : 100;

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-black/90 border border-red-900/50 p-4 min-w-[250px] backdrop-blur-sm">
        <div className="text-xs text-red-500/70 mb-1">CULT RANK</div>
        <div
          className="text-lg font-bold mb-2"
          style={{ color: rankInfo.color }}
        >
          <TextGlitch>{rankInfo.name}</TextGlitch>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-red-400/80">
            <span>Soul Points</span>
            <span className="text-red-500 font-bold">{member.soulPoints}</span>
          </div>
          <div className="flex justify-between text-red-400/80">
            <span>Actions</span>
            <span className="text-red-500 font-bold">{member.actions}</span>
          </div>
          {member.soulsHarvested > 0 && (
            <div className="flex justify-between text-red-400/80">
              <span>Souls Harvested</span>
              <span className="text-red-500 font-bold">{member.soulsHarvested}</span>
            </div>
          )}
          {member.hexesCast > 0 && (
            <div className="flex justify-between text-red-400/80">
              <span>Hexes Cast</span>
              <span className="text-red-500 font-bold">{member.hexesCast}</span>
            </div>
          )}
        </div>

        {nextRank && (
          <div className="mt-3">
            <div className="text-xs text-red-500/70 mb-1">
              Next: {nextRank.name}
            </div>
            <div className="h-2 bg-black border border-red-900/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-900 to-red-600 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="text-xs text-red-500/50 mt-1 text-right">
              {member.actions} / {nextRank.actions}
            </div>
          </div>
        )}

        {member.powers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-red-900/30">
            <div className="text-xs text-red-500/70 mb-1">POWERS</div>
            {member.powers.slice(0, 3).map(power => (
              <div key={power.id} className="text-xs text-red-400/60 truncate">
                ⦿ {power.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {showRankUp && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="bg-black border-4 border-red-500 p-8 animate-pulse">
            <div className="text-6xl text-red-500 font-bold mb-4 text-center">
              <TextGlitch>ASCENSION</TextGlitch>
            </div>
            <div className="text-3xl text-red-400 text-center">
              You are now a<br />
              <span className="text-red-500 font-bold">{newRankName}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
