import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { modelStore } from '../modelStore';
import { CounterModel } from './CounterModel';

class ModelProps {
  @Inject counterModel?: CounterModel;
}

@Connection({
  modelStore,
  props: ModelProps,
})
export class Counter extends React.Component<ModelProps> {
  render() {
    const { counterModel } = this.props;
    return (
      <div>
        Counter = {counterModel.counter}
        <br />
        <button onClick={counterModel.add}>Add</button>
        <br />
      </div>
    );
  }
}
