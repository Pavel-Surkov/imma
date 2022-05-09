import React from 'react';
import { OriginalNftInfo } from '../components/OriginalNftInfo';
import nftPicture from '../../assets/images/nft-picture.png';
import nftPicture2x from '../../assets/images/nft-picture@2x.png';

export const OriginalNft = () => {
	return (
		<main className="main original">
			<section className="original-page">
				<div className="original-page__wrapper">
					<div className="container">
						<div className="product-page__content">
							<div className="original-page__nft">
								<img
									width="370"
									src={nftPicture}
									srcSet={
										nftPicture2x ? `${nftPicture} 1x, ${nftPicture2x} 2x` : null
									}
									alt=""
								/>
							</div>
							<OriginalNftInfo />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};
