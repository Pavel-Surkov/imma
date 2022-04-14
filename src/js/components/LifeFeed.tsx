import React from 'react';
import { Link } from 'react-router-dom';
import { NftVideo } from './NftVideoItem';
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

interface TableDataT extends NftVideo {
	hash: string;
	author: string;
	token: string;
	token_url: string;
	avatar: null | string;
	tx: {
		link: string;
	};
}

const tableData: Array<TableDataT> = [
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
				</div>
				<div className="lifefeed-container">
					<table className="table lifefeed-table">
						<thead className="table-header">
							<tr className="table-row">
								{tableColumnsNames.map((columnName, i) => {
									return (
										<td className="table-col" key={i}>
											{columnName}
										</td>
									);
								})}
							</tr>
						</thead>
						<tbody className="table-body">
							{tableData.map((row) => {
								const dateOutput: string = dateConvert(row.date);
								const dateString: string = '02\\04\\22 02:00';
								const shortToken: string = row.token.slice(0, 13) + '...';

								return (
									<tr className="table-row" key={row.id}>
										<td className="table-col">
											<div className="video">
												<img
													width="370"
													className="video-preview"
													src={row.image.quality1x}
													srcSet={`${row.image.quality1x} 1x, ${
														row.image.quality2x
															? row.image.quality2x
															: ''
													} 2x`}
													alt=""
												></img>
												<div className="video-play__wrapper">
													<Link to={row.slug} className="video-play">
														<svg
															data-svg="play"
															width="21"
															height="26"
															viewBox="0 0 21 26"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M0.200195 12.9473V2.55576C0.200195 0.98489 1.9281 0.0272036 3.26019 0.859764L19.8866 11.2513C21.1399 12.0346 21.1399 13.8599 19.8866 14.6433L3.26019 25.0348C1.9281 25.8673 0.200195 24.9096 0.200195 23.3388V12.9473Z"
																fill="#D6FF7E"
															/>
														</svg>
													</Link>
												</div>
											</div>
										</td>
										<td className="table-col">
											<div className="table-col__wrapper">
												<p className="title">IMMA NFT</p>
												<p>{row.hash}</p>
												<p className="title">Date/Time</p>
												<p>{dateOutput}</p>
											</div>
										</td>
										<td className="table-col">
											<p className="title">Signed & Created by</p>
											<p>{row.author}</p>
											<p className="title">TX</p>
											<a href={row.tx.link}>
												<svg
													width="18"
													height="19"
													viewBox="0 0 18 19"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M7 3.76514H1.5V17.7651H15.5V12.7651"
														stroke="white"
														strokeWidth="2"
													/>
													<path
														d="M10 8.76514L17 1.76514M17 1.76514V8.76514M17 1.76514H10"
														stroke="white"
														strokeWidth="2"
													/>
												</svg>
											</a>
										</td>
										<td className="table-col">
											<div className="table-col__wrapper">
												<p className="title">Original NFT token</p>
												<p>
													<a className="link" href={row.token_url}>
														{shortToken}
													</a>
												</p>
												<img src={sign} alt="sign" />
											</div>
										</td>
										<td className="table-col">
											<div className="table-col__wrapper">
												<img
													src={row.avatar ? row.avatar : avatar}
													alt="avatar"
												/>
												<div>
													<p>Reunited with Original NFT wallet</p>
													<p className="title">
														by{' '}
														<a className="link" href={row.token_url}>
															0x217828160ff79e02c67A2785fd8dA2D2bD86c28E
														</a>
													</p>
													<p className="title">{dateString}</p>
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};
