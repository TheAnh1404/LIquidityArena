import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { Round, RoundStatus, WsEvent, WsPayload, Prediction, LeaderboardEntry } from '@arena/types';
import { CONFIG } from '@arena/config';

export type ArenaStatus = 'leading' | 'risky' | 'losing' | 'neutral';

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
}

interface ArenaState {
  /* Prediction inputs */
  price: number;
  stake: number;
  setPrice: (price: number) => void;
  setStake: (stake: number) => void;

  /* Real-time data */
  currentRound: Round | null;
  currentXlmPrice: number;
  totalPool: number;
  activeUsers: number;
  recentActivities: Prediction[];
  myHistory: Prediction[];
  pastRounds: Record<string, Round>;
  leaderboard: LeaderboardEntry[];

  /* Strategy */
  status: ArenaStatus;
  setStatus: (status: ArenaStatus) => void;
  multiplier: number;

  /* Wallet */
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkWallet: () => Promise<void>;

  /* Socket */
  socket: Socket | null;
  initSocket: () => void;

  /* Arena action */
  isEntering: boolean;
  canClaim: boolean;
  enterArena: () => Promise<void>;
  claimReward: () => Promise<void>;
}

export const useArenaStore = create<ArenaState>((set, get) => ({
  /* Prediction inputs */
  price: 0.1420,
  stake: 500,
  setPrice: (price) => {
    set({ price });
    const currentPrice = get().currentXlmPrice || 0.1430;
    const deviation = Math.abs(price - currentPrice) / currentPrice;
    const multiplier = Math.max(1.1, Math.min(12.0, 1.5 + deviation * 50));
    set({ multiplier: Math.round(multiplier * 10) / 10 });
  },
  setStake: (stake) => set({ stake }),

  /* Real-time data */
  currentRound: null,
  currentXlmPrice: 0.1430,
  totalPool: 0,
  activeUsers: 0,
  recentActivities: [],
  myHistory: [],
  pastRounds: {},
  leaderboard: [],

  /* Strategy */
  status: 'neutral',
  setStatus: (status) => set({ status }),
  multiplier: 1.0,

  /* Wallet */
  wallet: {
    connected: false,
    address: null,
    balance: 0,
  },

  checkWallet: async () => {
    const { isConnected, isAllowed, getAddress } = await import('@stellar/freighter-api');
    if (await isConnected() && await isAllowed()) {
      const addressObj = await getAddress();
      const address = typeof addressObj === 'string' ? addressObj : addressObj.address;
      set({
        wallet: {
          connected: true,
          address,
          balance: 14520.45, // Mock balance for now
        },
      });
    }
  },

  connectWallet: async () => {
    try {
      const { setAllowed, getAddress } = await import('@stellar/freighter-api');
      const allowed = await setAllowed();
      if (allowed) {
        const addressObj = await getAddress();
        const address = typeof addressObj === 'string' ? addressObj : addressObj.address;
        set({
          wallet: {
            connected: true,
            address,
            balance: 14520.45,
          },
        });
      }
    } catch (e) {
      console.error('Wallet connection failed:', e);
    }
  },

  disconnectWallet: () =>
    set({
      wallet: {
        connected: false,
        address: null,
        balance: 0,
      },
    }),

  /* Socket Integration */
  socket: null,
  initSocket: () => {
    if (get().socket) return;

    const socket = io(`http://localhost:${CONFIG.WS_PORT}`);

    socket.on(WsEvent.PRICE_UPDATE, (payload: WsPayload[WsEvent.PRICE_UPDATE]) => {
      set({ currentXlmPrice: payload.price });
    });

      socket.on(WsEvent.ROUND_UPDATE, (payload: WsPayload[WsEvent.ROUND_UPDATE]) => {
      set({ 
        currentRound: payload,
        totalPool: payload.totalPool,
        activeUsers: payload.activeUsers,
      });

      // Store in pastRounds if resolved
      if (payload.status === RoundStatus.RESOLVED) {
        set((state) => ({
          pastRounds: {
            ...state.pastRounds,
            [payload.id]: payload,
          }
        }));
      }

      // If round resolved and we were in the arena, check if we can claim
      if (payload.status === RoundStatus.RESOLVED && get().status === 'leading') {
        set({ canClaim: true });
      }
    });

    socket.on(WsEvent.POOL_UPDATE, (payload: WsPayload[WsEvent.POOL_UPDATE]) => {
      set({ 
        totalPool: payload.totalPool,
        activeUsers: payload.activeUsers,
      });
    });

    socket.on(WsEvent.NEW_PREDICTION, (payload: WsPayload[WsEvent.NEW_PREDICTION]) => {
      set((state) => ({
        recentActivities: [payload, ...state.recentActivities].slice(0, 20)
      }));
    });

    socket.on(WsEvent.FEED_SYNC, (payload: WsPayload[WsEvent.FEED_SYNC]) => {
      set({ recentActivities: payload });
    });

    socket.on(WsEvent.LEADERBOARD_UPDATE, (payload: WsPayload[WsEvent.LEADERBOARD_UPDATE]) => {
      set({ leaderboard: payload });
    });

    set({ socket });
  },

  /* Arena action */
  isEntering: false,
  canClaim: false,
  
  enterArena: async () => {
    if (!get().wallet.connected) {
      await get().connectWallet();
    }

    set({ isEntering: true });
    
    // Simulate interaction with Soroban
    setTimeout(() => {
      const newPrediction: Prediction = {
        userAddress: get().wallet.address || 'Anonymous',
        predictedPrice: get().price,
        stakeAmount: get().stake,
        roundId: get().currentRound?.id || '0',
      };

      set({ isEntering: false });
      set((state) => ({ 
        totalPool: state.totalPool + state.stake,
        activeUsers: state.activeUsers + 1,
        status: 'leading',
        myHistory: [newPrediction, ...state.myHistory]
      }));
    }, 1500);
  },

  claimReward: async () => {
    if (!get().canClaim) return;
    
    set({ isEntering: true }); // Use same loading state for simplicity
    
    // Simulate claim transaction
    setTimeout(() => {
      const reward = get().stake * get().multiplier;
      set((state) => ({
        isEntering: false,
        canClaim: false,
        status: 'neutral',
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance + reward
        }
      }));
      alert(`Claimed ${reward.toLocaleString()} XLM reward!`);
    }, 2000);
  }
}));
