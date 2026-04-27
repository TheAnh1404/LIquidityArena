import { Injectable, OnModuleInit } from '@nestjs/common';
import { Subject } from 'rxjs';
import { CONFIG } from '@arena/config';
import axios from 'axios';

@Injectable()
export class PriceService implements OnModuleInit {
  private currentPrice = 0.1432;
  public price$ = new Subject<{ price: number; timestamp: number }>();

  async onModuleInit() {
    // Initial fetch
    await this.fetchPrice();

    // Poll for updates
    setInterval(() => {
      this.fetchPrice();
    }, CONFIG.PRICE_FEED_INTERVAL_MS);
  }

  private async fetchPrice() {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT');
      const newPrice = parseFloat(response.data.price);
      
      if (!isNaN(newPrice)) {
        this.currentPrice = newPrice;
        this.price$.next({
          price: this.currentPrice,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error('Failed to fetch price from Binance:', error.message);
      // Fallback: slight random movement if API fails
      const change = (Math.random() - 0.5) * CONFIG.TICK_SIZE * 2;
      this.currentPrice += change;
      this.price$.next({
        price: this.currentPrice,
        timestamp: Date.now(),
      });
    }
  }

  getCurrentPrice() {
    return this.currentPrice;
  }
}
