import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SocketContext } from '../../socket'
import {
  addOrder,
  decrementPrecision,
  incrementPrecision,
  selectPrecision,
} from './bookSlice'
import styles from './Book.module.css'

export function BookTableControl() {
  const dispatch = useDispatch()
  const precision = useSelector(selectPrecision)
  const { connect, disconnect } = useContext(SocketContext)

  const handleConnect = () => {
    disconnect()
    connect({
      onMessage: (order) => {
        dispatch(addOrder(order))
      },
    })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleIncPrecision = () => {
    dispatch(incrementPrecision())
  }

  const handleDecPrecision = () => {
    dispatch(decrementPrecision())
  }

  return (
    <div className={styles.controller}>
      <div className={styles.typo}>
        <span className={styles.title}>Order Book</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleConnect}>
          Connect
        </button>
        <button className={styles.button} onClick={handleDisconnect}>
          Disconnect
        </button>
        <button className={styles.button} onClick={handleIncPrecision}>
          incPrecision
        </button>
        <button
          className={styles.button}
          onClick={handleDecPrecision}
          disabled={precision <= 0}
        >
          decPrecision
        </button>
      </div>
    </div>
  )
}
