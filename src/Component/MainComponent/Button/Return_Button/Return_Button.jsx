import React from "react";
import { useTheme } from "../../../../ThemeContext";

function Return_Button({ onClick }) {
  const { primaryColor, secondaryColor, pathheight } = useTheme();

  return (
    <button
      className="btn btn-primary"
      onClick={onClick}  // Use the provided onClick function directly
      style={{
        backgroundColor: primaryColor,
        height: "4%",
        fontSize: "11px",
        color: secondaryColor,
        width: "18%",
        marginRight: "2%",
      }}
    >
      Return
    </button>
  );
}

export default Return_Button;
