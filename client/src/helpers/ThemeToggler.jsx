import React from 'react'
import { SunMoon } from 'lucide-react'


const changeTheme = () => {
    const appBody = document.querySelector('body');
    appBody.classList.toggle('dark-mode');

    if (appBody.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        document.body.style.backgroundColor = '#2e2e2e';
    } else {
        localStorage.setItem('theme', 'light');
        document.body.style.backgroundColor = 'white';
    }
};

 
 const ThemeToggler = () => {
  return (
    <div><SunMoon onClick={changeTheme} /></div>
  )
}

export default ThemeToggler
