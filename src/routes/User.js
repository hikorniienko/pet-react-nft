import {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import axios from "axios";
import UserBids from "components/UserBids";

function User() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');

  const debounseSearch = useDebounce(debounseSetSearch, 500);

  useEffect(() => {
    const searchParamsData = {
      rows: 1,
      fullname: "{firstName}~{lastName}",
      id: params.id,
      bg: "{numberRange|1, 3}"
    };

    const searchParams = new URLSearchParams(searchParamsData);
    setLoading(true);
    axios.get('http://filltext.com/?'+searchParams)
        .then(response => setData(response.data[0]))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);

  function onChangeSearch(event){
    debounseSearch(event.target.value);
  }

  function debounseSetSearch(value) {
    setSearch(value);
  }

  if (data.length == 0) {
    return (<div className="container loading"></div>)
  }

  if (loading) {
    return (<div className="container loading"></div>)
  }

  const jpg = `/img/avatar/${data.id}.jpg`;
  const webp = `/img/avatar/${data.id}.webp`;
  const jpgBg = `/img/profile/${data.bg}.jpg`;
  const webpBg = `/img/profile/${data.bg}.webp`;

  return (
    <>
      <section className="profile">
        <picture>
          <source srcSet={webpBg} type="image/webp" />
          <source srcSet={jpgBg} type="image/jpg" />
          <img src={jpgBg} alt="Profile bg" />
        </picture>

        <div className="profile__user">
          <picture>
            <source srcSet={webp} type="image/webp" />
            <source srcSet={jpg} type="image/jpg" />
            <img src={jpg} alt="User avatar" />
          </picture>
          <h1>{data.fullname}</h1>
        </div>
      </section>

      <div className="item-list-nav container">
        <form className="search">
          <svg><use href="/img/sprite.svg#search"></use></svg>
          <input type="text" placeholder="Search item Here" onChange={onChangeSearch} />
        </form>

        <form className="select">
          <select>
            <option>Recently Listed</option>
            <option>Most Popular</option>
          </select>
          <svg><use href="/img/sprite.svg#arrow-down"></use></svg>
        </form>
      </div>

      <div className="container">
        <UserBids search={search}/>
      </div>
    </>
  )
}
export default User;
