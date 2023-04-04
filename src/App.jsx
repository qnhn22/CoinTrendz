import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [list, setList] = useState(null)

  const URL = "https://api.coingecko.com/api/v3/coins/list"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const coinList = []
      const res = await axios.get(URL)
      console.log(res.data)
      for (let i = 0; i < 20; i++) {
        if (!coinList.includes(res.data[randNum(res.data.length)])) {
          coinList.push(res.data[randNum(res.data.length)])
        }
      }
      console.log(coinList)
      setList(coinList)
    } catch (err) {
      console.log(err)
    }
  }

  const randNum = (length) => {
    return Math.floor(Math.random() * length);
  }

  return (
    <div className="App">
      <h1>Discover Crypto</h1>
      {list && list.map((coin) => (
        <div>{coin.item.name}</div>
      ))}
    </div>
  )
}

export default App
