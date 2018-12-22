import { Type } from '../types';

type Color = Record<Type, string>;

const colorByType: Color = {
  default: '#065dec',
  success: '#1dd362',
  warning: '#f6ad0d',
  error: '#fa081f',
};

export const getColor = (type: Type) => colorByType[type];
export const changeColor = (type: Type, color: string) =>
  (colorByType[type] = color);
