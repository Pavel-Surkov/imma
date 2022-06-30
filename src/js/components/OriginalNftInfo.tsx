import React, { useState, useEffect } from 'react';
import { tableData } from '../helpers/nftTableData';
import { ProductMoreNft } from './ProductMoreNft';
import { OriginalNftGraphic } from './OriginalNftGraphic';

export const OriginalNftInfo = (props) => {
	const inft = props.inft;
	// For managing owner link's length
	const [miniScreen, setMiniScreen] = useState(window.innerWidth < 360 ? true : false);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth < 360 && miniScreen === false) {
				setMiniScreen(true);
			}

			if (window.innerWidth >= 360 && miniScreen === true) {
				setMiniScreen(false);
			}
		});
	}, []);

	return (
		<div className="original-page__info">
			<h2 className="title title_size-m original-page__title">
				NFT: <span>{inft.nfta.metadata.name}</span>
			</h2>
			<div className="product-block original-page__owner">
				<h4 className="title product-block__title">Owned by:</h4>
				<a href="/" className="link link_hover_green original-page__owner-link">
					{miniScreen ? inft.nfta.owner.wallet.slice(0, 17) + '...' : inft.nfta.owner.wallet}
				</a>
			</div>
			<div className="product-block original-page__graph">
				<h4 className="title product-block__title">Price History</h4>
				{/* Graph */}
				<OriginalNftGraphic inft={inft} />
				<a href="https://opensea.io/" className="link original-page__graph-link">
					See in opensea
				</a>
			</div>
			{/* TODO: Add this */}
			{/* <ProductMoreNft video={tableData[0]} /> */}
		</div>
	);
};
