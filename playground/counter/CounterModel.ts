import { Action } from 'exredux';

export class CounterModel {
  counter = 0;

  @Action add() {
    this.counter += 1;
  }
}
