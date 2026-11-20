import {useState} from "react";
interface GreetingProps { name: string; }
function Greeting({name}: GreetingProps) { return <h2>Hello, {name}</h2>; }
export default function PropsStateEventsDemo() {
  const [count,setCount]=useState<number>(0);
  return <section><Greeting name="FSD-2 Student"/><p>Count: {count}</p><button onClick={()=>setCount(value=>value+1)}>Increment</button>{count>0?<p>Button clicked!</p>:<p>Click to begin.</p>}</section>;
}
