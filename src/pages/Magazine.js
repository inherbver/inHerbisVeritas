import React from 'react';
import { articles } from '../data/articles';
import ArticlesGrid from '../components/ArticlesGrid';
import PageTitle from '../components/Ui/PageTitle';

const Magazine = () => {
  return (
    <div className="min-h-screen">
      <PageTitle subtitle="Découvrez nos derniers articles" size="5xl">
        Magazine
      </PageTitle>
      <ArticlesGrid articles={articles} />
    </div>
  );
};

export default Magazine;
