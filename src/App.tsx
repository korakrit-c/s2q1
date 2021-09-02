import { useState, ChangeEvent } from 'react';
import './App.css';

function isPrime(num: number) {
  if (num <= 1)
    return false;
  if (num === 2)
    return true;
  
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
    return true;
  }
}

function isFibonacci(num: number) {
  let a: number = 1;
  let b: number = 0;
  let temp: number;

  while (num >= 0) {
    temp = a;
    a += b;
    b = temp;
    num--;
  }
  return b;
}

const App: React.FunctionComponent = () => {
  interface DataProps {
    number: string;
    calculation: string;
    result: string;
  }

  const [multiState, setMultiState] = useState<DataProps>({
    number: "1",
    calculation: "isPrime",
    result: "false"
  });

  const calculator = (num: number, calculation: string) => {
    if (calculation === "isPrime") {
      return isPrime(num);
    } else {
      return isFibonacci(num);
    }
  }

  const onChange = (event: ChangeEvent<any>) => {
    if (event.target.id === "calculate") {
      calculateHandler(event);
    } else {
      numberHandler(event);
    }
  }

  const numberHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const re = /^\+?([1-9]\d*)$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      const entered = event.target.value;
      setMultiState({
        number: entered,
        calculation: multiState.calculation,
        result: String(calculator(Number(entered), String(multiState.calculation)))
      })
    }
  }

  const calculateHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const entered = event.target.value;
    setMultiState({
      number: multiState.number,
      calculation: entered,
      result: String(calculator(Number(multiState.number), String(entered)))
    })
  }

  return (
    <div className="container">
      <div className="col1 border">
        <input id="number" type="text" step="1" value={multiState.number} onChange={onChange} />
      </div>
      <div className="col2 border">
        <select id="calculate" value={multiState.calculation} onChange={onChange}>
          <option value="isPrime">isPrime</option>
          <option value="isFibanacci">isFibanacci</option>
        </select>
      </div>
      <div className="col3 border">
        <p>{multiState.result}</p>
      </div>
    </div>
  );
}

export default App;