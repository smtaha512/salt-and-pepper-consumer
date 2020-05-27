import { BaseEntityInterface } from './base-entity.interface';
import { PreferencesEnum } from './preferences.enum';

export interface ItemInterface extends BaseEntityInterface {
  description: string;
  image: string;
  menuId: string;
  name: string;
  preferences: PreferencesEnum;
  price: number;
  timeToCook: string;
}
