import React from 'react';

export const SortNft: React.FC = () => {
	return (
		<div className="nfts-sort">
			<div className="nfts-sort__search-block">
				<div className="nfts-sort__search">
					<input className="input" type="text" name="search" placeholder="Search..." />
					<button type="button" className="nfts-sort__search-btn">
						<svg
							width="17"
							height="19"
							viewBox="0 0 17 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="7.04395" cy="7.40453" r="6.40723" stroke="white" />
							<path d="M11 12.5654L16.3405 17.9059" stroke="white" />
						</svg>
					</button>
				</div>
				<p className="nfts-sort__search-note">
					The search is carried out by IMMA NFT token address, by original NFT token
					address or by creator name.
				</p>
			</div>
			<div className="nfts-sort__sort">
				Sort by:
				<div className="nfts-sort__select-wrapper">
					<select name="" className="nfts-sort__select" defaultValue="adress">
						<option value="address">IMMA NFT token address</option>
						<option value="">IMMA NFT token</option>
						<option value="">IMMA NFT </option>
						<option value="">IMMA </option>
					</select>
				</div>
			</div>
		</div>
	);
};
