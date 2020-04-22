import { MockFunction } from './MockFunction';

export class MockData {
  currentValue: string;

  constructor() {
    this.currentValue = MockFunction();
  }
}
