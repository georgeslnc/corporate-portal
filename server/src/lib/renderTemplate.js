require('@babel/register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

function renderTemplate(Component, props, res, req) {
  const reactEl = React.createElement(Component, {
    ...props,
    ...res.app.locals,
    ...res.locals,
    userSession: req.session || {},

  });
  const html = ReactDOMServer.renderToStaticMarkup(reactEl);
  res.write('<!DOCTYPE html>');
  res.write(html);
  res.end();
}

module.exports = renderTemplate;
