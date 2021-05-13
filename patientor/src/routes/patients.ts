import express from 'express';
import { v4 as uuid } from 'uuid';
import patientService from '../services/patientService';
import { Patient, Entry, EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getSafeEntries());
});

router.get('/:id', (request, response) => {
  const allPatients = patientService.getEntries();
  const patient = allPatients.find(
    (patient) => request.params.id === patient.id
  );
  response.send(patient);
});

router.post('/', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Omit<Patient, 'id'> = request.body;
  const newPatient: Patient = {
    ...body,
    id: uuid(),
  };

  patientService.addEntry(newPatient);
  response.json(newPatient);
});

router.post('/:id/entries', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: EntryWithoutId = request.body;
  const newEntry: Entry = {
    ...body,
    id: uuid(),
  };

  patientService.addEntryToPatient(request.params.id, newEntry);
  response.json(newEntry);
});

export default router;
