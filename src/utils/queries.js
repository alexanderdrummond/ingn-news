import { gql } from '@apollo/client';

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    newsitem(where: { slug: $slug }) {
      title
      author
      date
      content
      slug
      category
      id
      photo {
        url
      }
    }
  }
`;

export const GET_NEWS_ITEMS = gql`
  query GetNewsItems {
    newsitems {
      title
      author
      date
      content
      slug
      category
      id
      photo {
        url
      }
    }
  }
`;

export const UPDATE_NEWS_ITEM = gql`
  mutation UpdateNewsItem($id: ID!, $title: String, $author: String, $date: Date, $content: String, $category: String) {
    updateNewsitem(
      where: { id: $id },
      data: {
        title: $title,
        author: $author,
        date: $date,
        content: $content,
        category: $category
      }
    ) {
      id
      title
      author
      date
      content
      category
    }
  }
`;

export const DELETE_NEWS_ITEM = gql`
  mutation DeleteNewsItem($where: NewsitemWhereUniqueInput!) {
    deleteNewsitem(where: $where) {
      id
    }
  }
`;

export const PUBLISH_NEWSITEM = gql`
  mutation PublishNewsitem($where: NewsitemWhereUniqueInput!) {
    publishNewsitem(where: $where) {
      id
      title
      author
      date
      content
      category
      photo {
        url
      }
    }
  }
`;
