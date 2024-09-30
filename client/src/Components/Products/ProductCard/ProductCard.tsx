import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import WaterFowl from '../../../assets/water-fowl.jpg';

// State will be injected by parent

const ProductCard = () => {
	const location = useLocation();

	const linkPath = location.pathname.includes('Hunts')
		? 'water-foal'
		: 'Hunts/water-foal';
	return (
		<Link to={linkPath}>
			<article className='productCard'>
				<h2 className='productCardTitle'>Water Fowl</h2>
				<p className='productCardBody'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
					repellendus suscipit reprehenderit laborum. Dolores libero saepe
					quidem, perspiciatis vitae amet facere aut rerum! Quam enim ut veniam
					quo eius autem culpa quos illo dignissimos impedit mollitia id sequi
					deserunt reprehenderit eligendi at ipsa pariatur quae quas, recusandae
					delectus voluptatum voluptatem....
				</p>
				<p className='productCardBody'>Reserve Now!!!!</p>
				<img
					className='productCardImage'
					src={WaterFowl}
					alt='product card image'
				/>
			</article>
		</Link>
	);
};
export default ProductCard;
