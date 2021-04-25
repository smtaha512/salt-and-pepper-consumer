import { AdminInterface } from 'library/library';

export type SigninInterface = Pick<AdminInterface, 'username' | 'password'>;

export interface AuthenticationResponseInterface {
  body: AdminInterface;
  token: string;
}
