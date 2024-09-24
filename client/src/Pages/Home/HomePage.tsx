import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';
import HomeHero from '../../Components/HomeHero/HomeHero';
import PhotoWall from '../../Components/PhotoWall/PhotoWall';
import Products from '../../Components/Products/ProductSection/ProductsSection';

const HomePage = () => {
	return (
		<>
			<HomeHero />
			<About />
			<Products />
			<Contact />
			<PhotoWall />
		</>
	);
};
export default HomePage;
