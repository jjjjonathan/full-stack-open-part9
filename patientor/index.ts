import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); // eslint-disable-line

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  console.log('ping!');
  response.send('pong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
