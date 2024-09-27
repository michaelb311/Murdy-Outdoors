import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';
import waterFowl1 from '../../assets/photo_wall/water-fowl-1.jpg';
import waterFowl2 from '../../assets/photo_wall/water-fowl-2.jpg';
import waterFowl3 from '../../assets/photo_wall/water-fowl-3.jpg';
import waterFowl4 from '../../assets/photo_wall/water-fowl-4.jpg';
import waterFowl5 from '../../assets/photo_wall/water-fowl-5.jpg';
import waterFowl6 from '../../assets/photo_wall/water-fowl-6.jpg';
import waterFowl7 from '../../assets/photo_wall/water-fowl-7.jpg';
import waterFowl8 from '../../assets/photo_wall/water-fowl-8.jpg';
import waterFowl9 from '../../assets/photo_wall/water-fowl-9.jpg';
import waterFowl10 from '../../assets/photo_wall/water-fowl-10.jpg';
import waterFowl11 from '../../assets/photo_wall/water-fowl-11.jpg';
import waterFowl12 from '../../assets/photo_wall/water-fowl-12.jpg';
import waterFowl13 from '../../assets/photo_wall/water-fowl-13.jpg';
import waterFowl14 from '../../assets/photo_wall/water-fowl-14.jpg';
import waterFowl15 from '../../assets/photo_wall/water-fowl-15.jpg';
import waterFowl16 from '../../assets/photo_wall/water-fowl-16.jpg';
import whiteTail1 from '../../assets/photo_wall/white-tail-1.jpg';
import whiteTail2 from '../../assets/photo_wall/white-tail-2.jpg';

const photoWallData = [
	{
		src: waterFowl1,
		alt: 'Photo 1',
		className: 'photo-item wide',
	},
	{
		src: waterFowl2,
		alt: 'Photo 2',
		className: 'photo-item tall',
	},
	{
		src: waterFowl6,
		alt: 'Photo 3',
		className: 'photo-item tall wide',
	},
	{
		src: waterFowl4,
		alt: 'Photo 4',
		className: 'photo-item wide tall',
	},
	{
		src: waterFowl5,
		alt: 'Photo 5',
		className: 'photo-item wide tall',
	},
	{
		src: waterFowl3,
		alt: 'Photo 6',
		className: 'photo-item tall',
	},
	{
		src: waterFowl7,
		alt: 'Photo 7',
		className: 'photo-item tall',
	},
	{
		src: waterFowl8,
		alt: 'Photo 8',
		className: 'photo-item',
	},
	{
		src: waterFowl9,
		alt: 'Photo 9',
		className: 'photo-item tall',
	},
	{
		src: waterFowl10,
		alt: 'Photo 10',
		className: 'photo-item',
	},
	{
		src: waterFowl11,
		alt: 'Photo 11',
		className: 'photo-item',
	},
	{
		src: waterFowl12,
		alt: 'Photo 12',
		className: 'photo-item',
	},
	{
		src: waterFowl13,
		alt: 'Photo 13',
		className: 'photo-item',
	},
	{
		src: waterFowl14,
		alt: 'Photo 14',
		className: 'photo-item',
	},
	{
		src: waterFowl15,
		alt: 'Photo 15',
		className: 'photo-item',
	},
	{
		src: waterFowl16,
		alt: 'Photo 16',
		className: 'photo-item',
	},
	{
		src: whiteTail2,
		alt: 'Photo 17',
		className: 'photo-item tall wide',
	},
	{
		src: whiteTail1,
		alt: 'Photo 18',
		className: 'photo-item tall wide',
	},
];

const PhotoWall = () => {
	const [isCarouselOpen, setIsCarouselOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const openCarousel = (index: number) => {
		setSelectedIndex(index);
		setIsCarouselOpen(true);
	};

	const closeCarousel = () => {
		setIsCarouselOpen(false);
	};

	return (
		<section className='photoWallSection'>
			<div className='photo-wall'>
				{photoWallData.map((photo, index) => (
					<img
						key={index}
						src={photo.src}
						alt={photo.alt}
						className={photo.className}
						onClick={() => openCarousel(index)}
					/>
				))}
			</div>
			{isCarouselOpen && (
				<div className='carousel-overlay' onClick={closeCarousel}>
					<button
						className='close-button'
						onClick={(e) => {
							e.stopPropagation();
							closeCarousel();
						}}
					>
						&times;
					</button>
					<div onClick={(e) => e.stopPropagation()}>
						<Carousel
							selectedItem={selectedIndex}
							showThumbs={true}
							infiniteLoop={true}
							useKeyboardArrows={true}
							showStatus={false}
							showIndicators={false}
							emulateTouch={true}
							swipeable={true}
							onClickItem={closeCarousel}
						>
							{photoWallData.map((photo, index) => (
								<div key={index}>
									<img src={photo.src} alt={photo.alt} />
								</div>
							))}
						</Carousel>
					</div>
				</div>
			)}
		</section>
	);
};
export default PhotoWall;
