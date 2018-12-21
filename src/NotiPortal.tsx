import React from 'react';
import { createPortal } from 'react-dom';
import NotiFactory from './NotiFactory';
import { Notifier } from './notifier';
import { NotiType } from './types';

const ROOT = 'renoti-root';
export interface NotiPortalProps {
  disablePortal?: boolean;
  notifier: Notifier;
  width: number | string;
}
interface NotiPortalState {
  noties: NotiType[];
}
class NotiPortal extends React.PureComponent<NotiPortalProps, NotiPortalState> {
  root: HTMLDivElement | undefined = undefined;
  state = {
    noties: [],
  };
  static defaultProps = {
    width: 300,
  };
  constructor(props: NotiPortalProps) {
    super(props);
    if (this.props.disablePortal) {
      return;
    }
    let root = document.getElementById(ROOT);
    if (root) {
      console.error(
        'NotiPortal can not be more then one in your App. It will have only one Portal.',
      );
    }
    root = document.createElement('div');
    root.id = ROOT;
    document.body.appendChild(root);
    this.root = root as HTMLDivElement;
    this.props.notifier.listen(getNoties => {
      const noties = getNoties();
      this.setState({
        noties,
      });
    });
  }
  render() {
    const { noties } = this.state;
    const { disablePortal, notifier } = this.props;
    const Factory = (
      <NotiFactory {...notifier} {...this.props} noties={noties} />
    );
    if (!this.root || disablePortal) {
      return Factory;
    }
    return createPortal(Factory, this.root);
  }
}

export default NotiPortal;
