import { hot } from 'react-hot-loader';

export function reactHot(reactClass: React.ComponentType) {
  if (process.env.NODE_ENV === 'development') {
    return hot(module)(reactClass);
  }
  return reactClass;
}