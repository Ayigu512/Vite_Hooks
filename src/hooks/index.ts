import { useState, useEffect } from 'react';
// 自定义hook需要以use开头
export const useMousePosition = (delay:number = 0) => {
  const [position, setPosition] = useState({x:0, y:0})
  
  useEffect(() => {
    // 节流函数
    let timerId:null | NodeJS.Timeout = null
    const mouseMoveHandler = (e:MouseEvent) => {
      // 通过timerId来判断是否已经有定时器在执行
      if(timerId!==null)return
      timerId = setTimeout(() => {
        setPosition({x:e.clientX, y:e.clientY})
        console.log(e.clientX, e.clientY)
        // 清除定时器
        timerId = null
      }, delay)
      
    }
    window.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  },[])
  return position
}

type UseCountDown = (num?:number) => [number, boolean]

export const useCountDown:UseCountDown = (num:number = 10) => {

  const seconds = Math.round(Math.abs(num)) || 10

  const [count, setCount] = useState(seconds)
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    const timerId = setTimeout(() => {
      if(count>1){
        setCount((prev) => prev - 1)
      }else {
        // 清除定时器
        clearTimeout(timerId)
        setDisabled(false)
      }
    }, 1000)
    return () => {
      clearTimeout(timerId)
    }
  },[count])

  return [count, disabled]
}