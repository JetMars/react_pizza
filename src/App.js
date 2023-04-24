import React from "react";

import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Sceleton from "./components/PizzaBlock/Sceleton";

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://6446573fee791e1e29fc6cd1.mockapi.io/items")
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
              : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
