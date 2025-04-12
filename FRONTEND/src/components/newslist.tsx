import React from 'react';
import NewsCard from './newscard';

interface NewsItem {
  title: string;
  url: string;
  date: string;
  thumbnail: string;
  description: string;
  source: {
    name: string;
    favicon: string;
  };
}

interface NewsListProps {
  data: NewsItem[];
}

const NewsList: React.FC<NewsListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((item, idx) => (
        <NewsCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default NewsList;
