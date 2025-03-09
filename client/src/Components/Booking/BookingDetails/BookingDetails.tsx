import React, { useContext } from 'react';
import './styles.css';
import { BookingType } from '../../../Types/bookingTypes';
import { createBooking, getAllBookings } from '../../../API/booking.tsx';
import { GlobalContext } from '../../../API/context';
import { getUserData } from '../../../API/user.tsx';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../API/userContext';
import { updateLocalUser } from '../../../API/user';
import { createGoogleCalendarEvent } from '../../../API/google';
import useModal from '../../../Hooks/useModal';
//rough draft of the booking details component

const BookingDetails: React.FC<{ booking: BookingType }> = ({ booking }) => {
	const { closeModal } = useModal();
	const { dispatch } = useContext(GlobalContext);
	const { userDispatch } = useContext(UserContext);
	const navigate = useNavigate();
	const handleSubmit = async () => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true });
			const bookingResponse = await createBooking(booking);
			if (bookingResponse.data.id) {
				await createGoogleCalendarEvent(booking);
				const updatedUserData = await getUserData();
				const updatedBookings = await getAllBookings();
				if (updatedUserData) {
					userDispatch({ type: 'SET_USER', payload: updatedUserData });
					updateLocalUser(updatedUserData);
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
			closeModal();
		}
	};

	return (
		<div className='bookingDetailsWrapper'>
			<h1 className='bookingDetailsTitle'>Booking Details</h1>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Hunt Details</h2>
				<p>
					Hunting Methods:{' '}
					{Array.isArray(booking.huntingMethods)
						? booking.huntingMethods.map((method) => method.method).join(', ')
						: 'N/A'}
				</p>
			</div>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Guest Information</h2>
				<p>Number of Guests: {booking.numberOfGuests}</p>
				<p>Number of Adults: {booking.numberOfAdults}</p>
				<p>Number of Children: {booking.numberOfChildren}</p>
				<p>
					Name: {booking.user?.firstName} {booking.user?.lastName}
				</p>
				<p>Email: {booking.user?.email}</p>
			</div>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Booking Details</h2>
				<p>Start Date: {booking.startDate}</p>
				<p>End Date: {booking.endDate}</p>
				<p>Number of Days: {booking.numberOfDays}</p>
			</div>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Payment Information</h2>
				<p>Total Price: ${booking.totalPrice}</p>
				<p>Deposit: ${booking.deposit}</p>
				<p>Deposit Paid: {booking.depositPayed ? 'Yes' : 'No'}</p>
				<p>Full Payment: {booking.fullPayment ? 'Yes' : 'No'}</p>
			</div>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Booking Status</h2>
				<p>Status: {booking.bookingStatus}</p>
				<p>Confirmed: {booking.confirmed ? 'Yes' : 'No'}</p>
			</div>
			<div className='bookingDetailsGroup'>
				<h2 className='bookingDetailsHeading'>Additional Information</h2>
				<p>Documents: {booking.documents.length > 0 ? 'Available' : 'None'}</p>
			</div>
			<button
				className='bookingDetailsSubmit'
				onClick={() => void handleSubmit()}
			>
				Submit
			</button>
		</div>
	);
};

export default BookingDetails;
