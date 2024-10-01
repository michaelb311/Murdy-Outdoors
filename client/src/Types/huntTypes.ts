type huntingMethod = 'Bow' | 'Rifle' | 'Crossbow' | 'Muzzleloader';

export interface HuntType {
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	rating: number;
	stockCount: number;
	huntingMethod: huntingMethod[];
	inStock: boolean;
}
