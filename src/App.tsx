import { useState } from 'react'
import Editor from './components/Editor'
import DarkModeToggle from './components/DarkModeToggle'
import './styles/index.css'
// import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    //  <ThemeProvider>
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 Tiptap Rich Text Editor</h1>
          <DarkModeToggle toggle={() => setDarkMode(!darkMode)} darkMode={darkMode} />
        </div>
        <Editor />
      </div>
      </div>
      // </ThemeProvider>
  )
}

export default App
