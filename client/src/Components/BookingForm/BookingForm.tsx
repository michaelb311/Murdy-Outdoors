import './styles.css';
import { FormProps } from '../../Types/uiTypes';
import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval } from 'date-fns';
import { GlobalContext } from '../../API/context';

const BookingForm: React.FC<FormProps> = ({ hunt }) => {
	const { state } = useContext(GlobalContext);
	//this is the events from the database. they need to be typed
	const events = state.events || [];
	//the price and stock count will be used for the total price and to check if the hunt is in stock
	const { title, price, stockCount, hunting_methods } = hunt;
	const [formData, setFormData] = useState({
		// Hunt details
		huntId: '',
		huntingMethods: [],

		// Guest information
		numberOfGuests: 1,
		numberOfAdults: 0,
		numberOfChildren: 0,
		userId: '',

		// Booking details
		startDate: '',
		endDate: '',
		numberOfDays: 0,

		// Payment information
		totalPrice: 0,
		deposit: 0,
		depositPayed: false,
		fullPayment: false,

		// Booking status
		status: '',
		confirmed: false,

		// Additional information
		documents: [],
	});

	//needs to be typed
	const unavailableDates = events.flatMap((event) => {
		const start = new Date(event.start.date);
		const end = new Date(event.end.date);
		const dateRange = eachDayOfInterval({ start, end });
		return dateRange;
	});

	const handleDateChange = (date: Date | null, id: string) => {
		if (date) {
			setFormData({ ...formData, [id]: date.toISOString().split('T')[0] });
		}
	};

	useEffect(() => {
		console.log(unavailableDates);
	}, [unavailableDates]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<form className='bookingFormContainer' onSubmit={handleSubmit}>
			<h3 className='bookingFormHeading'>Booking Your {title} Hunt</h3>
			<div className='bookingFormGroup'>
				<label className='bookingFormLabel' htmlFor='numberOfGuests'>
					Number of Guests
				</label>
				<input
					className='bookingFormInput'
					type='number'
					id='numberOfGuests'
					min={1}
					value={formData.numberOfGuests}
					onChange={handleChange}
				/>
				{formData.numberOfGuests > 1 && (
					<>
						<label className='bookingFormLabel' htmlFor='numberOfAdults'>
							Number of Adults
						</label>
						<input
							className='bookingFormInput'
							type='number'
							id='numberOfAdults'
							min={1}
							max={formData.numberOfGuests - formData.numberOfChildren}
							value={formData.numberOfAdults}
							onChange={handleChange}
						/>
						<label className='bookingFormLabel' htmlFor='numberOfChildren'>
							Number of Children
						</label>
						<input
							className='bookingFormInput'
							type='number'
							id='numberOfChildren'
							value={formData.numberOfChildren}
							max={formData.numberOfGuests - formData.numberOfAdults}
							onChange={handleChange}
						/>
					</>
				)}
				{formData.numberOfChildren > 0 && (
					<>
						<p className='bookingFormNote'>
							Children must be 13 years of age or older & must be accompanied by
							a legal guardian.
						</p>
					</>
				)}
			</div>
			<div className='bookingFormGroup'>
				<h3 className='bookingFormHeading'>Select Dates</h3>
				<label className='bookingFormLabel' htmlFor='startDate'>
					Start Date
				</label>
				<DatePicker
					selected={formData.startDate ? new Date(formData.startDate) : null}
					onChange={(date) => handleDateChange(date, 'startDate')}
					//needs to be typed
					excludeDates={unavailableDates}
					dateFormat='yyyy-MM-dd'
					className='bookingFormInput'
				/>
				<label className='bookingFormLabel' htmlFor='endDate'>
					End Date
				</label>
				<DatePicker
					selected={formData.endDate ? new Date(formData.endDate) : null}
					onChange={(date) => handleDateChange(date, 'endDate')}
					//needs to be typed
					excludeDates={unavailableDates}
					dateFormat='yyyy-MM-dd'
					className='bookingFormInput'
				/>
			</div>
			<div className='bookingFormGroup'>
				<h3 className='bookingFormHeading'>Hunting Method</h3>
				{hunting_methods?.map((method) => (
					<div key={method.id} className='bookingFormCheckbox'>
						<input
							type='checkbox'
							id={`huntingMethod-${method.id}`}
							name='huntingMethod'
							value={method.method}
							//needs to be typed
							checked={formData.huntingMethods.includes(method.method)}
							onChange={(e) => {
								const { checked, value } = e.target;
								//needs to be typed
								setFormData((prevData) => {
									const updatedMethods = checked
										? [...prevData.huntingMethods, value]
										: prevData.huntingMethods.filter(
												(method) => method !== value
										  );
									return { ...prevData, huntingMethods: updatedMethods };
								});
							}}
						/>
						<label htmlFor={`huntingMethod-${method.id}`}>
							{method.method}
						</label>
					</div>
				))}
			</div>
			<button className='bookingFormSubmit' type='submit'>
				Submit
			</button>
		</form>
	);
};
export default BookingForm;
