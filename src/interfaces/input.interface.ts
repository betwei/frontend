export interface IInput {
  className?: string;
  type?: "text" | "password" | "email" | "number";
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  alias?: string;
  error?: string;
  disabled?: boolean;
}
