import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetails = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCoin = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)
                console.log(res)
                if(!res.ok) throw new Error('Failed to fech coin data')
                const data =await res.json();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }

        fetchCoin()
    }, [id])


  return (
    <div className="coin-details-container">
        <Link to='/'> Go back to Home Page </Link>

        <h1 className="coin-details-title">
            {coin ? `${coin.name} (${coin.symbol})` : 'Coin Details' }
        </h1>

        {loading && <p>Loading...</p> }
        { error && <div className="error">{error}</div> }

        {!loading && !error && (
            <>
                <img src={coin.image.large} alt={coin.name} className='coim-details-image' />

                <p>{coin.description.en.split('. ')[0] + '.'}</p>

                <div className="coin-details-info">
                    <h3>Rank: {coin.market_cap.rank}</h3>
                    <h3>Current Price: {coin.market_data.current_price.inr}</h3>
                </div>
            </>
        )}
    </div>
  )
}

export default CoinDetails