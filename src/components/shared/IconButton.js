import React from "react";
import styles from "./IconButton.module.css";

function IconButton({ label, Icon, onClick = () => null }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };

  return (
    <span
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={styles.container}
    >
      <Icon size={22} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}

export default IconButton;
