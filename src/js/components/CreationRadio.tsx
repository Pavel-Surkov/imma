import React, { useState } from 'react';
import { State } from './Creation';

interface IPriceRadio {
	isFree: boolean;
	price: {
		isFree: boolean;
		value: null | number;
	};
	dispatch: React.Dispatch<any>;
	input?: {
		initialValue: string;
	};
}

export const PriceRadio = ({ isFree, price, dispatch, input }: IPriceRadio) => {
	const [maxPrice, setMaxPrice] = useState<number>(1000000);

	// Handler controls value of the price input
	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value: string = e.target.value;

		if (value.startsWith('0') && value.length >= 2) {
			value = value.slice(1);
		} else if (+value <= 0) {
			value = '0';
		} else if (+value > maxPrice) {
			value = String(maxPrice);
		}

		dispatch({ type: 'CHANGE_PRICE', value: +value });
	};

	return (
		<label className="step-block step-block__radio-label">
			<input
				className="step-block__radio"
				type="radio"
				name="price"
				onChange={() =>
					dispatch({
						type: 'SET_PRICE_ISFREE',
						value: isFree
					})
				}
				checked={price.isFree === isFree ? true : false}
			/>
			<div className="step-block__radio-btn">
				<div></div>
			</div>
			<div className="step-block__title-wrapper">
				<h4 className="title title_size-xs step-block__title_radio">
					{isFree ? 'For FREE' : 'Price'}
				</h4>
				{input && (
					<input
						className="input step-block__radio-input"
						type="text"
						name="price_value"
						placeholder={input.initialValue}
						value={+price.value}
						onChange={(evt) => handlePriceChange(evt)}
					/>
				)}
			</div>
		</label>
	);
};

enum BlockchainRadioTitles {
	'ethereum' = 'Ethereum ETH',
	'polygon' = 'Polygon'
}

interface IBlockchainRadio {
	type: 'ethereum' | 'polygon';
	blockchain: 'ethereum' | 'polygon';
	dispatch: React.Dispatch<any>;
}

export const BlockchainRadio = ({ type, blockchain, dispatch }: IBlockchainRadio) => {
	const customClassName: string =
		type === 'ethereum' ? 'step-block_eth' : type === 'polygon' ? 'step-block_pol' : '';

	return (
		<label className={`step-block step-block__radio-label ${customClassName}`}>
			<input
				className="step-block__radio"
				type="radio"
				name="blockchain"
				onChange={() =>
					dispatch({
						type: 'SET_BLOCKCHAIN_NETWORK',
						value: type
					})
				}
				checked={blockchain === type ? true : false}
			/>
			<div className="step-block__radio-btn">
				<div></div>
			</div>
			<div className="step-block__title-wrapper">
				<h4 className="title title_size-xs step-block__title_radio">
					{BlockchainRadioTitles[type]}
				</h4>
			</div>
		</label>
	);
};
