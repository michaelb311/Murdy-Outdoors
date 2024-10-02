type huntingMethod = 'Bow' | 'Rifle' | 'Crossbow' | 'Muzzleloader';

export interface HuntItemType {
	id: string | number;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	rating: number;
	stockCount: number;
	huntingMethod: huntingMethod[];
	inStock: boolean;
}

export interface HuntsResponseType {
	data: HuntItemType[];
}
