import './styles.css';
import { GlobalContext } from '../../../API/context';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPersonRifle } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa6';
import starFactory from '../../../helpers/starfactory';
import { GiWinchesterRifle } from 'react-icons/gi';
import { GiSawedOffShotgun } from 'react-icons/gi';
import { GiBowString } from 'react-icons/gi';
import { GiCrossbow } from 'react-icons/gi';
// import Reviews from '../../Reviews/Reviews';
import ReactMarkdown from 'react-markdown';
import useModal from '../../../Hooks/useModal';
import BookingForm from '../../Booking/BookingForm/BookingForm';

const ProductDetails = () => {
	const { openModal, ModalComponent } = useModal();
	const { slug } = useParams();
	const { state } = useContext(GlobalContext);
	const [starRating, setStarRating] = useState<JSX.Element[]>([]);
	const hunt = state.hunts?.data.find((hunt) => hunt.title === slug);

	useEffect(() => {
		if (hunt) {
			setStarRating(starFactory(hunt.rating ?? 0));
		}
	}, [hunt]);

	if (!hunt) {
		return (
			<>
				<div>Hunt not found</div>
				<Link to='/Hunts'>Back to hunts</Link>
			</>
		);
	}
	const {
		title,
		description,
		stockCount,
		rating,
		price,
		imageUrl,
		hunting_methods,
	} = hunt;

	return (
		<section className='productDetailsSection'>
			<div className='productDetailsImageContainer'>
				<img src={imageUrl} alt={title} />
				<h2 className='productDetailsTitle'>{title}</h2>
			</div>

			<div className='productSymbolsContainer'>
				<div className='productSymbol'>
					<FaPersonRifle style={{ marginRight: '0.5rem' }} />
					{stockCount !== 0 ? (
						<span className='stockCount'>{`${stockCount} spot${
							stockCount > 1 ? 's' : ''
						} left`}</span>
					) : (
						<div className='stockCount'>Out of Stock</div>
					)}
				</div>
				<div className='productSymbol'>
					<div className='rating'>
						<span>{starRating}</span>
						<span>{rating}</span>
					</div>
				</div>
				<div className='productSymbol'>
					<div className='price'>
						<span>
							<FaDollarSign />
						</span>
						<span>{price}</span>
					</div>
				</div>
				{hunting_methods?.map((method, index) => (
					<div className='productSymbol huntingMethod' key={index}>
						<span>
							{method.method === 'Rifle' ? (
								<GiWinchesterRifle style={{ marginRight: '0.5rem' }} />
							) : method.method === 'Muzzleloader' ? (
								<GiSawedOffShotgun style={{ marginRight: '0.5rem' }} />
							) : method.method === 'Bow' ? (
								<GiBowString style={{ marginRight: '0.5rem' }} />
							) : method.method === 'Crossbow' ? (
								<GiCrossbow style={{ marginRight: '0.5rem' }} />
							) : null}
						</span>
						<span>{method.method}</span>
					</div>
				))}
			</div>
			<div className='productDetialsContainer'>
				<div className='productDetailsContentContainer'>
					<h2 className='productDetailsHeading'>Hunt Details</h2>
					<ReactMarkdown className='productDetailsBody'>
						{description}
					</ReactMarkdown>
				</div>
				<div className='bookingButtonContainer'>
					<button
						onClick={() => openModal(<BookingForm hunt={hunt} />)}
						className='bookingButton'
						onMouseOver={(e) => {
							e.currentTarget.textContent = 'Pull the Trigger';
						}}
						onMouseOut={(e) => {
							e.currentTarget.textContent = 'Book Now';
						}}
					>
						Book Now
					</button>
					{ModalComponent}
				</div>
			</div>
			{/* <div className='reviewsContainer'>
				<Reviews />
			</div> */}
		</section>
	);
};
export default ProductDetails;
