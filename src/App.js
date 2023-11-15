import './App.css';
import Nav from './components/Nav';
import React from 'react';
import Footer from './components/Footer';
import { Outlet, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
	return (
		<>
			<Nav />
			<Outlet />
			<Footer />
		</>
	);
};

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<Layout />}>
					<Route
						index
						element={<MainPage />}
					/>
					<Route
						path=':movieId'
						element={<DetailPage />}
					/>
					<Route
						path='search'
						element={<SearchPage />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
