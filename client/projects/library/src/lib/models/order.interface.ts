import { BaseEntityInterface } from './base-entity.interface';
import { ItemInterface } from './item.interface';
import { OrderStatausEnum } from './order-status.enum';

export interface OrderInterface extends BaseEntityInterface {
  eta: Date;
  finalisedAt: Date;
  items: ItemInterface[];
  notes: string;
  status: OrderStatausEnum;
  total: number;
  userId: string;
}
