import { OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PriceService } from './price.service';
import { RoundService } from './round.service';
export declare class ArenaGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly priceService;
    private readonly roundService;
    server: Server;
    constructor(priceService: PriceService, roundService: RoundService);
    afterInit(): void;
    handleConnection(client: any): void;
}
