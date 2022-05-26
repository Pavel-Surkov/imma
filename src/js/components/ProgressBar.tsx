import React, { useState } from 'react';

export const ProgressBar = () => {
	const [visible, setVisible] = useState(true);

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
								{idx < 9 ? `0${idx + 1}` : `${idx + 1}`}
							</li>
						))}
				</ol>
			</div>
		</div>
	);
};
