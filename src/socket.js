import React from 'react'

import { SOCKET_URL } from './config'

export const socket = {
  ws: null,
  connect: null,
  disconnect: null,
}

export const SocketContext = React.createContext()

socket.connect = ({ onMessage }) => {
  if (socket.ws) {
    socket.disconnect()
  }

  socket.ws = new WebSocket(SOCKET_URL)

  socket.ws.onopen = (_event) => {
    socket.ws.send(JSON.stringify({ event: 'conf', flags: 65536 + 131072 }))
    socket.ws.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F0',
        len: '25',
        subId: 123,
      })
    )
  }

  socket.ws.onmessage = function (msg) {
    const json = JSON.parse(msg.data)

    try {
      onMessage && onMessage(json)
    } catch (err) {
      console.log(err)
    }
  }
}

socket.disconnect = () => {
  if (socket.ws) {
    socket.ws.close()
    socket.ws = null
  }
}
