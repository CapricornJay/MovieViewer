import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Add from "./components/Add";
import AllTimeTopMovies from "./components/AllTimeTopMovies";
import Header from "./components/Header";
import UpcomingMovies from "./components/UpcomingMovies";
import { GlobalContextProvider } from "./context/GlobalState";

const App = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={UpcomingMovies} />
          <Route exact path="/alltime" component={AllTimeTopMovies} />
          <Route exact path="/add" component={Add} />
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
