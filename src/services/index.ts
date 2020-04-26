import { defs as recruitmentDefs, recruitment } from './recruitment';

(global as any).defs = {
  recruitment: recruitmentDefs
};
(global as any).API = {
  recruitment
};
