import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './App.module.css'
import { addOrder, setOrders } from './features/book/bookSlice'
import { BookOverallTable } from './features/book/BookOverallTable'
import { SocketContext } from './socket'

function App() {
  const dispatch = useDispatch()
  const { connect, disconnect } = useContext(SocketContext)

  useEffect(() => {
    connect({
      onMessage: (json) => {
        if (json[1]) {
          if (json[1][0] instanceof Array) {
            dispatch(
              setOrders(
                json[1].map((orderArray) => ({
                  price: orderArray[0],
                  count: orderArray[1],
                  amount: orderArray[2],
                }))
              )
            )
          } else {
            const [price, count, amount] = json[1]
            dispatch(addOrder({ price, count, amount }))
          }
        }
      },
    })

    return () => {
      disconnect()
    }
  }, [dispatch, connect, disconnect])

  return (
    <div className={styles.container}>
      <BookOverallTable />
    </div>
  )
}

export default App
