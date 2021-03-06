import {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Tab from "components/Tab";
import {Modal, ModalHeader, ModalContent, ModalFooter} from "components/Modal";

function Bid() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [tab, setTab] = useState(0);
  const [modalBuy, setModalBuy] = useState(false);
  const [modalCheckout, setModalCheckout] = useState(false);

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
    axios.get('https://filltext.com/?'+searchParams)
        .then(response => {
          setData(response.data[0]);
          setLikeStatus(response.data[0].likeStatus);
          setLikeCount(response.data[0].like);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);


  const jpg = `img/product/product_${data.id}.jpg`;
  const webp = `img/product/product_${data.id}.webp`;
  const authorJpg = `img/avatar/${data.authorId}.jpg`;
  const authorWebp = `img/avatar/${data.authorId}.webp`;
  const authorTo = `/user/${data.authorId}`;

  function eventLike(event) {
    event.preventDefault();
    setLikeStatus(!likeStatus);
    likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  }

  function renderModalBuy() {
    const jpg = `img/product/product_${data.id}_small.jpg`;
    const webp = `img/product/product_${data.id}_small.webp`;

    return (
      <Modal close={closeModalBuy}>
        <ModalHeader>
          <h3>Check Out</h3>
        </ModalHeader>
        <ModalContent>
          <div className="checkout">
            <header className="checkout__row">
              <strong>Item</strong>
              <strong>Subtotal</strong>
            </header>

            <div className="checkout__row">
              <div className="checkout__item">
                <picture>
                  <source srcSet={webp} type="image/webp" />
                  <source srcSet={jpg} type="image/jpg" />
                  <img src={jpg} alt={data.title} />
                </picture>
                <div className="checkout__detail">
                  <strong>{data.authorFullname}</strong>
                  {data.title}
                </div>
              </div>
              <span>{data.amount && data.amount.toFixed(2)} <strong>ETH</strong></span>
            </div>

            <footer className="checkout__row">
              <strong>Total</strong>
              <span>{data.amount && data.amount.toFixed(2)} <strong>ETH</strong></span>
            </footer>
          </div>
        </ModalContent>
        <ModalFooter>
          <div className="modal__button">
            <div className="modal__button__inner">
              <button className="btn btn--gradient" onClick={()=>{setModalBuy(false); setModalCheckout(true)}}><span>Checkout</span></button>
              <button className="btn btn--transparent" onClick={()=>{setModalBuy(false)}}><span>Cancel</span></button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    )
  }

  function closeModalBuy() {
    setModalBuy(false);
  }

  function renderModalCheckout() {
    const jpg = `img/product/product_${data.id}_small.jpg`;
    const webp = `img/product/product_${data.id}_small.webp`;

    return (
      <Modal close={closeModalCheckout}>
        <ModalHeader>
          <h3>Payment Successful</h3>
        </ModalHeader>
        <ModalContent>
          <div className="successful">
            <picture>
              <source srcSet={webp} type="image/webp" />
              <source srcSet={jpg} type="image/jpg" />
              <img src={jpg} alt={data.title} />
            </picture>

            <p>
              You successfully purchased <strong>{data.title}</strong> from <strong>{data.authorFullname}</strong>
            </p>
          </div>
        </ModalContent>
        <ModalFooter>
          <div className="successful-social">
            <span>Share</span>
            <ul>
              <li><Link to="/"><svg><use href="img/sprite.svg#instagram"></use></svg></Link></li>
              <li><Link to="/"><svg><use href="img/sprite.svg#twitter"></use></svg></Link></li>
              <li><Link to="/"><svg><use href="img/sprite.svg#telegram"></use></svg></Link></li>
            </ul>
          </div>
        </ModalFooter>
      </Modal>
    )
  }

  function closeModalCheckout() {
    setModalCheckout(false);
  }

  function tabContent() {
    const details = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
    const offers = (
      <ul key="a">
        <li key={"0"}>Offers 1</li>
        <li key={"1"}>Offers 2</li>
        <li key={"2"}>Offers 3</li>
      </ul>
    );
    const history = (
      <ul key="b">
        <li key={"3"}>History 1</li>
        <li key={"4"}>History 2</li>
        <li key={"5"}>History 3</li>
      </ul>
    );

    return [details, offers, history];
  }

  if (loading) {
    return (<div className="container loading"></div>)
  }

  return (
    <>
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
              <svg><use href="img/sprite.svg#heart"></use></svg>
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

          <Tab className="item-tab" nav={{className: "item-tab__menu", list: ["Details", "Offers", "History"], active: 1}} content={{className: "item-tab__content", content: tabContent()}}/>

          <div className="item__button">
            <button className="btn btn--gradient" onClick={()=>{setModalBuy(!modalBuy)}}><span>Buy for {data.amount && data.amount.toFixed(2)} ETH</span></button>
            <button className="btn btn--transparent" onClick={()=>{setModalBuy(!modalBuy)}}><span>Make Offer</span></button>
          </div>
        </div>
      </section>

      {modalBuy && renderModalBuy()}
      {modalCheckout && renderModalCheckout()}
    </>
  )
}
export default Bid;
