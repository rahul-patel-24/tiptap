// // src/context/ThemeContext.tsx
// import { createContext, useContext, useEffect, useState } from 'react'

// type ThemeContextType = {
//   darkMode: boolean
//   toggleTheme: () => void
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     // Try to get theme from localStorage or default to false
//     return localStorage.getItem('theme') === 'dark'
//   })

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [darkMode])

//   const toggleTheme = () => setDarkMode(prev => !prev)

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext)
//   if (!context) throw new Error('useTheme must be used within ThemeProvider')
//   return context
// }
