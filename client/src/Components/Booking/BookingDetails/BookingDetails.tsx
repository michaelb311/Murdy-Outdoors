import React, { useContext } from 'react';
import './styles.css';
import { BookingType } from '../../../Types/bookingTypes';
import { createBooking, getAllBookings } from '../../../API/booking.tsx';
import { GlobalContext } from '../../../API/context';
import { getUserData } from '../../../API/user.tsx';
import { useNavigate } from 'react-router-dom';
//rough draft of the booking details component

const BookingDetails: React.FC<{ booking: BookingType }> = ({ booking }) => {
	const { dispatch } = useContext(GlobalContext);
	const navigate = useNavigate();
	const handleSubmit = async () => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true });
			const bookingResponse = await createBooking(booking);
			console.log('booking response before if block', bookingResponse.data.id);
			if (bookingResponse.data.id) {
				console.log('bookingResponse has id');
				const updatedUserData = await getUserData();
				const updatedBookings = await getAllBookings();
				if (updatedUserData && updatedUserData.user) {
					dispatch({ type: 'SET_USER', payload: updatedUserData.user });
				}
				if (updatedBookings) {
					dispatch({ type: 'SET_BOOKINGS', payload: updatedBookings });
				}
				navigate('/user');
			}
		} catch (error) {
			console.error('Error creating booking:', error);
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
			dispatch({ type: 'SET_CURRENT_BOOKING', payload: null });
		}
	};

	return (
		<div className='bookingDetailsWrapper'>
			<h1>Booking Details</h1>
			<div className='bookingDetailsSection'>
				<h2>Hunt Details</h2>
				<p>
					Hunting Methods:{' '}
					{Array.isArray(booking.huntingMethods)
						? booking.huntingMethods.map((method) => method.method).join(', ')
						: 'N/A'}
				</p>

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
				<p>Status: {booking.bookingStatus}</p>
				<p>Confirmed: {booking.confirmed ? 'Yes' : 'No'}</p>

				<h2>Additional Information</h2>
				<p>Documents: {booking.documents.length > 0 ? 'Available' : 'None'}</p>
			</div>
			<button onClick={() => void handleSubmit()}>Submit</button>
		</div>
	);
};

export default BookingDetails;
