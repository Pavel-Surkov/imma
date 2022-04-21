import React, { useState } from 'react';
import { SortNft } from '../components/SortNft';
import { AllNftTable, AllNftMobile } from '../components/AllNftTable';
import { tableData, dateConvert, convertDateToString } from '../helpers/nftTableData';

export const AllImmaNft: React.FC = () => {
	const [allTableVisible, setAllTableVisible] = useState<boolean>(false);

	return (
		<section className="nfts">
			<div className="nfts-wrapper">
				<div className="container">
					<h1 className="title title_size-m nfts__title">All IMMA NFT</h1>
					<SortNft />
					<AllNftTable tableData={tableData} allTableVisible={allTableVisible} />
					<AllNftMobile tableData={tableData} allTableVisible={allTableVisible} />
					<div className="view-more">
						<button
							type="button"
							className="view-more__btn"
							onClick={() => setAllTableVisible(true)}
							style={
								allTableVisible ? { display: 'none' } : { display: 'inline-block' }
							}
						>
							View more
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
