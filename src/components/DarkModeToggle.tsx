const DarkModeToggle = ({ toggle, darkMode }: { toggle: () => void; darkMode: boolean }) => (
  <button className="p-2 rounded bg-gray-200 dark:bg-gray-600 text-black" onClick={toggle}>
    {darkMode ? '🌙 Dark' : '☀️ Light'}
  </button>
)

export default DarkModeToggle
