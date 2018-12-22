import * as Types from '../src/types';

const ANIMATION = ['pop', 'rotate', 'flip', 'slide'];
const POSITION: Types.Position[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];
const TYPE: Types.Type[] = ['default', 'error', 'success', 'warning'];

const entities: { [key: string]: string[] } = {
  Animation: ANIMATION,
  Position: POSITION,
  Type: TYPE,
};

export default entities;
