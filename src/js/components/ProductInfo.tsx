import React from 'react';
import { ProductOriginalNft } from './ProductOriginalNft';
import { ITableData } from '../helpers/nftTableData';
import { StatusPending } from './StatusPending';
import { StatusReleased } from './StatusReleased';
import { ProductAuthor } from './ProductAuthor';
import { ProductActivity } from './ProductActivity';
import { ProductMoreNft } from './ProductMoreNft';
import { Result } from '../helpers/getLiveFeedTypes';

type ProductInfoProps = {
	video: Result;
	status: 'released' | 'pending';
	loginWallet: (event: any) => void;
	handle_claim: (event: any) => void;
	session: any;
};

export const ProductInfo = React.memo(({ video, status, session, handle_claim, loginWallet }: ProductInfoProps) => {
	return (
		<div className="product-page__info">
			<h2 className="title title_size-m product-page__title">
				IMMA NFT #{video.uid.slice(0, 5)}...
			</h2>
			{status === 'pending' && <StatusPending />}
			{status === 'released' && <StatusReleased session={session} handle_claim={handle_claim} loginWallet={loginWallet} />}
			<ProductOriginalNft video={video} />
			<ProductAuthor video={video} />
			<ProductActivity video={video} />
			<ProductMoreNft video={video} />
		</div>
	);
});
