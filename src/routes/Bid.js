import {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {Tab, TabNavList, TabNav, TabContentList, TabContent} from "components/Tab";

function Bid() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const searchParamsData = {
      rows: 1,
      title: "{lorem}",
      like: "{number|1000}",
      likeStatus: "{bool}",
      id: params.id,
      amount: "{decimal|20}",
      amountCount: "{numberRange|1, 30}",
      amountCountMax: "{numberRange|30, 100}",
      authorFullname: "{firstName}~{lastName}",
      authorId: "{numberRange|1, 10}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('http://filltext.com/?'+searchParams)
        .then(response => {
          setData(response.data[0]);
          setLikeStatus(response.data[0].likeStatus);
          setLikeCount(response.data[0].like);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);


  const jpg = `/img/product/product_${data.id}.jpg`;
  const webp = `/img/product/product_${data.id}.webp`;
  const authorJpg = `/img/avatar/${data.id}.jpg`;
  const authorWebp = `/img/avatar/${data.id}.webp`;
  const authorTo = `/user/${data.authorId}`;

  function eventLike(event) {
    event.preventDefault();
    setLikeStatus(!likeStatus);
    likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  }

  if (loading) {
    return (<div className="container loading"></div>)
  }

  return (
    <section className="item container">
      <div className="item__img">
        <picture>
          <source srcSet={webp} type="image/webp" />
          <source srcSet={jpg} type="image/jpg" />
          <img src={jpg} alt={data.title} />
        </picture>
      </div>
      <div className="item__detail">
        <div className="item__title">
          <h1>{data.title}</h1>
          <div onClick={eventLike} className={likeStatus ? "item__like active" : "item__like"}>
            <svg><use href="/img/sprite.svg#heart"></use></svg>
            <span>{likeCount}</span>
          </div>
        </div>

        <div className="item__stat">From <strong>{data.amount && data.amount.toFixed(2)} ETH</strong> &#183; {data.amountCount} of {data.amountCountMax} available</div>

        <div className="item__creator">
          <span>Creator</span>
          <Link to={authorTo}>
            <picture>
              <source srcSet={authorWebp} type="image/webp" />
              <source srcSet={authorJpg} type="image/jpg" />
              <img src={authorJpg} alt="Mia Ayana" />
            </picture>
            <h4>{data.authorFullname}</h4>
          </Link>
        </div>

        <Tab className="item-tab">
          <TabNavList className="item-tab__menu">
            <TabNav>Details</TabNav>
            <TabNav>Offers</TabNav>
            <TabNav>History</TabNav>
          </TabNavList>

          <TabContentList>
            <TabContent className="item-tab__content">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </TabContent>
            <TabContent className="item-tab__content">
              <ul>
                <li>Offers 1</li>
                <li>Offers 2</li>
                <li>Offers 3</li>
              </ul>
            </TabContent>
            <TabContent className="item-tab__content">
              <ul>
                <li>History 1</li>
                <li>History 2</li>
                <li>History 3</li>
              </ul>
            </TabContent>
          </TabContentList>
        </Tab>

        <div className="item__button">
          <button className="btn btn--gradient"><span>Buy for {data.amount && data.amount.toFixed(2)} ETH</span></button>
          <button className="btn btn--transparent"><span>Make Offer</span></button>
        </div>
      </div>
    </section>
  )
}
export default Bid;
