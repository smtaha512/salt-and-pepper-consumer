import { BaseEntityInterface } from './base-entity.interface';
import { OrderItemInterface } from './order-item.interface';
import { OrderStatausEnum } from './order-status.enum';
import { ConsumerInterface } from './users.interface';

export interface OrderInterface extends BaseEntityInterface {
  eta: Date;
  finalisedAt: Date;
  items: OrderItemInterface[];
  notes: string;
  status: OrderStatausEnum;
  total: number;
  userId: string | ConsumerInterface;
}
