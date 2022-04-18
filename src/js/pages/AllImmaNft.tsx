import React from 'react';
import { SortNft } from '../components/SortNft';

export const AllImmaNft: React.FC = () => {
	return (
		<section className="nfts">
			<div className="nfts-wrapper">
				<div className="container">
					<h1 className="title title_size-m nfts__title">All IMMA NFT</h1>
					<SortNft />
				</div>
			</div>
		</section>
	);
};
