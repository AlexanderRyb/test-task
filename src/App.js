import './App.css';
import Container from './Components/Container/Container'
import store from "./Redux/store"
import {Provider} from "react-redux"
function App() {
  return (
    <Provider store={store}>

    
    <div className="App">
      <Container></Container>
    </div>
    </Provider>
  );
}

export default App;
