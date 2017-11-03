# polymer-ckeditor5

Polymer ckeditor5 textarea component

CKeditor currently does not work in polymer becuase it is not aware of the shadow dom - see https://github.com/ckeditor/ckeditor5-engine/issues/692
This repo is a testground for working with ckeditor. 

## Setup

Run the following commands to setup the demonstrations:

```
npm install
bower install
```

## Demonstrations

### Polymer widget demo

This demo uses the ckeditor5 classic build and provides ckeditor as a global via a script include:

```
<script src="../../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>

```

To demonstrate polymer with ckeditor5, I made a work-around to get it to render by breaking out the css into a separate file. 
This component uses dist/styles.css to provide css for the component. It is generated by webpack (see below).

```
<link rel="import" type="css" href="dist/styles.css">
```

Run `polymer serve` and view the page at http://127.0.0.1:8000/demo/index.html

You'll see that the ckeditor widget doesn't work properly, but it does an initial render. See the js console to view the errors it generates. Samples:

```
log.js:72 rect-source-not-in-dom: The source of this rect does not belong to any rendered DOM tree. Read more: https://ckeditor5.github.io/docs/nightly/ckeditor5/latest/framework/guides/support/error-codes.html#rect-source-not-in-dom.

getborderwidths.js:21 Uncaught TypeError: Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'.
    at t.a (getborderwidths.js:21)
    at u.excludeScrollbarsAndBorders (rect.js:327)
    at i (scroll.js:181)
    at n (scroll.js:50)
    at _.scrollToTheSelection (document.js:313)
    at _.listenTo (enter.js:40)
    at _.fire (emittermixin.js:280)
    at _.e.on (enterobserver.js:25)
    at _.fire (emittermixin.js:280)
    at i.fire (domeventobserver.js:96)
```    

### Shady DOM widget demo

This demo shows how to use ckeditor within a Polymer web component. It copies the template to a div outside the shadow DOM

```
let template = this.shadowRoot.querySelector('#special-template');
        document.querySelector("#content").appendChild(document.importNode(template.content, true));
 ```

Ckeditor5 works in this demo because it uses the technique described here: https://www.polymer-project.org/2.0/docs/devguide/dom-template#preserve-template-contents

```
<template id="special-template" preserve-content>
          <textarea id="editor" hidden></textarea>
    </template>
```    

Adding the preserve-content attribute to the template enables the code to access the contents of a nested template.
 
View demo at http://127.0.0.1:8082/demo/index-shady.html

### Vanilla ckeditor5 demo

Finally, there is a demo of ckeditor5 running in the normal DOM at http://127.0.0.1:8000/demo/index-build.html. See the Development section for more information.

## Usage

```html
  <polymer-ckeditor5 value="<h3>Test</h3>"></polymer-ckeditor5>
```

## Development

There is a testing ground for running ckeditor5 sourcecode as a framework for testing out ckeditor components. 
These instructions follow https://docs.ckeditor.com/ckeditor5/latest/framework/guides/quick-start.html

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run polymer server 
to launch the page that demonstrates ckeditor running outside polymer

```
$ polymer serve
```

View the page at http://127.0.0.1:8000/demo/index-build.html

The application code for this demo is in app.js. If you modify it, you must run the `npm run build` target to generate dist/bundle.js

There is also commented out webpack.config.js code that can be used to generate the separate dist/styles.css, which is used by the current polymer demo. 
The [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) creates the separate styles.css

```
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        } )
 ```

