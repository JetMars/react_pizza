import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCategory, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, { popupList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PaginationPanel from "../components/PaginationPanel";
import NotFoundPizza from "../components/NotFoundPizza";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.pizza);
  const { category, sort, currentPage, inputSearch } = useSelector(
    (state) => state.filter
  );

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const getPizzas = () => {
    const categoryType = category ? `&category=${category}` : "";
    const search = inputSearch ? `&search=${inputSearch}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";

    dispatch(fetchPizzas({ categoryType, search, sortBy, order, currentPage }));
  };
  React.useEffect(() => {
    if (isMounted.current) {
      const url = qs.stringify({
        sort: sort.sortProperty,
        currentPage,
        category,
      });

      navigate(`?${url}`);
    }
    isMounted.current = true;
  }, [category, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      const sort = popupList.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sort, inputSearch, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <NotFoundPizza />
        ) : status !== "success" ? (
          [...new Array(8)].map((_, i) => <Sceleton key={i} />)
        ) : (
          data.map((data) => <PizzaBlock key={data.id} {...data} />)
        )}
      </div>
      <PaginationPanel />
    </>
  );
}

export default Home;
