import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState([]);
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};
	const searchTerm = useQuery().get('q');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	// console.log(query);
	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchSearchMovie(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]);

	const fetchSearchMovie = async (debouncedSearchTerm) => {
		try {
			const request = await axios.get(
				`/search/multi?include_adult=false&query=${debouncedSearchTerm}`
			);
			console.log('request', request);
			setSearchResults(request.data.results);
		} catch (error) {
			console.log('error', error);
		}
	};

	// console.log('useLocation', useLocation());

	const renderSearchResults = () => {
		return searchResults.length > 0 ? (
			<section className='search-container'>
				{searchResults.map((movie) => {
					if (
						movie.backdrop_path !== null &&
						movie.media_type !== 'person'
					) {
						const movieImageUrl =
							'https://image.tmdb.org/t/p/w500' +
							movie.backdrop_path;
						return (
							<div
								className='movie'
								key={movie.id}>
								<div
									onClick={() => navigate(`/${movie.id}`)}
									className='movie__column-poster'>
									<img
										src={movieImageUrl}
										alt='movie'
										className='movie__poster'
									/>
								</div>
							</div>
						);
					}
				})}
			</section>
		) : (
			<section className='no-results'>
				<div className='no-results__text'>
					<p>
						Your search for "{debouncedSearchTerm}" did not have any
						matches.
					</p>
					<p>Suggestions:</p>
					<ul>
						<li>Try different keywords</li>
					</ul>
				</div>
			</section>
		);
	};

	return renderSearchResults();
}
