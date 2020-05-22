import { BaseEntityInterface } from './base-entity.interface';
import { ItemInterface } from './item.interface';

export interface MenuInterface extends BaseEntityInterface {
  description: string;
  image: string;
  items: ItemInterface[] | string[];
  title: string;
}
