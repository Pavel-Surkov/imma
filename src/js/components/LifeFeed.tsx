import React from 'react';
import { NftVideo } from './NftVideoItem';
import { LifeFeedTable } from './LifeFeedTable';
import { LifeFeedMobile } from './LifeFeedMobile';
import sign from '../../assets/images/sign.svg';
import nftPicture from '../../assets/images/nft-picture.png';
import nftPicture2x from '../../assets/images/nft-picture@2x.png';
import nft1 from '../../assets/images/nft1.jpg';
import nft1_2x from '../../assets/images/nft1@2x.jpg';
import nft2 from '../../assets/images/nft2.jpg';
import nft2_2x from '../../assets/images/nft2@2x.jpg';
import nft3 from '../../assets/images/nft3.jpg';
import nft3_2x from '../../assets/images/nft3@2x.jpg';
import nft4 from '../../assets/images/nft4.jpg';
import nft4_2x from '../../assets/images/nft4@2x.jpg';
import nft5 from '../../assets/images/nft5.jpg';
import nft5_2x from '../../assets/images/nft5@2x.jpg';
import avatar from '../../assets/images/icons/avatar.svg';

export interface ITableData extends NftVideo {
	hash: string;
	author: string;
	token: string;
	token_url: string;
	avatar: null | string;
	tx: {
		link: string;
	};
}

const tableData: Array<ITableData> = [
	{
		id: '1',
		image: {
			quality1x: nft1,
			quality2x: nft1_2x
		},
		hash: '#46486',
		token: '0x217828160ff79e02c67A2785fd8dA2D2bD86c28E',
		token_url: '/',
		slug: 'adam-smith-1',
		sign: sign,
		tag: '@AdamSmith',
		author: 'Adamsmith',
		avatar: null,
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		},
		tx: {
			link: '/'
		}
	},
	{
		id: '2',
		image: {
			quality1x: nft2,
			quality2x: nft2_2x
		},
		hash: '#46486',
		token: '0x217828160ff79e02c67A2785fd8dA2D2bD86c28E',
		token_url: '/',
		slug: 'adam-smith-2',
		sign: sign,
		tag: '@AdamSmith',
		author: 'Adamsmith',
		avatar: null,
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		},
		tx: {
			link: '/'
		}
	},
	{
		id: '3',
		image: {
			quality1x: nft3,
			quality2x: nft3_2x
		},
		hash: '#46486',
		token: '0x217828160ff79e02c67A2785fd8dA2D2bD86c28E',
		token_url: '/',
		slug: 'adam-smith-2',
		sign: sign,
		tag: '@AdamSmith',
		author: 'Adamsmith',
		avatar: null,
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		},
		tx: {
			link: '/'
		}
	},
	{
		id: '4',
		image: {
			quality1x: nft4,
			quality2x: nft4_2x
		},
		hash: '#46486',
		token: '0x217828160ff79e02c67A2785fd8dA2D2bD86c28E',
		token_url: '/',
		slug: 'adam-smith-2',
		sign: sign,
		tag: '@AdamSmith',
		author: 'Adamsmith',
		avatar: null,
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		},
		tx: {
			link: '/'
		}
	},
	{
		id: '5',
		image: {
			quality1x: nft5,
			quality2x: nft5_2x
		},
		hash: '#46486',
		token: '0x217828160ff79e02c67A2785fd8dA2D2bD86c28E',
		token_url: '/',
		slug: 'adam-smith-2',
		sign: sign,
		tag: '@AdamSmith',
		author: 'Adamsmith',
		avatar: null,
		date: new Date('05-09-2021'),
		picture: {
			quality1x: nftPicture,
			quality2x: nftPicture2x
		},
		tx: {
			link: '/'
		}
	}
];

// A function that converts dates form table data to string equivalents
const dateConvert = (date: Date): string => {
	const dateNow: Date = new Date();

	const datesDiffInSeconds: number = Math.abs(dateNow.getTime() - date.getTime()) / 1000;

	let output: string = '';

	if (datesDiffInSeconds < 60) {
		output = `less than a minute ago`;
	} else if (datesDiffInSeconds < 120) {
		output = `1 minute ago`;
	} else if (datesDiffInSeconds < 60 * 60) {
		const minutesCount: number = Math.round(datesDiffInSeconds / 60);

		output = `${minutesCount} minutes ago`;
	} else if (datesDiffInSeconds < 60 * 60 * 2) {
		output = `1 hour ago`;
	} else if (datesDiffInSeconds < 60 * 60 * 24) {
		const hoursCount: number = Math.round(datesDiffInSeconds / (60 * 60));

		output = `${hoursCount} hours ago`;
	} else if (datesDiffInSeconds < 60 * 60 * 24 * 2) {
		output = `1 day ago`;
	} else if (datesDiffInSeconds < 60 * 60 * 24 * 365) {
		const daysCount: number = Math.round(datesDiffInSeconds / (60 * 60 * 24));

		output = `${daysCount} days ago`;
	} else {
		output = `more than a year ago`;
	}

	return output;
};

const tableColumnsNames: Array<string> = ['', 'Information', '', '', 'Activity'];

export const LifeFeed: React.FC = () => {
	return (
		<section className="section lifefeed">
			<div className="section-wrapper lifefeed-wrapper">
				<div className="container">
					<h2 className="title title_size-m lifefeed-title">Life feed</h2>
					<LifeFeedTable
						tableColumnsNames={tableColumnsNames}
						tableData={tableData}
						dateConvert={dateConvert}
					/>
					<LifeFeedMobile tableData={tableData} dateConvert={dateConvert} />
				</div>
			</div>
		</section>
	);
};
