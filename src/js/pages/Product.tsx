import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Product: React.FC = () => {
	const path = useLocation();

	const [location, setLocation] = useState<null | string>(null);

	useEffect(() => {
		if (path) {
			const pathName: string = path.pathname;

			const reversedPath: string[] = pathName.split('/').reverse();

			const location: string = reversedPath[0] === '' ? reversedPath[1] : reversedPath[0];

			console.log(location);

			setLocation(location);
		}
	}, [path]);

	return (
		<main className="main product">
			<section className="product-page">
				<div className="product-page__wrapper">
					<div className="product-page__video"></div>
					<div className="product-page__info">
						<h2 className="title title_size-m product-page__title"></h2>
					</div>
				</div>
			</section>
		</main>
	);
};
