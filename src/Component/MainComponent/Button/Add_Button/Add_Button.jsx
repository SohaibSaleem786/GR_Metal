import React from "react";
import { useTheme } from "../../../../ThemeContext";

function Add_Button({ handleMenuItemClick }) {
  const { primaryColor, secondaryColor ,pathheight } = useTheme();

  return (
    <button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  height: "4%",
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "14%",
                  marginRight: "2%",
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </button>
  );
}

export default Add_Button;