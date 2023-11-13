import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';

const Banner = () => {
	const [movie, setMovie] = useState([]); // 배너에 들어갈 랜덤 영화 리스트 정의
	useEffect(() => {
		// 데이터 불러오기
		fetchData();
	}, []);

	const fetchData = async () => {
		// 현재 상영 중인 영화 정보 가져오기(여러 영화)
		const request = await axios.get(requests);
		console.log(request);
	};

	return <div>Banner</div>;
};

export default Banner;
