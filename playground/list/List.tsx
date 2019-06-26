import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { ListModel } from './ListModel';
import { modelStore } from '../modelStore';

class ModelProps {
  @Inject listModel: ListModel;
}
type Props = Partial<ModelProps>;

@Connection({
  modelStore,
  props: ModelProps
})
export class List extends React.Component<Props> {
  render() {
    const { listModel } = this.props;
    return (
      <div>
        Example of Dependency
        <br />
        <button onClick={listModel.add}>Add Item</button>
        <br />
        <ul>
          {listModel.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
