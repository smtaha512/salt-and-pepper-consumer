import { BaseEntityInterface } from './base-entity.interface';
import { UserTypeEnum } from './user-type.enum';

export interface BaseUserInterface extends BaseEntityInterface {
  avatar: string;
  type: UserTypeEnum;
  username: string;
  email: string;
  password: string;
  lastPolledAt: string;
}

export interface ConsumerInterface extends BaseUserInterface {
  contact: string;
  type: UserTypeEnum.USER;
  firstname: string;
  lastname: string;
}

export interface AdminInterface extends BaseUserInterface {
  type: UserTypeEnum.ADMIN;
}

export type UsersInterface = ConsumerInterface | AdminInterface;
