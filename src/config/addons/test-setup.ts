import enzyme from 'enzyme';
// tslint:disable-next-line: no-var-requires
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
