import {BrowserRouter, HashRouter} from "react-router-dom";
import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';

function App() {
  return (
    <HashRouter>
      <Header />
      <Main />
      <Footer />
    </HashRouter>
  );
}

export default App;
