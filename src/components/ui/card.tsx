import React from "react";
import styles from "../../styles/Card.module.css"; // Import Card styles

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className = "", ...props }) => {
  return <div className={`${styles.card} ${className}`} {...props} />;
};

export default Card;
