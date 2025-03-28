import { useContext } from 'react';
import { UserContext } from '../../API/userContext';
// import DashNav from '../../Components/Navigation/DashboardNav/DashNav';
import UserDashboard from '../../Components/User/UserDashboard/UserDashboard';
import './styles.css';

const UserPage = () => {
	const { userState } = useContext(UserContext);
	const user = userState.user;

	return (
		<section className='userPage'>
			{/* <aside className='userDashNavWrapper'>
				{user && <DashNav {...user} />}
			</aside> */}
			<div className='userDashMainWrapper'>
				{user ? <UserDashboard {...user} /> : <p>No user data available.</p>}
			</div>
		</section>
	);
};

export default UserPage;
