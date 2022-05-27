import React, { useState, useEffect } from 'react';
import { State } from '../helpers/creationReducer';

type ProgressItem = 'current' | 'completed' | 'staging';

type ProgressItemT = {
	id: number;
	state: ProgressItem;
};

const initialProgressBar: ProgressItemT[] = [
	{
		id: 1,
		state: 'current'
	},
	{
		id: 2,
		state: 'staging'
	},
	{
		id: 3,
		state: 'staging'
	},
	{
		id: 4,
		state: 'staging'
	},
	{
		id: 5,
		state: 'staging'
	},
	{
		id: 6,
		state: 'staging'
	},
	{
		id: 7,
		state: 'staging'
	}
];

export const ProgressBar = ({ state }: { state: State }) => {
	const [visible, setVisible] = useState(true);
	const [progressItems, setProgressItems] = useState<ProgressItemT[]>(initialProgressBar);

	useEffect(() => {}, [state]);

	// (Will be in Creation component I think)
	const [progress, setProgress] = useState(30); // 0% - 100%

	return (
		<div className={`progress-bar ${visible ? 'progress-bar_visible' : null}`}>
			<div className="progress-bar__wrapper">
				<div className="progress-bar__back-bar">
					<div className="progress-bar__bar" style={{ height: `${progress}%` }}></div>
				</div>
				<ol className="progress-bar__steps">
					{Array(7)
						.fill(null)
						.map((item, idx) => (
							<li className="progress-bar__step" key={idx + 1}>
								{/* {idx < 9 ? `0${idx + 1}` : `${idx + 1}`} */}
								{item === null}
							</li>
						))}
				</ol>
			</div>
		</div>
	);
};
