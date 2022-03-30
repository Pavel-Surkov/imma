import React from 'react';

type NumberedBlockDataT = {
	type: 'text_bold' | 'text_thin' | 'list';
	list?: { items: string[] };
	paragraphs?: string[];
};

export interface NumberedBlockProps {
	number: string;
	data: NumberedBlockDataT[];
}

export const NumberedBlock = ({ number, data }: NumberedBlockProps) => {
	return (
		<div className="block-numbered">
			<h4 className="title title_size-xs block-numbered__number">{number}</h4>
			<div className="block-numbered__content">
				{/* Renders different content based on data type */}
				{data.map(({ type, list, paragraphs }: NumberedBlockDataT) => {
					if (type === 'text_bold' || type === 'text_thin') {
						return (
							<React.Fragment key={paragraphs[0]}>
								{paragraphs.map((paragraph) => {
									// If data type is text_thin => font is thin
									// If data type is text_bold => font is bold
									const fontWeightClassName: string =
										type === 'text_bold'
											? 'block-numbered__paragraph'
											: 'block-numbered__paragraph_thin';

									return (
										<p
											className={`title title_size-xs ${fontWeightClassName}`}
											dangerouslySetInnerHTML={{ __html: paragraph }}
											key={paragraph}
										></p>
									);
								})}
							</React.Fragment>
						);
					}

					if (type === 'list') {
						return (
							<ul className="list block-numbered__list" key={list.items[0]}>
								{list.items.map((text) => {
									return (
										<li className="list__item block-numbered__item" key={text}>
											{text}
										</li>
									);
								})}
							</ul>
						);
					}

					throw new TypeError(`Data type cannot be called ${type}`);
				})}
			</div>
		</div>
	);
};
