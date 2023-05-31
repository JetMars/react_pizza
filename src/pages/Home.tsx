import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { IFilter, setCategory, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, { popupList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PaginationPanel from "../components/PaginationPanel";
import NotFoundPizza from "../components/NotFoundPizza";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status } = useSelector((state: any) => state.pizza);
  const { category, sort, currentPage, inputSearch } = useSelector(
    (state: RootState) => state.filter
  );

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategory(id));
  };

  const getPizzas = () => {
    const categoryType = category ? `&category=${category}` : "";
    const search = inputSearch ? `&search=${inputSearch}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";

    // @ts-ignore
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
        } as IFilter)
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
          data.map((data: any) => <PizzaBlock key={data.id} {...data} />)
        )}
      </div>
      <PaginationPanel />
    </>
  );
};

export default Home;
