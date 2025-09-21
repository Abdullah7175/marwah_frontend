'use client'

import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  url: string;
}

const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image = "https://www.mtumrah.com/logo2.png",
  url
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marwah Travels",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mtumrah.com/logo2.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "image": image,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
};

export default ArticleSchema;





