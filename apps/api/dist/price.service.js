"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = require("@arena/config");
const axios_1 = require("axios");
let PriceService = class PriceService {
    constructor() {
        this.currentPrice = 0.1432;
        this.price$ = new rxjs_1.Subject();
    }
    async onModuleInit() {
        await this.fetchPrice();
        setInterval(() => {
            this.fetchPrice();
        }, config_1.CONFIG.PRICE_FEED_INTERVAL_MS);
    }
    async fetchPrice() {
        try {
            const response = await axios_1.default.get('https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT');
            const newPrice = parseFloat(response.data.price);
            if (!isNaN(newPrice)) {
                this.currentPrice = newPrice;
                this.price$.next({
                    price: this.currentPrice,
                    timestamp: Date.now(),
                });
            }
        }
        catch (error) {
            console.error('Failed to fetch price from Binance:', error.message);
            const change = (Math.random() - 0.5) * config_1.CONFIG.TICK_SIZE * 2;
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
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = __decorate([
    (0, common_1.Injectable)()
], PriceService);
//# sourceMappingURL=price.service.js.map