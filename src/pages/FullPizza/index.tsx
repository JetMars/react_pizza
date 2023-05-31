import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PizzaBlock from "../../components/PizzaBlock";
import styles from "./FullPizza.module.scss";

const FullPizza: React.FC = () => {
  const { id } = useParams();

  const [data, setData] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
  }>();

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
};

export default FullPizza;
