const React = require('react');
const ReactDOMServer = ('react-dom/server');
const Redux = require('redux');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react');

const App = require('../shared/App').default;
const reducer = require('../shared/reducers/app').default;

const store = Redux.createStore(reducer);
const preloadedState = store.getState();

const DEV = process.env.NODE_ENV === 'development';
const assetManifest = JSON.parse(process.env.REACT_APP_ASSET_MANIFEST || '{}');
const bundleUrl = DEV ?
  '/static/js/bundle.js' :
  `/${assetManifest['main.js']}`;

const css = DEV ?
  '' : // in DEV the css is hot loaded
  `<link href="/${assetManifest['main.css']}" media="all" rel="stylesheet" />`;

const renderFullPage = (component) => `
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

module.exports = (req, res) => {
  res.status(200).send(renderFullPage(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
          <App/>
      </StaticRouter>
    </Provider>
  ));
};