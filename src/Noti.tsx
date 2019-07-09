import React, { PureComponent } from 'react';
import cx from 'classnames';
import { NotiType } from './types';
import { Notifier } from './notifier';
import { NotiPortalProps } from './NotiPortal';

/*
  Noti 제거 flow
  timeout OR close -> handleTimeout 호출 (timeout = true) -> animation_end 실행 -> animation 종료 후 onAnimationEnd 실행 -> noti 제거
*/
type NotiProps = NotiType & Notifier & Partial<NotiPortalProps>;
class Noti extends PureComponent<NotiProps> {
  state = {
    timeout: false,
  };
  timer: number = 0;
  newTime: number = this.props.timeout; // reset time by pausing
  pauseTime: number = Date.now(); // elapsed time before pause
  unmounted = false;
  // mount 애니메이션을 위한 raf
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
  // close시 animation을 위해 바로 unmount하지 않고 handletimeout 호출
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
      className: cx(
        `${
          timeout ? `Renoti__${animation}_end` : `Renoti__${animation}_start`
        } Renoti__${animation}`,
      ),
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
    this.pauseTime = Date.now();
    console.log(this.newTime, this.pauseTime);
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
    const { className, ...baseProps } = this.getBaseProps();
    return (
      <div className={cx('Renoti__noti_container', className)} {...baseProps}>
        {renderNoti ? (
          renderNoti(this.handleTimeout)
        ) : (
          <div
            className={cx('Renoti__noti', `Renoti__noti_${type}`)}
            style={style}
          >
            {showCloseBtn && (
              <div
                className={cx('Renoti__noti_close_btn')}
                onClick={this.handleTimeout}
              >
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
