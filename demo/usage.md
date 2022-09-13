---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LV3Editor from 'l-v3-editor';

class App extends Component {
  render() {
    return (
      <div>
        <LV3Editor />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
```
