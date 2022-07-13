import { authorization, defs as authorizationDefs } from './authorization';

(global as any).defs = {
  authorization: authorizationDefs,
};
(global as any).API = {
  authorization,
};
