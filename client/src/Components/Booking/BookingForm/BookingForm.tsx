import './styles.css';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import { GlobalContext } from '../../../API/context';
import { GoogleCalendarEvent } from '../../../Types/googleTypes';
import { hunting_methodType, huntingMethod } from '../../../Types/huntTypes';
import { FormProps } from '../../../Types/uiTypes';
import { FaExclamationCircle } from 'react-icons/fa';
import useModal from '../../../Hooks/useModal';
import { UserContext } from '../../../API/userContext';
import BookingDetails from '../BookingDetails/BookingDetails';
import { BookingType } from '../../../Types/bookingTypes';
import GuestInfo from '../../User/GuestInfo/GuestInfo';
import { GuestType, UserType } from '../../../Types/userTypes';
import { getLocalGuestData, getLocalUserData } from '../../../API/user';

const BookingForm: React.FC<FormProps> = ({ hunt }) => {
	const { openModal } = useModal();
	const { state, dispatch } = useContext(GlobalContext);
	const { userState } = useContext(UserContext);
	const events: GoogleCalendarEvent[] | null = state.events;
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { title, price, hunting_methods, maxGuests } = hunt;
	const [formData, setFormData] = useState<BookingType>(
		state.currentBooking && state.currentBooking.hunt.title === hunt.title
			? state.currentBooking
			: {
					// Hunt details
					hunt: hunt,
					huntingMethods: [] as hunting_methodType[],

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
					bookingStatus: 'pending',
					confirmed: false,

					// Additional information
					documents: [],
					imageUrls: [],
			  }
	);

	useEffect(() => {
		dispatch({ type: 'SET_CURRENT_BOOKING', payload: formData });
	}, [setFormData, dispatch, formData]);

	const unavailableDates: Date[] = useMemo(() => {
		return (
			events?.flatMap((event) => {
				const start = new Date(event.start.date);
				const end = new Date(event.end.date);
				const dateRange = eachDayOfInterval({ start, end });
				return dateRange;
			}) ?? []
		);
	}, [events]);

	const handleDateChange = (date: Date | null, id: string) => {
		if (date) {
			setFormData((prevData) => ({
				...prevData,
				[id]: date.toLocaleDateString(undefined, {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				}),
			}));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		switch (id) {
			case 'numberOfGuests':
				setFormData((prevData) => ({
					...prevData,
					[id]: parseInt(value),
				}));
				break;
			case 'numberOfAdults':
				setFormData((prevData) => ({
					...prevData,
					[id]: parseInt(value),
				}));
				break;
			case 'numberOfChildren':
				setFormData((prevData) => ({
					...prevData,
					[id]: parseInt(value),
				}));
				break;
			default:
				setFormData((prevData) => ({
					...prevData,
					[id]: value,
				}));
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

		switch (formData.hunt.title) {
			case 'Waterfowl':
				if (formData.numberOfDays < 3) {
					newErrors.numberOfDays = 'Hunts must no more than 3 days';
				}
				break;
			case 'Spring Turkey':
				if (formData.numberOfDays !== 3) {
					newErrors.numberOfDays = 'Hunts must be 3 days';
				}
				break;
			case 'Whitetail Doe':
				if (formData.numberOfDays !== 3) {
					newErrors.numberOfDays = 'Hunts must be 3 days';
				}
				break;
			case 'Whitetail Buck':
				if (formData.numberOfDays !== 3) {
					newErrors.numberOfDays = 'Hunts must be 3 days';
				}
				break;
			default:
				break;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const checkBookingUser = async (): Promise<UserType | GuestType> => {
		const guest = getLocalGuestData();
		const user = getLocalUserData();

		const currentUser = userState.user ?? user.user?.user ?? guest.guest;

		if (currentUser) {
			dispatch({
				type: 'SET_CURRENT_BOOKING',
				payload: {
					...state.currentBooking,
					user: currentUser,
				} as BookingType,
			});
			return currentUser;
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

	const calculateTotalPrice = () => {
		switch (formData.hunt.title) {
			case 'Whitetail Doe':
				return price;
			case 'Whitetail Buck':
				return price;
			case 'Spring Turkey':
				return formData.numberOfGuests * price;
			case 'Waterfowl':
				return formData.numberOfGuests * price;
			default:
				return 0;
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		(async () => {
			try {
				if (validateForm()) {
					formData.numberOfDays =
						differenceInCalendarDays(
							new Date(formData.endDate),
							new Date(formData.startDate)
						) + 1;
					formData.totalPrice = calculateTotalPrice();
					formData.deposit = formData.totalPrice * 0.5;
					formData.bookingStatus = 'pending';
					formData.user = formData.user
						? formData.user
						: await checkBookingUser();
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

	return (
		<section className='booking-form-section'>
			<h2 className='booking-form-title'>Booking Your {title} Hunt</h2>
			<form className='booking-form' onSubmit={handleSubmit}>
				<div className='booking-form-group'>
					<h3 className='booking-form-heading'>Guests</h3>
					<label className='booking-form-label' htmlFor='numberOfGuests'>
						Number of Guests
					</label>
					<div className='input-with-error'>
						<input
							className={`booking-form-input ${
								errors.numberOfGuests ? 'error-input' : ''
							}`}
							type='number'
							id='numberOfGuests'
							min={1}
							max={maxGuests}
							value={
								formData.numberOfGuests
									? formData.numberOfGuests
									: state.currentBooking?.numberOfGuests
							}
							onChange={handleChange}
						/>
						{errors.numberOfGuests && (
							<FaExclamationCircle
								className='error-icon'
								title={errors.numberOfGuests}
							/>
						)}
					</div>
					{formData.numberOfGuests > 1 && (
						<>
							<label className='booking-form-label' htmlFor='numberOfAdults'>
								Number of Adults
							</label>
							<div className='input-with-error'>
								<input
									className={`booking-form-input ${
										errors.numberOfAdults ? 'error-input' : ''
									}`}
									type='number'
									id='numberOfAdults'
									min={1}
									max={formData.numberOfGuests - formData.numberOfChildren}
									value={
										formData.numberOfAdults
											? formData.numberOfAdults
											: state.currentBooking?.numberOfAdults
									}
									onChange={handleChange}
								/>
								{errors.numberOfAdults && (
									<FaExclamationCircle
										className='error-icon'
										title={errors.numberOfAdults}
									/>
								)}
							</div>
							<label className='bookingFormLabel' htmlFor='numberOfChildren'>
								Number of Children
							</label>
							<div className='input-with-error'>
								<input
									className={`booking-form-input ${
										errors.numberOfChildren ? 'error-input' : ''
									}`}
									type='number'
									id='numberOfChildren'
									value={
										formData.numberOfChildren
											? formData.numberOfChildren
											: state.currentBooking?.numberOfChildren
									}
									min={0}
									max={formData.numberOfGuests - formData.numberOfAdults}
									onChange={handleChange}
								/>
								{errors.numberOfChildren && (
									<FaExclamationCircle
										className='error-icon'
										title={errors.numberOfChildren}
									/>
								)}
							</div>
						</>
					)}
					{formData.numberOfChildren > 0 && (
						<>
							<p className='booking-form-note'>
								Children must be 13 years of age or older & must be accompanied
								by a legal guardian.
							</p>
						</>
					)}
				</div>
				<div className='booking-form-group'>
					<h3 className='booking-form-heading'>Select Dates</h3>
					<label className='booking-form-label' htmlFor='startDate'>
						Start Date
					</label>
					<DatePicker
						selected={
							formData.startDate
								? new Date(formData.startDate)
								: state.currentBooking?.startDate
								? new Date(state.currentBooking.startDate)
								: null
						}
						onChange={(date) => handleDateChange(date, 'startDate')}
						excludeDates={unavailableDates}
						dateFormat='yyyy-MM-dd'
						className='booking-form-input'
					/>
					<label className='booking-form-label' htmlFor='endDate'>
						End Date
					</label>
					<div className='input-with-error'>
						<DatePicker
							selected={
								formData.endDate
									? new Date(formData.endDate)
									: state.currentBooking?.endDate
									? new Date(state.currentBooking.endDate)
									: null
							}
							onChange={(date) => handleDateChange(date, 'endDate')}
							excludeDates={unavailableDates}
							dateFormat='yyyy-MM-dd'
							className='booking-form-input'
						/>
						{errors.endDate && (
							<FaExclamationCircle
								className='error-icon'
								title={errors.endDate}
							/>
						)}
						{errors.numberOfDays && (
							<FaExclamationCircle
								className='error-icon'
								title={errors.numberOfDays}
							/>
						)}
						{formData.numberOfDays < 3 && (
							<p className='booking-form-note'>
								Hunts less than 3 days are subject to confirmation by guide. You
								will be contacted soon about your reservation.
							</p>
						)}
					</div>
				</div>
				<div className='booking-form-group'>
					<h3 className='booking-form-heading'>Hunting Method</h3>
					{hunting_methods?.map((method) => (
						<div key={method.id} className='booking-form-checkbox'>
							<input
								type='checkbox'
								id={`huntingMethod-${method.id}`}
								name='huntingMethod'
								value={method.method}
								checked={
									formData.huntingMethods
										? Array.isArray(formData.huntingMethods) &&
										  formData.huntingMethods.some(
												(m) => m.method === method.method
										  )
										: state.currentBooking?.huntingMethods
										? Array.isArray(state.currentBooking.huntingMethods) &&
										  state.currentBooking.huntingMethods.some(
												(m) => m.method === method.method
										  )
										: false
								}
								onChange={(e) => {
									const { checked, value } = e.target;
									setFormData((prevData) => {
										const updatedMethods: hunting_methodType[] = checked
											? [
													...prevData.huntingMethods,
													{ method: value as huntingMethod },
											  ]
											: prevData.huntingMethods.filter(
													(method) => method.method !== value
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
						<div className='error-message'>
							<FaExclamationCircle className='error-icon' />
							{errors.huntingMethods}
						</div>
					)}
				</div>
				<button className='booking-form-submit' type='submit'>
					Submit
				</button>
			</form>
		</section>
	);
};
export default BookingForm;
