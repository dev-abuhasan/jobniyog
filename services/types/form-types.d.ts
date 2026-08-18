export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'treeselect'
  | 'checkbox'
  | 'file'
  | 'button-group'
  | 'switch'
  | 'date';

export type Option = {
  label: string;
  icon?: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  // Optional nested options for tree-like selects
  children?: Option[];
  // Optional badge/count display
  count?: number;
};

export type ValidationRule = {
  required?: boolean | string; // message if string
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validate?: (value: unknown, allValues: Record<string, unknown>) => string | undefined;
};

export type FieldConfig = {
  name: string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  containerClassName?: string;
  autoComplete?: string;
  multiple?: boolean; // file / multiselect
  accept?: string; // file accept
  options?: Option[]; // select/multiselect
  defaultValue?: unknown;
  rules?: ValidationRule;
  colSpan?: 1 | 2 | 3; // for grid layout
  // Tree select specific extras
  showCount?: boolean;
  fileUpBasic?: boolean;

  // Dependency controls: evaluate visibility/enabled state based on current values
  // If showWhen returns false:
  //  - dependencyMode 'hide' (default): field is not rendered
  //  - dependencyMode 'disable': field is rendered but disabled
  showWhen?: (values: Record<string, unknown>) => boolean;
  // If enableWhen returns false, field is disabled (in addition to any cfg.disabled)
  enableWhen?: (values: Record<string, unknown>) => boolean;
  // How to behave when showWhen is false
  dependencyMode?: 'hide' | 'disable';
};

export type FormValues = Record<string, unknown>;
