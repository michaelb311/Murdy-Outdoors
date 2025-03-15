import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './styles.css';
import { ObjectFitType, ProductCardProps } from '../../../Types/uiTypes';
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { FaPersonRifle } from 'react-icons/fa6';
import starFactory from '../../../helpers/starfactory';

const ProductCard: React.FC<ProductCardProps> = ({ hunt }) => {
	const location = useLocation();
	const { title, stockCount, description, rating, price, imageUrl } = hunt;
	const linkPath = location.pathname.includes('Hunts')
		? `${title}`
		: `Hunts/${title}`;
	const starRating = starFactory(rating);
	const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
	let fit: ObjectFitType;
	let position: string;

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	switch (hunt.title) {
		case 'Whitetail Doe': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 10%';
			}
			break;
		}
		case 'Whitetail Buck': {
			if (isMobile) {
				fit = 'none';
				position = '40% 35%';
			} else {
				fit = 'none';
				position = '20% 22%';
			}
			break;
		}
		case 'Waterfowl': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 50%';
			}
			break;
		}
		case 'Spring Turkey': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 10%';
			}
			break;
		}
		default: {
			fit = 'cover';
			position = '50% 10%';
			break;
		}
	}

	return (
		<Link to={linkPath}>
			<article className='productCard'>
				<h2 className='productCardTitle'>{title}</h2>
				<ReactMarkdown className='productCardBody'>{`${
					description?.slice(0, 100) || ''
				}...`}</ReactMarkdown>
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
						objectFit: fit,
						objectPosition: position,
					}}
				/>
			</article>
		</Link>
	);
};
export default ProductCard;
