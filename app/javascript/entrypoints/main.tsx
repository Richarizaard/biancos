console.log(
  'Visit the guide for more information: ',
  'https://vite-ruby.netlify.app/guide/rails'
)

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './tailwind.css'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const getCsrfToken = () =>
  document.querySelector('meta[name=csrf-token]')?.getAttribute('content') || ''

const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': getCsrfToken(),
    },
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
