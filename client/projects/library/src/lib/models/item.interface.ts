import { BaseEntityInterface } from './base-entity.interface';
import { PreferencesEnum } from './preferences.enum';

export interface ItemInterface extends BaseEntityInterface {
  categoryId: string;
  description: string;
  eta: string;
  image: string;
  menuId: string;
  preferences: PreferencesEnum;
  price: number;
  title: string;
}
