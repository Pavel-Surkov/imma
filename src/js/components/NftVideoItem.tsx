import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface NftVideo {
	id: string;
	image: {
		quality1x: string;
		quality2x: string;
	};
	slug: string;
	sign: string;
	tag: string;
	date: Date;
}

// Array for converting number of month to string
export const monthConvertArr: Array<string> = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const NftVideoItem = ({ properties }: { properties: NftVideo }) => {
	const [convertedDate, setConvertedDate] = useState<null | string>(null);

	useEffect(() => {
		const date: Date = properties.date;

		let day: string = String(date.getDate());
		day = day.length === 1 ? `0${day}` : day;

		const month: string = monthConvertArr[date.getMonth()];
		const year: number = date.getFullYear();

		const fullDate = `${month} ${day}, ${year}`;

		setConvertedDate(fullDate);
	}, [properties]);

	return (
		<div className="video home-main__video">
			<img
				width="370"
				className="home-main__video-preview"
				src={properties.image.quality1x}
				srcSet={`${properties.image.quality1x} 1x, ${
					properties.image.quality2x ? properties.image.quality2x : ''
				} 2x`}
				alt=""
			></img>
			<div className="video-play__wrapper">
				<Link to={properties.slug} className="video-play">
					<svg
						data-svg="play"
						width="27"
						height="32"
						viewBox="0 0 27 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 16.0474V2.15586C0 0.584988 1.7279 -0.372697 3.06 0.459863L25.2864 14.3514C26.5397 15.1347 26.5397 16.96 25.2864 17.7434L3.06 31.6349C1.7279 32.4674 0 31.5097 0 29.9389V16.0474Z"
							fill="#D6FF7E"
						/>
					</svg>
				</Link>
			</div>
			<div className="video-bottom">
				<div className="video-bottom__sign">
					<img src={properties.sign} alt="sign"></img>
				</div>
				<div className="video-bottom__tag">
					<p>{properties.tag}</p>
					<time className="video-bottom__tag-date">{convertedDate}</time>
				</div>
			</div>
		</div>
	);
};
