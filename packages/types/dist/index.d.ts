export declare enum RoundStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    RESOLVED = "RESOLVED"
}
export interface Round {
    id: string;
    startTime: number;
    endTime: number;
    status: RoundStatus;
    totalPool: number;
    activeUsers: number;
    finalPrice?: number;
}
export interface Prediction {
    userAddress: string;
    predictedPrice: number;
    stakeAmount: number;
    roundId: string;
}
export interface LeaderboardEntry {
    rank: number;
    address: string;
    title: string;
    accuracy: number;
    profit: number;
}
export declare enum WsEvent {
    ROUND_UPDATE = "round_update",
    NEW_PREDICTION = "new_prediction",
    LEADERBOARD_UPDATE = "leaderboard_update",
    POOL_UPDATE = "pool_update",
    PRICE_UPDATE = "price_update"
}
export interface WsPayload {
    [WsEvent.ROUND_UPDATE]: Round;
    [WsEvent.NEW_PREDICTION]: Prediction;
    [WsEvent.LEADERBOARD_UPDATE]: LeaderboardEntry[];
    [WsEvent.POOL_UPDATE]: {
        totalPool: number;
        activeUsers: number;
    };
    [WsEvent.PRICE_UPDATE]: {
        price: number;
        timestamp: number;
    };
}
