import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";

function Home() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryType, setCategoryType] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6446573fee791e1e29fc6cd1.mockapi.io/items?category=${
        categoryType ? categoryType : ""
      }`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryType]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryType}
          onChangeCategory={(i) => setCategoryType(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
    </>
  );
}

export default Home;
