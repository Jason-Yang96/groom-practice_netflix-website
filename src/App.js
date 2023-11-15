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
						element={<MainPage />} // 처음 페이지가 된다.
					/>
					<Route
						path=':movieId'
						element={<DetailPage />} //콜론이 사용되는 경우 dynamic한 요소가 된다.
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
