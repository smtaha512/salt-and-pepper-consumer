import { BaseEntityInterface } from './base-entity.interface';

export interface ItemInterface extends BaseEntityInterface {
  categoryId: string;
  description: string;
  eta: string;
  image: string;
  menuId: string;
  preferences: string[];
  price: number;
  title: string;
  defaultPreference: string;
}
