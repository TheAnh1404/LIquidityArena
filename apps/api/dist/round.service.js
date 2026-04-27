"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("@arena/types");
const config_1 = require("@arena/config");
const rxjs_1 = require("rxjs");
let RoundService = class RoundService {
    constructor(priceService) {
        this.priceService = priceService;
        this.round$ = new rxjs_1.Subject();
    }
    onModuleInit() {
        this.startNewRound();
        setInterval(() => {
            if (this.currentRound && this.currentRound.status === types_1.RoundStatus.OPEN) {
                this.simulatePrediction();
            }
        }, 15000);
    }
    simulatePrediction() {
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
            endTime: startTime + config_1.CONFIG.ROUND_DURATION_MS,
            status: types_1.RoundStatus.OPEN,
            totalPool: 12450,
            activeUsers: 42,
            startPrice: this.priceService.getLatestPrice(),
        };
        this.round$.next(this.currentRound);
        setTimeout(() => {
            this.closeRound();
        }, config_1.CONFIG.ROUND_DURATION_MS);
    }
    closeRound() {
        this.currentRound.status = types_1.RoundStatus.CLOSED;
        this.round$.next(this.currentRound);
        setTimeout(() => {
            this.resolveRound();
        }, 10000);
    }
    resolveRound() {
        this.currentRound.status = types_1.RoundStatus.RESOLVED;
        this.currentRound.finalPrice = this.priceService.getLatestPrice();
        this.round$.next(this.currentRound);
        setTimeout(() => {
            this.startNewRound();
        }, 5000);
    }
    getCurrentRound() {
        return this.currentRound;
    }
};
exports.RoundService = RoundService;
exports.RoundService = RoundService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof PriceService !== "undefined" && PriceService) === "function" ? _a : Object])
], RoundService);
//# sourceMappingURL=round.service.js.map