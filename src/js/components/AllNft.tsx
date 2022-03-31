import React from 'react';
import { NftVideoItem, NftVideo } from './NftVideoItem';
import 'swiper/scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import nftPicture from '../../assets/images/nft-picture.png';
import nftPicture2x from '../../assets/images/nft-picture@2x.png';
import homeNft from '../../assets/images/nft1.jpg';
import homeNft2x from '../../assets/images/nft1@2x.jpg';
import sign from '../../assets/images/sign.svg';

export const MainNftVideoData: Array<NftVideo> = [
	{
		id: '1',
		image: {
			quality1x: homeNft,
			quality2x: homeNft2x
		},
		slug: 'adam-smith-1',
		sign: sign,
		tag: '@AdamSmith',
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		}
	}
];

export const AllNft: React.FC = () => {
	return (
		<section className="section all-nft">
			<div className="section-wrapper all-nft-wrapper">
				<h2 className="title title_size-m all-nft__title">All Imma NFT</h2>
				<Swiper className="all-nft__title">
					<SwiperSlide>{/* <NftVideoItem /> */}</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
};
