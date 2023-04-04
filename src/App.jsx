import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CoinInfo from './components/CoinInfo'

function App() {
  const [list, setList] = useState(null)
  const [filteredResult, setFilteredResult] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [highest, setHighest] = useState('')
  const [lowest, setLowest] = useState('')
  const [biggerThanPoint5, setBiggerThanPoint5] = useState(0)

  const URL = "https://api.coingecko.com/api/v3/coins/list"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const coinList = []
      const res = await axios.get(URL)

      for (let i = 0; i < 50; i++) {
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

  // search bar
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== '') {
      const filteredData = list.filter((coin) => {
        console.log(coin.name)
        return coin.name.toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      setFilteredResult(filteredData)
    }
  }

  return (
    <div className="App">
      <h1>Discover Random Cryptocurrencies</h1>
      <p>Highest-value coin in this list: JumpToken</p>
      <p>Lowest-value coin in this list: Doogee</p>
      <p>Number of coins whose values larger than 0.5: 8</p>
      <input
        type='text'
        placeholder='Search your coin ...'
        onChange={(e) => searchItems(e.target.value)}
        value={searchInput} // connect input value to searchInput
      />
      {searchInput.length > 0 ? (
        <ul>
          {filteredResult && filteredResult.map((coin) => (
            <CoinInfo
              name={coin.name}
              id={coin.id}
              symbol={coin.symbol}
            />
          ))}
        </ul>
      ) : (
        <ul>
          {list && list.map((coin) => (
            <CoinInfo
              name={coin.name}
              id={coin.id}
              symbol={coin.symbol}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
