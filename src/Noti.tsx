import React from 'react';
import { css } from '@emotion/core';
import { NotiType, Type } from './types';
import { Notifier } from './notifier';
import { NotiPortalProps } from './NotiPortal';
import { getColor } from './helper/color';
import './animation.css';

const baseWrapper = css`
  width: 100%;
  margin-bottom: 1rem;
`;
const baseContainer = css`
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  color: white;
  cursor: pointer;
`;
const baseType = (type: Type) => css`
  background-color: ${getColor(type)};
`;
const baseClose = css`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
type NotiProps = NotiType & Notifier & Partial<NotiPortalProps>;
class Noti extends React.Component<NotiProps> {
  state = {
    timeout: false,
  };
  timer: number = 0;
  newTime: number = this.props.timeout; // reset time by pausing
  pauseTime: number = Date.now(); // elapsed time before pause
  unmounted = false;
  componentDidMount() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this.props.timeout > 0) {
          this.timer = window.setTimeout(
            this.handleTimeout,
            this.props.timeout,
          );
        }
      });
    });
  }
  componentDidUpdate = (prevProps: NotiProps) => {
    if (this.props.close && prevProps.close !== this.props.close) {
      this.handleTimeout();
    }
  };
  componentWillUnmount() {
    this.unmounted = true;
  }
  getBaseProps = () => {
    const { timeout } = this.state;
    const { animation, pauseOnHover, closeOnClick } = this.props;
    let props = {
      className: `${
        timeout ? `${animation}_end` : `${animation}_start`
      } ${animation}`,
      onAnimationEnd: this.handleAnimationEnd,
      onClick: closeOnClick ? this.handleTimeout : undefined,
      onMouseEnter: pauseOnHover ? this.handleHover : undefined,
      onMouseLeave: pauseOnHover ? this.handleUnHover : undefined,
    };
    return props;
  };
  handleAnimationEnd = () => {
    if (this.state.timeout) {
      this.close();
    }
  };
  handleHover = () => {
    window.clearTimeout(this.timer);
    this.pauseTime = Date.now() - this.pauseTime;
  };
  handleUnHover = () => {
    this.newTime = this.newTime - this.pauseTime;
    this.timer = window.setTimeout(this.handleTimeout, this.newTime);
  };
  handleTimeout = () => {
    if (!this.unmounted) {
      if (!this.props.animation) {
        this.close();
        return;
      }
      this.setState({
        timeout: true,
      });
    }
  };
  close = () => {
    const { closeNoti, id, onClose } = this.props;
    onClose && onClose();
    closeNoti(id);
  };
  render() {
    const { style, message, renderNoti, type, showCloseBtn } = this.props;
    return (
      <div css={baseWrapper} {...this.getBaseProps()}>
        {renderNoti ? (
          renderNoti(this.handleTimeout)
        ) : (
          <div
            css={css`
              ${baseContainer}
              ${baseType(type)}
              ${css(style)}
            `}
          >
            {showCloseBtn && (
              <div css={baseClose} onClick={this.handleTimeout}>
                x
              </div>
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Noti;
