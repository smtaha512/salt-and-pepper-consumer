import { BaseEntityInterface } from './base-entity.interface';
import { UserTypeEnum } from './user-type.enum';

export interface BaseUserInterface extends BaseEntityInterface {
  avatar: string;
  type: UserTypeEnum;
  username: string;
}

export interface ConsumerInterface extends BaseUserInterface {
  contact: string;
}

export interface AdminInterface extends BaseUserInterface {
  email: string;
  password: string;
}

export type UsersInterface = ConsumerInterface | AdminInterface;
