import { toString } from 'lodash';
import * as yup from 'yup';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProductType } from '../../../../../../libs/domain/src/index';

const DEFAULT_REQUIRED_COPY = 'Required.';

// export type FormFields = {
//   name: string;
//   price: number;
//   stock: number;
//   image: string;
//   class_id: number;
//   tax_code: number;
//   type: number;
//   race_points?: number;
//   membership_type_id?: number;
//   giftcard_points?: number;
// };

export type FormFields = {
  name: string;
  description: string;
  notes: string;
  sku: string;
  available_days: string;
  type: number;
  image?: any;
  price: number;
  race_points: number;
  reservation_points: number;
  giftcard_points: number;
  membership_type_id?: any;
  taxable: boolean;
  can_change_price: boolean;
  is_special: boolean;
  visible: boolean;
  active: boolean;
  class_id: number;
  tax_code: number;
  custom1?: any;
  custom2?: any;
  custom3?: any;
  custom4?: any;
  categories: string[] | number[];
  combos: any[]
}

type Schema = {
  [key in keyof FormFields]?: string;
};

const prepareSchema = (names: Schema) => {
  return {
    name: yup.string().required(DEFAULT_REQUIRED_COPY),
    // price: yup
    //   .mixed()
    //   .required(DEFAULT_REQUIRED_COPY)
    //   .test('check_is_positive', 'Points must be a number.', (value) => /^-?[0-9]+$/.test(toString(value))),
    stock: yup
      .mixed()
      .required(DEFAULT_REQUIRED_COPY)
      .test('check_is_positive', 'Points must be a number.', (value) => /^-?[0-9]+$/.test(toString(value))),
    image: yup.string().notRequired(),
    class_id: yup.mixed().required(DEFAULT_REQUIRED_COPY),
    membership_type_id: yup.mixed().notRequired(),
    tax_code: yup.mixed().required(DEFAULT_REQUIRED_COPY),
    type: yup.mixed().required(DEFAULT_REQUIRED_COPY),
    race_points: yup.mixed().when(names.type, {
      is: ProductType.race,
      then: yup
        .mixed()
        .required(DEFAULT_REQUIRED_COPY)
        .test('check_is_positive', 'Points must be a number.', (value) => /^-?[0-9]+$/.test(toString(value))),
      otherwise: yup.mixed().notRequired(),
    }),
    giftcard_points: yup.mixed().when(names.type, {
      is: ProductType.giftcard,
      then: yup
        .mixed()
        .required(DEFAULT_REQUIRED_COPY)
        .test('check_is_positive', 'Points must be a number.', (value) => /^-?[0-9]+$/.test(toString(value)) && value >= 0),
      otherwise: yup.mixed().notRequired(),
    }),
  };
};

export default prepareSchema;
