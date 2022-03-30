import {useEffect, useState} from "react";

function Tab(props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
      setActive(props.nav.active);
  }, [])

  function onClickTabNav(key) {
    setActive(key);
  }

  return (
    <div className={props.className} >
      <ul className={props.nav.className}>
        {
          props.nav.list.map((item, index) => {
            return <li key={index} className={index === active ? "active" : ""} onClick={()=>{setActive(index)}}>{item}</li>
          })
        }
      </ul>

      <div className={props.content.className}>
        {
          props.content.content.filter((item, index) => index === active)
        }
      </div>
    </div>
  )
}


export default Tab;
