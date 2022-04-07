import React, { useReducer } from 'react';
import { CreationStep } from './CreationStep';
import { CreationForm } from './CreationForm';

// Adding types to reducer
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export type ActionType =
	| Action<'SET_WALLET_NUMBER', { wallet: string; value: string }>
	| Action<'VERIFY_WALLET', { wallet: string; event: React.MouseEvent<HTMLButtonElement> }>;

export enum Wallets {
	'original' = 'originalWallet',
	'creator' = 'creatorWallet',
	'custom' = 'customWallet'
}

type Wallet = {
	walletNumber: null | string;
	isVerified: boolean;
};

export interface State {
	wallets: {
		originalWallet: Wallet;
		creatorWallet: Wallet;
		customWallet?: Wallet;
	};
	price: null | number;
	blockchain: 'ethereum' | 'polygon';
	video: null | File;
	signature: null | File;
	verification: {
		social: 'instagram' | 'twitter';
		isVerified: boolean;
	};
}

const initialState: State = {
	wallets: {
		originalWallet: {
			walletNumber: '',
			isVerified: false
		},
		creatorWallet: {
			walletNumber: '',
			isVerified: false
		}
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

// Here is all the states related to NFT creation
function reducer(state: State, action: ActionType) {
	switch (action.type) {
		case 'SET_WALLET_NUMBER': {
			const newState = { ...state };

			newState.wallets[Wallets[action.wallet]] = {
				walletNumber: action.value,
				isVerified: false
			};

			return newState;
		}
		case 'VERIFY_WALLET': {
			action.event.preventDefault();

			const newState = { ...state };

			let currentWallet = newState.wallets[Wallets[action.wallet]];

			// Wallet check using regexp
			if (currentWallet.walletNumber.match(/^0x[a-fA-F0-9]{40}$/)) {
				newState.wallets[Wallets[action.wallet]] = {
					walletNumber: currentWallet.walletNumber,
					isVerified: true
				};
			}
			console.log(state.wallets[Wallets[action.wallet]]);

			return newState;
		}
		default: {
			throw new TypeError('Action type is uncorrect');
		}
	}
}

export const Creation = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<section id="creation" className="section creation">
			<div className="section-wrapper creation-wrapper">
				<div className="container">
					<h2 className="title title_size-m creation-title">IMMA NFT creation</h2>
					<CreationStep number="01" title="Add wallet">
						<div className="step-wrapper">
							<CreationForm state={state} dispatch={dispatch} wallet="original" />
							<CreationForm state={state} dispatch={dispatch} wallet="creator" />
							<div className="step-block_add">
								<button type="button" className="step-block__add-btn">
									<span></span>
									<span></span>
								</button>
								<p className="step-block__add-note">
									*add another wallet (third party, intermediary)
								</p>
							</div>
						</div>
					</CreationStep>
				</div>
			</div>
		</section>
	);
};
