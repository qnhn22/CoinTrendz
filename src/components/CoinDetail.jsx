import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function CoinDetail() {
    let params = useParams()
    const [details, setDetails] = useState(null);

    const URL = `https://api.coingecko.com/api/v3/coins/${params.id}`

    useEffect(() => {
        getCoinDetail().catch(console.error)
    }, [])

    const getCoinDetail = async () => {
        const res = await axios.get(URL)
        console.log(res)
        setDetails(res.data)
    }
    return (
        <div>
            {details && (
                <>
                    <h1>Name: {details.name}</h1>
                    <p>Algorithm: {details.hashing_algorithm}</p>
                    <p>Category: {details.categories[0]}</p>
                    <br></br>
                    <p>{details.description.en}</p>
                    <p>Homepage: {details.links.homepage[0]}</p>
                </>
            )}
        </div>
    )
}

export default CoinDetail