import {Routes, Route} from "react-router-dom";
import Home from 'routes/Home';
import User from 'routes/User';
import Bid from 'routes/Bid';

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/bid/:id" element={<Bid />} />
      </Routes>
    </main>
  );
}
export default Main;
