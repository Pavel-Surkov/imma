import React from 'react';
import { tableData } from '../helpers/nftTableData';
import { ProductMoreNft } from './ProductMoreNft';

export const OriginalNftInfo = () => {
	return (
		<div className="original-page__info">
			<h2 className="title title_size-m original-page__title">
				NFT: <span>The Name Of NFT</span>
			</h2>
			<div className="product-block original-page__owner">
				<h4 className="title product-block__title">Owned by:</h4>
				<a href="/" className="link link_hover_green original-page__owner-link">
					0x2175264ff9ekcc66468ра
				</a>
			</div>
			<div className="product-block original-page__graph">
				<h4 className="title product-block__title">Price History</h4>
				{/* Graph */}
				<a href="https://opensea.io/" className="link original-page__graph-link">
					See in opensea
				</a>
			</div>
			<ProductMoreNft video={tableData[0]} />
		</div>
	);
};
