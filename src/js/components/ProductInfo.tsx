import React from 'react';
import { ProductOriginalNft } from './ProductOriginalNft';
import { ITableData } from '../helpers/nftTableData';

type ProductInfoProps = {
	video: ITableData;
	status: 'released' | 'pending';
};

export const ProductInfo = ({ video, status }: ProductInfoProps) => {
	return (
		<div className="product-page__info">
			<h2 className="title title_size-m product-page__title">IMMA NFT {video.hash}</h2>
			{/* TODO: Add the layout for different statuses */}
			{status === 'pending' && (
				<div className="product-block status">
					<div className=""></div>
				</div>
			)}
			{status === 'released' && (
				<div className="product-block status">
					<div className=""></div>
				</div>
			)}
			<ProductOriginalNft video={video} />
			<div className="product-block product-page__author">
				<h4 className="title product-block__title">Signed by:</h4>
				<p className="product-page__author-tag">@{video.author}</p>
				<div className="product-page__author-sign">
					<img height="55" src={video.sign} alt=""></img>
				</div>
			</div>
		</div>
	);
};
