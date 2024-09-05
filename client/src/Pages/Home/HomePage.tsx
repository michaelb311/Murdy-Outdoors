import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';
import HomeHero from '../../Components/HomeHero/HomeHero';
import MainNav from '../../Components/Navigation/MainNav/MainNav';
import PhotoWall from '../../Components/PhotoWall/PhotoWall';
import Products from '../../Components/Products/Products';

const HomePage = () => {
	return (
		<>
			<MainNav />
			<HomeHero />
			<About />
			<Products />
			<Contact />
			<PhotoWall />
		</>
	);
};
export default HomePage;
