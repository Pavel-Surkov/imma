import React, { useReducer } from 'react';
import { CreationStep } from './CreationStep';
import { CreationForm } from './CreationForm';
import { PriceRadio, BlockchainRadio } from './CreationRadio';

// Adding types to reducer
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export type ActionType =
	| Action<'SET_WALLET_NUMBER', { wallet: string; value: string }>
	| Action<'VERIFY_WALLET', { wallet: string; event: React.MouseEvent<HTMLButtonElement> }>
	| Action<'ADD_CUSTOM_WALLET', {}>
	| Action<'SET_PRICE_ISFREE', { value: boolean }>
	| Action<'CHANGE_PRICE', { value: number }>
	| Action<'SET_BLOCKCHAIN_NETWORK', { value: 'ethereum' | 'polygon' }>;

export enum Wallets {
	original = 'originalWallet',
	creator = 'creatorWallet',
	custom = 'customWallet'
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
		value: number;
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
		value: 1000
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
		case 'SET_PRICE_ISFREE': {
			return {
				...state,
				price: {
					isFree: action.value,
					value: state.price.value
				}
			};
		}
		case 'CHANGE_PRICE': {
			return {
				...state,
				price: {
					isFree: state.price.isFree,
					value: action.value
				}
			};
		}
		case 'SET_BLOCKCHAIN_NETWORK': {
			return {
				...state,
				blockchain: action.value
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
							<PriceRadio isFree={true} price={state.price} dispatch={dispatch} />
							<PriceRadio
								isFree={false}
								price={state.price}
								dispatch={dispatch}
								input={{ initialValue: '1000' }}
							/>
						</div>
					</CreationStep>
					<CreationStep number="03" title="Blockchain network">
						<div className="step-wrapper step-wrapper_blockchain">
							<BlockchainRadio
								type="ethereum"
								blockchain={state.blockchain}
								dispatch={dispatch}
							/>
							<BlockchainRadio
								type="polygon"
								blockchain={state.blockchain}
								dispatch={dispatch}
							/>
						</div>
					</CreationStep>
					<CreationStep number="04" title="Create a video">
						<div className="step-wrapper step-wrapper_video">
							<button type="button" className="btn-video">
								Create a video
							</button>
							<span>
								*there is only an option to shoot something at the moment, there is
								no option to upload anything from the gallery
							</span>
						</div>
					</CreationStep>
				</div>
			</div>
		</section>
	);
};
