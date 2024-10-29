import React from 'react'
import { SunMoon } from 'lucide-react'


const changeTheme = () => {
    const appBody = document.querySelector('body');
    appBody.classList.toggle('dark-mode');

    if (appBody.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
};

 
 const ThemeToggler = () => {
  return (
    <div><SunMoon onClick={changeTheme} /></div>
  )
}

export default ThemeToggler
