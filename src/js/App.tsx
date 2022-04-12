import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
