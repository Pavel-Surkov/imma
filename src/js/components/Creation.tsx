import React, { useReducer, useState, useEffect } from 'react';
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
	const [signatureText, setSignatureText] = useState<string>('Sign here');

	useEffect(() => {
		const windowWidth = window.innerWidth;

		if (windowWidth < 768) {
			setSignatureText('Put your signature here');
		} else {
			setSignatureText('Sign here');
		}

		console.log('a');
	}, [window.innerWidth]);

	const createVideo = () => {
		const getMedia = async (constraints) => {
			let stream: null | MediaStream = null;

			try {
				stream = await navigator.mediaDevices.getUserMedia(constraints);

				console.log(stream);
				/* use the stream */
			} catch (err) {
				console.log(err);
				/* handle the error */
			}
		};

		getMedia({ audio: true, video: true });
	};

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
							<button type="button" className="btn-video" onClick={createVideo}>
								Create a video
							</button>
							<span>
								*there is only an option to shoot something at the moment, there is
								no option to upload anything from the gallery
							</span>
						</div>
					</CreationStep>
					<CreationStep number="05" title="Your signature">
						<div className="step-wrapper">
							<div className="step-block_sign">
								<button
									type="button"
									className="step-block__sign-btn"
									aria-label="sign"
								>
									<svg
										width="32"
										height="33"
										viewBox="0 0 32 33"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M30.1067 8.04228L24.8889 2.79784C24.5441 2.45479 24.0775 2.26221 23.5912 2.26221C23.1048 2.26221 22.6382 2.45479 22.2934 2.79784L3.79561 21.269L2.10672 28.5578C2.04846 28.8243 2.05045 29.1004 2.11256 29.366C2.17467 29.6315 2.29532 29.8799 2.46571 30.0929C2.63609 30.3058 2.8519 30.4781 3.09736 30.597C3.34283 30.7159 3.61176 30.7784 3.88449 30.7801C4.01158 30.7929 4.13963 30.7929 4.26672 30.7801L11.6356 29.0912L30.1067 10.6378C30.4498 10.293 30.6423 9.82645 30.6423 9.34006C30.6423 8.85368 30.4498 8.38708 30.1067 8.04228V8.04228ZM10.7467 27.4912L3.84005 28.9401L5.41338 22.1667L19.2534 8.38006L24.5867 13.7134L10.7467 27.4912ZM25.7778 12.4245L20.4445 7.09117L23.5378 4.01562L28.7823 9.34895L25.7778 12.4245Z"
											fill="#D6FF7E"
										/>
									</svg>
								</button>
								<canvas
									width="470"
									height="300"
									className="step-wrapper__sign"
								></canvas>
								<span>{signatureText}</span>
							</div>
						</div>
					</CreationStep>
				</div>
			</div>
		</section>
	);
};
