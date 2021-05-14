import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export interface HospitalValues {
  date: string;
  dischargedate: string;
  dischargecriteria: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<string>;
}

export interface OccupationalValues {
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<string>;
  employerName: string;
  sickLeaveStart: string;
  sickLeaveEnd: string;
}

interface Props {
  onHospitalSubmit: (values: HospitalValues) => void;
  onOccupationalSubmit: (values: OccupationalValues) => void;
}

const AddEntryForm = ({ onHospitalSubmit, onOccupationalSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <h3>Add Entry</h3>
      <Formik
        initialValues={{
          date: '',
          dischargedate: '',
          dischargecriteria: '',
          description: '',
          specialist: '',
          diagnosisCodes: [],
        }}
        onSubmit={onHospitalSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          return errors;
        }}
      >
        {({ setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              Type: Hospital
              <Field label="Date" placeholder="Date" name="date" />
              <ErrorMessage name="date" />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
              />
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="Discharge Date"
                placeholder="Discharge Date"
                name="dischargedate"
              />
              <Field
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="dischargecriteria"
              />
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
      <Divider />
      <Formik
        initialValues={{
          date: '',
          description: '',
          specialist: '',
          diagnosisCodes: [],
          employerName: '',
          sickLeaveStart: '',
          sickLeaveEnd: '',
        }}
        onSubmit={onOccupationalSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          return errors;
        }}
      >
        {({ setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              Type: Occupational Healthcare
              <Field label="Date" placeholder="Date" name="date" />
              <ErrorMessage name="date" />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
              />
              <Field
                label="specialist"
                placeholder="specialist"
                name="specialist"
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
              />
              <Field
                label="Sick Leave Start Date"
                placeholder="Sick Leave Start Date"
                name="sickLeaveStart"
              />
              <Field
                label="Sick Leave End Date"
                placeholder="Sick Leave End Date"
                name="sickLeaveEnd"
              />
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
      <Divider />
    </div>
  );
};

export default AddEntryForm;
