export type TModalType = 'success' | 'warning' | 'info' | 'error'

export interface IModalAction {
  type?: 'default' | 'success' | 'warning' | 'info' | 'error';
  label: string;
  action?: () => void;
}

export interface IModal {
  type?: TModalType;
  title: string;
  children: any;
  open?: boolean;
  onClose?: () => void;
  actions?: IModalAction[]
}