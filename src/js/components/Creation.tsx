import React, { useReducer } from 'react';
import { CreationStep } from './CreationStep';
import { CreationForm } from './CreationForm';
import { PriceCreationRadio } from './CreationRadio';

// Adding types to reducer
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export type ActionType =
	| Action<'SET_WALLET_NUMBER', { wallet: string; value: string }>
	| Action<'VERIFY_WALLET', { wallet: string; event: React.MouseEvent<HTMLButtonElement> }>
	| Action<'ADD_CUSTOM_WALLET', {}>;

export enum Wallets {
	'original' = 'originalWallet',
	'creator' = 'creatorWallet',
	'custom' = 'customWallet'
}

type Wallet = {
	walletNumber: '' | string;
	isVerified: boolean;
};

export interface State {
	wallets: {
		originalWallet: Wallet;
		creatorWallet: Wallet;
		customWallet?: Wallet;
	};
	price: {
		isFree: boolean;
		value: null | number;
	};
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
	price: {
		isFree: true,
		value: null
	},
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
		case 'ADD_CUSTOM_WALLET': {
			return {
				...state,
				wallets: {
					originalWallet: {
						walletNumber: state.wallets.originalWallet.walletNumber,
						isVerified: state.wallets.originalWallet.isVerified
					},
					creatorWallet: {
						walletNumber: state.wallets.creatorWallet.walletNumber,
						isVerified: state.wallets.creatorWallet.isVerified
					},
					customWallet: {
						walletNumber: '',
						isVerified: false
					}
				}
			};
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
							<CreationForm
								title="Original NFT for your imma NFT to follow"
								state={state}
								dispatch={dispatch}
								wallet="original"
							/>
							<CreationForm
								title="The imma NFT creator wallet"
								state={state}
								dispatch={dispatch}
								wallet="creator"
							/>
							{state.wallets.customWallet && (
								<CreationForm
									title="Your custom wallet"
									state={state}
									dispatch={dispatch}
									wallet="custom"
								/>
							)}
							{!state.wallets.customWallet && (
								<div className="step-block_add">
									<button
										type="button"
										className="step-block__add-btn"
										onClick={() => dispatch({ type: 'ADD_CUSTOM_WALLET' })}
									>
										<span></span>
										<span></span>
									</button>
									<p className="step-block__add-note">
										*add another wallet (third party, intermediary)
									</p>
								</div>
							)}
						</div>
					</CreationStep>
					<CreationStep number="02" title="Price of the IMMA NFT">
						<div className="step-wrapper">
							<PriceCreationRadio
								title="For FREE"
								price={state.price}
								dispatch={dispatch}
							/>
							<PriceCreationRadio
								title="Price"
								price={state.price}
								dispatch={dispatch}
								input={{ initialValue: '1000' }}
							/>
						</div>
					</CreationStep>
				</div>
			</div>
		</section>
	);
};
