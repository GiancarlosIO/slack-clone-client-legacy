import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';

import stats from './public/dist/react-loadable.json';

import AppClient from '../src/App';

const PORT = process.env.PORT_CLIENT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public/views/');
app.set('view engine', 'pug');


app.get('/*', (req, res) => {
  const context = {};
  const modules = [];
  const AppServer = () => (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <AppClient />
      </StaticRouter>
    </Loadable.Capture>
  );

  const markUp = ReactDOMServer.renderToString(<AppServer />);

  const bundles = getBundles(stats, modules).filter(b => b.file.split('.').pop() !== 'map').map(b => b.file);

  console.log(bundles);

  res.render('index', {
    html: markUp,
    bundles,
  });
});

app.listen(PORT, () => {
  console.log(`> Server is runing in port: ${PORT}`);
});

