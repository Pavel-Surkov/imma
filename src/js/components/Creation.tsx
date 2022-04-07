import React, { useReducer } from 'react';
import { CreationStep } from './CreationStep';

// Adding types to reducer
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

type Wallet = {
	walletNumber: null | string;
	isVerified: boolean;
};

enum Wallets {
	'original' = 'originalWallet',
	'creator' = 'creatorWallet',
	'custom' = 'customWallet'
}

interface State {
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

export type ActionType = Action<'SET_WALLET_NUMBER', { wallet: string; value: string }>;

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
				isVerified: state.wallets.originalWallet.isVerified
			};

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
							<div className="step-block__wrapper">
								<form action="" className="step-block">
									<h4 className="title title_size-xs step-block__title">
										Original NFT for your imma NFT to follow
									</h4>
									<input
										className="input step-block__input"
										type="text"
										name="wallet"
										value={state.wallets.originalWallet.walletNumber}
										onChange={(evt) =>
											dispatch({
												type: 'SET_WALLET_NUMBER',
												wallet: 'original',
												value: evt.target.value
											})
										}
										required
									/>
									<button type="submit" className="btn-arrow step-block__submit">
										Confirm
									</button>
								</form>
							</div>
							<div className="step-block__wrapper">
								<form action="" className="step-block">
									<h4 className="title title_size-xs step-block__title">
										The imma NFT creator wallet
									</h4>
									<input
										className="input step-block__input"
										type="text"
										name="wallet"
										value={state.wallets.creatorWallet.walletNumber}
										onChange={(evt) =>
											dispatch({
												type: 'SET_WALLET_NUMBER',
												wallet: 'creator',
												value: evt.target.value
											})
										}
										required
									/>
									<button type="submit" className="btn-arrow step-block__submit">
										Confirm
									</button>
								</form>
							</div>
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
