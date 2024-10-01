import { HuntType } from '../Types/huntTypes';

const baseURL = import.meta.env.VITE_DATABASE_URL as string;
const token = import.meta.env.VITE_DATABASE_TOKEN as string;

export const getHunts = async () => {
	try {
		const response = await fetch(`${baseURL}/hunts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to fetch hunts: ${response.statusText}`);
		}

		const data = (await response.json()) as HuntType[];
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

export const getHuntById = async (id: string) => {
	try {
		const response = await fetch(`${baseURL}/hunt/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(response);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', errorText);
			throw new Error(`Failed to fetch hunts: ${response.statusText}`);
		}

		const data = (await response.json()) as HuntType;

		return data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
