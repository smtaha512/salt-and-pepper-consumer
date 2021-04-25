import { BaseEntityInterface } from './base-entity.interface';
import { CategoriesInterface } from './categories.interface';
import { ItemInterface } from './item.interface';

export interface MenuInterface extends BaseEntityInterface {
  categories: CategoriesInterface[];
  description: string;
  image: string;
  items: ItemInterface[] | string[];
  title: string;
}
