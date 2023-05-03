import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PaginationPanel from "../components/PaginationPanel";

function Home() {
  const dispatch = useDispatch();

  const { category, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const categoryType = category ? `&category=${category}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "desc" : "asc";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6446573fee791e1e29fc6cd1.mockapi.io/items?page=${currentPage}&limit=6${categoryType}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
  }, [category, sort, searchValue, currentPage]);

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
      <PaginationPanel onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}

export default Home;
