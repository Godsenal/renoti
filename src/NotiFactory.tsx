import React, { memo } from 'react';
import cx from 'classnames';
import { NotiType, Noties, Position } from './types';
import Noti from './Noti';
import { Notifier } from './notifier';

export interface NotiFactoryProps {
  width: number | string;
  disablePortal?: boolean;
  noties: NotiType[];
}
const NotiFactory: React.SFC<NotiFactoryProps & Notifier> = ({
  disablePortal,
  width,
  noties,
  ...props
}) => {
  const notiByPos: Noties = {
    'bottom-center': [],
    'bottom-left': [],
    'bottom-right': [],
    'top-center': [],
    'top-left': [],
    'top-right': [],
  };
  noties.forEach(noti => notiByPos[noti.position].push(noti));
  return (
    <React.Fragment>
      {Object.keys(notiByPos).map(position => {
        const parsedPos = position.split('-');
        const assertion = position as Position;
        // when user set width manually
        const notDefaultWidth =
          typeof width === 'number' ? width + 'px' : width;
        const notDefaultWidthStyle =
          width !== 300
            ? {
                width: notDefaultWidth,
                marginLeft: `calc(${notDefaultWidth} / -2)`,
              }
            : undefined;
        if (notiByPos[assertion].length <= 0) {
          return null;
        }
        return (
          <div
            key={position}
            className={cx(
              'Renoti__noti_factory',
              disablePortal ? 'Renoti__noti_factory_without_portal' : '',
              `Renoti__${parsedPos[0]}`,
              `Renoti__${parsedPos[1]}`,
            )}
            style={notDefaultWidthStyle}
          >
            {notiByPos[assertion].map(noti => (
              <Noti key={noti.id} {...noti} {...props} />
            ))}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default memo(NotiFactory);
