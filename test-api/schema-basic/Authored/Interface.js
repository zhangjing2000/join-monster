import  {
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLString
} from 'graphql'

import { q } from '../../shared'

const { DB } = process.env

export default new GraphQLInterfaceType({
  name: 'AuthoredInterface',
  sqlTable: `(
    SELECT
      ${q('id', DB)},
      ${q('body', DB)},
      ${q('author_id', DB)},
      NULL AS ${q('post_id', DB)},
      'Post' AS ${q('$type', DB)}
    FROM ${q('posts', DB)}
    UNION ALL
    SELECT
      ${q('id', DB)},
      ${q('body', DB)},
      ${q('author_id', DB)},
      ${q('post_id', DB)},
      'Comment' AS ${q('$type', DB)}
    FROM ${q('comments', DB)}
  )`,
  uniqueKey: [ 'id', '$type' ],
  typeHint: '$type',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    body: {
      type: GraphQLString
    },
    authorId: {
      type: GraphQLInt,
      sqlColumn: 'author_id'
    }
  }),
  resolveType: obj => obj.$type
})

