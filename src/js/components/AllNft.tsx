import React from 'react';
import { NftVideoItem, NftVideo } from './NftVideoItem';
import 'swiper/scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import nftPicture from '../../assets/images/nft-picture.png';
import nftPicture2x from '../../assets/images/nft-picture@2x.png';
import nft1 from '../../assets/images/nft1.jpg';
import nft1_2x from '../../assets/images/nft1@2x.jpg';
import nft2 from '../../assets/images/nft1.jpg';
import nft2_2x from '../../assets/images/nft1@2x.jpg';
import nft3 from '../../assets/images/nft3.jpg';
import nft3_2x from '../../assets/images/nft3@2x.jpg';
import nft4 from '../../assets/images/nft4.jpg';
import nft4_2x from '../../assets/images/nft4@2x.jpg';
import nft5 from '../../assets/images/nft5.jpg';
import nft5_2x from '../../assets/images/nft5@2x.jpg';
import sign from '../../assets/images/sign.svg';

export const MainNftVideoData: Array<NftVideo> = [
	{
		id: '1',
		image: {
			quality1x: nft1,
			quality2x: nft1_2x
		},
		slug: 'adam-smith-1',
		sign: sign,
		tag: '@AdamSmith',
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		}
	},
	{
		id: '2',
		image: {
			quality1x: nft2,
			quality2x: nft2_2x
		},
		slug: 'adam-smith-2',
		sign: sign,
		tag: '@AdamSmith',
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		}
	},
	{
		id: '3',
		image: {
			quality1x: nft3,
			quality2x: nft3_2x
		},
		slug: 'adam-smith-3',
		sign: sign,
		tag: '@AdamSmith',
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		}
	},
	{
		id: '4',
		image: {
			quality1x: nft4,
			quality2x: nft4_2x
		},
		slug: 'adam-smith-4',
		sign: sign,
		tag: '@AdamSmith',
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		}
	},
	{
		id: '5',
		image: {
			quality1x: nft5,
			quality2x: nft5_2x
		},
		slug: 'adam-smith-5',
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
