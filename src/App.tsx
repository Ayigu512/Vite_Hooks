import React from 'react';
// import { Count, DateComponent, UserInfo, ForceUpdate}  from '@/components/use_state'
// import { InputFocus, CountPrev, Parent } from "@/components/use_ref";
import { Counter, TestColorCom, TestMouseInfo, CountDown, RandomNumber } from "@/components/use_effect";

// React.FC 是一个类型别名，用于定义无状态函数组件（Functional Component）的类型。
const App:React.FC = () => {
  return (
    <div>
      {/* <Count />
      <DateComponent />
      <UserInfo />
      <ForceUpdate />
      <InputFocus />
      <CountPrev />
      <Parent /> */}
      <Counter />
      <TestColorCom />
      <TestMouseInfo />
      <CountDown />
      <RandomNumber />
    </div>
  );
};

export default App;