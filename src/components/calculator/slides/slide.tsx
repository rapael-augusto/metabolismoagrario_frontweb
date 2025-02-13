import { ReactNode } from "react";
import styles from "@/styles/calculator/index.module.css";

interface SlideProps {
  children: ReactNode;
}

interface SlideHeaderProps {
  title: string;
  description: string;
}

export default function Slide({ children }: SlideProps) {
  return <div className={styles.section}>{children}</div>;
}

Slide.Header = function Header({ title, description }: SlideHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

Slide.Main = function Main({ children }: { children: ReactNode }) {
  return <div className={styles.sectionMain}>{children}</div>;
};

Slide.Footer = function Footer({ children }: { children: ReactNode }) {
  return <div className={styles.mainFooter}>{children}</div>;
};
