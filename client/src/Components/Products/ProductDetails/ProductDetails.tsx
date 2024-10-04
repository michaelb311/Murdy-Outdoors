import './styles.css';
import { GlobalContext } from '../../../API/context';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../../BookingForm/BookingForm';
const ProductDetails = () => {
	const { slug } = useParams();
	const { state } = useContext(GlobalContext);
	const hunt = state.hunts?.data.find((hunt) => hunt.attributes.title === slug);
	const {
		title,
		description,
		stockCount,
		rating,
		price,
		imageUrl,
		huntingMethod,
	} = hunt?.attributes ?? {};
	return (
		<section className='productDetailsSection'>
			<div className='productDetailsImageContainer'>
				<img src={imageUrl} alt={title} />
			</div>
			<div className='productDetailsContentContainer'>
				<h2 className='productDetailsTitle'>{title}</h2>
				<p className='productDetailsBody'>{description}</p>
			</div>
			<div className='productDetailsBookingFormContainer'>
				<BookingForm hunt={hunt?.attributes ?? {}} />
			</div>
		</section>
	);
};
export default ProductDetails;
