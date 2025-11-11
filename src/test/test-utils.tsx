import * as React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n/config'

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

interface AllTheProvidersProps {
  children: React.ReactNode
  queryClient?: QueryClient
}

function AllTheProviders({ children, queryClient }: AllTheProvidersProps) {
  const client = queryClient || createTestQueryClient()

  return (
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{children}</BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient, ...renderOptions } = options

  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} queryClient={queryClient} />
    ),
    ...renderOptions,
  })
}

export * from '@testing-library/react'
export { customRender as render, createTestQueryClient }

