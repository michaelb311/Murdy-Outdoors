import { HuntItemType } from './huntTypes';

export interface ProductCardProps {
	hunt: HuntItemType;
	index: number;
}

export interface FormProps {
	hunt: HuntItemType;
}

export type ObjectFitType =
	| 'fill'
	| 'contain'
	| 'cover'
	| 'none'
	| 'scale-down';
