import './App.css';
import Grid from './components/Grid.js'

function App() {
  return (
    <div className="App">
      <Grid 
        mapData={[[0,0],[0,1]]}
      />
    </div>
  );
}

export default App;
