import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PaginationPanel from "../components/PaginationPanel";

function Home() {
  const dispatch = useDispatch();
  const { category, sort, currentPage, inputSearch } = useSelector(
    (state) => state.filter
  );

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const categoryType = category ? `&category=${category}` : "";
  const search = inputSearch ? `&search=${inputSearch}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "desc" : "asc";

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://6446573fee791e1e29fc6cd1.mockapi.io/items?page=${currentPage}&limit=6${categoryType}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((resp) => resp.data)
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
  }, [category, sort, inputSearch, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
      <PaginationPanel />
    </>
  );
}

export default Home;
