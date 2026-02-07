import './App.css'
import { ThemeProvider } from './contexts/theme/ThemeProvider'
import { ModeToggle } from './components/layout/ModeToggle'
function App() {

  return (
    <>
      <ThemeProvider  defaultTheme="light" storageKey="vite-ui-theme">
        <div>
          <ModeToggle/>
          <h1>FasoClass</h1>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
