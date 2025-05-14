import { useCountDown, useMousePosition } from '@/hooks';
import React, { useState, useEffect, useLayoutEffect } from 'react';

export const Counter:React.FC = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false)

  // console.log(document.querySelector('h3')?.innerText)
  const add = () => {
    setCount((prev) => prev + 1);
  }
  /** 
   * useEffect 是一个 Hook，用于在组件渲染后执行副作用操作。
   * useEffect 接受一个回调函数，该回调函数会在组件渲染后执行。
   * 如果省略了依赖项数组，那么回调函数会在每次组件渲染后执行。
   * 如果依赖项指定的是空数组，那么回调函数只会在组件挂载时执行一次。
   * 如果依赖项指定的是一个函数，那么回调函数只会在组件卸载时执行一次。
  */
  useEffect(() => {
    console.log(document.querySelector('h3')?.innerText)
  },[count])
  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={add}>+1</button>
      <button onClick={() => setFlag(prev=>!prev)}>Toggle:{flag.toString()}</button>
      <hr />
    </>
  )
}

export const ColorCom:React.FC = () => {
  const [color, setColor] = useState('')
  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.liulongbin.top/v1/color',{signal:controller.signal})
      .then(res => res.json())
      .then(res => {
        setColor(
          res.data.color)
          console.log('color', res)
      })
        .catch(err => console.log(err))
    // 组件被卸载的时候，会执行这个函数
    // useEffect在被执行之前，会先执行return中的清理函数
    return ()=>controller.abort()
  },[])
  return<>
    <p>color的颜色是：{color}</p>
  </>
}

export const TestColorCom:React.FC = () => {
  const [flag, setFlag] = useState(true)
  return <>
    <button onClick={()=>{setFlag((prev)=>!prev)}}>Toggle</button>
    {flag && <ColorCom />}
    <hr />
  </>

}

export const MouseInfo:React.FC = () => {
  // const [position, setPosition] = useState({x:0, y:0})
  
  // useEffect(() => {
  //   // 节流函数
  //   let timerId:null | NodeJS.Timeout = null
  //   const mouseMoveHandler = (e:MouseEvent) => {
  //     // 通过timerId来判断是否已经有定时器在执行
  //     if(timerId!==null)return
  //     timerId = setTimeout(() => {
  //       setPosition({x:e.clientX, y:e.clientY})
  //       console.log(e.clientX, e.clientY)
  //       // 清除定时器
  //       timerId = null
  //     }, 300)
      
  //   }
  //   window.addEventListener('mousemove', mouseMoveHandler)
  //   return () => {
  //     window.removeEventListener('mousemove', mouseMoveHandler)
  //   }
  // },[])
  const position = useMousePosition(100)
  return <>
    <p>鼠标的位置是：{JSON.stringify(position)}</p>
  </>
}

export const TestMouseInfo:React.FC = () => {
  const [flag, setFlag] = useState(true)
  return <>
    <button onClick={()=>{setFlag((prev)=>!prev)}}>Toggle</button>
    {flag && <MouseInfo />}
    <hr />
  </>
}

export const CountDown:React.FC = () => {
  const [count, disabled] = useCountDown()
  return <>
    <button disabled={disabled} onClick={()=>console.log('协议生效！')}>
      {disabled?`请仔细阅读次协议（${count}）秒`:'我已阅读协议'}
    </button>
  </>
}

export const RandomNumber:React.FC = () => {
  const [num, setNum] = useState(Math.random()*200)
  // 将num变成0的时候，触发useLayoutEffect的副作用函数,页面未渲染完成，会先执行useLayoutEffect的副作用函数，直接又将num变成了随机数
  useLayoutEffect(() => {
    console.log('触发了useEffect的副作用函数',num)
    if(num===0){
      setNum(Math.random()*200)
    }
  })
  return(
    <>
      <h3>Random Number: {num}</h3>
      <button onClick={()=>setNum(0)}>Change num to 0</button>
    </>
  )
}
