import { useEffect, useState } from 'react';
import './CoinPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import CoinChart from '../../components/CoinChart';

export type RouteParams = {
  coinId: string;
}

interface ICoin {
  id: string;
  market_cap_rank: number;
  image: {
    small: string;
  };
  name: string;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
    },
    price_change_percentage_1h_in_currency: {
      usd: number;
    },
    price_change_percentage_24h_in_currency: {
      usd: number;
    },
    price_change_percentage_7d_in_currency: {
      usd: number;
    },
    price_change_percentage_30d_in_currency: {
      usd: number;
    },
    price_change_percentage_60d_in_currency: {
      usd: number;
    },
    price_change_percentage_1y_in_currency: {
      usd: number;
    },
    low_24h: {
      usd: number;
    },
    high_24h: {
      usd: number;
    },
    market_cap: {
      usd: number;
    },
    circulating_supply: number;
  };
  description: {
    en: string;
  };
}

const CoinInfo = () => {

  const { coinId } = useParams<RouteParams>();
  const [coin, setCoin] = useState<ICoin>({
    id: "",
    market_cap_rank: 0,
    image: {
      small: "",
    },
    name: "",
    symbol: "",
    market_data: {
      current_price: {
        usd: 0,
      },
      price_change_percentage_1h_in_currency: {
        usd: 0,
      },
      price_change_percentage_24h_in_currency: {
        usd: 0,
      },
      price_change_percentage_7d_in_currency: {
        usd: 0,
      },
      price_change_percentage_30d_in_currency: {
        usd: 0,
      },
      price_change_percentage_60d_in_currency: {
        usd: 0,
      },
      price_change_percentage_1y_in_currency: {
        usd: 0,
      },
      low_24h: {
        usd: 0,
      },
      high_24h: {
        usd: 0,
      },
      market_cap: {
        usd: 0,
      },
      circulating_supply: 0,
    },
    description: {
      en: "",
    }
  });
  const [loading, setLoading] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setCoin(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);


  return (
    <>
      {loading ? <div className='loading'></div> : <div className='container'>
        <div className="content">
          {/* to avoid getting an error if no data was found */}
          {coin.name ? <h1>{coin.name}</h1> : <p>No info is available at the moment, try later!</p>}
        </div>

        <div className="content">
          <div className='rank'>
            <span>Rank #{coin.market_cap_rank}</span>
          </div>
          <div className="info">
            <div className='basics'>
              {coin.image ? <img src={coin.image.small} alt={`${coin.name} icon`}/> : <p>No info is available at the moment, try later!</p>}
              {coin.name ? <p>{coin.name}</p> : <p>No info is available at the moment, try later!</p>}
              {coin.symbol ? <p>({coin.symbol.toUpperCase()}/USD)</p> : <p>No info is available at the moment, try later!</p>}
            </div>
            <div className='price'>
              {coin.market_data ? <h1>$ {coin.market_data.current_price.usd.toLocaleString()}</h1> : <p>No info is available at the moment, try later!</p>}
            </div>
          </div>
        </div>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>30d</th>
                <th>60d</th>
                <th>1y</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className={coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                  <td className={coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                  <td className={coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                  <td className={coin.market_data.price_change_percentage_30d_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                  <td className={coin.market_data.price_change_percentage_60d_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_60d_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                  <td className={coin.market_data.price_change_percentage_1y_in_currency.usd > 0 ? 'price-green' : 'price-red'}>{coin.market_data ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)} %</p> : <p>No info is available at the moment, try later!</p>}</td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className="content">
          <div className="stats">
            <div className='left-column'>
              <div className="row">
                <h4>24h Low</h4>
                {coin.market_data ? <p>$ {coin.market_data.low_24h.usd.toLocaleString()}</p> : <p>No info is available at the moment, try later!</p>}
              </div>
              <div className="row">
                <h4>24h High</h4>
                {coin.market_data ? <p>$ {coin.market_data.high_24h.usd.toLocaleString()}</p> : <p>No info is available at the moment, try later!</p>}
              </div>
            </div>
            <div className="right-column">
              <div className="row">
                <h4>Market Cap</h4>
                {coin.market_data ? <p>$ {coin.market_data.market_cap.usd.toLocaleString()}</p> : <p>No info is available at the moment, try later!</p>}
              </div>
              <div className="row">
                <h4>Circulating Supply</h4>
                {coin.market_data ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : <p>No info is available at the moment, try later!</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <CoinChart />
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            {/* using DOMPurify to sanitize the html since the api returns a string with html in it */}
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description ? coin.description.en : '')
            }}></p>
          </div>
        </div>
      </div>}
    </>
  )
}

export default CoinInfo;
