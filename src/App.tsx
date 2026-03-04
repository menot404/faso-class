import { RouterProvider } from "react-router-dom"
import { router } from "../app/routes"
import { Toaster } from "sonner"
import { AnimatePresence } from "framer-motion"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary"
import { useNetworkStatus } from "@/hooks/useNetworkStatus"

function App() {
  useNetworkStatus() // Surveille la connexion et affiche des toasts
  return (
    <>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </ErrorBoundary>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
