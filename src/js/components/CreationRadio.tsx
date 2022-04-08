import React, { useState, useEffect } from 'react';

enum PriceRadioTitles {
	'free' = 'For FREE',
	'not free' = 'Price'
}

interface IPriceRadio {
	type: 'free' | 'not free';
	price: {
		isFree: boolean;
		value: null | number;
	};
	dispatch: React.Dispatch<any>;
	input?: {
		initialValue: string;
	};
}

export const PriceRadio = ({ type, price, dispatch, input }: IPriceRadio) => {
	return (
		<label className="step-block step-block__radio-label">
			<input
				className="step-block__radio"
				type="radio"
				name="price"
				onChange={() =>
					dispatch({
						type: 'SET_PRICE_ISFREE',
						value: `${type === 'free' ? true : false}`
					})
				}
			/>
			<div className="step-block__radio-btn">
				<div></div>
			</div>
			<div className="step-block__title-wrapper">
				<h4 className="title title_size-xs step-block__title_radio">
					{PriceRadioTitles[type]}
				</h4>
				{input && (
					<input
						className="input step-block__radio-input"
						type="number"
						name="price_value"
						placeholder={input.initialValue}
						value={price.value}
						onChange={(evt) =>
							dispatch({ type: 'CHANGE_PRICE', value: +evt.target.value })
						}
					/>
				)}
			</div>
		</label>
	);
};

interface IBlockchainRadio {
	title: string;
	dispatch: React.Dispatch<any>;
	image: string;
}

export const BlockchainRadio = ({ title, dispatch, image }: IBlockchainRadio) => {
	return (
		<label className="step-block step-block__radio-label">
			<input className="step-block__radio" type="radio" name="blockchain" />
			<div className="step-block__radio-btn">
				<div></div>
			</div>
			<div className="step-block__title-wrapper">
				<h4 className="title title_size-xs step-block__title_radio">{title}</h4>
			</div>
			<div className="step-block__image">
				<img src="" srcSet="" alt="" />
			</div>
		</label>
	);
};
