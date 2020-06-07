import { ItemInterface } from './item.interface';
import { PreferencesEnum } from './preferences.enum';

export interface OrderItemInterface extends ItemInterface {
  notes: string;
  preference: PreferencesEnum;
  quantity: number;
}
