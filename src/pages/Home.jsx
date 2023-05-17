import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCategory, setFilters } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { popupList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PaginationPanel from "../components/PaginationPanel";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category, sort, currentPage, inputSearch } = useSelector(
    (state) => state.filter
  );

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const categoryType = category ? `&category=${category}` : "";
    const search = inputSearch ? `&search=${inputSearch}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";

    axios
      .get(
        `https://6446573fee791e1e29fc6cd1.mockapi.io/items?page=${currentPage}&limit=6${categoryType}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((resp) => resp.data)
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
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
      fetchPizzas();
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
        {isLoading
          ? [...new Array(8)].map((_, i) => <Sceleton key={i} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
      <PaginationPanel />
    </>
  );
}

export default Home;
