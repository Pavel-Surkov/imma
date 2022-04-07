import React from 'react';
import { State } from './Creation';

interface ICreationRadio {
	title: string;
	dispatch: React.Dispatch<any>;
	price: 'free' | number;
	input?: boolean;
	image?: string;
}

export const CreationRadio = ({ title, dispatch, price }: ICreationRadio) => {
	return (
		<div className="step-block__wrapper">
			<label className="step-block step-block__radio-label">
				{/* TODO: Add logic and also add layout for other radio buttons */}
				<input className="step-block__radio" type="radio" name="price" value="free" />
				<div className="step-block__radio-btn">
					<div style={price === 'free' ? {} : { opacity: 0 }}></div>
				</div>
				<div className="step-block__title-wrapper">
					<h4 className="title title_size-xs step-block__title_radio">{title}</h4>
				</div>
			</label>
		</div>
	);
};
