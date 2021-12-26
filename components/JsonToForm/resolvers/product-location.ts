import { isEmpty, toString } from 'lodash';
import * as yup from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { RequiredNumberSchema } from 'yup/lib/number';
import { RequiredStringSchema } from 'yup/lib/string';

const DEFAULT_REQUIRED_COPY = 'Required.';

export type FormFields = Partial<{
  discount_id: number;
  location_id: number;
  location: {value: number, label: string} | '';
  name: string;
  description: string;
  amount: number;
  activate: boolean;
  active: boolean;
  available_days: string;
  end_dt: string;
  start_dt: string;
}>;

type SchemaResolver = {
  [key in keyof FormFields]: RequiredStringSchema<string, Record<string, any>> | MixedSchema<any, Record<string, any>, any> | RequiredNumberSchema<number, Record<string, any>>;
};

const prepareSchema = (): SchemaResolver => {
  return {
    discount_id: yup.number().required(DEFAULT_REQUIRED_COPY),
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),

    location_id: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Must be a number.', (value) => /^[0-9.]+$/.test(toString(value))),

    available_days: yup
      .string()
      .notRequired()
      .test('check_format', 'Must be numbers separated by commas.', (value) => {
        if (isEmpty(value)) return true;

        return toString(value)
          .split(',')
          .every((day) => /^[0-9]+$/.test(toString(day)));
      }),

    active: yup.boolean().required(DEFAULT_REQUIRED_COPY),

    start_dt: yup.string().notRequired().nullable(),
    end_dt: yup.string().notRequired().nullable(),
  };
};

export default prepareSchema;
