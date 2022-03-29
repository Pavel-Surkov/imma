import React from 'react';
import { NumberedBlockProps, NumberedBlock } from './NumberedBlock';

const aboutItems: NumberedBlockProps[] = [
	{ number: '01', title: 'NFT token address that you want to sign on' },
	{
		number: '02',
		title: 'Your wallet address for receiving related funds:',
		list: {
			items: [
				'Consistently receive a percentage when the created IMMA NFT will sell in the future',
				'Payment for creating the IMMA NFT (optional)'
			]
		}
	},
	{
		number: '03',
		title: '3rd party/broker wallet address to consistently receive a percentage when the created IMMA NFT will sell in the future (optional)'
	}
];

export const About: React.FC = () => {
	return (
		<section className="section about">
			<div className="section-wrapper about-wrapper">
				<div className="container">
					<h2 className="title title_size-m about-title">
						About <br />
						the <span className="title_wrapped">project</span>
					</h2>
					<div className="note about-note">
						<p>IMMA NFT creation is simple and includes a few steps...</p>
					</div>
					<h3 className="title title_size-xs about-subtitle">
						Before starting, make sure you have the following:
					</h3>
					<div className="about-content">
						{aboutItems.map((numberedBlock: NumberedBlockProps, i) => {
							return (
								<NumberedBlock
									number={numberedBlock.number}
									title={numberedBlock.title}
									list={numberedBlock.list}
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
