import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FaPersonRifle } from 'react-icons/fa6';
import { IoCalendar } from 'react-icons/io5';
import { ObjectFitType } from '../../../../Types/uiTypes';
import { useEffect, useState } from 'react';
import { UserBookingCardProps } from '../../../../Types/uiTypes';
import './styles.css';
const UserBookingCard: React.FC<UserBookingCardProps> = ({ booking }) => {
	console.log(booking);
	const { hunt, startDate, endDate, numberOfGuests } = booking;
	const { title, description, imageUrl } = hunt;
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	let fit: ObjectFitType;
	let position: string;

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	switch (hunt.title) {
		case 'Whitetail Doe': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 10%';
			}
			break;
		}
		case 'Whitetail Buck': {
			if (isMobile) {
				fit = 'none';
				position = '40% 35%';
			} else {
				fit = 'none';
				position = '20% 22%';
			}
			break;
		}
		case 'Waterfowl': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 50%';
			}
			break;
		}
		case 'Spring Turkey': {
			if (isMobile) {
				fit = 'cover';
				position = '50% 10%';
			} else {
				fit = 'cover';
				position = '50% 10%';
			}
			break;
		}
		default: {
			fit = 'cover';
			position = '50% 10%';
			break;
		}
	}

	return (
		<article className='bookingCard'>
			<h2 className='bookingCardTitle'>{title}</h2>
			<ReactMarkdown className='bookingCardBody'>{`${
				description?.slice(0, 100) || ''
			}...`}</ReactMarkdown>
			<div className='bookingCardSymbolsContainer'>
				<div className='bookingCardSymbol'>
					<div className='bookingCardGuestCount'>
						<span>
							<FaPersonRifle />
						</span>
						<span className='cardGuestCount'>{`${numberOfGuests} ${
							numberOfGuests > 1 ? 'People' : 'Person'
						}`}</span>
					</div>
				</div>
				<div className='bookingCardSymbol'>
					<div className='bookingCardDateRange'>
						<span>
							<IoCalendar />
						</span>
						<span className='bookingCardDateRangeText'>{`${startDate} - ${endDate}`}</span>
					</div>
				</div>
			</div>
			<img
				className='bookingCardImage'
				src={imageUrl}
				alt='booking card image'
				style={{
					objectFit: fit,
					objectPosition: position,
				}}
			/>
		</article>
	);
};
export default UserBookingCard;
