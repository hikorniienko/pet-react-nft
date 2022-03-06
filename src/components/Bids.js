import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Bid from "components/Bid";

function Bids() {
  const [more, setMore] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!more) return;

    const searchParamsData = {
      "rows": 8,
      "title": "{lorem}",
      "like": "{number|1000}",
      "likeStatus": "{bool}",
      "id": "{numberRange|1, 16}",
      "amount": "{decimal|20}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('http://filltext.com/?'+searchParams)
        .then(response => setData(data.concat(response.data)))
        .catch(error => setError(error))
        .finally(() => setLoading(false));

    setMore(false);
  }, [more]);

  const dataBid = data.map((bid, index) => (
    <Bid key={bid.title + index} data={bid} index={index}/>
  ));

  return (
    <>
      <div className={ loading ? "item-list loading" : "item-list" }>
        {dataBid}
      </div>

      <div className="item-list-loading">
        <button disabled={data.length >= 16} className="btn btn--transparent" onClick={() => setMore(true)} ><span>Load More</span></button>
      </div>
    </>
  )
}

export default Bids;
