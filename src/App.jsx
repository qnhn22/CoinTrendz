import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CoinInfo from './components/CoinInfo'

function App() {
  const [list, setList] = useState(null)
  const [filteredResult, setFilteredResult] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const [highest, setHighest] = useState({
    coinName: '',
    coinSymbol: '',
    coinPrice: 0,
  })
  const [lowest, setLowest] = useState({
    coinName: '',
    coinSymbol: '',
    coinPrice: 100,
  })

  const URL = "https://api.coingecko.com/api/v3/coins/list"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const coinList = []
      const res = await axios.get(URL)

      for (let i = 0; i < 20; i++) {
        if (!coinList.includes(res.data[randNum(res.data.length)])) {
          coinList.push(res.data[randNum(res.data.length)])
        }
      }

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
        return coin.name.toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      setFilteredResult(filteredData)
    }
  }

  return (
    <div className="App">
      {searchInput.length === 0 && (
        <div className='stats'>
          <h1>Discover Cryptocurrencies</h1>
          <p>Highest-value coin in this list: {highest.coinName}({highest.coinSymbol.toUpperCase()})</p>
          <p>Lowest-value coin in this list: {lowest.coinName}({lowest.coinSymbol.toUpperCase()})</p>
        </div>
      )}
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
              highest={highest}
              setHighest={setHighest}
              lowest={lowest}
              setLowest={setLowest}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
