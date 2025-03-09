import './styles.css';
import { FaUserAlt } from 'react-icons/fa';
import { UserType } from '../../../Types/userTypes';

const DashNav: React.FC<UserType> = (user) => {
	return (
		<nav className='dashNav'>
			<div className='dashNavProfilePic'>
				{user?.profilePicture ? (
					<img src={user?.profilePicture} alt='profile picture' />
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
