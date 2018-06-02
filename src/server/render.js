const ReactDOMServer = ('react-dom/server');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const React = require('react');
const Redux = require('redux');
const App = require('../shared/App');

const reducer = require('../shared/reducers/app');

const store = Redux.createStore(reducer);

const DEV = process.env.NODE_ENV === 'development';
const assetManifest = JSON.parse(process.env.REACT_APP_ASSET_MANIFEST || '{}');
const bundleUrl = DEV ?
  '/static/js/bundle.js' :
  `/${assetManifest['main.js']}`;

const css = DEV ?
  '' : // in DEV the css is hot loaded
  `<link href="/${assetManifest['main.css']}" media="all" rel="stylesheet" />`;

const renderFullPage = (component, preloadedState) => `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        ${css}
        <link rel="manifest" href="/public/manifest.json">
        <link rel="shortcut icon" href="/public/favicon.ico">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Muli" />
        <title>Blues Clues</title>
      </head>
      <body>
        <div id="root">${ReactDOMServer.renderToString(component)}</div>
        <script type="application/javascript" src="${bundleUrl}"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
      </body>
  </html>
`;

export default (req, res) => {
  res.status(200).send(renderFullPage(
    <ReactRedux.Provider store={store}>
      <ReactRouter.StaticRouter context={{}} location={req.url}>
          <App/>
      </ReactRouter.StaticRouter>
    </ReactRedux.Provider>,
    preloadedState
  ));
}