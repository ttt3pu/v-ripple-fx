# v-ripple-fx

## Usage

```js
import Vue from 'vue';

import vRippleFx from 'v-ripple-fx';
import 'v-ripple-fx/build/style.css';

Vue.use(vRippleFx);
```

```html
<a href="foo" v-ripple-fx>Ripple!</a>

<!-- options -->
<a
  :href="href"
  v-ripple-fx="{
    enableWhen: href.length ? true: false,
  }"
>
  Ripple enabled when has href.
</a>

<a
  href="/foo"
  v-ripple-fx="{
    disableRedirect: true,
  }"
>
  Don't redirect.
</a>
```
