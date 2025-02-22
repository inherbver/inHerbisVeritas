import React from 'react';
import { articles } from '../data/articles';
import ArticlesGrid from '../components/ArticlesGrid';

const Magazine = () => {
  return (
    <div className="pt-24 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 lg:text-4xl">
        Nos Articles
      </h1>
      <ArticlesGrid articles={articles} />
    </div>
  );
};

export default Magazine;
