import React, { useState } from 'react'

export const Count:React.FC = () => {
  const [count, setCount] = useState(0)
  // 每次触发了状态变化都会重新渲染组件
  console.log(count,'重新渲染')
  const handleClick = () => {
    setCount(count + 1)
    console.log(count,'setCount函数内部是异步修改的，不会立即更新状态') 
  }
  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={handleClick}>Increment</button>
      <hr />
    </>
  )
}

export const DateComponent:React.FC = () => {
  console.log('DateComponent 重新渲染')
  const [date] = useState(()=>{
    const now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    }
  })
  return (
    <>
      <h3>当前日期信息：</h3>
      <p>年份：{date.year}</p>
      <p>月份：{date.month}</p>
      <p>日期：{date.day}</p>
      <hr />
    </>
  )
}

export const UserInfo:React.FC = () => {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
  })
  const handleClick = () => {
    // 更新对象类的的状态，需要将对象展开后再更新，原理是浅拷贝，不会重新渲染组件，需要新的对象才会更新状态
    setUser({...user, age: user.age + 1, name: 'Tom' })
  }

  return (
    <>
      <h3>用户信息：</h3>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <button onClick={handleClick}>
        修改用户信息
      </button>
      <hr />
    </>
  )
}

export const ForceUpdate:React.FC = () => {
  /**
   * 强制更新组件
   * 1. 每次调用 useState 都会返回一个新的状态，即使状态没有变化，也会重新渲染组件
   * 2. 可以通过调用 useState 来强制更新组件
   * 3. 可以通过调用 useState 来强制更新组件，但是不建议使用，因为会导致组件的性能问题
   **/
  const [, forceUpdate] = useState({})
  const onRefresh = () => forceUpdate({})
  return (
    <>
      <button onClick={onRefresh}>强制刷新组件：{Date.now()}</button>
      <hr />
    </>
  )
}