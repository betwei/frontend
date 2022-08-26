import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.Navbar}>
      <p>HERE LOGO</p>
      <ul>
        <li>Inicio</li>
        <li>Partidos</li>
        <li>Acerca de</li>
        <li>Faq</li>
      </ul>
      <button>HERE BUTTON</button>
    </div>
  );
}
