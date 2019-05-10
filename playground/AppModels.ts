import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';

export const appModels = new ModelStore({
  devExtension: process.env.isEnvDevelopment == 'true',
  models: [CounterModel]
});
