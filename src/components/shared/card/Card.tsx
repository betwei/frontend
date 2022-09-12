// Types
import { ICard } from '../../../interfaces/card.interface'
import Loader from '../atoms/loader/Loader'

import styles from './Card.module.scss'

function Card({
  classNameCard,
  classNameHeader,
  classNameMain,
  classNameFooter,
  header,
  children,
  footer,
  loading = false
}: ICard) {
  return (
    <div className={`${styles.card} ${classNameCard}`}>
      {header && <header>
        <div className={classNameHeader}>
          {header}
        </div>
        <hr className={styles.contrast} />
      </header>}
      <main className={`relative ${classNameMain}`}>
        {children}
        {loading && <Loader absolute />}
      </main>
      {footer && <footer>
        <hr className={styles.contrast} />
        <div className={classNameFooter}>
          {footer}
        </div>
      </footer>}
    </div>
  )
}

export default Card
