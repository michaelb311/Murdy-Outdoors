import { HuntItemType } from './huntTypes';

export interface ProductCardProps {
	hunt: {
		attributes: HuntItemType;
	};
}

export interface FormProps {
	hunt: Partial<HuntItemType>;
}
