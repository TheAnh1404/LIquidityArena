#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol, Vec, log};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum RoundStatus {
    Open = 0,
    Closed = 1,
    Resolved = 2,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub id: u64,
    pub start_time: u64,
    pub end_time: u64,
    pub status: RoundStatus,
    pub total_stake: i128,
    pub final_price: i128,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Prediction {
    pub user: Address,
    pub predicted_price: i128,
    pub stake_amount: i128,
}

#[contracttype]
pub enum DataKey {
    Round(u64),
    Prediction(u64, Address), // RoundID, UserAddress
    Admin,
    RoundCount,
}

#[contract]
pub struct LiquidityArenaContract;

#[contractimpl]
impl LiquidityArenaContract {
    pub fn init(e: Env, admin: Address) {
        e.storage().instance().set(&DataKey::Admin, &admin);
        e.storage().instance().set(&DataKey::RoundCount, &0u64);
    }

    pub fn create_round(e: Env, end_time: u64) -> u64 {
        let admin: Address = e.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut count: u64 = e.storage().instance().get(&DataKey::RoundCount).unwrap_or(0);
        count += 1;

        let round = Round {
            id: count,
            start_time: e.ledger().timestamp(),
            end_time,
            status: RoundStatus::Open,
            total_stake: 0,
            final_price: 0,
        };

        e.storage().instance().set(&DataKey::Round(count), &round);
        e.storage().instance().set(&DataKey::RoundCount, &count);
        
        log!(&e, "Round created", count);
        count
    }

    pub fn enter_prediction(e: Env, round_id: u64, user: Address, price: i128, stake: i128) {
        user.require_auth();

        let mut round: Round = e.storage().instance().get(&DataKey::Round(round_id)).unwrap();
        assert!(round.status == RoundStatus::Open, "Round is not open");
        assert!(e.ledger().timestamp() < round.end_time, "Round time expired");

        // Logic to transfer XLM would go here using token client
        // For this demo, we track the virtual stake in the contract
        
        let prediction = Prediction {
            user: user.clone(),
            predicted_price: price,
            stake_amount: stake,
        };

        round.total_stake += stake;
        e.storage().instance().set(&DataKey::Round(round_id), &round);
        e.storage().persistent().set(&DataKey::Prediction(round_id, user), &prediction);
        
        log!(&e, "Prediction entered", round_id, price, stake);
    }

    pub fn close_round(e: Env, round_id: u64) {
        let admin: Address = e.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut round: Round = e.storage().instance().get(&DataKey::Round(round_id)).unwrap();
        round.status = RoundStatus::Closed;
        e.storage().instance().set(&DataKey::Round(round_id), &round);
    }

    pub fn resolve_round(e: Env, round_id: u64, final_price: i128) {
        let admin: Address = e.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut round: Round = e.storage().instance().get(&DataKey::Round(round_id)).unwrap();
        round.status = RoundStatus::Resolved;
        round.final_price = final_price;
        e.storage().instance().set(&DataKey::Round(round_id), &round);
    }

    pub fn claim_reward(e: Env, round_id: u64, user: Address) -> i128 {
        user.require_auth();

        let round: Round = e.storage().instance().get(&DataKey::Round(round_id)).unwrap();
        assert!(round.status == RoundStatus::Resolved, "Round not resolved yet");

        let prediction: Prediction = e.storage().persistent()
            .get(&DataKey::Prediction(round_id, user.clone()))
            .expect("No prediction found for user");

        // Logic: Winners are those within 1% of final price
        let diff = (prediction.predicted_price - round.final_price).abs();
        let threshold = round.final_price / 100; // 1%

        if diff <= threshold {
            // Simplified reward: 2x stake for winners
            let reward = prediction.stake_amount * 2;
            log!(&e, "User claimed reward", user, reward);
            
            // In real world, we would transfer XLM here
            // token::Client::new(&e, &token_address).transfer(&e.current_contract_address(), &user, &reward);
            
            // Mark as claimed by deleting prediction
            e.storage().persistent().remove(&DataKey::Prediction(round_id, user));
            reward
        } else {
            panic!("User did not win this round");
        }
    }
    
    pub fn get_round(e: Env, round_id: u64) -> Round {
        e.storage().instance().get(&DataKey::Round(round_id)).unwrap()
    }
}
