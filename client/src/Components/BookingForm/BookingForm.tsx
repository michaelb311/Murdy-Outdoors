import './styles.css';
import { FormProps } from '../../Types/uiTypes';
import React, { useState } from 'react';

const BookingForm: React.FC<FormProps> = ({ hunt }) => {
	const { title, price, stockCount, huntingMethod } = hunt;
	const [formData, setFormData] = useState({
		numberOfGuests: 0,
		huntingMethod: '',
		dateRange: '',
		numberOfDays: 0,
		totalPrice: 0,
		deposit: 0,
		documents: [],
		paymentMethod: '',
		status: '',
		confirmed: false,
		userId: '',
		huntId: '',
	});
	return (
		<form className='bookingForm'>
			<h3>Booking Your {title} Hunt</h3>
			<div className='bookingFormGroup'>
				<label htmlFor='numberOfGuests'>Number of Guests</label>
				<input type='number' id='numberOfGuests' />
				{}
			</div>
		</form>
	);
};
export default BookingForm;
