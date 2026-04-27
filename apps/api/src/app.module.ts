import { Module } from '@nestjs/common';
import { ArenaGateway } from './arena.gateway';
import { RoundService } from './round.service';
import { PriceService } from './price.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ArenaGateway, RoundService, PriceService],
})
export class AppModule {}
