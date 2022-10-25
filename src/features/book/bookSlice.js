import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  leftOrders: [],
  rightOrders: [],
  isLeft: false,
  precision: 2,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const currentOrders = state.isLeft ? 'leftOrders' : 'rightOrders'
      state[currentOrders] = [action.payload, ...state[currentOrders]].slice(
        0,
        25
      )
      state.isLeft = !state.isLeft
    },
    setOrders: (state, action) => {
      const orders = action.payload
      state.leftOrders = orders.slice(0, 25)
      state.rightOrders = orders.slice(25)
    },
    incrementPrecision: (state) => {
      state.precision += 1
    },
    decrementPrecision: (state) => {
      state.precision = Math.max(state.precision - 1, 0)
    },
  },
})

export const { addOrder, setOrders, incrementPrecision, decrementPrecision } =
  bookSlice.actions

export const selectPrecision = (state) => state.book.precision
export const selectLeftOrders = (state) => state.book.leftOrders
export const selectRightOrders = (state) => state.book.rightOrders

export default bookSlice.reducer
