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
		state: 'completed'
	},
	{
		id: 2,
		state: 'completed'
	},
	{
		id: 3,
		state: 'current'
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

	// (Will be in Creation component, I think)
	const [progress, setProgress] = useState(30); // 0% - 100%

	return (
		<div className={`progress-bar ${visible ? 'progress-bar_visible' : null}`}>
			<div className="progress-bar__wrapper">
				<div className="progress-bar__back-bar">
					<div className="progress-bar__bar" style={{ height: `${progress}%` }}></div>
				</div>
				<ol className="progress-bar__steps">
					{progressItems.map((item) => (
						<li className="progress-bar__step" key={item.id}>
							{/* {idx < 9 ? `0${idx + 1}` : `${idx + 1}`} */}
							{item.state === 'current' && (
								<div className="progress-bar__step_current">
									<svg
										width="28"
										height="28"
										viewBox="0 0 28 28"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M27.6879 13.7727C27.6879 21.271 21.6093 27.3495 14.111 27.3495C6.61275 27.3495 0.53418 21.271 0.53418 13.7727C0.53418 6.27437 6.61275 0.195801 14.111 0.195801C21.6093 0.195801 27.6879 6.27437 27.6879 13.7727Z"
											fill="white"
											fill-opacity="0.2"
										/>
										<path
											d="M16.6504 13.7727C16.6504 15.1534 15.5311 16.2727 14.1504 16.2727C12.7697 16.2727 11.6504 15.1534 11.6504 13.7727C11.6504 12.392 12.7697 11.2727 14.1504 11.2727C15.5311 11.2727 16.6504 12.392 16.6504 13.7727Z"
											fill="white"
										/>
									</svg>
								</div>
							)}
							{item.state === 'staging' && (
								<div className="progress-bar__step_staging">
									<svg
										width="6"
										height="6"
										viewBox="0 0 6 6"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5.65039 2.67285C5.65039 4.05356 4.5311 5.17285 3.15039 5.17285C1.76968 5.17285 0.650391 4.05356 0.650391 2.67285C0.650391 1.29214 1.76968 0.172852 3.15039 0.172852C4.5311 0.172852 5.65039 1.29214 5.65039 2.67285Z"
											fill="white"
										/>
									</svg>
								</div>
							)}
							{item.state === 'completed' && (
								<div className="progress-bar__step_completed">
									<svg
										width="31"
										height="31"
										viewBox="0 0 31 31"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g filter="url(#filter0_b_757_958)">
											<path
												d="M30.1504 15.7727C30.1504 24.057 23.4347 30.7727 15.1504 30.7727C6.86612 30.7727 0.150391 24.057 0.150391 15.7727C0.150391 7.48843 6.86612 0.772705 15.1504 0.772705C23.4347 0.772705 30.1504 7.48843 30.1504 15.7727Z"
												fill="white"
												fill-opacity="0.2"
											/>
										</g>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M20.9248 13.1989L13.6553 20.4683L9.375 16.1883L10.7892 14.774L13.6553 17.6399L19.5106 11.7847L20.9248 13.1989Z"
											fill="#D6FF7E"
										/>
										<defs>
											<filter
												id="filter0_b_757_958"
												x="-3.84961"
												y="-3.22729"
												width="38"
												height="38"
												filterUnits="userSpaceOnUse"
												color-interpolation-filters="sRGB"
											>
												<feFlood
													flood-opacity="0"
													result="BackgroundImageFix"
												/>
												<feGaussianBlur
													in="BackgroundImage"
													stdDeviation="2"
												/>
												<feComposite
													in2="SourceAlpha"
													operator="in"
													result="effect1_backgroundBlur_757_958"
												/>
												<feBlend
													mode="normal"
													in="SourceGraphic"
													in2="effect1_backgroundBlur_757_958"
													result="shape"
												/>
											</filter>
										</defs>
									</svg>
								</div>
							)}
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};
