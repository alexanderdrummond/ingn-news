import { useQuery } from '@apollo/client';
import { GET_NEWS_ITEMS } from '../../utils/queries';
import NewsCard from './NewsCard';
import chunk from 'lodash/chunk';

export default function NewsGrid({ selectedCategory }) {
  const { loading, error, data } = useQuery(GET_NEWS_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const uniqueCategories = Array.from(
    new Set(data.newsitems.map(item => item.category))
  );

  const filteredNewsItems = selectedCategory
    ? data.newsitems.filter(item => item.category === selectedCategory)
    : data.newsitems;

  const chunkedNewsItems = chunk(filteredNewsItems, 9);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-8 w-11/12 md:w-9/12">
        {chunkedNewsItems.map((chunk, chunkIndex) => (
          <div className={`gridfromhell ${chunkIndex > 0 ? 'mt-4' : ''}`} key={chunkIndex}>
            {chunk.map((item, itemIndex) => {
              const overallIndex = (chunkIndex * 9) + itemIndex;
              console.log(`Rendering item with ID: ${item.id} at position: ${overallIndex}`);
              return (
                <NewsCard
                  key={item.id}
                  newsItem={item}
                  gridArea={getGridArea(overallIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function getGridArea(index) {
  return `a${(index % 9) + 1}`;
}
