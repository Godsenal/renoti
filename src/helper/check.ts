import { Position, Type } from '../types';

const TYPE: Type[] = ['default', 'error', 'success', 'warning'];
const POSITION: Position[] = [
  'bottom-center',
  'bottom-left',
  'bottom-right',
  'top-center',
  'top-left',
  'top-right',
];

const checkPosition = (pos: Position) => {
  return POSITION.some(val => val === pos);
};
const checkType = (type: Type) => {
  return TYPE.some(val => val === type);
};

export { checkPosition, checkType };
