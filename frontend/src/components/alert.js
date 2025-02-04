import React, { useEffect, useState } from "react";

const Alert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose(); // Remove the message from state after it fades
        }
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible) return null; // Don't render if invisible

  return (
    <div className={`alert ${type === "success" ? "alert-success" : "alert-error"} ${visible ? "alert-visible" : ""}`}>
      {message}
    </div>
  );
};

export default Alert;