export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
