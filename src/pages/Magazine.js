import React from 'react';
import { articles } from '../data/articles';
import ArticlesGrid from '../components/ArticlesGrid';
import PageTitle from '../components/Ui/PageTitle';
import StandardPageLayout from '../components/StandardPageLayout';

const Magazine = () => {
  return (
    <StandardPageLayout
      title="Magazine"
      subtitle="Découvrez nos derniers articles"
    >
      <PageTitle subtitle="Découvrez nos derniers articles">Magazine</PageTitle>
      <ArticlesGrid articles={articles} />
    </StandardPageLayout>
  );
};

export default Magazine;
