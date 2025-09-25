import React, {useEffect, useState} from 'react'
import {Routes,Route} from 'react-router'
import Header from './components/Header';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import PageNotFound from './pages/pagenotfound';
import CoinDetails from './pages/coin-detail';
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
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
  }, [limit])

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
    <Header />
    <Routes>
      <Route path='/' element={<HomePage 
      coins={coins}
      filter={filter}
      setFilter={setFilter}
      limit={limit}
      setLimit={setLimit}
      sortBy={sortBy}
      setSortBy={setSortBy}
      loading={loading}
      error={error}
      />} />

    <Route  path='/about' element={<AboutPage />} />

    <Route path='*' element={<PageNotFound />} />

    <Route path='/coin/:id' element={<CoinDetails />} />
    
    </Routes>
    </>
  )
}

export default App