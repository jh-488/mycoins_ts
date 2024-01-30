import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Coin from "../../components/Coin";

export interface ICoins {
  id: string;
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

const Home = () => {
  const [coins, setCoins] = useState<ICoins[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <div className="bubbles">
          {coins.map((coin: ICoins) => {
            return (
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <Coin
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  market_cap={coin.market_cap}
                  market_cap_rank={coin.market_cap_rank}
                  image={coin.image}
                  current_price={coin.current_price}
                  total_volume={coin.total_volume}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
