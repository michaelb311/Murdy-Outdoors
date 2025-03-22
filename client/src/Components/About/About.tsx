import './styles.css';
import aboutImage1 from '../../assets/about-img-01-resize.jpg';
import aboutImage2 from '../../assets/about-img-02-resize.jpg';

const About = () => {
	const aboutText =
		"At Murdy Outdoors, hunting is more than a passion—it's a tradition I've been living my whole life. I'm Jaden Moe, owner and lead guide, and my mission is to give every client an unforgettable hunting experience in the beautiful Ogallala region of Nebraska. Whether you're after waterfowl, deer, or turkey, I work hard to set you up for success, combining local expertise, top-notch equipment, and a deep respect for the land and wildlife. Our waterfowl hunts are run from heated pits and A-frame blinds along the Platte River and in our surrounding fields. With professional guide dogs by our side, we make sure every bird is efficiently retrieved, so you can stay focused on the action. When spring snow goose season kicks off, we pull out all the stops. By deploying a large decoy spread and timing our hunts to catch peak migration, we put you in the right spot to make the most of the incredible flocks moving through the area. When spring snow goose season kicks off, we pull out all the stops. By deploying a large decoy spread and timing our hunts to catch peak migration, we put you in the right spot to make the most of the incredible flocks moving through the area. For deer hunters, we offer hunts from heated tower blinds overlooking carefully managed food plots, providing comfort, great views, and prime shooting opportunities. Our turkey hunts keep things flexible, with a mix of spot-and-stalk and calling tactics depending on what the birds are doing that day. Back at our riverfront lodge, you can relax and take in the scenery, with local wildlife often putting on a show right outside the front door. It's the perfect place to unwind after a day in the field. At Murdy Outdoors, I'm here to help you experience the thrill, challenge, and reward that come with every successful hunt. Whether it's your first time or your fiftieth, my goal is simple: to provide you with a safe, memorable, and exciting adventure that leaves you eager to come back for more. Let's make your next hunt one to remember.";

	// Format the text with paragraph breaks using regex
	const formattedAboutText = aboutText
		// Remove duplicated paragraph about snow goose season
		.replace(
			/When spring snow goose season kicks off.+?through the area\.\s/,
			''
		)
		// Add paragraph breaks at logical points
		.replace(/(Murdy Outdoors.+?wildlife\.)/, '$1\n\n')
		.replace(/(Our waterfowl hunts.+?the action\.)/, '$1\n\n')
		.replace(/(When spring snow goose season.+?the area\.)/, '$1\n\n')
		.replace(/(For deer hunters.+?opportunities\.)/, '$1\n\n')
		.replace(/(Our turkey hunts.+?that day\.)/, '$1\n\n')
		.replace(/(Back at our riverfront lodge.+?the field\.)/, '$1\n\n')
		.replace(/(At Murdy Outdoors, I'm here.+?)$/, '$1');

	// Split the text into paragraphs
	const paragraphs = formattedAboutText.split('\n\n');

	return (
		<section className='aboutSection'>
			<h2 className='aboutTitle'>About Us</h2>
			<article className='aboutArticle'>
				<h3 className='aboutArticleTitle'>What We Do</h3>
				<div className='about-content'>
					{/* Top right image */}
					<img
						src={aboutImage1}
						alt='Hunting scene'
						className='about-image about-image-right'
					/>

					{/* First few paragraphs */}
					{paragraphs.slice(0, 3).map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}

					{/* Mid-left image */}
					<img
						src={aboutImage2}
						alt='Outdoor experience'
						className='about-image about-image-left'
					/>

					{/* Remaining paragraphs */}
					{paragraphs.slice(3).map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
			</article>
		</section>
	);
};
export default About;
