import gql from 'graphql-tag'

export default gql`
  mutation CreateNote ($author: String!, $body: String!) {
    createNote(data: {
      author: $author,
      body: $body
    }) {
      _id
      author
      body
    }
  }
`
