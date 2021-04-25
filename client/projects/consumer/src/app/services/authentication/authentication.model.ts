import { ConsumerInterface } from 'dist/library';

export interface SigninInterface extends Pick<ConsumerInterface, 'firstname' | 'lastname' | 'contact' | 'email'> {
  code: string;
}

export interface AuthenticationResponseInterface {
  body: ConsumerInterface;
  token: string;
}
