import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { ObjectFitType, ProductCardProps } from '../../../Types/uiTypes';
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { FaPersonRifle } from 'react-icons/fa6';
import starFactory from '../../../helpers/starfactory';

const ProductCard: React.FC<ProductCardProps> = ({ hunt, index }) => {
	const location = useLocation();
	const { title, stockCount, description, rating, price, imageUrl } = hunt;
	const linkPath = location.pathname.includes('Hunts')
		? `${title}`
		: `Hunts/${title}`;
	const starRating = starFactory(rating);

	const fit: ObjectFitType[] = ['cover', 'cover', 'none'];

	const position: string[] = ['50% 10%', '50% 50%', '10% 22%'];

	const mobileFit: ObjectFitType[] = ['cover', 'cover', 'cover'];
	const mobilePosition: string[] = ['75% 10%', '50% 50%', '40% 10%'];

	const isMobile = window.innerWidth < 768;

	return (
		<Link style={{ width: '100%' }} to={linkPath}>
			<article className='productCard'>
				<h2 className='productCardTitle'>{title}</h2>
				<p className='productCardBody'>{description?.slice(0, 100) || ''}...</p>
				<div className='productReserveWrapper'>
					<div className='productSymbolsContainer'>
						<div className='productSymbol'>
							<FaPersonRifle
								style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
							/>
							{stockCount !== 0 ? (
								<div className='stockCount'>{`${stockCount} spot${
									stockCount > 1 ? 's' : ''
								} left`}</div>
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
					</div>
				</div>
				<img
					className='productCardImage'
					src={imageUrl}
					alt='product card image'
					style={{
						objectFit: isMobile ? mobileFit[index] : fit[index],
						objectPosition: isMobile ? mobilePosition[index] : position[index],
					}}
				/>
			</article>
		</Link>
	);
};
export default ProductCard;
