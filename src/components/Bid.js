import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Bid(props) {
  const [likeStatus, setLikeStatus] = useState(props.data.likeStatus);
  const [likeCount, setLikeCount] = useState(props.data.like);

  const key = props.data.title + props.index;
  const to = "/bid/"+ (props.index + 1);
  const jpg = `img/product/product_${props.index + 1}_small.jpg`;
  const webp = `img/product/product_${props.index + 1}_small.webp`;

  function eventLike(event) {
    event.preventDefault();
    setLikeStatus(!likeStatus);
    likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  }

  return (
    <Link to={to} key={key} className="item-list__item">
      <picture>
        <source srcSet={webp} type="image/webp" />
        <source srcSet={jpg} type="image/jpg" />
        <img src={jpg} alt={props.data.title} />
      </picture>

      <h3>{props.data.title}</h3>
      <div className="item-list__details">
        <div className="item-list__price">
          {props.data.amount.toFixed(2)}
          <span>ETH</span>
        </div>
        <div onClick={eventLike} className={likeStatus ? "item-list__like active" : "item-list__like"}>
          <svg><use href="img/sprite.svg#heart"></use></svg>
          <span>{likeCount}</span>
        </div>
      </div>
    </Link>
  )
}
export default Bid;
