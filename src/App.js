
import { useState } from 'react';
import './App.css';
import Balance from './components/Balance';
import History from './components/History';

function App() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  return (
    <div className="App">
      <h1>Expence Tracker - Basic</h1>
      <Balance
        balance={balance}
        setBalance={setBalance}
        history={history}
        setHistory={setHistory}
      />
      <History
        history={history}
      />
    </div>
  );
}

export default App;
