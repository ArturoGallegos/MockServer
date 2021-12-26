interface SelectOptionsComponent {
  label: string;
  value: any;
}

interface OptionsComponent {
  required?: boolean;
  validate?: 'object';
}

interface Field {
  name?: string;
  label?: string;
  variant?: string;
  defaultValue?: string | 'object';
  value?: string;
  md?: GridSize;
  xs?: number;
  shrink?: boolean;
  hide?: boolean;
  icon?: {
    position?: 'start' | 'end';
    element: ReactElement;
  };
}

type Divider = {
  type: 'divider';
  spacer?: boolean;
  hide?: 'hidden';
};

interface TextField extends Field {
  autofocus?: boolean;
  clear?: string;
  concatenate?: string[];
  maxLength?: number;
  multiline?: boolean;
  options?: OptionsComponent;
  placeholder?: string;
  replace?: RegExp;
  select?: Array<SelectOptionsComponent>;
  step?: number;
  trigger?: string[];
  type: 'text' | 'email' | 'number';
}

interface Textarea extends TextField {
  multiline?: boolean;
}

interface PasswordField extends Field {
  type: 'password';
  options?: OptionsComponent;
  required?: boolean;
  link?: {
    label: string;
    href: strong;
    target: string;
  };
  trigger?: string[];
  equal?: {
    input: string;
    message: string;
  };
  hideError?: boolean;
  showValidation?: boolean;
  hidePassword?: boolean;
  suggest?: boolean;
}

interface DaysField {
  type: 'days';
  name: string;
  options?: OptionsComponent;
  label: string;
  hide?: boolean;
  defaultValue?: string
}

interface SelectField extends Field {
  type: 'select';
  values: Array<SelectOptionsComponent>;
  name: string;
  label: string;
  defaultValue?: any;
  selector?: string;
  action?(any): void;
  onLoad?(): void;
  options?: OptionsComponent;
}

interface MultiSelectField extends Field {
  type: 'multiselect';
  name: string;
  values: Array<SelectOptionsComponent>;
  defaultValue?: any;
  disabled?: boolean;
  empty: string;
}

interface SelectListField extends Field {
  type: 'selectlist';
  name: string;
  title: string;
  values: any[];
  searchable?: boolean;
  label?: string;
  actionLabel?: string;
}

interface DragImageField extends Field {
  type: 'dragimage';
  name: string;
  label: string;
  limit?: number;
}

interface ImageField extends Field {
  type: 'image';
  name: string;
  label: string;
}

interface CalendarField extends Field {
  type: 'calendar';
  format?: string;
  options?: {
    required?: boolean;
  };
}

interface SwitchField {
  type: 'switch';
  name: string;
  md?: GridSize;
  label: string;
  hide?: boolean;
  defaultValue?: boolean;
  onChange?(value: boolean): void;
}

type CheckboxItem = {
  label: string;
  value: string | number;
  md?: GridSize;
};

interface CheckboxField extends Field {
  type: 'checkbox';
  name: string;
  label?: string;
  items: CheckboxItem | CheckboxItem[];
  md?: GridSize;
  hide?: boolean;
  onChange?({value: number, status: boolean}): void;
  onClick?({value: number, status: boolean}): void;
}

interface AutocompleteField extends Field {
  type: 'autocomplete';
  items: SelectOptionsComponent[];
  options?:{required?: boolean}
}

interface ButtonField {
  type: 'button';
  onClick?(data): any;
  color?: 'primary' | 'secondary' | 'default';
  fields?: string[];
  label: string;
  equal?: string[];
  hide?: boolean;
  icon?: ReactElement;
}

type ComponentAsField = {
  type: 'component';
  element: ReactElement;
  hide?: boolean;
};

interface LocationsField extends Field {
  type: 'locations';
}

interface SelectListTextField extends Field {
  type: 'select-list-text';
  items: string[];
}

type Fields =
  | TextField
  | SelectField
  | CalendarField
  | PasswordField
  | SwitchField
  | Divider
  | ComponentAsField
  | ButtonField
  | MultiSelectField
  | DragImageField
  | ImageField
  | SelectListField
  | LocationsField
  | CheckboxField
  | SelectListTextField
  | AutocompleteField
  | DaysField;

type Sector = {
  title?: string;
  fields: Fields[];
};

type Action = {
  label: string;
  submit?: boolean;
  type?: 'save' | 'delete' | 'cancel';
  variant?: 'primary' | 'secondary';
  action?(fields: any): void;
  hide?: boolean;
  requiredFields: string[];
  requiredDirty?: boolean;
  disabled?: boolean;
};

interface TabComponent {
  title: string;
  icon?: ReactElement;
  actions?: Action[];
  fields?: Fields[];
  sectors?: Sector[];
  disabled?: boolean;
}

export interface FormComponent {
  spacing?: number;
  submitText?: string;
  submit?: {
    label: string;
    action(): void;
  };
  onSubmit?(data: any): void;
  nextText?: string;
  tabs?: TabComponent[];
  tabsHeader?: React.ReactElement | React.ReactElement[];
  tabsFooter?: React.ReactElement | React.ReactElement[];
  fields?: Fields[];
  actions?: Action[];
}

interface Component {
  jsonData: FormComponent;
  onSubmit?(any): void;
  className?: string;
  variant?: 'format-1' | 'format-2' | 'modal';
  id?: string;
  loading?: boolean;
  defaultData?: any;
  autofill?: boolean;
  resolver?: any;
  onChange?(values: any): void;
}

interface InputField {
  field: TextField;
  shrink?: boolean;
  options?: any;
}

interface InputPasswordField extends InputField {
  field: PasswordField;
  trigger?(fields: string[]): void;
}

interface InputTarget extends EventTarget {
  value: string;
}

interface InputEvent extends React.FormEvent<HTMLInputElement | HTMLTextAreaElement> {
  target: InputTarget;
}
