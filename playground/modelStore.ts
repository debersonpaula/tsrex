import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';

export const modelStore = new ModelStore({
  devExtension: process.env.NODE_ENV === 'development',
  models: [CounterModel, ListModel]
});
