import React from 'react';
import './styles.css';
import { UserType } from '../../../Types/userTypes';

//this component will take in the content and render it in its appropriate styles.

const UserDashboard: React.FC<UserType> = (user) => {
	const { reviews, bookings } = user;
	return (
		<div className='userDashboard'>
			<h1>
				{user.firstName} {user.lastName}
			</h1>

			<section className='dashboardSection'>
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
			</section>

			<section className='dashboardSection'>
				<h2>Bookings</h2>
				{bookings && bookings.length > 0 ? (
					<ul>
						{bookings.map((booking, index) => (
							<li key={index}>
								<p>
									<strong>Booking ID:</strong> {booking.id}
								</p>
								<p>
									<strong>Status:</strong> {booking.status}
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
			</section>
		</div>
	);
};

export default UserDashboard;
