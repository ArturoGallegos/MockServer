import { toString } from 'lodash';
import * as yup from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { RequiredNumberSchema } from 'yup/lib/number';
import { RequiredStringSchema } from 'yup/lib/string';

const DEFAULT_REQUIRED_COPY = 'Required.';

export type FormFields = {
  discount_id: number;
  location_id?: number | '-';
  product_id?: number;
  product_type: number | '-';
  product_class_id?: number | '-';
  active?: boolean;
};

type SchemaResolver = {
  [key in keyof FormFields]: RequiredStringSchema<string, Record<string, any>> | MixedSchema<any, Record<string, any>, any> | RequiredNumberSchema<number, Record<string, any>>;
};

const prepareSchema = (): SchemaResolver => {
  return {
    discount_id: yup.number().required(DEFAULT_REQUIRED_COPY),

    location_id: yup
      .mixed()
      .notRequired()
      .test('check_is_positive', 'Must be a number.', (value) => !value || /^[0-9.]+$/.test(toString(value)) || value === '-'),

    product_id: yup
      .mixed()
      .notRequired()
      .test('check_is_positive', 'Must be a number.', (value) => !value || /^[0-9.]+$/.test(toString(value))),

    product_type: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Must be a number.', (value) => /^-?[0-9]+$/.test(toString(value)) || value === '-'),

    product_class_id: yup
      .mixed()
      .notRequired()
      .test('check_is_positive', 'Must be a number.', (value) => !value || /^[0-9.]+$/.test(toString(value)) || value === '-'),

    active: yup.boolean().required(DEFAULT_REQUIRED_COPY),
  };
};

export default prepareSchema;
