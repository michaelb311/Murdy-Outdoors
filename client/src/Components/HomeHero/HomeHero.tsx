import './styles.css';
import CenterVid from '../../assets/home-hero/Hero-Center-Vid - small.mp4';
import item1 from '../../assets/home-hero/water-fowl-1.jpg';
import item3 from '../../assets/home-hero/water-fowl-10.jpg';
import item4 from '../../assets/home-hero/water-fowl.jpg';
import item5 from '../../assets/home-hero/wite-tail-2.jpg';

const HomeHero = () => {
	return (
		<section className='container'>
			<div className='item item1'>
				<img src={item1} alt='waterfowl' />
			</div>
			<div className='item item2'>
				<video src={CenterVid} autoPlay loop muted />
			</div>
			<div className='item item3'>
				<img src={item3} alt='waterfowl' />
			</div>
			<div className='item item4'>
				<img src={item4} alt='waterfowl' />
			</div>
			<div className='item item5'>
				<img src={item5} alt='white tail dear' />
			</div>
		</section>
	);
};
export default HomeHero;
