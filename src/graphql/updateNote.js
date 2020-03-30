
import gql from 'graphql-tag'

export default gql`
  mutation UpdateNote ($id:ID!, $body:String!, $author:String!) {
    updateNote(
      id: $id
      data: {
        author: $author,
        body: $body
      }
    ) {
        _id
        author
        body
    }
  }
`
