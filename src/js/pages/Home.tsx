import React from 'react';
import { HomeMain } from '../components/HomeMain';
import { Welcome } from '../components/Welcome';
import { About } from '../components/About';

export const Home: React.FC = () => {
	return (
		<main className="main home">
			<HomeMain />
			<Welcome />
			<About />
		</main>
	);
};
