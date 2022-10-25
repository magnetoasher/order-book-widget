import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Book.module.css'
import { BookTable } from './BookTable'
import { selectLeftOrders, selectRightOrders } from './bookSlice'
import { BookTableControl } from './BookTableControl'

export function BookOverallTable() {
  const leftOrders = useSelector(selectLeftOrders)
  const rightOrders = useSelector(selectRightOrders)

  return (
    <div className={styles.wrapper}>
      <BookTableControl />
      <div className={styles.overall}>
        <BookTable orders={leftOrders} />
        <BookTable orders={rightOrders} inverse />
      </div>
    </div>
  )
}
