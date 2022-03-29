import React from 'react';

export interface NumberedBlockProps {
	number: string;
	title: string;
	list?: {
		title?: string;
		items: string[];
	};
}

export const NumberedBlock = ({ number, title, list }: NumberedBlockProps) => {
	return (
		<div className="block-numbered">
			<h4 className="title title_size-xs block-numbered__number">{number}</h4>
			<div className="block-numbered__content">
				{title && <p className="title title_size-xs block-numbered__title">{title}</p>}
				{list && (
					<>
						<p className="block-numbered__list-title">{list.title}</p>
						<ul className="list block-numbered__list">
							{list.items.map((text) => {
								console.log(text);
								return (
									<li className="list-item block-numbered__item" key={text}>
										{text}
									</li>
								);
							})}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};
