import { Link } from "react-router-dom";

function Seller(props) {
  const count = props.index + 1;
  const jpg = `/img/avatar/${props.index + 1}.jpg`;
  const webp = `/img/avatar/${props.index + 1}.webp`;
  const to = "/user/"+ (props.index + 1);

  return (
    <Link to={to} className="home-slider__item">
        <div className="home-slider__count">{count}</div>
        <div className="home-slider__img">
          <picture>
            <source srcSet={webp} type="image/webp" />
            <source srcSet={jpg} type="image/jpg" />
            <img src={jpg} alt={props.data.fullname} />
          </picture>
          <span className={props.data.verification ? "active" : ""}>
            <svg><use href="/img/sprite.svg#check"></use></svg>
          </span>
        </div>
        <div className="home-slider__name">{props.data.fullname}</div>
        <div className="home-slider__price">{props.data.amount.toFixed(2)} <span>ETH</span></div>
    </Link>
  )
}
export default Seller;
