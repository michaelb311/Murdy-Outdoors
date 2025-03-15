import './styles.css';
import { UserType } from '../../../Types/userTypes';
import UserBookingCard from './UserBookingCard/UserBookingCard';

const UserDashboard: React.FC<UserType> = (user) => {
	const { bookings } = user;
	return (
		<section className='userDashboard'>
			<h1 className='userDashboardTitle'>
				Welcome, {user.firstName} {user.lastName}
			</h1>

			{/* <div className='dashboard-group'>
				<h2>Reviews</h2>
				{reviews && reviews.length > 0 ? (
					<ul>
						{reviews.map((review, index) => (
							<li key={index}>
								<p>
									<strong>{review.title}</strong>
								</p>
								<p>{review.review}</p>
								<p>Rating: {review.rating}</p>
							</li>
						))}
					</ul>
				) : (
					<p>No reviews available.</p>
				)}
			</div> */}

			<div className='dashboard-group'>
				<h2 className='dashboard-group-title'>Bookings</h2>
				{bookings && bookings.length > 0 ? (
					bookings.map((booking, index) => (
						<UserBookingCard key={index} booking={booking} />
					))
				) : (
					<p>No bookings available.</p>
				)}
			</div>
		</section>
	);
};

export default UserDashboard;
