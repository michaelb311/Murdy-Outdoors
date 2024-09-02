import './styles.css';
import Logo from '../../../assets/MainLogo.png';
import { Link } from 'react-router-dom';

const linkStyles = {
	display: 'flex',
	justContent: 'center',
	alignItems: 'center',
};

const MainNav = () => {
	return (
		<nav>
			<Link to={'/'} style={linkStyles}>
				<img src={Logo} alt='' />
			</Link>
			<ul>
				<li>
					<Link to={'/User'}>User</Link>
				</li>
				<li></li>
			</ul>
		</nav>
	);
};
export default MainNav;
