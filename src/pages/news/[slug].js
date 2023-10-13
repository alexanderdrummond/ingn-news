import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ARTICLE_BY_SLUG } from '../../utils/queries';
import Header from '@/components/Header/AppHeader';
import { initializeApollo } from '../../utils/apolloClient';
import { useRouter } from 'next/router';
import Footer from '@/components/Header/Footer';

export default function ArticlePage({ initialArticleData }) {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useQuery(GET_ARTICLE_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });

  const article = data ? data.newsitem : initialArticleData.newsitem;

  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header isArticlePage={true} />
      <div className="flex-grow flex justify-center items-center bg-gray-100 mt-4 mb-4"> 
        <div className="bg-white p-4 w-9/10 md:w-9/12 rounded-none shadow-lg">
          <div className="relative w-full" style={{paddingTop: '30%'}}>
            {article.photo && (
              <img src={article.photo.url} alt={article.title} className="absolute top-0 left-0 object-cover w-full h-full rounded-none" />
            )}
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-sm text-red-500 mb-4">D. {formattedDate} - af {article.author}</p>
            <div className="text-gray-700">
  {article.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))}
</div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  const { params } = context;
  const { slug } = params;

  const { data } = await apolloClient.query({
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      initialArticleData: data,
    },
  };
}
