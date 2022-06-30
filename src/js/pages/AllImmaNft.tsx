import React, { useState, useReducer, useEffect } from 'react';
import { SortNft } from '../components/SortNft';
import { AllNftTable, AllNftMobile } from '../components/AllNftTable';
import { tableData, ITableData } from '../helpers/nftTableData';
import { Action } from '../helpers/creationReducer';
import { BASE_URL, BLOCKCHAIN, NETWORK_NAME } from '../api/Api';
import axios from 'axios';

export type TableActionType =
	| Action<'SET_DATA', { value: null | any }>
	| Action<'SET_INIT_DATA', { value: null | any }>
	| Action<'SORT_SEARCH', {}>
	| Action<'SORT_PARAMETER_CHANGE', { value: string }>
	| Action<'SORT_SEARCH_CHANGE', { value: string }>;

export type AllNftStateT = {
	searchValue: string;
	sortValue: string;
	currentTableData: Array<ITableData>;
	initTableData: Array<ITableData>;
};

type SearchByValues = [string, string/*, string*/];

const initialState: AllNftStateT = {
	searchValue: '',
	sortValue: 'address',
	initTableData: null,
	currentTableData: null
};

// !"Sort by" filters state.currentTableData; Search filters initialState.currentTableData
function reducer(state: AllNftStateT, action: TableActionType) {
	switch (action.type) {
		case 'SET_DATA': {
			return {
				...state,
				currentTableData: action.value
			};
		}
		case 'SET_INIT_DATA': {
			return {
				...state,
				initTableData: action.value
			};
		}
		case 'SORT_SEARCH_CHANGE': {
			return {
				...state,
				searchValue: action.value
			};
		}
		case 'SORT_SEARCH': {
			const value: string = state.searchValue.toLowerCase();
			const nftData: Array<any> = state.initTableData;

			const sortedNftData: Array<any> = nftData.filter((row) => {
				const [author, originalAddress/*, immaAddress*/]: SearchByValues = [
					row.inft.metadata.name.toLowerCase(),
					row.nfta.token_address.toLowerCase()
					//row.hash.toLowerCase()
				];

				// If none of parameters has substring (value), removes an nft from table
				return (
					author.includes(value) ||
					originalAddress.includes(value)// ||
					//immaAddress.includes(value)
				);
			});

			return {
				...state,
				currentTableData: sortedNftData
			};
		}
		case 'SORT_PARAMETER_CHANGE': {
			const value: string = action.value;
			const nftData: Array<ITableData> = state.currentTableData;

			if (nftData) {
				const sortedNftData: Array<ITableData> = nftData.sort((a, b) => {
					const prevValue: any = a[`${value}`];
					const nextValue: any = b[`${value}`];

					return prevValue >= nextValue ? 1 : -1;
				});

				return {
					...state,
					sortValue: value,
					currentTableData: sortedNftData
				};
			} else {
				return;
			}
		}
		default: {
			throw new TypeError('Action type is uncorrect');
		}
	}
}

export const AllImmaNft = () => {
	const [allTableVisible, setAllTableVisible] = useState<boolean>(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const config = {
			method: 'get',
			url: `${BASE_URL}/api/${BLOCKCHAIN}/${NETWORK_NAME}/getLiveFeed`
		};

		axios(config)
			.then((response) => {
				dispatch({ type: 'SET_DATA', value: response.data.results })
				dispatch({ type: 'SET_INIT_DATA', value: response.data.results })
				console.log('lifefeed data');
				console.log(response.data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Initial sorting
	useEffect(() => dispatch({ type: 'SORT_PARAMETER_CHANGE', value: state.sortValue }), []);

	return (
		<section className="nfts">
			<div className="bg-lights"></div>
			<div className="nfts-wrapper">
				<div className="container">
					<h1 className="title title_size-m nfts__title">All IMMA NFT</h1>
					{(state && state.currentTableData) ? (
					<>
					<SortNft state={state} dispatch={dispatch} />
					<AllNftTable
						tableData={state.currentTableData}
						allTableVisible={allTableVisible}
					/>
					<AllNftMobile
						tableData={state.currentTableData}
						allTableVisible={allTableVisible}
					/>
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
					</>
					) : ''}
				</div>
			</div>
		</section>
	);
};
