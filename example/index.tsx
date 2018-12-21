import React, { Component, Fragment, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import * as Noti from '../src';
import './index.css';

const notifier = Noti.createNotifier();

const POSITION = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];
const ANIMATION = ['pop', 'rotate', 'flip', 'slide', ''];
type CheckType = 'disablePortal' | 'pauseOnHover' | 'closeOnClick';
const CHECK: CheckType[] = ['closeOnClick', 'pauseOnHover', 'disablePortal'];
interface AppState {
  type: string;
  disablePortal: boolean;
  pauseOnHover: boolean;
  closeOnClick: boolean;
  timeout: number;
  animation: string;
  position: string;
  style: CSSProperties;
}
class App extends Component<{}, AppState> {
  state: AppState = {
    type: 'default',
    disablePortal: false,
    pauseOnHover: false,
    closeOnClick: true,
    timeout: 3000,
    animation: 'slide_left',
    position: 'top-left',
    style: {},
  };
  handleAnimation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      animation: e.target.value,
    });
  };
  handleDisablePortal = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      disablePortal: e.target.checked,
    });
  };
  handleCheck = (check: CheckType) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [check]: e.target.checked,
    } as Pick<AppState, CheckType>);
  };
  handlePosition = (position: string) => () => {
    this.setState({
      position,
    });
  };
  handleTimeout = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      timeout: parseInt(e.target.value, 10),
    });
  };
  notify = () => {
    notifier.notify({
      ...(this.state as any),
      message: 'Hello!',
    });
  };
  closeAll = () => {
    notifier.closeAll();
  };
  render() {
    const { animation, disablePortal, position, timeout } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {POSITION.map((pos, i) => (
              <Fragment key={i}>
                <input
                  key={i}
                  type="radio"
                  id={pos}
                  name={pos}
                  value={pos}
                  checked={position === pos}
                  onChange={this.handlePosition(pos)}
                />
                <label htmlFor={pos}>{pos}</label>
              </Fragment>
            ))}
          </div>
          <div>
            <select value={animation} onChange={this.handleAnimation}>
              {ANIMATION.map(anime => (
                <option key={anime} value={anime}>
                  {anime}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="number"
              id="timeout"
              name="timeout"
              value={timeout}
              onChange={this.handleTimeout}
            />
            <label htmlFor="timeout">timeout</label>
          </div>
          <div>
            {CHECK.map(check => (
              <Fragment key={check}>
                <input
                  type="checkbox"
                  id={check}
                  name={check}
                  checked={this.state[check as keyof Pick<AppState, CheckType>]}
                  onChange={this.handleCheck(check)}
                />
                <label htmlFor={check}>{check}</label>
              </Fragment>
            ))}
          </div>
          <button onClick={this.notify}>Noti!</button>
          <button onClick={this.closeAll}>Close All</button>
          <Noti.NotiPortal notifier={notifier} disablePortal={disablePortal} />
        </header>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
