import './styles.css';
import { UserType } from '../../../Types/userTypes';

const UserDashboard: React.FC<UserType> = (user) => {
	const { bookings } = user;
	return (
		<section className='userDashboard'>
			<h1>
				{user.firstName} {user.lastName}
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
				<h2>Bookings</h2>
				{bookings && bookings.length > 0 ? (
					<ul>
						{bookings.map((booking, index) => (
							<li key={index}>
								<p>
									<strong>Booking ID:</strong> {booking.id}
								</p>
								<p>
									<strong>Status:</strong> {booking.bookingStatus}
								</p>
								<p>
									<strong>Start Date:</strong> {booking.startDate}
								</p>
								<p>
									<strong>End Date:</strong> {booking.endDate}
								</p>
							</li>
						))}
					</ul>
				) : (
					<p>No bookings available.</p>
				)}
			</div>
		</section>
	);
};

export default UserDashboard;
