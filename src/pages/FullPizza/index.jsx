import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PizzaBlock from "../../components/PizzaBlock";
import styles from "./FullPizza.module.scss";

function FullPizza() {
  const { id } = useParams();

  const [data, setData] = React.useState();

  React.useEffect(() => {
    axios
      .get(`https://6446573fee791e1e29fc6cd1.mockapi.io/items/${id}`)
      .then((resp) => resp.data)
      .then((data) => setData(data));
  }, [id]);

  if (!data) {
    return <div>Загрузка пиццы</div>;
  }

  return (
    <div className={styles.root}>
      <PizzaBlock {...data} />
    </div>
  );
}

export default FullPizza;
