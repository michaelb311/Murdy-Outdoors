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
		<nav>
			<Link to={'/'} style={linkStyles}>
				<img src={Logo} alt='' />
			</Link>
			<ul>
				<Link to={'/Hunts'}>
					<li>Hunts</li>
				</Link>
				<Link to={'/User'}>
					<li>
						<FaUserAlt />
					</li>
				</Link>
			</ul>
		</nav>
	);
};
export default MainNav;
