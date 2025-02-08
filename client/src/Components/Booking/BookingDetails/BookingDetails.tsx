import React from 'react';
import './styles.css';
import { BookingType } from '../../../Types/bookingTypes';
import { createBooking } from '../../../API/booking.tsx';

//rough draft of the booking details componentd

const BookingDetails: React.FC<{ booking: BookingType }> = ({ booking }) => {
	const handleSubmit = async () => {
		try {
			await createBooking(booking);
			console.log('Booking created successfully');
		} catch (error) {
			console.error('Error creating booking:', error);
		}
	};

	return (
		<div className='bookingDetailsWrapper'>
			<h1>Booking Details</h1>
			<div className='bookingDetailsSection'>
				<h2>Hunt Details</h2>
				<p>ID: {booking.id}</p>
				<p>Hunting Methods: {booking.huntingMethods.join(', ')}</p>

				<h2>Guest Information</h2>
				<p>Number of Guests: {booking.numberOfGuests}</p>
				<p>Number of Adults: {booking.numberOfAdults}</p>
				<p>Number of Children: {booking.numberOfChildren}</p>
				<p>
					Name: {booking.user?.firstName} {booking.user?.lastName}
				</p>
				<p>Email: {booking.user?.email}</p>

				<h2>Booking Details</h2>
				<p>Start Date: {booking.startDate}</p>
				<p>End Date: {booking.endDate}</p>
				<p>Number of Days: {booking.numberOfDays}</p>

				<h2>Payment Information</h2>
				<p>Total Price: ${booking.totalPrice}</p>
				<p>Deposit: ${booking.deposit}</p>
				<p>Deposit Paid: {booking.depositPayed ? 'Yes' : 'No'}</p>
				<p>Full Payment: {booking.fullPayment ? 'Yes' : 'No'}</p>

				<h2>Booking Status</h2>
				<p>Status: {booking.status}</p>
				<p>Confirmed: {booking.confirmed ? 'Yes' : 'No'}</p>

				<h2>Additional Information</h2>
				<p>Documents: {booking.documents.length > 0 ? 'Available' : 'None'}</p>
			</div>
			<button onClick={() => void handleSubmit()}>Submit</button>
		</div>
	);
};

export default BookingDetails;
