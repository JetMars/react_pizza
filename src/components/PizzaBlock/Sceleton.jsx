import React from "react";

import styles from "./PizzaBlock.module.scss";

import ContentLoader from "react-content-loader";

const Sceleton = () => (
  <ContentLoader
    className={styles.pizza}
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="62" y="254" rx="0" ry="0" width="3" height="0" />
    <circle cx="137" cy="124" r="113" />
    <rect x="0" y="257" rx="0" ry="0" width="280" height="28" />
    <rect x="0" y="309" rx="14" ry="14" width="280" height="88" />
    <rect x="122" y="418" rx="16" ry="16" width="153" height="46" />
    <rect x="0" y="429" rx="8" ry="8" width="91" height="27" />
  </ContentLoader>
);

export default Sceleton;
