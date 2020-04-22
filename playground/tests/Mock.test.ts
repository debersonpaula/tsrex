import { MockData } from '../mock/MockData';
import { Mock } from '../mock/Mock';

describe('test Mock class', () => {
  let mock: Mock;

  beforeAll(() => {
    mock = new Mock();
  });
  // -------------------------------------------------------
  describe('testing mock', () => {
    it('mock should have currentValue', () => {
      expect(mock.data.currentValue).toBe('WORKING');
    });
  });
  // -------------------------------------------------------
});
