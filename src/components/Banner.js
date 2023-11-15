import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
	const [movie, setMovie] = useState([]); // 배너에 들어갈 랜덤 영화 리스트 정의
	const [isClicked, setIsClicked] = useState(false); //
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		//코미디 영화 정보 가져오기(여러 영화)
		const request = await axios.get(requests.fetchComedyMovies); //만약에 await 없으면 pending 상태를 할당하게 된다.
		//코미디 영화 중 랜덤으로 한 영화의 id값 가져오기
		// console.log(request);
		const movieId =
			request.data.results[
				Math.floor(Math.random() * request.data.results.length) //random 매서드의 경우 0~1 무작위 수를 반환한다
			].id;

		// 특정 영화 더 상세한 정보 가져오기(비디오 정보도 포함)
		const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
			// 구조 분해 할당
			params: { append_to_response: 'videos' }, // get method URL parameter
		});
		setMovie(movieDetail);
		// console.log(movieDetail); // 왜 여기서 movie 로그 찍게 되면 useEffect 의존성 리스트를 넣으라고 하는걸까?
	};
	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str; //str을 받고 싶지만, str이 아닐 경우는?
	};

	if (!isClicked) {
		return (
			<header
				className='banner'
				style={{
					// 이 부분에서  inline으로 작성한 이유: 변경된 값에 따라 다이나믹하게 배너를 띄우기 위해서
					backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
					backgroundPosition: 'top center',
					backgroundSize: 'cover',
				}}>
				<div className='banner__contents'>
					<h1 className='banner__title'>
						{movie.title || movie.original_title}
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
						{truncate(movie.overview, 100)}{' '}
						{/* overview가 없을 수도 있다. 하지만 null 값이 아니라 빈 str이다 */}
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
						width='640' //비디오 가로 세로 비율
						height='360'
						src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?autoplay=1&loop=1&playlist=${movie.videos.results[0].key}`}
						title='YouTube video player'
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

	${
		'' /* &::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%; */
	}
	}
`;

export default Banner;
