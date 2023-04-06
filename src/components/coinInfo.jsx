import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CoinInfo({ name, id, symbol, highest, setHighest, lowest, setLowest, searchInput }) {
    const [coin, setCoin] = useState(null)

    const URL = `https://api.coingecko.com/api/v3/coins/${id}`

    useEffect(() => {
        getCoin().catch(console.error)
    }, [id])

    const getCoin = async () => {
        const res = await axios.get(URL)
        setCoin(res.data)
    }


    useEffect(() => {
        if (coin) {
            if (coin.market_data.current_price.usd > highest.coinPrice) {
                setHighest({
                    coinName: name,
                    coinSymbol: symbol,
                    coinPrice: coin.market_data.current_price.usd
                })
            }
        }
    }, [coin])

    useEffect(() => {
        if (coin) {
            if (coin.market_data.current_price.usd < lowest.coinPrice) {
                setLowest({
                    coinName: name,
                    coinSymbol: symbol,
                    coinPrice: coin.market_data.current_price.usd
                })
            }
        }
    }, [coin])

    const condition = () => {
        if (coin && coin.image.small) {
            return true;
        }
        return false
    }

    return (
        <li className='CoinInfo' key={id}>
            {condition() === true && (
                <>
                    <img
                        className='icon'
                        src={coin.image.small}
                        alt={`icon for ${name}`}
                    />
                    <Link
                        to={`/CoinDetail/${id}`}
                        key={id}
                    >
                        {name}({symbol.toUpperCase()})<span className="tab"></span> {coin.market_data.current_price.usd ? coin.market_data.current_price.usd : 0} USD
                    </Link>
                </>
            )
            }
        </li>
    )
}

export default CoinInfo