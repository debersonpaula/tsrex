import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';

export const appModels = new ModelStore({
  devExtension: process.env.NODE_ENV === 'development',
  models: [CounterModel]
});
