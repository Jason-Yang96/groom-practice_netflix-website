import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
	const [movie, setMovie] = useState([]); // 배너에 들어갈 랜덤 영화 리스트 정의
	const [isClicked, setIsClicked] = useState(false);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// 현재 상영 중인 영화 정보 가져오기(여러 영화)
		const request = await axios.get(requests.fetchComedyMovies);
		// 현재 상영 중인 영화 중 랜덤으로 한 영화의 id값 가져오기
		const movieId =
			request.data.results[
				Math.floor(Math.random() * request.data.results.length)
			].id;

		// 특정 영화 더 상세한 정보 가져오기(비디오 정보도 포함)
		const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
			// 구조 분해 할당
			params: { append_to_response: 'videos' },
		});
		setMovie(movieDetail);
		// console.log(movieDetail); // 왜 여기서 movie 로그 찍게 되면 useEffect 의존성 리스트를 넣으라고 하는걸까?
	};
	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	};

	if (!isClicked) {
		return (
			<header
				className='banner'
				style={{
					backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
					backgroundPosition: 'top center',
					backgroundSize: 'cover',
				}}>
				<div className='banner__contents'>
					<h1 className='banner__title'>
						{movie.title || movie.name || movie.original_title}
					</h1>

					<div className='banner__buttons'>
						<button
							className='banner__button play'
							onClick={() => setIsClicked(true)}>
							Play
						</button>
						<button className='banner__button info'>
							More Information
						</button>
					</div>

					<h1 className='banner__description'>
						{truncate(movie.overview, 100)}
					</h1>
				</div>
				<div className='banner--fadeBottom'></div>
			</header>
		);
	} else {
		return (
			<Container>
				<HomeContainer>
					<Iframe
						width='640'
						height='360'
						src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?autoplay=1&loop=1&playlist=${movie.videos.results[0].key}`}
						title='YouTube video player'
						frameborder='0'
						allow='autoplay; fullscreen'
						allowfullscreen></Iframe>
				</HomeContainer>
			</Container>
		);
	}
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`;

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 1;
	border: none;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export default Banner;
