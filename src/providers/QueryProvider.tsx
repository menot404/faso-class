import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof Error) {
              toast.error(error.message);
            } else if (typeof error === 'string') {
              toast.error(error);
            } else {
              toast.error(t('Erreur de chargement des données'));
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof Error) {
              toast.error(error.message);
            } else if (typeof error === 'string') {
              toast.error(error);
            } else {
              toast.error(t('Erreur lors de l’opération'));
            }
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}