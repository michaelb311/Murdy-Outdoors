export type huntingMethod =
	| 'Bow'
	| 'Rifle'
	| 'Crossbow'
	| 'Muzzleloader'
	| 'Shotgun';

export interface hunting_methodType {
	id?: number | string;
	method: huntingMethod;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	documentId?: string;
}

export interface HuntItemType {
	id?: string | number;
	documentId?: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	rating: number;
	stockCount: number;
	hunting_methods: hunting_methodType[];
	inStock: boolean;
	maxGuests: number;
}

export interface HuntsResponseType {
	data: HuntItemType[];
}
