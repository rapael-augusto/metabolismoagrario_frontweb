import styles from "@/styles/calculator/index.module.css";
import { slidesCalculatorEnum } from "./calculatorSlidesType";

type slideItem = {
  title: string;
  slide: slidesCalculatorEnum;
};

interface NavigationHeaderProps {
  navigationsItems: Array<slideItem>;
  activeSlide: slidesCalculatorEnum;
  handleActiveSlideChange(slide: slidesCalculatorEnum): void;
}

export default function NavigationHeader({
  navigationsItems,
  activeSlide,
  handleActiveSlideChange,
}: NavigationHeaderProps) {
  return (
    <div className={styles.pageHeaderList}>
      {navigationsItems.map((item, index) => (
        <button
          key={`${item.title}_nav_item`}
          className={`${styles.pageHeaderItem} ${
            activeSlide === item.slide && styles.active
          }`}
          onClick={() =>
            handleActiveSlideChange(item.slide as slidesCalculatorEnum)
          }
        >
          <b>{item.title}</b>
        </button>
      ))}
    </div>
  );
}
