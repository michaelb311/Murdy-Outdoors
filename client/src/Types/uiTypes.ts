import { HuntItemType } from './huntTypes';

export interface ProductCardProps {
	hunt: HuntItemType;
}

export interface FormProps {
	hunt: Partial<HuntItemType>;
}
