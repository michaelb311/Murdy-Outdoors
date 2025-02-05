import './styles.css';
import { GuestType } from '../../../Types/userTypes';
import { useState } from 'react';
import { storeGuest } from '../../../API/user';

const GuestInfo: React.FC = () => {
	const [guestInfo, setGuestInfo] = useState<GuestType | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGuestInfo(
			(prev) =>
				({
					...prev,
					[e.target.name]: e.target.value || '',
				} as GuestType)
		);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (guestInfo) {
			storeGuest(guestInfo);
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
					value={guestInfo?.firstName}
					onChange={handleChange}
				/>
			</div>
			<div className='guestInfoInput'>
				<label htmlFor='lastName'>Last Name</label>
				<input
					type='text'
					id='lastName'
					name='lastName'
					value={guestInfo?.lastName}
					onChange={handleChange}
				/>
			</div>
			<div className='guestInfoInput'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					value={guestInfo?.email}
					onChange={handleChange}
				/>
			</div>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default GuestInfo;
