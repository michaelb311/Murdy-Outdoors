import { LodgingType } from '../Types/lodgingTypes';

const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const token = import.meta.env.VITE_DATABASE_TOKEN as string;

export const getLodging = async () => {
	const response = await fetch(`${baseURL}/lodging?populate=*`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	console.log('lodging response', response);

	const data = (await response.json()) as LodgingType[];

	return data;
};
