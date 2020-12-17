/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listBookTypes = /* GraphQL */ `
  query ListBookTypes(
    $filter: ModelBookTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        video
        author
        featured
        price
        createdAt
        updatedAt
        comments {
          nextToken
        }
        orders {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getBookType = /* GraphQL */ `
  query GetBookType($id: ID!) {
    getBookType(id: $id) {
      id
      title
      description
      image
      video
      author
      featured
      price
      createdAt
      updatedAt
      comments {
        items {
          id
          textComment
          userNameComment
          book_id
          createdAt
          updatedAt
        }
        nextToken
      }
      orders {
        items {
          id
          book_id
          order_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getBookCommentType = /* GraphQL */ `
  query GetBookCommentType($id: ID!) {
    getBookCommentType(id: $id) {
      id
      textComment
      userNameComment
      book_id
      createdAt
      updatedAt
      book {
        id
        title
        description
        image
        video
        author
        featured
        price
        createdAt
        updatedAt
        comments {
          nextToken
        }
        orders {
          nextToken
        }
      }
    }
  }
`;
export const listBookCommentTypes = /* GraphQL */ `
  query ListBookCommentTypes(
    $filter: ModelBookCommentTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookCommentTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        textComment
        userNameComment
        book_id
        createdAt
        updatedAt
        book {
          id
          title
          description
          image
          video
          author
          featured
          price
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getBookOrderType = /* GraphQL */ `
  query GetBookOrderType($id: ID!) {
    getBookOrderType(id: $id) {
      id
      book_id
      order_id
      createdAt
      updatedAt
      book {
        id
        title
        description
        image
        video
        author
        featured
        price
        createdAt
        updatedAt
        comments {
          nextToken
        }
        orders {
          nextToken
        }
      }
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        books {
          nextToken
        }
      }
    }
  }
`;
export const listBookOrderTypes = /* GraphQL */ `
  query ListBookOrderTypes(
    $filter: ModelBookOrderTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookOrderTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        book_id
        order_id
        createdAt
        updatedAt
        book {
          id
          title
          description
          image
          video
          author
          featured
          price
          createdAt
          updatedAt
        }
        order {
          id
          user
          date
          total
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listOrderTypes = /* GraphQL */ `
  query ListOrderTypes(
    $filter: ModelOrderTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        date
        total
        theBooksId
        theBooksTitle
        theBooksQuantity
        createdAt
        updatedAt
        books {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getOrderType = /* GraphQL */ `
  query GetOrderType($id: ID!) {
    getOrderType(id: $id) {
      id
      user
      date
      total
      createdAt
      updatedAt
      books {
        items {
          id
          book_id
          order_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
