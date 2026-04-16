// SEO Component for Global Forum
'use client';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    structuredData?: any;
    canonical?: string;
    noIndex?: boolean;
    children?: React.ReactNode;
}

export default function SEO({
    title = 'Global Forum - Knowledge, Marketplace & Community',
    description = 'Learn 6 languages with AI tutors, buy/sell globally, join the richest knowledge community.',
    keywords = 'language learning, AI tutor, marketplace, community, TOEFL, HSK, DELE, DELF, Goethe, Swahili',
    image = '/og-image.jpg',
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website',
    structuredData,
    canonical = url,
    noIndex = false,
    children,
}: SEOProps) {
    return (
        <>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Global Forum" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:creator" content="@globalforum" />

            {/* Canonical */}
            <link rel="canonical" href={canonical} />

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            )}

            {/* Preconnect */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://res.cloudinary.com" />

            {/* DNS Prefetch */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//res.cloudinary.com" />

            {children}
        </>
    );
}

// Usage examples:
export const ArticleSEO = (article: { title: string; excerpt: string; slug: string; image: string }) => (
    <SEO
        title={`${article.title} - Global Forum`}
        description={article.excerpt}
        image={article.image}
        structuredData={{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "image": article.image,
            "datePublished": new Date().toISOString(),
            "author": {
                "@type": "Person",
                "name": "Global Forum Team"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Global Forum",
                "logo": {
                    "@type": "ImageObject",
                    "url": "/logo.png"
                }
            }
        }}
    />
);

export const ProductSEO = (product: { name: string; description: string; image: string; price: number; currency: string }) => (
    <SEO
        title={`${product.name} | Buy Now - Global Forum Marketplace`}
        description={product.description}
        image={product.image}
        structuredData={{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "description": product.description,
            "offers": {
                "@type": "Offer",
                "priceCurrency": product.currency,
                "price": product.price.toString(),
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Global Forum Marketplace"
                }
            }
        }}
    />
);

export const BreadcrumbList = (breadcrumbs: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
    }))
});

