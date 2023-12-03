import { Link, Outlet } from 'react-router-dom';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
     
     <Upload/>
      <Outlet />
    </div>
  );
}

export default App;
