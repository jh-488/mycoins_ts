import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { RouteParams } from "../pages/coinPage/CoinPage";


type ChartData = [x: number, y: number];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinChart = () => {
  const { coinId } = useParams<RouteParams>();
  const [coinData, setCoinData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoinData(response.data.prices);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const coinChartData = coinData.map((val) => ({
    x: val[0],
    y: val[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: coinChartData.map((val) => moment(val.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: coinId,
        data: coinChartData.map((val) => val.y),
        borderColor: "#356ceb",
        backgroundColor: "rgba(53, 108, 235, 0.3)",
      },
    ],
  };

  

  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div>
          <Line options={options} data={data} />
        </div>
      )}
    </>
  );
};

export default CoinChart;
