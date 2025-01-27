import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';

const starFactory = (rating: number) => {
	const stars = [];

	for (let i = 0; i < 5; i++) {
		if (i < rating) {
			stars.push(<FaStar key={i} />);
		} else if (i === rating) {
			stars.push(<FaRegStarHalfStroke key={i} />);
		} else {
			stars.push(<FaRegStar key={i} />);
		}
	}
	return stars;
};

export default starFactory;
