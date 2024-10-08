import './styles.css';
import { FormProps } from '../../Types/uiTypes';
import React, { useContext, useState } from 'react';
import { format, parse, differenceInDays, getDay, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GlobalContext } from '../../API/context';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const BookingForm: React.FC<FormProps> = ({ hunt }) => {
	const { state } = useContext(GlobalContext);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const events = state.events || [];
	const { title, price, stockCount, huntingMethod } = hunt;
	const [formData, setFormData] = useState({
		// Hunt details
		huntId: '',
		huntingMethod: '',

		// Guest information
		numberOfGuests: 1,
		numberOfAdults: 0,
		numberOfChildren: 0,
		userId: '',

		// Booking details
		dateRange: '',
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	return (
		<form className='bookingForm'>
			<h3>Booking Your {title} Hunt</h3>
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
				<label className='bookingFormLabel' htmlFor='dateRange'>
					Select Dates
				</label>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor='start'
					endAccessor='end'
					style={{ height: 500 }}
					aria-label='Hunt date selection calendar'
				/>
				<input
					className='bookingFormInput'
					type='date'
					id='dateRange'
					value={formData.dateRange}
					onChange={handleChange}
				/>
			</div>
		</form>
	);
};
export default BookingForm;
