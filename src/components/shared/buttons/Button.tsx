import styles from './Button.module.scss'

interface IInputButton {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: IInputButton) {
  return (
    <button
      className={styles.button}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
