import './styles.css';
import Logo from '../../../assets/MainLogo.png';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const linkStyles = {
	display: 'flex',
	justContent: 'center',
	alignItems: 'center',
	width: '50%',
};

const MainNav = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const prevScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 50 && currentScrollY > prevScrollY.current) {
				setIsScrolled(true);
			} else if (currentScrollY <= 50 || currentScrollY < prevScrollY.current) {
				setIsScrolled(false);
			}
			prevScrollY.current = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`mainNav ${isScrolled ? 'scrolled' : ''}`}>
			<Link to={'/'} style={linkStyles}>
				<img
					className={`logo ${isScrolled ? 'small' : ''}`}
					src={Logo}
					alt=''
				/>
			</Link>
			<ul className='navList'>
				<Link to={'/Hunts'}>
					<li className={`navListItem ${isScrolled ? 'small' : ''}`}>Hunts</li>
				</Link>
				<Link to={'/User'}>
					<li className={`navListItem ${isScrolled ? 'small' : ''}`}>
						<FaUserAlt />
					</li>
				</Link>
			</ul>
		</nav>
	);
};
export default MainNav;
