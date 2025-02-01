import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';
import HomeHero from '../../Components/HomeHero/HomeHero';
import PhotoWall from '../../Components/PhotoWall/PhotoWall';
import Products from '../../Components/Products/ProductSection/ProductsSection';
import './styles.css';

const HomePage = () => {
	return (
		<section className='homePage'>
			<HomeHero />
			<About />
			<Products />
			<Contact />
			<PhotoWall />
		</section>
	);
};
export default HomePage;
