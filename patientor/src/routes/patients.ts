import express from 'express';
import { v4 as uuid } from 'uuid';
import patientService from '../services/patientService';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getSafeEntries());
});

router.get('/:id', (request, response) => {
  const allPatients = patientService.getEntries();
  const patient = allPatients.find(
    (patient) => request.params.id === patient.id
  );
  const patientWithEntries = {
    ...patient,
    entries: [],
  };

  response.send(patientWithEntries);
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

export default router;
