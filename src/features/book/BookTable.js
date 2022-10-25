import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Book.module.css'
import { selectPrecision } from './bookSlice'

export function BookTable({ orders, inverse }) {
  const precision = useSelector(selectPrecision)

  return (
    <table className={styles.table}>
      <thead className={styles.tablehead}>
        {inverse ? (
          <tr>
            <th className={styles.price}>PRICE</th>
            <th className={styles.total}>TOTAL</th>
            <th className={styles.amount}>AMOUNT</th>
            <th className={styles.count}>COUNT</th>
          </tr>
        ) : (
          <tr>
            <th className={styles.count}>COUNT</th>
            <th className={styles.amount}>AMOUNT</th>
            <th className={styles.total}>TOTAL</th>
            <th className={styles.price}>PRICE</th>
          </tr>
        )}
      </thead>
      <tbody>
        {orders.map((order, index, array) => (
          <tr key={index}>
            {inverse ? (
              <>
                <td className={styles.price}>
                  {Number(order.price ?? 0).toFixed(precision)}
                </td>
                <td className={styles.total}>
                  {(
                    (index > 0 ? Number(array[index - 1].amount ?? 0) : 0) +
                    Number(order.amount ?? 0)
                  ).toFixed(precision)}
                </td>
                <td className={styles.amount}>
                  {Number(order.amount ?? 0).toFixed(precision)}
                </td>
                <td className={styles.count}>{order.count ?? 0}</td>
              </>
            ) : (
              <>
                <td className={styles.count}>{order.count ?? 0}</td>
                <td className={styles.amount}>
                  {Number(order.amount ?? 0).toFixed(precision)}
                </td>
                <td className={styles.total}>
                  {(
                    (index > 0 ? Number(array[index - 1].amount ?? 0) : 0) +
                    Number(order.amount ?? 0)
                  ).toFixed(precision)}
                </td>
                <td className={styles.price}>
                  {Number(order.price ?? 0).toFixed(precision)}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
