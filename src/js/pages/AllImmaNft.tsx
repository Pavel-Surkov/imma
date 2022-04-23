import React, { useState, useReducer } from 'react';
import { SortNft } from '../components/SortNft';
import { AllNftTable, AllNftMobile } from '../components/AllNftTable';
import { tableData, ITableData } from '../helpers/nftTableData';
import { Action } from '../helpers/creationReducer';

export type TableActionType =
	| Action<'SORT_SEARCH', {}>
	| Action<'SORT_SEARCH_CHANGE', { value: string }>;

type initialStateT = {
	searchValue: string;
	currentTableData: Array<ITableData>;
};

const initialState: initialStateT = {
	searchValue: '',
	currentTableData: tableData
};

function reducer(state: initialStateT, action: TableActionType) {
	switch (action.type) {
		case 'SORT_SEARCH_CHANGE': {
			console.log(state.searchValue);
			return {
				...state,
				searchValue: action.value
			};
		}
		case 'SORT_SEARCH': {
			console.log('search by ' + state.searchValue);

			return { ...state };
		}
		default: {
			throw new TypeError('Action type is uncorrect');
		}
	}
}

export const AllImmaNft: React.FC = () => {
	const [allTableVisible, setAllTableVisible] = useState<boolean>(false);

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<section className="nfts">
			<div className="nfts-wrapper">
				<div className="container">
					<h1 className="title title_size-m nfts__title">All IMMA NFT</h1>
					<SortNft value={state.searchValue} dispatch={dispatch} />
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
