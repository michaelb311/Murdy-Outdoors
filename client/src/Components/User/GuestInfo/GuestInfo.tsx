import './styles.css';
import { GuestInfoProps, GuestType } from '../../../Types/userTypes';
import { useContext, useState } from 'react';
import { storeGuest } from '../../../API/user';
import { GlobalContext } from '../../../API/context';
import { BookingType } from '../../../Types/bookingTypes';

const GuestInfo = ({ onGuestInfoSubmit }: GuestInfoProps) => {
	const { state, dispatch } = useContext(GlobalContext);
	const [guestInfo, setGuestInfo] = useState<GuestType>({
		firstName: '',
		lastName: '',
		email: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGuestInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value || '',
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (guestInfo) {
			try {
				storeGuest(guestInfo);
				dispatch({
					type: 'SET_CURRENT_BOOKING',
					payload: {
						...state.currentBooking,
						user: {
							firstName: guestInfo.firstName,
							lastName: guestInfo.lastName,
							email: guestInfo.email,
						},
					} as BookingType,
				});
				onGuestInfoSubmit(guestInfo);
			} catch (error) {
				console.error('Failed to store guest information', error);
			}
		} else {
			console.error('Guest information is not set');
		}
	};

	return (
		<form className='guestInfo' onSubmit={handleSubmit}>
			<h2>Guest Information</h2>
			<div className='guestInfoInput'>
				<label htmlFor='firstName'>First Name</label>
				<input
					type='text'
					id='firstName'
					name='firstName'
					value={guestInfo.firstName}
					onChange={handleChange}
				/>
			</div>
			<div className='guestInfoInput'>
				<label htmlFor='lastName'>Last Name</label>
				<input
					type='text'
					id='lastName'
					name='lastName'
					value={guestInfo.lastName}
					onChange={handleChange}
				/>
			</div>
			<div className='guestInfoInput'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					value={guestInfo.email}
					onChange={handleChange}
				/>
			</div>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default GuestInfo;
