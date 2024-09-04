import './styles.css';
import Logo from '../../../assets/MainLogo.png';
import { Link } from 'react-router-dom';

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
				<li>
					<Link to={'/Hunts'}>Hunts</Link>
				</li>
				<li>
					<Link to={'/User'}>User</Link>
				</li>
			</ul>
		</nav>
	);
};
export default MainNav;
