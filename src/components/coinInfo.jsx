import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CoinInfo({ name, id, symbol }) {
    const [coin, setCoin] = useState(null)

    const URL = `https://api.coingecko.com/api/v3/coins/${id}`

    useEffect(() => {
        getCoin().catch(console.error)
    }, [id])

    const getCoin = async () => {
        const res = await axios.get(URL)
        console.log(res)
        setCoin(res.data)
    }

    return (
        <div className='CoinInfo'>
            {coin && (
                <li className='main-list' key={id}>
                    <img
                        className='icon'
                        src={coin.image.small}
                        alt={`icon for ${name}`}
                    />
                    {name}({symbol.toUpperCase()})<span className="tab"></span> {coin.market_data.current_price.usd ? coin.market_data.current_price.usd : 0} USD
                </li>
            )
            }
        </div>
    )
}

export default CoinInfo