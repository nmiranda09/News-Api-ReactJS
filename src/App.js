import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './features/header/Header';
import TopHeadlines from './features/topHeadlines/TopHeadlines';
import Search from './features/search/Search';
import Article from './features/article/Article';

import './app.scss';

function App() {

  return (

    <div className="app">
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route index element={<TopHeadlines />} />
          <Route path="search" element={<Search />} />
          <Route path="article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
