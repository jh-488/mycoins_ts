import { ICoins } from "../pages/home/Home";
import useScreenWidth from "../hooks/useScreenWidth";

const Coin = (props: ICoins) => {
  // to set the size of each element base on their market rank
  const scaledSize = (13 - props.market_cap_rank) * 50;
  const scaledFontSize = (13 - props.market_cap_rank) * 5;
  const scaledImageSize = (10 - props.market_cap_rank) * 20;

  // Responsivness based on screen width
  const screenWidth = useScreenWidth();
  const mobileScalingFactor = screenWidth < 700 ? 2 : 1;

  return (
    <div>
      <div
        className={`coin-bubble ${
          props.price_change_percentage_24h > 0 ? "green" : "red"
        }`}
        style={{
          width: `${scaledSize / mobileScalingFactor}px`,
          height: `${scaledSize / mobileScalingFactor}px`,
          fontSize: `${scaledFontSize / mobileScalingFactor}px`,
        }}
      >
        <div className="img-info">
          <img
            src={props.image}
            alt={props.name + "logo"}
            style={{ width: `${scaledImageSize / mobileScalingFactor}px` }}
          />
          <p>{props.symbol.toUpperCase()}</p>
        </div>
        <p>${props.current_price.toLocaleString()}</p>
        <p
          className={
            props.price_change_percentage_24h > 0 ? "price-green" : "price-red"
          }
        >
          {props.price_change_percentage_24h.toFixed(2)} %
        </p>
      </div>
    </div>
  );
};

export default Coin;
