import React from 'react';

interface NewsCardProps {
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

const NewsCard: React.FC<NewsCardProps> = ({ title, url, date, thumbnail, description, source }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 hover:bg-gray-700 transition p-4 rounded-2xl shadow-md text-white"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img src={thumbnail} alt="News" className="w-full md:w-48 h-32 object-cover rounded-xl" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <img src={source.favicon} alt="favicon" className="w-4 h-4" />
              {source.name}
            </span>
            <span>{new Date(date).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
