import React from 'react';
import { ITableData } from '../helpers/nftTableData';

export const ProductInfo = ({ video }: { video: ITableData }) => {
	return (
		<div className="product-page__info">
			<h2 className="title title_size-m product-page__title">IMMA NFT {video.hash}</h2>
		</div>
	);
};
