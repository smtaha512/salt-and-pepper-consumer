import { AdminInterface } from 'library/library';

export type SigninInterface = Pick<AdminInterface, 'email' | 'password'>;

export interface AuthenticationResponseInterface {
  body: AdminInterface;
  token: string;
}
