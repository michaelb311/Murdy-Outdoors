import './styles.css';
import Logo from '../../../assets/MainLogo.png';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

const linkStyles = {
	display: 'flex',
	justContent: 'center',
	alignItems: 'center',
	width: '50%',
};

const MainNav = () => {
	return (
		<nav className='mainNav'>
			<Link to={'/'} style={linkStyles}>
				<img className='logo' src={Logo} alt='' />
			</Link>
			<ul className='navList'>
				<Link to={'/Hunts'}>
					<li className='navListItem'>Hunts</li>
				</Link>
				<Link to={'/User'}>
					<li className='navListItem'>
						<FaUserAlt />
					</li>
				</Link>
			</ul>
		</nav>
	);
};
export default MainNav;
