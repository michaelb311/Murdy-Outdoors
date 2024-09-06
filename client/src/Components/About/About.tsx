import './styles.css';
import WWD from '../../assets/What-We-Do-Compressed.mp4';

const About = () => {
	return (
		<section>
			<h2>About Us</h2>
			<article>
				<h3>What We Do</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
					cumque vel reprehenderit vero, qui harum accusamus sapiente aspernatur
					repellendus sint nostrum rerum est, ipsam, delectus dignissimos. Iure
					dignissimos assumenda ipsum. Deserunt dolorum distinctio corrupti
					eaque ex, nihil, repellendus delectus expedita consequatur, similique
					quidem facilis. Est delectus doloribus, laboriosam dolores aperiam
					corporis molestiae maxime officia sapiente quam magnam esse voluptate
					nostrum? Eius excepturi ex fugiat. Sit sint dignissimos doloremque
					necessitatibus consequatur sed esse adipisci minima dolores
					repudiandae autem deleniti hic modi illum delectus harum, aspernatur
					vero dolore, a et in placeat? Sapiente ratione id obcaecati, neque
					aperiam eveniet dicta dolores repellendus numquam reiciendis, iste,
					pariatur officia officiis. Eos debitis nostrum tempora, eum ipsum eius
					et fuga in vero rem veniam. Alias.
				</p>
				<video loop muted>
					<source src={WWD} type='video/mp4' />
				</video>
			</article>
		</section>
	);
};
export default About;
