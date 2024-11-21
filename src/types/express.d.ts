declare namespace Express {
  export interface AuthRequest extends Request {
    userId?: string;
  }
}
