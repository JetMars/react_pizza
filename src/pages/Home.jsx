import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";

function Home({ searchValue }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryType, setCategoryType] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности (низ)",
    sortProperty: "rating",
  });

  const category = categoryType ? `category=${categoryType}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "desc" : "asc";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6446573fee791e1e29fc6cd1.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryType, sortType, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryType}
          onChangeCategory={(i) => setCategoryType(i)}
        />
        <Sort value={sortType} onChangeSortType={(i) => setSortType(i)} />
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
