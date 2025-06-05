import React, {JSX} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from "react-router";
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import {store} from "./store/store";
import {CookiesProvider} from "react-cookie";
import Move from "./components/police/Move";
import Count from "./components/hospital/Count";
import Fire from "./components/police/Fire";
import Driver from "./components/police/Driver";
import Youth from "./components/police/Youth";
import Detail from "./components/board/Detail";
import BoardList from "./components/board/List";
import Update from "./components/board/Update";
import Insert from "./components/board/Insert";
import SeoulList from "./components/seoul/List"
import SeoulDetail from "./components/seoul/Detail"
import NewsList from "./components/news/NewsList";

function App():JSX.Element {
  return (
      <Provider store={store}>
          <CookiesProvider>
              <div className="app-wrapper d-flex flex-column min-vh-100">
                <Router>
                  <Header />
                      <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/hospital/count" element={<Count/>} />
                        <Route path="/police/move" element={<Move/>} />
                        <Route path="/police/fire" element={<Fire/>} />
                        <Route path="/police/driver" element={<Driver/>} />
                        <Route path="/police/youth" element={<Youth/>} />
                        <Route path="/board/list" element={<BoardList/>} />
                        <Route path="/board/detail/:no" element={<Detail/>} />
                        <Route path="/board/insert" element={<Insert/>} />
                        <Route path="/board/update/:no" element={<Update/>} />
                        <Route path="/seoul/list" element={<SeoulList/>} />
                        <Route path="/seoul/detail/:no" element={<SeoulDetail/>} />
                        <Route path={"/news/list"} element={<NewsList/>}/>
                      </Routes>
                  <Footer />
                </Router>
              </div>
          </CookiesProvider>
      </Provider>
  );
}

export default App;
