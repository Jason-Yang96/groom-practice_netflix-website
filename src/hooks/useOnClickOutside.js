import React, { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			console.log('ref', ref);
			if (!ref.current || ref.current.contains(event.target)) return;
			handler();
		};
		document.addEventListener('mousedown', listener); //click 이벤트로 바꾸게 되면 모달 창이 열리지 않음
		return () => {
			document.addEventListener('mousedown', listener); //unmount 될때 등록을 취소해준다
		};
	}, [ref, handler]);

	return <div>useOnClickOutside</div>;
};

export default useOnClickOutside;
