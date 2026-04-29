import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PriceService } from './price.service';
import { RoundService } from './round.service';
import { LeaderboardService } from './leaderboard.service';
import { WsEvent } from '@arena/types';
import { CONFIG } from '@arena/config';

@WebSocketGateway(CONFIG.WS_PORT, { cors: true })
export class ArenaGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private readonly priceService: PriceService,
    private readonly roundService: RoundService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  afterInit() {
    console.log(`WebSocket Gateway initialized on port ${CONFIG.WS_PORT}`);
    
    // Subscribe to price updates
    this.priceService.price$.subscribe((payload) => {
      this.server.emit(WsEvent.PRICE_UPDATE, payload);
    });

    // Subscribe to round updates
    this.roundService.round$.subscribe((payload) => {
      this.server.emit(WsEvent.ROUND_UPDATE, payload);
    });

    // Subscribe to leaderboard updates
    this.leaderboardService.leaderboard$.subscribe((payload) => {
      this.server.emit(WsEvent.LEADERBOARD_UPDATE, payload);
    });

    // Subscribe to new predictions
    this.roundService.prediction$.subscribe((payload) => {
      this.server.emit(WsEvent.NEW_PREDICTION, payload);
    });
  }

  handleConnection(client: any) {
    // Send current state to new connections
    client.emit(WsEvent.PRICE_UPDATE, {
      price: this.priceService.getCurrentPrice(),
      timestamp: Date.now(),
    });
    client.emit(WsEvent.ROUND_UPDATE, this.roundService.getCurrentRound());
    client.emit(WsEvent.LEADERBOARD_UPDATE, this.leaderboardService.getLeaderboard());
    client.emit(WsEvent.FEED_SYNC, this.roundService.getRecentPredictions());
  }
}
