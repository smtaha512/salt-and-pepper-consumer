import { BaseEntityInterface } from './base-entity.interface';
import { ItemInterface } from './item.interface';

export interface CategoriesInterface extends Pick<BaseEntityInterface, '_id'> {
  description: string;
  image: string;
  items: ItemInterface[] | string[];
  title: string;
}
