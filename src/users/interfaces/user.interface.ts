// The payload of the JWT will contain an object that fulfills AuthenticatedUserI interface.
export interface AuthenticatedUserI {
  id: number;
  username: string;
}
