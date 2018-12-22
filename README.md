# renoti

Simple noti for react

## Demo

[https://godsenal.github.io/renoti](https://godsenal.github.io/renoti/)

## Installation

renoti requires **React 16.3 or later.**

```
npm install --save renoti
```

## Documentation

Basic
```jsx
import React from 'react';
import { createNotifier, NotiPortal } from 'renoti';

const notifier = createNotifier();

class App extends React.Component {
  notify = () => {
    notifier.notify({
      message: 'hello!',
      timeout: 3000,
    });
  };
  render() {
    return (
      <div>
        <NotiPortal notifier={notifier} /> {/* Anywhere you want*/}
        <button onClick={this.notify}>Notify!</button>
      </div>
    );
  }
}
```
You can apply default options for noties. **Timeout 0 will disable timeout close.**
```js
const notifier = createNotifier({
  timeout: 5000,
  closeOnClick: false,
  pauseOnHover: true,
  position: 'bottom-right',
});
```

Customize noti style with css in js.
```js
notifier.notify({
  style: {
    backgroundColor: 'black',
  }
})
```
Or make custom renderer for noti. It will give you **closeNoti function** as callback.
```jsx
notifier.notify({
  renderNoti: (closeNoti) => (
    <div>
      <button onClick={closeNoti}>X</button>
      hello!
    </div>
  )
})
```

You can add custom animation by className. If you set `pop` as animation option, it will look for `pop_start` and `pop_end` for start animation and end animation.

```css
@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}
.slide_left_start {
  animation: slide-in-left 0.3s;
}
.slide_left_end {
  animation: slide-out-left 0.3s;
}
```
```jsx
notifier.notify({
  animation: 'slide_left',
  type: 'success',
});
```


## Api

**NotiOptions**

| option       |                                         type                                          |  default   |
| ------------ | :-----------------------------------------------------------------------------------: | :--------: |
| message      |                                        string                                         |  'hello!   |
| timeout      |                                        number                                         |    3000    |
| animation    |                   'pop','rotate','flip','slide' or custom css class                   |   'pop'    |
| position     | 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center' | 'top-left' |
| type         |                       'default', 'success', 'error', 'warning'                        | 'default'  |
| closeOnClick |                                        boolean                                        |    true    |
| pauseOnHover |                                        boolean                                        |   false    |
| showCloseBtn |                                        boolean                                        |   false    |
| style        |                                   CSS style object                                    | undefined  |
| onClose      |                                       function                                        | undefined  |
| renderNoti   |                                       function                                        | undefined  |

**createNotifier(NotiOptions?)**

You can make notifier with default noti options. This options will be applied to **every noti as default**.
```js
const notifier = createNotifier({ message: 'default message', position: 'bottom-right' });
```
**NotiPortal**

props

| props          | description                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| notifier       | notifier instance created by `createNotifier`                                                         |
| disablePortal? | set `true` to make noti doesn't fixed to body. It will have `absolute` position. **default: `false`** |
| width?         | width of noti's container. **default: `3000`**                                                        |

**notifier.notify(NotiOptions?)**

create noti with NotiOptions. It will use `createNotifier` options as default.

**notifier.close(notiId)**

close noti with id.

**notifier.closeAll()**

close all noti.

**notifier.changeTypeColor(type, color)**

change type's ('default', 'success', 'error', 'warning') default color.
