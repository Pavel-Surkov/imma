import React from 'react';
import { HomeMain } from '../components/HomeMain';
import { Welcome } from '../components/Welcome';
import { About } from '../components/About';
import { Creation } from '../components/Creation';

export const Home: React.FC = () => {
	return (
		<main className="main home">
			<HomeMain />
			<Welcome />
			<About />
			<Creation />
		</main>
	);
};
