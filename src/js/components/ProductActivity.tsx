import React from 'react';
import { ITableData } from '../helpers/nftTableData';

export const ProductActivity = ({ video }: { video: ITableData }) => {
	return (
		<div className="product-block product-page__activity">
			<h4 className="title product-block__title">Activity:</h4>
			<div className="activity">
				<ul className="activity-list">
					<li className="activity-item"></li>
				</ul>
			</div>
		</div>
	);
};
