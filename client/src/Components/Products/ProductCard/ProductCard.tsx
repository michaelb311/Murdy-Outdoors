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

	const fit: ObjectFitType[] = ['cover', 'none', 'cover'];

	const position: string[] = ['50% 10%', '10% 22%', '50% 10%'];

	const mobileFit: ObjectFitType[] = ['cover', 'none', 'cover'];
	const mobilePosition: string[] = ['50% 10%', '40% 30%', '40% 30%'];

	const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Link to={linkPath}>
			<article className='productCard'>
				<h2 className='productCardTitle'>{title}</h2>
				<p className='productCardBody'>{description?.slice(0, 100) || ''}...</p>
				<div className='productCardSymbolsContainer'>
					<div className='productCardSymbol'>
						<div className='cardHuntingMethod'>
							<span>
								<FaPersonRifle />
							</span>
							{stockCount !== 0 ? (
								<span className='cardStockCount'>{`${stockCount} spot${
									stockCount > 1 ? 's' : ''
								} left`}</span>
							) : (
								<span className='cardStockCount'>Out of Stock</span>
							)}
						</div>
					</div>
					<div className='productCardSymbol'>
						<div className='cardRating'>
							<span>{starRating}</span>
							<span>{rating}</span>
						</div>
					</div>
					<div className='productCardSymbol'>
						<div className='cardPriceContainer'>
							<span>
								<FaDollarSign />
							</span>
							<span>{price}</span>
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
