import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Counter } from '../counter/Counter';
import { Provider } from 'react-redux';
import { appModels } from '../AppModels';

describe('Counter', () => {
  let rendered: ReactWrapper;

  afterEach(() => {
    rendered.unmount();
  });
  // -------------------------------------------------------
  it('should match snapshot', () => {
    rendered = mount(
      <Provider store={appModels.createStore()}>
        <Counter />
      </Provider>
    );
    expect(rendered).toMatchSnapshot();
    expect(rendered.find('button').length).toEqual(1);
    rendered.find('button').simulate('click');
  });
  // -------------------------------------------------------
});
