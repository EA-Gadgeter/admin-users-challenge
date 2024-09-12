import { Switch } from "@nextui-org/react";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useDarkModeStore } from "../stores";

export const DarkModeSwitch = () => {
  const darkMode = useDarkModeStore(state => state.darkMode);
  const toggleDarkMode = useDarkModeStore(state => state.toggleDarkMode);

  return (
    <Switch
      isSelected={darkMode}
      size="lg"
      color="default"
      onChange={toggleDarkMode}
      thumbIcon={({isSelected, className}) =>
        isSelected ? (
          <SunIcon className={className}/>
        ) : (
          <MoonIcon className={className}/>
        )
      }
    >
      <span className="font-semibold text-base">
        {darkMode ?  "Turn off" : "Turn on"} Dark mode
      </span>
    </Switch>
  );
};