import gql from 'graphql-tag'

export default gql`
  mutation DeleteNote ($id: ID!) {
    deleteNote (id: $id) {
      _id
    }
  }
`
