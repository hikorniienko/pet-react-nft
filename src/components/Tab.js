import {Children, cloneElement, useEffect, useState} from "react";

export function Tab(props) {
  const [active, setActive] = useState(0);

  function onClickTabNav(key) {
    setActive(key);
  }

  return (
    <div className={props.className} >
      {
        Children.map(props.children, (child) => {
          if (child.type.name === "TabNavList") {
            return cloneElement(child, {
              active: active,
              onClickTabNav: onClickTabNav
            })
          }

          if (child.type.name === "TabContentList") {
            return cloneElement(child, {
              active: active
            })
          }
        })
      }
    </div>
  )
}

export function TabNavList(props) {
  return (
    <ul className={props.className}>
      {
        Children.map(props.children, (child, i) => {
          return cloneElement(child, {
            active: i === props.active ? "active" : "",
            index: i,
            t: "12",
            onClickTabNav: props.onClickTabNav
          })
        })
      }
    </ul>
  )
}

export function TabNav(props) {
  function onClickTabNav() {
    props.onClickTabNav(props.index);
  }

  return (
    <li key={props.index} className={props.active} onClick={onClickTabNav}>{props.children}</li>
  )
}

export function TabContentList(props) {
  return (
    <>
     {
       Children.map(props.children, (child, i) => {
         if (i === props.active) {
            return child;
         }
       })
     }
    </>
  )
}

export function TabContent(props) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  )
}

export default {Tab, TabNavList, TabNav, TabContentList, TabContent};
