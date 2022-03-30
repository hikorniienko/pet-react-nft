import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Bid from "components/Bid";

function UserBids(props) {
  const [more, setMore] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!more) return;

    const searchParamsData = {
      rows: "!8",
      title:"{lorem}",
      like: "{number|1000}",
      likeStatus: "{bool}",
      id: "{numberRange|1, 16}",
      amount: "{decimal|20}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('https://filltext.com/?'+searchParams)
        .then(response => setData(data.concat(response.data)))
        .catch(error => setError(error))
        .finally(() => setLoading(false));

    setMore(false);
  }, [more]);

  useEffect(() => {
    if (props.search === "") {
      setMore(true);
      return;
    };

    const searchParamsData = {
      rows: "!8",
      title: props.search,
      like: "{number|1000}",
      likeStatus: "{bool}",
      id: "{numberRange|1, 16}",
      amount: "{decimal|20}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('https://filltext.com/?'+searchParams)
        .then(response => setData(response.data))
        .catch(error => setError(error))
        .finally(() => setLoading(false));

    setMore(false);
  }, [props.search]);

  const dataBid = data.map((bid, index) => (
    <Bid key={bid.title + index} data={bid} index={index}/>
  ));

  const buttonMore = (
      <button disabled={data.length >= 16} className="btn btn--transparent" onClick={() => setMore(true)} ><span>Load More</span></button>
  );

  if (loading) {
    return (<div className="loading"></div>)
  }

  return (
    <>
      <div className="item-list">
        {dataBid}
      </div>

      <div className="item-list-loading">
        {data.length >= 8 && buttonMore}
      </div>
    </>
  )
}

export default UserBids;
