import React from 'react';
import { ProductOriginalNft } from './ProductOriginalNft';
import { ITableData } from '../helpers/nftTableData';
import { StatusPending } from './StatusPending';
import { StatusReleased } from './StatusReleased';
import { ProductAuthor } from './ProductAuthor';
import { ProductActivity } from './ProductActivity';

type ProductInfoProps = {
	video: ITableData;
	status: 'released' | 'pending';
};

export const ProductInfo = ({ video, status }: ProductInfoProps) => {
	return (
		<div className="product-page__info">
			<h2 className="title title_size-m product-page__title">IMMA NFT {video.hash}</h2>
			{/* TODO: Add the layout for different statuses */}
			{status === 'pending' && <StatusPending />}
			{status === 'released' && <StatusReleased />}
			<ProductOriginalNft video={video} />
			<ProductAuthor video={video} />
			<ProductActivity video={video} />
		</div>
	);
};