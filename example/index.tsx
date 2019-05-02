import React, { Component, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Entity } from './components';
import * as Noti from '../src';
import '../scss/main.scss';
import './index.css';

const notifier = Noti.createNotifier();

type BasicType = 'type' | 'animation' | 'position' | 'message';
type CheckType =
  | 'disablePortal'
  | 'pauseOnHover'
  | 'closeOnClick'
  | 'closeCallback'
  | 'showCloseBtn';
const CHECK: CheckType[] = [
  'closeOnClick',
  'pauseOnHover',
  'disablePortal',
  'closeCallback',
  'showCloseBtn',
];
interface AppState {
  message: string;
  type: string;
  disablePortal: boolean;
  pauseOnHover: boolean;
  closeOnClick: boolean;
  closeCallback: boolean;
  showCloseBtn: boolean;
  timeout: number;
  animation: string;
  position: string;
  style: CSSProperties;
}
class App extends Component<{}, AppState> {
  state: AppState = {
    type: 'default',
    message: 'hello ! 👋',
    disablePortal: false,
    pauseOnHover: false,
    closeOnClick: true,
    closeCallback: false,
    showCloseBtn: false,
    timeout: 3000,
    animation: 'pop',
    position: 'top-left',
    style: {},
  };
  handleBasic = (basic: BasicType) => (value: string) => {
    this.setState({
      [basic]: value,
    } as Pick<AppState, BasicType>);
  };
  handleCheck = (check: CheckType) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [check]: e.target.checked,
    } as Pick<AppState, CheckType>);
  };
  handleTimeout = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      timeout: parseInt(e.target.value, 10),
    });
  };
  notify = () => {
    notifier.notify({
      ...(this.state as any),
      onClose: this.state.closeCallback && this.onClose,
    });
  };
  closeAll = () => {
    notifier.closeAll();
  };
  onClose = () => {
    alert('Noti closed!');
  };
  render() {
    const {
      disablePortal,
      position,
      animation,
      type,
      timeout,
      message,
    } = this.state;
    return (
      <div className="container">
        <h1 className="title">renoti</h1>
        <div className="entities">
          <div className="entity fullwidth center">
            <h2 className="sub_header">Message</h2>
            <input
              className="message"
              placeholder="type your message!"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleBasic('message')(e.target.value)
              }
            />
          </div>
          <Entity
            name="Position"
            entity={position}
            handleChange={this.handleBasic('position')}
          />
          <Entity
            name="Animation"
            entity={animation}
            handleChange={this.handleBasic('animation')}
          />
          <Entity
            name="Type"
            entity={type}
            handleChange={this.handleBasic('type')}
          />
          <div className="entity">
            <h2 className="sub_header">Timeout</h2>
            <input
              type="number"
              id="timeout"
              name="timeout"
              value={timeout}
              onChange={this.handleTimeout}
            />
            <p>* 0 to disable timeout</p>
          </div>
          <div className="entity">
            <h2 className="sub_header">Options</h2>
            {CHECK.map(check => (
              <div className="item" key={check}>
                <input
                  type="checkbox"
                  id={check}
                  name={check}
                  checked={this.state[check as keyof Pick<AppState, CheckType>]}
                  onChange={this.handleCheck(check)}
                />
                <label>{check}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="actions">
          <button onClick={this.notify}>Noti!</button>
          <button onClick={this.closeAll}>Close All</button>
        </div>
        <div className={`relative_container ${disablePortal && 'active'}`}>
          {disablePortal && 'NotiPortal is here!'}
          <Noti.NotiPortal notifier={notifier} disablePortal={disablePortal} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
