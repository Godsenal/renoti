import * as check from './helper/check';
import { changeColor } from './helper/color';
import { NotiType, Listener, Type } from './types';

function createNotifier(init?: Partial<NotiType>) {
  let id = 0;
  let noties: NotiType[] = [];
  let listeners: Listener[] = [];

  const baseNoti: NotiType = {
    id,
    animation: 'pop',
    message: '',
    timeout: 3000,
    type: 'default',
    position: 'top-left',
    closeOnClick: true,
    pauseOnHover: false,
    showCloseBtn: false,
    ...init,
  };
  function getNoties() {
    return noties;
  }
  function listen(listener: Listener) {
    listeners = [...listeners, listener];
  }
  function inform() {
    listeners.forEach(listener => {
      listener(getNoties);
    });
  }
  function notify(noti: Partial<NotiType>) {
    const newNoti = {
      ...baseNoti,
      id: id++,
      ...noti,
    };
    if (!check.checkType(newNoti.type)) {
      newNoti.type = baseNoti.type;
    }
    if (!check.checkPosition(newNoti.position)) {
      newNoti.position = baseNoti.position;
    }
    noties = [...noties, newNoti];
    inform();
    return newNoti.id;
  }
  function changeTypeColor(type: Type, color: string) {
    changeColor(type, color);
  }
  function closeNoti(notiId: number) {
    noties = noties.filter(noti => noti.id !== notiId);
    inform();
  }
  function closeAll() {
    noties = noties.map(noti => ({ ...noti, close: true }));
    inform();
  }

  return {
    getNoties,
    listen,
    notify,
    changeTypeColor,
    closeNoti,
    closeAll,
  };
}

export type Notifier = ReturnType<typeof createNotifier>;
export default createNotifier;
