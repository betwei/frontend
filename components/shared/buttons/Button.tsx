import React from "react";
import styles from "./Button.module.scss";

interface IInputButton {
  children: string;
}

function Button({ children }: IInputButton) {
  return <button className={styles.button}>{children}</button>;
}

export default Button;
