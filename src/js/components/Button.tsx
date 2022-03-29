import React from 'react';
import { Link } from 'react-router-dom';

type BtnProps = {
	className: string;
	text: string;
	action?: () => void;
	link?: {
		ref: string;
	};
};

const Button: React.FC<BtnProps> = ({ className, text, action, link }) => {
	if (link) {
		return (
			<Link className={className} to={link.ref}>
				{text}
			</Link>
		);
	}

	return (
		<button className={className} onClick={action}>
			{text}
		</button>
	);
};

export default Button;
