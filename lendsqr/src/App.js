import { useState } from 'react';
import './App.scss';
import Login from './components/Login';
import Dashboard from './global/Dashboard';

function App() {
  const [dashboard, setDashboard] = useState(false)
  return (
    <div className="App">
      { dashboard ? <Dashboard setDashboard={setDashboard} />: <Login dashboard={dashboard} setDashboard={setDashboard} /> }
      
    </div>
  );
}

export default App;
