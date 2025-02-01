import { useContext } from 'react';
import './styles.css';
import { UserContext } from '../../../API/userContext';
import { FaUserAlt } from 'react-icons/fa';

const DashNav = () => {
	const { state } = useContext(UserContext);

	return (
		<nav className='dashNav'>
			<div className='dashNavProfilePic'>
				{state.user?.profilePicture ? (
					<img src={state.user?.profilePicture} alt='profile picture' />
				) : (
					<FaUserAlt />
				)}
			</div>
			<div className='upcomingBookings'>
				<h3>Upcoming Bookings</h3>
			</div>
			<div className='pastBookings'>
				<h3>Past Bookings</h3>
			</div>
		</nav>
	);
};

export default DashNav;
