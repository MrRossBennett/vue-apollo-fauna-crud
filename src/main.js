import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { RestLink } from 'apollo-link-rest'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

const restLink = new RestLink({
  endpoints: {
    booksApi: {
      uri: 'https://www.googleapis.com/books/v1/volumes'
    },
    moviesApi: {
      uri: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false`
    }
  }
})

const httpLink = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.VUE_APP_FAUNADB_CLIENT_KEY

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: ApolloLink.from([restLink, authLink, httpLink]),
  // link: authLink.concat(httpLink),
  cache
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
