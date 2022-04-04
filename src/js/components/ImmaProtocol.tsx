import React from 'react';
import { InfoBlock } from './InfoBlock';
import { NumberedBlockProps } from './NumberedBlock';

export interface ProtocolItem {
	title: string;
	subtitle?: string;
	blocks: Array<NumberedBlockProps>;
}

const protocolList: Array<ProtocolItem> = [
	{
		title: 'Creations',
		subtitle:
			'Once the IMMA NFT is created it will be sent to the same wallet of the original NFT.',
		blocks: [
			{
				number: '01',
				data: [
					{
						type: 'text_bold',
						paragraphs: [
							'The wallet owner will receive a transaction request to his wallet. He can both accept or reject it.'
						]
					}
				]
			},
			{
				number: '02',
				data: [
					{
						type: 'text_bold',
						paragraphs: [
							'The gas fee and transaction fee should be already paid by then, so in this transaction the original NFT wallet owner should not pay anything, just to accept the IMMA NFT to the wallet.'
						]
					}
				]
			}
		]
	},
	{
		title: 'Transections and ownership of IMMA NFT',
		subtitle: 'The original NFT and it’s related IMMA NFT are meant to be together.',
		blocks: [
			{
				number: '01',
				data: [
					{
						type: 'text_bold',
						paragraphs: [
							'IMMA NFT is always tracking the current wallet of the original NFT.'
						]
					}
				]
			},
			{
				number: '02',
				data: [
					{
						type: 'text_bold',
						paragraphs: [
							'The price for the related IMMA NFT is mandatory to be equal to the same price of the original NFT.'
						]
					}
				]
			},
			{
				number: '03',
				data: [
					{
						type: 'text_bold',
						paragraphs: [
							'There are 7 days from the time the original NFT and IMMA NFT separate till the owner of the original NFT can repurchase the IMMA NFT.'
						]
					}
				]
			}
		]
	}
];

export const ImmaProtocol: React.FC = () => {
	return (
		<section className="section protocol">
			<div className="section-wrapper protocol-wrapper">
				<div className="container">
					<h2 className="title title_size-m protocol-title">IMMA protocol</h2>
					{protocolList.map((item) => {
						return (
							<InfoBlock
								title={item.title}
								subtitle={item.subtitle}
								blocks={item.blocks}
								blocksCount={item.blocks.length}
								key={item.title}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};
