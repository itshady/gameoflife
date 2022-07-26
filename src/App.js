import './App.css';
import Grid from './components/Grid.js'

function App() {
  return (
    <div className="App">
      <Grid 
        width={20}
        height={10}
        mapData={true}
      />
    </div>
  );
}

export default App;
