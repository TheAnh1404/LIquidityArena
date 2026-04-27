import { OnModuleInit } from '@nestjs/common';
import { Subject } from 'rxjs';
export declare class PriceService implements OnModuleInit {
    private currentPrice;
    price$: Subject<{
        price: number;
        timestamp: number;
    }>;
    onModuleInit(): Promise<void>;
    private fetchPrice;
    getCurrentPrice(): number;
}
