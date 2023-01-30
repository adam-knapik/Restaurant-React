import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import Contact from "./components/contact/Contact";
//import Login from './components/login/Login';
import Manage from './components/manage/Manage';
import Error from "./components/error/Error";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='menu' element={<Menu />} />
        <Route path='kontakt' element={<Contact />} />
        <Route path='login' element={<Manage />} />
        <Route path='manage' element={<Manage />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
