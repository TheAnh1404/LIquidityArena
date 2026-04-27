import { OnModuleInit } from '@nestjs/common';
import { Round } from '@arena/types';
import { Subject } from 'rxjs';
export declare class RoundService implements OnModuleInit {
    private priceService;
    private currentRound;
    round$: Subject<Round>;
    constructor(priceService: PriceService);
    onModuleInit(): void;
    private simulatePrediction;
    startNewRound(): void;
    closeRound(): void;
    resolveRound(): void;
    getCurrentRound(): Round;
}
