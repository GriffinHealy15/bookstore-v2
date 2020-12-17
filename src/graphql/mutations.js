/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: ProcessOrderInput!) {
    processOrder(input: $input)
  }
`;
export const createBookType = /* GraphQL */ `
  mutation CreateBookType(
    $input: CreateBookTypeInput!
    $condition: ModelBookTypeConditionInput
  ) {
    createBookType(input: $input, condition: $condition) {
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
export const updateBookType = /* GraphQL */ `
  mutation UpdateBookType(
    $input: UpdateBookTypeInput!
    $condition: ModelBookTypeConditionInput
  ) {
    updateBookType(input: $input, condition: $condition) {
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
export const deleteBookType = /* GraphQL */ `
  mutation DeleteBookType(
    $input: DeleteBookTypeInput!
    $condition: ModelBookTypeConditionInput
  ) {
    deleteBookType(input: $input, condition: $condition) {
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
export const createBookCommentType = /* GraphQL */ `
  mutation CreateBookCommentType(
    $input: CreateBookCommentTypeInput!
    $condition: ModelBookCommentTypeConditionInput
  ) {
    createBookCommentType(input: $input, condition: $condition) {
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
export const updateBookCommentType = /* GraphQL */ `
  mutation UpdateBookCommentType(
    $input: UpdateBookCommentTypeInput!
    $condition: ModelBookCommentTypeConditionInput
  ) {
    updateBookCommentType(input: $input, condition: $condition) {
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
export const deleteBookCommentType = /* GraphQL */ `
  mutation DeleteBookCommentType(
    $input: DeleteBookCommentTypeInput!
    $condition: ModelBookCommentTypeConditionInput
  ) {
    deleteBookCommentType(input: $input, condition: $condition) {
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
export const createBookOrderType = /* GraphQL */ `
  mutation CreateBookOrderType(
    $input: CreateBookOrderTypeInput!
    $condition: ModelBookOrderTypeConditionInput
  ) {
    createBookOrderType(input: $input, condition: $condition) {
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
export const updateBookOrderType = /* GraphQL */ `
  mutation UpdateBookOrderType(
    $input: UpdateBookOrderTypeInput!
    $condition: ModelBookOrderTypeConditionInput
  ) {
    updateBookOrderType(input: $input, condition: $condition) {
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
export const deleteBookOrderType = /* GraphQL */ `
  mutation DeleteBookOrderType(
    $input: DeleteBookOrderTypeInput!
    $condition: ModelBookOrderTypeConditionInput
  ) {
    deleteBookOrderType(input: $input, condition: $condition) {
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
export const createOrderType = /* GraphQL */ `
  mutation CreateOrderType(
    $input: CreateOrderTypeInput!
    $condition: ModelOrderTypeConditionInput
  ) {
    createOrderType(input: $input, condition: $condition) {
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
export const updateOrderType = /* GraphQL */ `
  mutation UpdateOrderType(
    $input: UpdateOrderTypeInput!
    $condition: ModelOrderTypeConditionInput
  ) {
    updateOrderType(input: $input, condition: $condition) {
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
export const deleteOrderType = /* GraphQL */ `
  mutation DeleteOrderType(
    $input: DeleteOrderTypeInput!
    $condition: ModelOrderTypeConditionInput
  ) {
    deleteOrderType(input: $input, condition: $condition) {
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
