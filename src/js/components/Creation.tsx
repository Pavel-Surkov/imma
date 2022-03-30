import React, { useReducer } from 'react';

// Adding types to reducer
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

type Wallet = {
	walletNumber: null | string;
	isVerified: boolean;
};

interface State {
	wallet: Wallet;
	price: null | number;
	blockchain: 'ethereum' | 'polygon';
	video: null;
	signature: null;
	verification: {
		social: 'instagram' | 'twitter';
		isVerified: boolean;
	};
}

export type ActionType = Action<'SET_WALLET_NUMBER', { value: string }>;

const initialState: State = {
	wallet: {
		walletNumber: null,
		isVerified: false
	},
	price: null,
	blockchain: 'ethereum',
	video: null,
	signature: null,
	verification: {
		social: 'instagram',
		isVerified: false
	}
};

function reducer(state: State, action: ActionType) {
	switch (action.type) {
		case 'SET_WALLET_NUMBER': {
			return {
				...state,
				wallet: {
					walletNumber: action.value,
					isVerified: state.wallet.isVerified
				}
			};
		}
		default: {
			throw new Error();
		}
	}
}

export const Creation = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<section className="creation">
			<div className="creation-wrapper">
				<div className="container"></div>
			</div>
		</section>
	);
};
