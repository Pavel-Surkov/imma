import React from 'react';
import { Link } from 'react-router-dom';
import table_img from '../../assets/images/table_img.png';
import table_img2x from '../../assets/images/table_img@2x.png';

interface TableDataT {
	id: number;
	author: string;
	image: {
		quality1x: string;
		quality2x: string;
	};
	priceInDollars: number;
	serial: {
		type: string;
		hash: string;
	};
	set: string;
	series: number;
	buyer: string;
	seller: string;
	time: Date;
	tx: {
		link: string;
	};
}

const tableData: Array<TableDataT> = [
	{
		id: 1,
		author: 'Derrick Jones Jr.',
		image: {
			quality1x: table_img,
			quality2x: table_img2x
		},
		priceInDollars: 10,
		serial: {
			type: 'Common',
			hash: '#992/60000+'
		},
		set: 'Base',
		series: 3,
		buyer: '@DallasMavericks',
		seller: '@Clown_Baby2499',
		time: new Date(),
		tx: {
			link: '/'
		}
	},
	{
		id: 2,
		author: 'Derrick Jones Jr.',
		image: {
			quality1x: table_img,
			quality2x: table_img2x
		},
		priceInDollars: 14,
		serial: {
			type: 'Common',
			hash: '#992/60000+'
		},
		set: 'Base',
		series: 3,
		buyer: '@DallasMavericks',
		seller: '@Clown_Baby2499',
		time: new Date(),
		tx: {
			link: '/'
		}
	},
	{
		id: 3,
		author: 'Neskwick Johnson-Smith',
		image: {
			quality1x: table_img,
			quality2x: table_img2x
		},
		priceInDollars: 7,
		serial: {
			type: 'Common',
			hash: '#992/60000+'
		},
		set: 'Base',
		series: 3,
		buyer: '@DallasMavericks',
		seller: '@Clown_Baby2499',
		time: new Date(),
		tx: {
			link: '/'
		}
	},
	{
		id: 4,
		author: 'Derrick Jones Jr.',
		image: {
			quality1x: table_img,
			quality2x: table_img2x
		},
		priceInDollars: 14,
		serial: {
			type: 'Common',
			hash: '#992/60000+'
		},
		set: 'Base',
		series: 3,
		buyer: '@DallasMavericks',
		seller: '@Clown_Baby2499',
		time: new Date(new Date().getTime() - 1000000),
		tx: {
			link: '/'
		}
	},
	{
		id: 5,
		author: 'Derrick Jones Jr.',
		image: {
			quality1x: table_img,
			quality2x: table_img2x
		},
		priceInDollars: 7,
		serial: {
			type: 'Common',
			hash: '#992/60000+'
		},
		set: 'Base',
		series: 3,
		buyer: '@DallasMavericks',
		seller: '@Clown_Baby2499',
		time: new Date(new Date().getTime() - 100000),
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

const tableColumnsNames: Array<string> = [
	'',
	'Moment',
	'Price',
	'Serial',
	'Set',
	'Series',
	'Buyer',
	'Seller',
	'Date/Time',
	'TX'
];

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
								const dateOutput: string = dateConvert(row.time);

								return (
									<tr className="table-row" key={row.id}>
										<td className="table-col">
											<img
												width="70"
												height="70"
												src={row.image.quality1x}
												srcSet={`${row.image.quality1x} 1x, ${row.image.quality2x} 2x`}
												alt=""
											></img>
										</td>
										<td className="table-col">{row.author}</td>
										<td className="table-col">{`$${row.priceInDollars}`}</td>
										<td className="table-col">
											<p>{row.serial.type}</p>
											<p>{row.serial.hash}</p>
										</td>
										<td className="table-col">{row.set} set</td>
										<td className="table-col">{row.series}</td>
										<td className="table-col">{row.buyer}</td>
										<td className="table-col">{row.seller}</td>
										<td className="table-col">
											<span>{dateOutput}</span>
										</td>
										<td className="table-col">
											<a href={row.tx.link}>
												<svg
													width="17"
													height="18"
													viewBox="0 0 17 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M6.5 2.54736H1V16.5474H15V11.5474"
														stroke="white"
													/>
													<path
														d="M9.5 7.54736L16.5 0.547363M16.5 0.547363V7.54736M16.5 0.547363H9.5"
														stroke="white"
													/>
												</svg>
											</a>
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
