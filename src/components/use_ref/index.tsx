import React, {useRef,useState, useImperativeHandle} from 'react'

export const InputFocus:React.FC = () => {
  //HTMLInputElement 是一个类型别名，用于定义 HTML 输入元素的类型。同时能够触发代码的智能提示
  // useRef 是一个 Hook，用于创建一个可变的 ref 对象，该对象可以在组件的整个生命周期中保持不变。
  // useRef 接受一个参数，该参数是 ref 对象的初始值。
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    // ？是一个可选链操作符，用于安全地访问对象的属性。
    // 如果对象为 null 或 undefined，那么可选链操作符会返回 undefined，而不会抛出错误。
    // 所以这里的 inputRef.current?.focus() 会先判断 inputRef.current 是否为 null 或 undefined，如果不是，那么就会调用 focus 方法。
    inputRef.current?.focus()
  }
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
      <hr />
    </>
  )
}

export const CountPrev:React.FC = () => {
  const [count, setCount] = useState(0)
  // useRef 是一个 Hook，用于创建一个可变的 ref 对象，该对象可以在组件的整个生命周期中保持不变。
  // useRef 接受一个参数，该参数是 ref 对象的初始值。
  const prevCountRef = useRef<number>(0)
  const add = () => {
    setCount(prev=>prev+1)
    prevCountRef.current = count
  }
  return (
    <>
      <h3>New Count: {count},Prev Count:{prevCountRef.current}</h3>
      <button onClick={add}>+1</button>
      <hr />
    </>
  )
}

export const Child= React.forwardRef((_,ref)=>{
  const [count, setCount] = useState(0)
  const handleClick = (step:number)=>{
    setCount(prev=>prev+=step)
  }
  useImperativeHandle(ref,()=>{
    console.log('执行了useImperativeHandle回调函数')
    return {
      // 这里的方法可以在父组件中调用
      count,
      //setCount,
      // 调整暴露给父组件的粒度，只暴露需要的方法，不暴露不需要的方法，这样可以避免父组件调用不需要的方法，提高代码的可读性和可维护性。
      reset:()=> setCount(0),
    }
    // 这里的依赖项是一个数组，用于指定依赖项的变化。
    // 如果依赖项发生变化，那么回调函数会重新执行。
    // 如果不指定依赖项，那么回调函数会在每次组件渲染时执行。
  },[count])
  return <>
    <h3>count 的值是：{count}</h3>
    <button onClick={()=>handleClick(+1)}>+1</button>
    <button onClick={()=>handleClick(-1)}>-1</button>
    <hr />
  </>
})

export const Parent:React.FC = () => {
  const childRef = useRef<{count:number,reset:()=>void}>(null)
  const onReset = () => {
    childRef.current?.reset()
  }
  const showRef = () => {
    console.log(childRef.current)
  }
  return<>
    <h3>
      子组件的 count 值是：{childRef.current?.count}
    </h3>
    <Child ref={childRef}/>
    <button onClick={showRef}>ShowRef</button>
    <button onClick={onReset}>Reset</button>
    <hr />
  </>
}