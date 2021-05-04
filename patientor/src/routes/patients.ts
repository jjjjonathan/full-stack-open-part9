/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { v4 as uuid } from 'uuid';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getSafeEntries());
});

router.post('/', (request, response) => {
  const body = request.body;
  const newPatient = {
    ...body,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
  };

  patientService.addEntry(newPatient);
  response.json(newPatient);
});

export default router;
