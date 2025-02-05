import './styles.css';
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, differenceInDays } from 'date-fns';
import { GlobalContext } from '../../../API/context';
import { GoogleCalendarEvent } from '../../../Types/googleTypes';
import { huntingMethod } from '../../../Types/huntTypes';
import { FormProps } from '../../../Types/uiTypes';
import { FaExclamationCircle } from 'react-icons/fa';
import useModal from '../../../Hooks/useModal';
import { UserContext } from '../../../API/userContext';
import BookingDetails from '../BookingDetails/BookingDetails';
import { BookingType } from '../../../Types/bookingTypes';
import GuestInfo from '../../User/GuestInfo/GuestInfo';
import { GuestType, UserType } from '../../../Types/userTypes';

const BookingForm: React.FC<FormProps> = ({ hunt }) => {
	const { openModal } = useModal();
	const { state, dispatch } = useContext(GlobalContext);
	const { userState } = useContext(UserContext);
	const events: GoogleCalendarEvent[] | null = state.events;
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { title, price, hunting_methods, maxGuests } = hunt;
	const [formData, setFormData] = useState<BookingType>({
		// Hunt details
		id: '',
		hunt: hunt,
		huntingMethods: [] as huntingMethod[],

		// Guest information
		numberOfGuests: 1,
		numberOfAdults: 0,
		numberOfChildren: 0,
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		user: userState.user || null,

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
		status: 'pending',
		confirmed: false,

		// Additional information
		documents: [],
	});

	const unavailableDates: Date[] =
		events?.flatMap((event) => {
			const start = new Date(event.start.date);
			const end = new Date(event.end.date);
			const dateRange = eachDayOfInterval({ start, end });
			return dateRange;
		}) ?? [];

	const handleDateChange = (date: Date | null, id: string) => {
		if (date) {
			setFormData({
				...formData,
				[id]: date.toLocaleDateString(undefined, {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				}),
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		switch (id) {
			case 'numberOfGuests':
				setFormData({ ...formData, [id]: parseInt(value) });
				break;
			case 'numberOfAdults':
				setFormData({ ...formData, [id]: parseInt(value) });
				break;
			case 'numberOfChildren':
				setFormData({ ...formData, [id]: parseInt(value) });
				break;
			default:
				setFormData({ ...formData, [id]: value });
				break;
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};
		if (formData.numberOfGuests < 1) {
			newErrors.numberOfGuests = 'Number of guests is required';
		}

		if (formData.numberOfGuests > 1) {
			if (formData.numberOfAdults < 1) {
				newErrors.numberOfAdults = 'Number of adults is required';
			}
			if (
				formData.numberOfChildren + formData.numberOfAdults !==
				formData.numberOfGuests
			) {
				newErrors.numberOfChildren =
					'Total of adults and children must equal number of guests';
			}
		} else if (formData.numberOfGuests === 1) {
			formData.numberOfAdults = 1;
		} else if (formData.numberOfGuests === 0) {
			newErrors.numberOfGuests = 'Number of guests is required';
		}

		if (!formData.startDate) {
			newErrors.startDate = 'Start date is required';
		}

		if (!formData.endDate) {
			newErrors.endDate = 'End date is required';
		}

		if (formData.huntingMethods.length === 0) {
			newErrors.huntingMethods = 'At least one hunting method must be selected';
		}

		const startDate = new Date(formData.startDate);
		const endDate = new Date(formData.endDate);

		if (endDate < startDate) {
			newErrors.endDate = 'End date cannot be before start date';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const checkUser = async (): Promise<UserType | GuestType> => {
		console.log('userState', userState.user);
		if (userState.user) {
			return userState.user;
		} else {
			dispatch({ type: 'SET_CURRENT_BOOKING', payload: formData });
			return new Promise((resolve) => {
				const handleGuestInfoSubmit = (guestInfo: GuestType) => {
					resolve(guestInfo);
					openModal(<BookingDetails booking={formData} />);
				};
				openModal(<GuestInfo onGuestInfoSubmit={handleGuestInfoSubmit} />);
			});
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		(async () => {
			try {
				if (validateForm()) {
					formData.numberOfDays = differenceInDays(
						new Date(formData.endDate),
						new Date(formData.startDate)
					);
					formData.totalPrice =
						formData.numberOfDays * formData.numberOfGuests * price;
					formData.deposit = formData.totalPrice * 0.5;
					formData.status = 'pending';
					formData.user = await checkUser();
					console.log('formData', formData);
					if (formData.user) {
						openModal(<BookingDetails booking={formData} />);
					}
				} else {
					console.log('Form is invalid');
				}
			} catch (error) {
				console.error('Error during form submission:', error);
			}
		})().catch((error) => {
			console.error('Unhandled error in async function:', error);
		});
	};

	//TODO: Add confirm booking api call
	// const confirmBooking = () => {
	// 	formData.status = 'confirmed';
	// 	console.log('Booking confirmed');
	// };

	//TODO: Add cancel booking api call
	// const cancelBooking = () => {
	// 	formData.status = 'cancelled';
	// };

	return (
		<>
			<form className='bookingFormContainer' onSubmit={handleSubmit}>
				<h3 className='bookingFormHeading'>Booking Your {title} Hunt</h3>
				<div className='bookingFormGroup'>
					<label className='bookingFormLabel' htmlFor='numberOfGuests'>
						Number of Guests
					</label>
					<div className='inputWithError'>
						<input
							className={`bookingFormInput ${
								errors.numberOfGuests ? 'errorInput' : ''
							}`}
							type='number'
							id='numberOfGuests'
							min={1}
							max={maxGuests}
							value={formData.numberOfGuests}
							onChange={handleChange}
						/>
						{errors.numberOfGuests && (
							<FaExclamationCircle
								className='errorIcon'
								title={errors.numberOfGuests}
							/>
						)}
					</div>
					{formData.numberOfGuests > 1 && (
						<>
							<label className='bookingFormLabel' htmlFor='numberOfAdults'>
								Number of Adults
							</label>
							<div className='inputWithError'>
								<input
									className={`bookingFormInput ${
										errors.numberOfAdults ? 'errorInput' : ''
									}`}
									type='number'
									id='numberOfAdults'
									min={1}
									max={formData.numberOfGuests - formData.numberOfChildren}
									value={formData.numberOfAdults}
									onChange={handleChange}
								/>
								{errors.numberOfAdults && (
									<FaExclamationCircle
										className='errorIcon'
										title={errors.numberOfAdults}
									/>
								)}
							</div>
							<label className='bookingFormLabel' htmlFor='numberOfChildren'>
								Number of Children
							</label>
							<div className='inputWithError'>
								<input
									className={`bookingFormInput ${
										errors.numberOfChildren ? 'errorInput' : ''
									}`}
									type='number'
									id='numberOfChildren'
									value={formData.numberOfChildren}
									min={0}
									max={formData.numberOfGuests - formData.numberOfAdults}
									onChange={handleChange}
								/>
								{errors.numberOfChildren && (
									<FaExclamationCircle
										className='errorIcon'
										title={errors.numberOfChildren}
									/>
								)}
							</div>
						</>
					)}
					{formData.numberOfChildren > 0 && (
						<>
							<p className='bookingFormNote'>
								Children must be 13 years of age or older & must be accompanied
								by a legal guardian.
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
						excludeDates={unavailableDates}
						dateFormat='yyyy-MM-dd'
						className='bookingFormInput'
					/>
					<label className='bookingFormLabel' htmlFor='endDate'>
						End Date
					</label>
					<div className='inputWithError'>
						<DatePicker
							selected={formData.endDate ? new Date(formData.endDate) : null}
							onChange={(date) => handleDateChange(date, 'endDate')}
							excludeDates={unavailableDates}
							dateFormat='yyyy-MM-dd'
							className='bookingFormInput'
						/>
						{errors.endDate && (
							<FaExclamationCircle
								className='errorIcon'
								title={errors.endDate}
							/>
						)}
					</div>
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
								checked={formData.huntingMethods.includes(method.method)}
								onChange={(e) => {
									const { checked, value } = e.target;
									setFormData((prevData) => {
										const updatedMethods = checked
											? [...prevData.huntingMethods, value as huntingMethod]
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
					{errors.huntingMethods && (
						<div className='errorMessage'>
							<FaExclamationCircle className='errorIcon' />
							{errors.huntingMethods}
						</div>
					)}
				</div>
				<button className='bookingFormSubmit' type='submit'>
					Submit
				</button>
			</form>
			{/* <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
				<h2>Confirm Your Booking</h2>
				<div className='bookingDetails'>
					<p>Hunt: {title}</p>
					<p>Start Date: {formData.startDate}</p>
					<p>End Date: {formData.endDate}</p>
					<p>Number of Days: {formData.numberOfDays}</p>
					<p>Number of Guests: {formData.numberOfGuests}</p>
					<p>Total Price: ${formData.totalPrice}</p>
					<p>Deposit (50%): ${formData.deposit}</p>
				</div>
				<div className='modalActions'>
					<button onClick={confirmBooking}>Confirm Booking</button>
					<button onClick={cancelBooking}>Cancel</button>
				</div>
			</Modal> */}
		</>
	);
};
export default BookingForm;
