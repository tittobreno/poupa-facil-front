import { HiMoon, HiSun } from "react-icons/hi";
import { getItem, setItem } from "../../utils/storage";
import "./styles.css";
const ToggleTheme = () => {
  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
    setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
    setItem("selectedTheme", "light");
  };

  const selectedTheme = getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
  }

  const toggleTheme = (event: any) => {
    if (event.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };
  return (
    <div className="toggle-theme__container">
      <input
        className="toggle-theme__input"
        type="checkbox"
        id="theme-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label htmlFor="theme-toggle" className="toggle-theme__label">
        <HiSun size={15} className="sun" />
        <HiMoon size={15} className="moon" />
      </label>
    </div>
  );
};

export default ToggleTheme;
