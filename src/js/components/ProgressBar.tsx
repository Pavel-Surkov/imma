import React from 'react';

export const ProgressBar = () => {
	return (
		<div className="progress-bar">
			<div className="progress-bar__back-bar">
				<div className="progress-bar__bar"></div>
			</div>
			<ol className="progress-bar__steps">
				{Array(7)
					.fill(null)
					.map((item, idx) => (
						<li className="progress-bar__step" key={idx}>
							0{idx}
						</li>
					))}
			</ol>
		</div>
	);
};
