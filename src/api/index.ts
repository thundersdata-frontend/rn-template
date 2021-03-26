import { defs as authorizationDefs, authorization } from './authorization';

(global as any).defs = {
  authorization: authorizationDefs,
};
(global as any).API = {
  authorization,
};
