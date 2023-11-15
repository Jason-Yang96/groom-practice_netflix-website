import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage() {
	const [movie, setMovie] = useState([]);
	const { movieId } = useParams();
	console.log(movieId);
	console.log(useParams());

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(`/movie/${movieId}`);
			setMovie(request.data);
		}
		fetchData();
	}, [movieId]);

	if (!movie) return <div>...loading</div>;

	return (
		<section>
			<img
				className='modal__poster-img' // 이게 어떻게 가능한거지? 불러오지도 않았는데 말이야
				src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
				alt='movie-img'
			/>
		</section>
	);
}
