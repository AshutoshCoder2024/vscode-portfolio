import Head from 'next/head';

interface CustomHeadProps {
  title: string;
  description?: string;
}

const CustomHead = ({ title, description }: CustomHeadProps) => {
  const defaultDescription =
    "Ashutosh Sahu - Full Stack Web Developer. Building elegant, responsive web applications with modern technologies. Specialized in React, Next.js, Node.js, and MongoDB.";
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://aashutosh-dev.vercel.app';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content="#24292e" media="(prefers-color-scheme: dark)" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <meta
        name="keywords"
        content="ashutosh sahu, full stack developer, web developer, react developer, next.js developer, mern stack, portfolio, ashutosh sahu portfolio, vscode-portfolio, javascript developer, typescript developer"
      />
      <meta name="author" content="Ashutosh Sahu" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}/images/vscode-portfolio.png`} />
      <meta property="og:site_name" content="Ashutosh Sahu Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}/images/vscode-portfolio.png`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Head>
  );
};

export default CustomHead;
