import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors()); // eslint-disable-line

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  console.log('ping!');
  response.send('pong!');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
