import { Request } from 'express';
import { JSONStringParser } from '../../utils/commonUtils';

interface UserContext {
  id?: string
  username?: string
}

export interface AppHeaderContext {
  userContext?: UserContext;
}

export const buildAppHeaderContext = ({ req }: { req: Request }): AppHeaderContext => {
  return {
    userContext: JSONStringParser(req.headers['user-context']),
  };
};