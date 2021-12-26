import { isEmpty, toString } from 'lodash';
import * as yup from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { RequiredStringSchema } from 'yup/lib/string';

const DEFAULT_REQUIRED_COPY = 'Required.';

export type FormFields = {
  name: string;
  amount: string;
  description: string;
  discount_type: number;
  available_days: string;
  visible: boolean;
  seq: string;
  approval_needed: boolean;
  active: boolean;
  start_dt: string;
  end_dt: string;
};

type Schema = {
  [key in keyof FormFields]: string;
};

type SchemaResolver = {
  [key in keyof FormFields]: RequiredStringSchema<string, Record<string, any>> | MixedSchema<any, Record<string, any>, any>;
};

const prepareSchema = (names: Schema): SchemaResolver => {
  return {
    name: yup.string().required(DEFAULT_REQUIRED_COPY),
    amount: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Must be a number.', (value) => /^[0-9.]+$/.test(toString(value)))
      .test('check_is_positive', 'Must contain a maximum of 2 decimal places.', (value) => /^([0-9]+)(\.([0-9]{1,2}))?$/.test(toString(value))),
    description: yup.string().notRequired(),
    discount_type: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Must be a number.', (value) => /^-?[0-9]+$/.test(toString(value))),
    available_days: yup
      .string()
      .notRequired()
      .test('check_format', 'Must be numbers separated by commas.', (value) => {
        if (isEmpty(value)) return true;

        return toString(value)
          .split(',')
          .every((day) => /^[0-9]+$/.test(toString(day)));
      }),
    visible: yup.boolean().required(DEFAULT_REQUIRED_COPY),
    seq: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Must be a number.', (value) => /^-?[0-9]+$/.test(toString(value))),
    approval_needed: yup.boolean().required(DEFAULT_REQUIRED_COPY),
    active: yup.boolean().required(DEFAULT_REQUIRED_COPY),

    start_dt: yup.string().notRequired(),
    end_dt: yup.string().notRequired(),
  };
};

export default prepareSchema;
