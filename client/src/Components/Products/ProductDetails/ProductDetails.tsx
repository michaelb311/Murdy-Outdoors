import './styles.css';
import { GlobalContext } from '../../../API/context';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../../BookingForm/BookingForm';
import { FaPersonRifle } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa6';
import { FaRegStarHalfStroke } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa6';

import { GiWinchesterRifle } from 'react-icons/gi';
import { GiSawedOffShotgun } from 'react-icons/gi';
import { GiBowString } from 'react-icons/gi';
import { GiCrossbow } from 'react-icons/gi';
import Reviews from '../../Reviews/Reviews';

const ProductDetails = () => {
	const { slug } = useParams();
	const { state } = useContext(GlobalContext);
	const [starRating, setStarRating] = useState<JSX.Element[]>([]);
	const hunt = state.hunts?.data.find((hunt) => hunt.title === slug);
	const {
		title,
		description,
		stockCount,
		rating,
		price,
		imageUrl,
		hunting_methods,
	} = hunt ?? {};

	const starFactory = (rating: number) => {
		const stars = [];
		if (rating === 0) {
			for (let i = 0; i < 5; i++) {
				stars.push(<FaRegStar key={i} />);
			}
			return stars;
		}

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

	useEffect(() => {
		setStarRating(starFactory(rating ?? 0));
	}, [rating]);

	return (
		<section className='productDetailsSection'>
			<div className='productDetailsImageContainer'>
				<img src={imageUrl} alt={title} />
				<h2 className='productDetailsTitle'>{title}</h2>
			</div>

			<div className='productSymbolsContainer'>
				<div className='productSymbol'>
					<FaPersonRifle
						style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
					/>
					{stockCount !== 0 ? (
						<div className='stockCount'>{`${stockCount} spots left`}</div>
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
								<GiWinchesterRifle
									style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
								/>
							) : method.method === 'Muzzleloader' ? (
								<GiSawedOffShotgun
									style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
								/>
							) : method.method === 'Bow' ? (
								<GiBowString
									style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
								/>
							) : method.method === 'Crossbow' ? (
								<GiCrossbow
									style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
								/>
							) : null}
						</span>
						<span>{method.method}</span>
					</div>
				))}
			</div>
			<div className='productDetialsContainer'>
				<div className='productDetailsContentContainer'>
					<h2 className='productDetailsHeading'>Hunt Details</h2>
					<p className='productDetailsBody'>{description}</p>
					<div className='reviewsContainer'>
						<Reviews />
					</div>
				</div>
				<div className='productDetailsBookingFormContainer'>
					<BookingForm hunt={hunt ?? {}} />
				</div>
			</div>
		</section>
	);
};
export default ProductDetails;
