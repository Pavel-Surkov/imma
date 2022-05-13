import React, { useRef } from 'react';
import { Wallets, State } from '../helpers/creationReducer';

interface ICreationFormProps {
	title: string;
	state: State;
	dispatch: React.Dispatch<any>;
	wallet: string;
}

export const CreationForm = ({ title, state, dispatch, wallet }: ICreationFormProps) => {
	const inputWrapperRef = useRef(null);

	// We get correct state fields using Wallets enum
	const walletState: string = Wallets[wallet];

	return (
		<div className="step-block_wallet step-block__wrapper">
			<form
				className="form step-block"
				onSubmit={(evt) =>
					dispatch({
						type: 'VERIFY_WALLET',
						wallet: wallet,
						event: evt
					})
				}
			>
				<h4 className="title title_size-xs step-block__title">{title}</h4>
				<div className="step-block__input-wrapper" ref={inputWrapperRef}>
					<input
						className={`input step-block__input ${
							state.wallets[walletState].error && 'step-block__input_state_error'
						}`}
						type="text"
						name="wallet"
						value={state.wallets[walletState].walletNumber}
						onChange={(evt) =>
							dispatch({
								type: 'SET_WALLET_NUMBER',
								wallet: wallet,
								value: evt.target.value
							})
						}
					/>
					{state.wallets[walletState].error && (
						<span className="step-block__input-error">
							{state.wallets[walletState].error}
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn-arrow step-block__submit"
					disabled={state.wallets[walletState].isVerified}
				>
					Confirm
				</button>
			</form>
		</div>
	);
};
