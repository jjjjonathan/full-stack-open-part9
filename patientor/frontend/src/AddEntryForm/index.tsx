import { Formik, Form, Field } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export interface Values {
  date: string;
  dischargedate: string;
  dischargecriteria: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<string>;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
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
        onSubmit={onSubmit}
      >
        {({ setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              type: hostpial
              <Field label="Date" placeholder="Date" name="date" />
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
    </div>
  );
};

export default AddEntryForm;
