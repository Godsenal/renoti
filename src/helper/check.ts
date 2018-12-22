import { Position, Type } from '../types';

const TYPE: Type[] = ['default', 'error', 'success', 'warning'];
const POSITION: Position[] = ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'];
const checkPosition = (pos: string) => {
  return POSITION.some(val => val === pos);
}
const checkType = (type: string) => {
  return TYPE.some(val => val === type);
}

export {
  checkPosition,
  checkType
};
