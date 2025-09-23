import React, {useEffect, useState} from 'react'
import CoinCard from './components/CoinCard'

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false'

const App = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data)

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])



  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((res) => {
  //       console.log(res)
  //       if(!res.ok) throw new Error('Failed to fetch data');
  //       return res.json();
  //     })
  //     .then((data)=>{
  //       console.log(data);
  //       setCoins(data);
  //       setLoading(false);
  //     })
  //     .catch((err)=>{
  //       setError(err.message);
  //       setLoading(false);
  //     })
  // } , []);
  
  return (
    <>
    <div>
      <h1>🚀Crypto Dash</h1>
      {loading && <p>'Loading ...'</p>}
      {error && <div className='error'>{error}</div>}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin)=> (
            <CoinCard key={coin.id} coin={coin} />
          )
          )}
        </main>
      )}
    </div>
    </>
  )
}

export default App