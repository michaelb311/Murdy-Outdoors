export type huntingMethod = 'Bow' | 'Rifle' | 'Crossbow' | 'Muzzleloader';

export interface HuntingMethodType {
	id?: number | string;
	method: huntingMethod;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	documentId?: string;
	locale?: string | null;

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
	hunting_methods: HuntingMethodType[];
	inStock: boolean;
	maxGuests: number;
}

export interface HuntsResponseType {
	data: HuntItemType[];
}
