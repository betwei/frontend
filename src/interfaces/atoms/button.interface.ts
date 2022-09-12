export interface IInputButton {
  className?: string;
  children: any;
  color?: 'default' | 'primary' | 'secondary' | 'contrast1'
  onClick?: () => void;
  disabled?: boolean;
}