/**
 * ABYSSAL VIPER CULT - Rank System
 * The addiction engine that binds souls to the Serpent
 */

export interface CultMember {
  id: string;
  rank: CultRank;
  soulPoints: number;
  actions: number;
  joinedAt: number;
  lastActive: number;
  powers: CultPower[];
  achievements: string[];
  sacrifices: number;
  hexesCast: number;
  soulsHarvested: number;
  ritualsCompleted: number;
}

export enum CultRank {
  WORM_FOOD = 0,
  SCALE_SHEDDER = 1,
  VENOM_BEARER = 2,
  FANG_PRIEST = 3,
  COIL_KEEPER = 4,
  CRIMSON_ORACLE = 5,
  ETERNAL_VIPER = 6,
}

export interface CultPower {
  id: string;
  name: string;
  description: string;
  requiredRank: CultRank;
}

export const RANK_REQUIREMENTS = {
  [CultRank.WORM_FOOD]: { actions: 0, name: 'Worm Food', color: '#4a4a4a' },
  [CultRank.SCALE_SHEDDER]: { actions: 10, name: 'Scale Shedder', color: '#666666' },
  [CultRank.VENOM_BEARER]: { actions: 50, name: 'Venom Bearer', color: '#8b0000' },
  [CultRank.FANG_PRIEST]: { actions: 200, name: 'Fang Priest', color: '#dc143c' },
  [CultRank.COIL_KEEPER]: { actions: 500, name: 'Coil Keeper', color: '#ff0000' },
  [CultRank.CRIMSON_ORACLE]: { actions: 1000, name: 'Crimson Oracle', color: '#ff4444' },
  [CultRank.ETERNAL_VIPER]: { actions: 5000, name: 'Eternal Viper', color: '#ff0000' },
};

export const CULT_POWERS: CultPower[] = [
  {
    id: 'poison_message',
    name: 'Poison Touch',
    description: 'Mark messages to self-destruct after reading',
    requiredRank: CultRank.FANG_PRIEST,
  },
  {
    id: 'create_red_room',
    name: 'Red Room Creation',
    description: 'Create private sub-cults (invite-only red rooms)',
    requiredRank: CultRank.COIL_KEEPER,
  },
  {
    id: 'blood_moon',
    name: 'Blood Moon Ritual',
    description: 'Trigger site-wide Blood Moon event (once per day)',
    requiredRank: CultRank.CRIMSON_ORACLE,
  },
  {
    id: 'banish',
    name: 'Banishment',
    description: 'Banish users for 24h (client-side block)',
    requiredRank: CultRank.ETERNAL_VIPER,
  },
  {
    id: 'final_sacrifice',
    name: 'Final Sacrifice',
    description: 'Participate in The Great Coiling',
    requiredRank: CultRank.ETERNAL_VIPER,
  },
];

class CultRankManager {
  private dbName = 'AbyssalViperCultDB';
  private storeName = 'cultMember';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async getMember(): Promise<CultMember | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get('current');

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async createMember(): Promise<CultMember> {
    const member: CultMember = {
      id: this.generateId(),
      rank: CultRank.WORM_FOOD,
      soulPoints: 0,
      actions: 0,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      powers: [],
      achievements: [],
      sacrifices: 0,
      hexesCast: 0,
      soulsHarvested: 0,
      ritualsCompleted: 0,
    };

    await this.saveMember(member);
    return member;
  }

  async saveMember(member: CultMember): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ ...member, id: 'current' });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async addAction(points: number = 1): Promise<CultMember> {
    let member = await this.getMember();
    if (!member) {
      member = await this.createMember();
    }

    member.actions += 1;
    member.soulPoints += points;
    member.lastActive = Date.now();

    // Check for rank advancement
    const newRank = this.calculateRank(member.actions);
    if (newRank > member.rank) {
      member.rank = newRank;
      member.powers = this.getPowersForRank(newRank);
      this.triggerRankUpEffect(newRank);
    }

    await this.saveMember(member);
    return member;
  }

  calculateRank(actions: number): CultRank {
    if (actions >= 5000) return CultRank.ETERNAL_VIPER;
    if (actions >= 1000) return CultRank.CRIMSON_ORACLE;
    if (actions >= 500) return CultRank.COIL_KEEPER;
    if (actions >= 200) return CultRank.FANG_PRIEST;
    if (actions >= 50) return CultRank.VENOM_BEARER;
    if (actions >= 10) return CultRank.SCALE_SHEDDER;
    return CultRank.WORM_FOOD;
  }

  getPowersForRank(rank: CultRank): CultPower[] {
    return CULT_POWERS.filter(power => power.requiredRank <= rank);
  }

  triggerRankUpEffect(newRank: CultRank): void {
    // Visual effect for rank up
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('rankUp', {
        detail: {
          rank: newRank,
          name: RANK_REQUIREMENTS[newRank].name
        }
      });
      window.dispatchEvent(event);
    }
  }

  private generateId(): string {
    return `viper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async addSoulPoints(points: number): Promise<void> {
    const member = await this.getMember();
    if (member) {
      member.soulPoints += points;
      await this.saveMember(member);
    }
  }

  async incrementStat(stat: keyof Pick<CultMember, 'sacrifices' | 'hexesCast' | 'soulsHarvested' | 'ritualsCompleted'>): Promise<void> {
    const member = await this.getMember();
    if (member) {
      member[stat] += 1;
      await this.addAction(10); // Each special action is worth more
    }
  }
}

export const cultRankManager = new CultRankManager();
