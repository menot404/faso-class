import { RouterProvider } from "react-router-dom"
import { router } from "../app/routes"
import { Toaster } from "sonner"
import { AnimatePresence } from "framer-motion"

function App() {

  return (
    <>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
