<h1 align="center">Cron Expression Input</h1>

## Description

<strong>Cron Expression UI</strong>: Input component to generate cron expressions easily and intuitively, as in [crontab.guru](https://crontab.guru/)

### Previews

<div>
  <img src="https://i.ibb.co/xL2pHG9/cron-expression-input-1-0-2.png" alt="cron-expression-input" border="0">
  <img src="https://i.ibb.co/nD7CK4W/cron-expression-input-modal-1-0-2.png" alt="cron-expression-input-modal" border="0">
</div>

## Installation

Cron Expression Input is exported as an [UMD](https://github.com/umdjs/umd) module so it will work in an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](https://wiki.commonjs.org/wiki/CommonJS) or browser global context.

First, install the module:

```
npm install cron-expression-input
```

Then, depending upon your usage context, add a reference to it:

### ESM / Webpack / TypeScript

```js
import 'cron-expression-input';
import 'cron-expression-input/dist/locales/en.js';
import 'cron-expression-input/dist/cron-expression-input.min.css';
```

### Browser
The `cron-expression-input.min.js` file from the `/dist` folder in the npm package should be served to the browser.  There are no dependencies so you can simply include the library in a `<script>` tag.

```html
<link rel="stylesheet" href="cron-expression-input.min.css" />

<form>
    <cron-expression-input height="34px" width="250px" color="d58512" required hotValidate value="* * * * *">
    </cron-expression-input>
    <input type="submit" value="Send form" style="margin-top: 20px;" />
</form>

<script src="cron-expression-input.min.js" type="text/javascript"></script>
<script src="locales/en.js" type="text/javascript"></script>
```

### CDN

A simple way to load the library in a browser is by using the [unpkg](https://unpkg.com/) CDN, which is a
"fast, global content delivery network for everything on npm". To use it, include a script tag like this in your file:

```html
<script src="https://unpkg.com/cron-expression-input@2.0.0/dist/cron-expression-input.min.js" async></script>
<!-- Language (Optional) -->
<script src="https://unpkg.com/cron-expression-input@2.0.0/dist/locales/en.js" async></script>
```

Using the "latest" tag will result in a 302 redirect to the latest version tag so it is recommended to use a specific version tag such as https://unpkg.com/cron-expression-input@2.0.0/dist/cron-expression-input.min.js to avoid this redirect.

### React

```javascript
import 'cron-expression-input/dist/cron-expression-input.min.css';
/* Language (Optional) */
import 'cron-expression-input/dist/locales/en.js';
require('cron-expression-input');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cron: '* * * * *' };
    }

    render() {
        return (
            <div>
                <cron-expression-input
                  value={this.state.cron}
                  onInput={(e) => this.setState({ cron: e.nativeEvent.detail.value })}
                  color='d58512'
                  value={this.state.cron}
                  required
                  hotValidate />
            </div>
        );
    }
}

export default App;
```

### Vue

```javascript
<template>
  <div id="app">
    <cron-expression-input
      :value="cron"
      v-on:input="cron = $event.detail.value"
      color="d58512"
      :required="true"
      :hotValidate="true"
     />
  </div>
</template>

<script>
import 'cron-expression-input/dist/cron-expression-input.min.css';
import 'cron-expression-input/dist/locales/en.js'; /* Language (Optional) */
require('cron-expression-input'); /* JAVASCRIPT */

export default {
  name: 'App',
  data() {
    return {
      cron: '* * * * *'
    }
  }
}
</script>
```

## Component Attributes

You can pass various attributes to the component to modify its behavior, Example with color attribute: <cron-expression-input color="#d58512"></cron-expression-input>

|Name|Type|Default Value|Description|
|:--:|:--:|:-----------:|:----------|
|**`name`**|`{String}`|`cron`|The name that the form variable|
|**`width`**|`{String}`|`100%`|The width of the component input|
|**`height`**|`{String}`|`34px`|The height of the component input|
|**`color`**|`{String}`|`#d58512`|The main color that the component elements will take, (hexadecimal recommended)|
|**`value`**|`{String}`|`* * * * *`|Allow to set a default value on the component|
|**`required`**|`{Boolean}`|`false`|Allow component to be empty, if set, the form will not validate when empty|
|**`hotValidate`**|`{Boolean}`|`false`|Enable cron validation while editing it, if not set, it will only be validated when the submit event is performed within a form or by clicking on the save button|

## Languages

```
import 'cron-expression-input/dist/locales/es.js';
OR
<script src="https://unpkg.com/cron-expression-input@2.0.0/dist/locales/es.js"></script>
```

* en (English)
* fr (French - Français)
* es (Spanish - Español)
* zh_CN (中文 - Chinese)

## Integration

Choosing a lang, from the CDN or via custom import will try to implement cRonstrue language corresponding if it exists.

This was not tested for any personal language but it should work if the lang code is the same (POSIX format).

### Thanks

-   [@JossyDevers](https://github.com/JossyDevers), The original author of this library that made this great project.
-   [@TheCloudConnectors](https://github.com/TheCloudConnectors), For your npm package to validate the structure of a cron expression [cron-validator](https://github.com/TheCloudConnectors/cron-validator).
-   [@bamotav](https://github.com/bamotav), For the idea of ​​creating this web component.
