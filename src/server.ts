import * as path from 'path';
import * as express from 'express';
import * as serveStatic from 'serve-static';

import { getUsers } from './api/users';

const app = express();

app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);

// Serve static files
app.use('/client.js', serveStatic(path.resolve(__dirname, '../target/client.js')));
app.use('/client.js.map', serveStatic(path.resolve(__dirname, '../target/client.js.map')));

// Setup API router
const api = express.Router();
app.use('/api', api);

// Set API endpoints
api.get('/users', (req, res) => getUsers().subscribe(users => res.send(users)));
api.get('/', (req, res) => res.send({ success: true }));

// Everything else gets just index.html
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../target') });
});

// Server
const server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
