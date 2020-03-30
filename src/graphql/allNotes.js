import gql from 'graphql-tag'

export default gql`
   query {
      allNotes {
        data {
          _id
          author
          body
        }
      }
    }
`
