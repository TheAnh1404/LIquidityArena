import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { LeaderboardEntry } from '@arena/types';
import * as fs from 'fs';
import * as path from 'path';

const MOCK_SEED: LeaderboardEntry[] = [
  { rank: 1, address: 'GC72...45D2', title: 'ELITE VOYAGER', accuracy: 94.2, profit: 12450 },
  { rank: 2, address: 'GD01...99X1', title: 'TOP PREDICTOR', accuracy: 91.8, profit: 8920 },
  { rank: 3, address: '0x99...FF2C', title: 'RANK SLIDING', accuracy: 88.5, profit: 6730 },
  { rank: 4, address: 'WhaleSlayer', title: 'RISING STAR', accuracy: 84.1, profit: 4210 },
  { rank: 5, address: 'GC72MQYK...45D2', title: 'ARENA WARRIOR', accuracy: 68.4, profit: 1240 },
  { rank: 6, address: 'GA89...QRST', title: 'NEWCOMER', accuracy: 62.0, profit: -320 },
];

@Injectable()
export class LeaderboardService implements OnModuleInit {
  private readonly logger = new Logger(LeaderboardService.name);
  private leaderboard: LeaderboardEntry[] = [];
  public leaderboard$ = new Subject<LeaderboardEntry[]>();
  
  private dataDir = path.join(process.cwd(), 'data');
  private dataFile = path.join(this.dataDir, 'leaderboard.json');

  onModuleInit() {
    this.initDataDir();
    this.loadLeaderboard();
  }

  private initDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadLeaderboard() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const fileContent = fs.readFileSync(this.dataFile, 'utf-8');
        this.leaderboard = JSON.parse(fileContent);
        this.logger.log('Leaderboard loaded from disk');
      } else {
        this.leaderboard = MOCK_SEED;
        this.saveLeaderboard();
        this.logger.log('Leaderboard initialized with seed data');
      }
      this.leaderboard$.next(this.leaderboard);
    } catch (error) {
      this.logger.error('Failed to load leaderboard', error);
      this.leaderboard = MOCK_SEED;
    }
  }

  private saveLeaderboard() {
    try {
      fs.writeFileSync(this.dataFile, JSON.stringify(this.leaderboard, null, 2), 'utf-8');
    } catch (error) {
      this.logger.error('Failed to save leaderboard to disk', error);
    }
  }

  public getLeaderboard(): LeaderboardEntry[] {
    return this.leaderboard;
  }

  // Placeholder for when a round resolves and we want to update stats
  public updateUserStats(address: string, accuracy: number, profitDelta: number) {
    const userIndex = this.leaderboard.findIndex(entry => entry.address === address);
    
    if (userIndex !== -1) {
      const user = this.leaderboard[userIndex];
      // Simple moving average for accuracy simulation
      user.accuracy = Number(((user.accuracy + accuracy) / 2).toFixed(1));
      user.profit += profitDelta;
    } else {
      // New user
      this.leaderboard.push({
        rank: 0, // Will sort next
        address,
        title: 'NEW CHALLENGER',
        accuracy: Number(accuracy.toFixed(1)),
        profit: profitDelta
      });
    }

    // Sort by profit (or accuracy)
    this.leaderboard.sort((a, b) => b.profit - a.profit);
    
    // Update ranks
    this.leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    this.saveLeaderboard();
    this.leaderboard$.next(this.leaderboard);
  }
}
