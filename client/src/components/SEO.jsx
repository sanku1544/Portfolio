import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'Sanket Nikam | Full Stack Developer';
  const siteDescription = 'Portfolio of Sanket Nikam, a Full Stack Developer specializing in MERN stack, building modern and scalable web applications.';
  const siteUrl = 'https://portfolio-krishna.vercel.app'; // Replace with actual URL after deployment
  const siteImage = 'https://your-default-image-url.com/og-image.png'; // Replace with actual OG image

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || siteUrl} />
      <meta property="twitter:title" content={title || siteTitle} />
      <meta property="twitter:description" content={description || siteDescription} />
      <meta property="twitter:image" content={image || siteImage} />
    </Helmet>
  );
};

export default SEO;
