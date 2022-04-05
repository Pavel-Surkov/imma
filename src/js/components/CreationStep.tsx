import React from 'react';

type CreationStepProps = {
	number: string;
	title: string;
	children: any;
};

export const CreationStep = ({ number, title, children }: CreationStepProps) => {
	return (
		<div className="step">
			<h3 className="title title_size-s">
				{number} {title}
			</h3>
			{children}
		</div>
	);
};
