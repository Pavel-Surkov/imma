import React from 'react';
import table_img from '../../assets/images/table_img.png';
import table_img2x from '../../assets/images/table_img@2x.png';

interface TableDataT {
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
	}
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
								<th className="table-col"></th>
								<th className="table-col">Moment</th>
								<th className="table-col">Price</th>
								<th className="table-col">Serial</th>
								<th className="table-col">Set</th>
								<th className="table-col">Series</th>
								<th className="table-col">Buyer</th>
								<th className="table-col">Seller</th>
								<th className="table-col">Date/Time</th>
								<th className="table-col">TX</th>
							</tr>
						</thead>
						<tbody className="table-body">
							<tr className="table-row"></tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};
