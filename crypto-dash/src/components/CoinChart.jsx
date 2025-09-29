import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
)
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({coinId}) => {
    
    const [chartData, setChartData] = useState({ datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPrices = async () => {
            const res = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=inr&days=7`)
            const data = await res.json();

            const prices = data.prices.map((price)=>({
                x: price[0],
                y: price[1]
            }))

            console.log(prices);

            setChartData({
                datasets: [{
                    label: 'Price (INR) ',
                    data: prices,
                    fill: false,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0,123,225,0.1)',
                    pointRadius: 0,
                    tension: 0.3,
                }]
            })

            setLoading(false)
        }

        fetchPrices();
    }, [coinId])

  return <div style={{marginTop: '30px'}}>
        <Line
            data={chartData}
            options={{
                responsive: true,
                plugins:{
                    legend: {display: false },
                    tooltip: {mode: 'index', intersect: false }
                },
                scales:{
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 7,
                        }
                    },
                    y: {
                        ticks: {
                            callback: (value) => `${value.toLocaleString()}`
                        }
                    }
                }
            }}
        />
    </div>

}

export default CoinChart;