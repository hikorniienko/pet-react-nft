import axios from "axios";
import useRequest from "hooks/useRequest";

function useBids() {
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

  return bids;
}
export default useBids;
