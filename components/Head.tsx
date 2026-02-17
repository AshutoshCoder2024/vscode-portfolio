import Head from 'next/head';
import { useRouter } from 'next/router';

interface CustomHeadProps {
  title: string;
  description?: string;
}

const CustomHead = ({ title, description }: CustomHeadProps) => {
  const defaultDescription =
    'Ashutosh Sahu - Full Stack MERN Developer based in India. I build modern, responsive web applications using React, Next.js, Node.js, and MongoDB.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://aashutosh-dev.vercel.app';
  const router = useRouter();
  const currentUrl =
    typeof window === 'undefined'
      ? `${siteUrl}${router.asPath || ''}`
      : `${siteUrl}${window.location.pathname}${window.location.search}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ashutosh Sahu',
    url: siteUrl,
    image: `${siteUrl}/images/vscode-portfolio.png`,
    jobTitle: 'Full Stack MERN Developer',
    description: metaDescription,
    sameAs: [
      'https://github.com/AshutoshCoder2024',
      'https://www.linkedin.com/in/ashutosh-kumar-sahu-5a5713331/',
      'https://twitter.com/ashutoshsa22',
      'https://instagram.com/ashutosh_sahu_18',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'BSc IT',
    },
    knowsAbout: [
      'Full Stack Development',
      'MERN Stack',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'JavaScript',
      'Web Performance',
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content="ashutosh sahu, ashutosh sahu developer, ashutosh sahu full stack, bsc it full stack developer, full stack mern developer, web developer, react developer, next.js developer, javascript developer, portfolio"
      />
      <meta name="author" content="Ashutosh Sahu" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="theme-color" content="#011627" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`${siteUrl}/images/vscode-portfolio.png`}
      />
      <meta property="og:site_name" content="Ashutosh Sahu Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={`${siteUrl}/images/vscode-portfolio.png`}
      />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Structured data: Person */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
};

export default CustomHead;
