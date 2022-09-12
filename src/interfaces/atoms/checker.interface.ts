export interface IChecker {
  label: string;
  items: {
    label: string;
    val: any;
  }[];
  current: any;
  onChange: (value: any) => void;
  className?: string;
}