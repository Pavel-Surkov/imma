import React from 'react';
import { SortNft } from '../components/SortNft';
import { AllNftTable } from '../components/AllNftTable';
import { tableData, dateConvert, convertDateToString } from '../helpers/nftTableData';

export const AllImmaNft: React.FC = () => {
	return (
		<section className="nfts">
			<div className="nfts-wrapper">
				<div className="container">
					<h1 className="title title_size-m nfts__title">All IMMA NFT</h1>
					<SortNft />
					<AllNftTable
						tableData={tableData}
						dateConvert={dateConvert}
						convertDateToString={convertDateToString}
					/>
					<div className="view-more">
						<button type="button" className="view-more__btn">
							View more
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
