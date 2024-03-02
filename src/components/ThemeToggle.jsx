import { useEffect, useState } from "react";
import { themMode } from "../constant/constants";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(themMode.LIGHT);

  const setDarkTheme = () => {
    document.documentElement.classList.add(themMode.DARK);
    localStorage.theme = themMode.DARK;

    setActiveTheme(themMode.DARK);
  };

  const setLightTheme = () => {
    document.documentElement.classList.remove(themMode.DARK);
    localStorage.theme = themMode.LIGHT;

    setActiveTheme(themMode.LIGHT);
  };

  useEffect(() => {
    if (
      localStorage.theme === themMode.DARK ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);
  const toggleTheme = () =>
    activeTheme === themMode.LIGHT ? setDarkTheme() : setLightTheme();

  return (
    <>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          checked={activeTheme === themMode.DARK ? true : false}
          className="sr-only peer"
          onChange={() => {
            toggleTheme();
          }}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-400 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 peer-checked:after:bg-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
      </label>
    </>
  );
};

export default ThemeToggle;
