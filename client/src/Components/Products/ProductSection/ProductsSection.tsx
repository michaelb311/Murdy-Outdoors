import './styles.css';
import ProductCard from '../ProductCard/ProductCard';

// This will take in all the products that are avaible in state and display them in a list
const Products = () => {
	return (
		<section className='productsSection'>
			<h1 className='productsSectionTitle'>Hunts</h1>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</section>
	);
};
export default Products;
