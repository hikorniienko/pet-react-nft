import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useRequest from "hooks/useRequest";

function Bids() {
  const bids = useRequest(getBids);

  function getBids(){
    const data = {
      "rows": 8,
      "title": "{lorem}",
      "like": "{number|1000}",
      "likeStatus": "{bool}",
      "id": "{numberRange|1, 16}",
      "amount": "{decimal|20}"
    };

    const searchParams = new URLSearchParams(data);
    return axios.get('http://filltext.com/?'+searchParams);
  }

  function elBid() {
    if (bids.data === null || typeof bids.data !== "object") return;

    return bids.data.map((bid, index) => {
      const key = bid.title + index;
      const to = "/bid/"+ (index + 1);
      const jpg = `img/product/product_${index + 1}_small.jpg`;
      const webp = `img/product/product_${index + 1}_small.webp`;

      return (
        <Link to={to} key={key} className="item-list__item">
          <picture>
            <source srcSet={webp} type="image/webp" />
            <source srcSet={jpg} type="image/jpg" />
            <img src={jpg} alt={bid.title} />
          </picture>

          <h3>{bid.title}</h3>
          <div className="item-list__details">
            <div className="item-list__price">
              {bid.amount.toFixed(2)}
              <span>ETH</span>
            </div>
            <div className={bid.likeStatus ? "item-list__like active" : "item-list__like"}>
              <svg><use href="img/sprite.svg#heart"></use></svg>
              <span>{bid.like}</span>
            </div>
          </div>
        </Link>
      )
    });
  }

  return (
    <>
      <div className={bids.loading ? "item-list loading" : "item-list"}>
        {elBid()}
      </div>

      <div className="item-list-loading">
        <button className="btn btn--transparent"><span>Load More</span></button>
      </div>
    </>
  )
}

export default Bids;
