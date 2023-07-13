// import React, { useState } from "react";
// import useDarkSide from "../../hooks/useDarkSide";
// import { DarkModeSwitch } from "react-toggle-dark-mode";

// export default function Switcher() {
//     const [colorTheme, setTheme] = useDarkSide();
//     const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);
  
//     const toggleDarkMode = (checked)=>{
//       setTheme(colorTheme)
//       setDarkSide(checked)
//     }
  
//     return(
//       <>
//       <div >
//           <DarkModeSwitch
//           checked={darkSide}
//           onChange={toggleDarkMode} 
//           size={25}
//           />
//       </div>
//       </>
//     )
//   }

import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../hooks/useDarkSide";
 
export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
 
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
 
    return (
        <>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={25}
            />
        </>
    );
}