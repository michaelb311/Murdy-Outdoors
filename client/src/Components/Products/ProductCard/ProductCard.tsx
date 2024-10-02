import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { HuntItemType } from '../../../Types/huntTypes';

const ProductCard: React.FC<HuntItemType> = ({
	title,
	description,
	price,
	imageUrl,
	rating,
	stockCount,
}) => {
	const location = useLocation();

	const linkPath = location.pathname.includes('Hunts')
		? `${title}`
		: `Hunts/${title}`;
	return (
		<Link to={linkPath}>
			<article className='productCard'>
				<h2 className='productCardTitle'>{title}</h2>
				<span className='productCardStock'>{stockCount}</span>
				<p className='productCardBody'>{description?.slice(0, 100) || ''}...</p>
				<div className='productReserveWrapper'>
					<p className='productCardReserve'>Reserve Now!!!!</p>
					<span className='productCardRating'>{rating}</span>
					<span className='productCardPrice'>${price}</span>
				</div>
				<img
					className='productCardImage'
					src={imageUrl}
					alt='product card image'
				/>
			</article>
		</Link>
	);
};
export default ProductCard;
