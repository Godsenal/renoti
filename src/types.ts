import { ReactNode, CSSProperties } from 'react';
// Default notifiaction type
/*
  id: Noti unique id
  message: Message in noti
  timeout: time for showing noti
  animation: animation for show/end
  position: where to show noti
  renderNoti: custom noti renderer
  pauseOnHover: hover to pause
  closeOnClick: click to close
  showCloseBtn: show close button or not
  close: flag close to noti
  type: type of noti (background Color)
  style: cutsom style (react inline style)
*/
export interface NotiType {
  id: number;
  message: string;
  timeout: number;
  animation: string;
  position: Position;
  type: Type;
  close?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  renderNoti?: (closeNoti: () => void) => ReactNode;
  showCloseBtn?: boolean;
  style?: CSSProperties | undefined;
  onClose?: () => void;
}
// Seperate noti by position
export type Noties = Record<Position, NotiType[]>;
// getNoti func
export type GetNoties = () => NotiType[];
// subscribe notifier
export type Listener = (getNoties: GetNoties) => void;
// noti types
export type Type = 'success' | 'error' | 'warning' | 'default';
// noti positions
export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
