import React, { memo } from 'react';
import cx from 'classnames';
import { NotiType, Noties, Position } from './types';
import Noti from './Noti';
import { Notifier } from './notifier';
import { css, SerializedStyles } from '@emotion/core';

const top = css`
  top: 10px;
`;
const bottom = css`
  bottom: 10px;
`;
const center = css`
  left: 50%;
`;
const right = css`
  right: 10px;
`;
const left = css`
  left: 10px;
`;
const positionCSS: { [pos: string]: SerializedStyles } = {
  top,
  bottom,
  left,
  right,
  center,
};
const withoutPortal = css`
  position: absolute;
`;
const base = (width: number | string) => css`
  position: fixed;
  box-sizing: border-box;
  width: ${typeof width === 'number' ? width + 'px' : width};
`;
const centering = (width: number | string) => css`
  margin-left: calc(${typeof width === 'number' ? width + 'px' : width} / -2);
`;
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
              `Renoti__noti_factory${disablePortal && '_without_portal'}`,
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
