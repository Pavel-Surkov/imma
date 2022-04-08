import React, { useState, useEffect } from 'react';
// import { State } from './Creation';

interface IPriceCreationRadio {
	title: string;
	price: {
		isFree: boolean;
		value: null | number;
	};
	dispatch: React.Dispatch<any>;
	input?: {
		initialValue: string;
	};
}

export const PriceCreationRadio = ({ title, price, dispatch, input }: IPriceCreationRadio) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<label className="step-block step-block__radio-label">
			{/* TODO: Add logic and also add layout for other radio buttons */}
			<input
				className="step-block__radio"
				type="radio"
				name="price"
				// Change price
				onChange={() => dispatch({})}
			/>
			<div className="step-block__radio-btn">
				<div style={isChecked ? {} : { opacity: 0 }}></div>
			</div>
			<div className="step-block__title-wrapper">
				<h4 className="title title_size-xs step-block__title_radio">{title}</h4>
				{input && (
					<input
						className="input step-block__radio-input"
						type="text"
						name="price_value"
						placeholder={input.initialValue}
						// value=""
					/>
				)}
			</div>
		</label>
	);
};
