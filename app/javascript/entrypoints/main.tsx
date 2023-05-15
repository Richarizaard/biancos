import { createRoot } from 'react-dom/client'
import App from './App'
import './tailwind.css'
import fetch from 'cross-fetch'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const getCsrfToken = () =>
  document.querySelector('meta[name=csrf-token]')?.getAttribute('content') || ''

export const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': getCsrfToken(),
    },
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('react-spa-root')
  if (!container) return
  const root = createRoot(container)
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
})
