import { Injectable, OnModuleInit } from '@nestjs/common';
import { Round, RoundStatus } from '@arena/types';
import { CONFIG } from '@arena/config';
import { Subject } from 'rxjs';

@Injectable()
export class RoundService implements OnModuleInit {
  private currentRound: Round;
  public round$ = new Subject<Round>();

  constructor(private priceService: PriceService) {}

  onModuleInit() {
    this.startNewRound();

    // Periodically simulate other users entering
    setInterval(() => {
      if (this.currentRound && this.currentRound.status === RoundStatus.OPEN) {
        this.simulatePrediction();
      }
    }, 15000); // Every 15 seconds
  }

  private simulatePrediction() {
    const amount = Math.floor(Math.random() * 5000) + 100;
    this.currentRound.totalPool += amount;
    this.currentRound.activeUsers += 1;
    this.round$.next(this.currentRound);
  }

  startNewRound() {
    const startTime = Date.now();
    this.currentRound = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      startTime,
      endTime: startTime + CONFIG.ROUND_DURATION_MS,
      status: RoundStatus.OPEN,
      totalPool: 12450, // Initial seed
      activeUsers: 42,
      startPrice: this.priceService.getLatestPrice(),
    };
    this.round$.next(this.currentRound);

    // Schedule round closing
    setTimeout(() => {
      this.closeRound();
    }, CONFIG.ROUND_DURATION_MS);
  }

  closeRound() {
    this.currentRound.status = RoundStatus.CLOSED;
    this.round$.next(this.currentRound);
    
    // Resolve after 10 seconds (simulated)
    setTimeout(() => {
      this.resolveRound();
    }, 10000);
  }

  resolveRound() {
    this.currentRound.status = RoundStatus.RESOLVED;
    this.currentRound.finalPrice = this.priceService.getLatestPrice();
    this.round$.next(this.currentRound);

    // Start next round after 5 seconds
    setTimeout(() => {
      this.startNewRound();
    }, 5000);
  }

  getCurrentRound() {
    return this.currentRound;
  }
}
