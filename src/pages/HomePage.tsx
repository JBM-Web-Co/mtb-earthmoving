import type { MetaFunction } from 'react-router';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import { businessData } from '../data';

const TITLE = `${businessData.name} | ${businessData.tagline}`;

const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessData.name,
    description: businessData.description,
    url: businessData.url,
    telephone: businessData.phone,
    email: businessData.email,
    image: `${businessData.url}/logo.png`,
    priceRange: '$$',
    address: {
        '@type': 'PostalAddress',
        streetAddress: businessData.address,
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        postalCode: businessData.postcode,
        addressCountry: businessData.country,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: businessData.geo.latitude,
        longitude: businessData.geo.longitude,
    },
    openingHours: businessData.openingHours,
    areaServed: businessData.areas
        .filter((area) => area !== 'North West NSW')
        .map((area) => ({
            '@type': 'City',
            name: area,
        })),
    sameAs: [businessData.facebookUrl],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Earthmoving Services',
        itemListElement: businessData.services.map((svc) => ({
            '@type': 'Offer',
            itemOffered: {
                '@type': 'Service',
                name: svc.title,
                description: svc.description,
            },
        })),
    },
};

export const meta: MetaFunction = () => [
    { title: TITLE },
    { name: 'description', content: businessData.description },
    { property: 'og:title', content: TITLE },
    { property: 'og:description', content: businessData.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: businessData.url },
    { property: 'og:site_name', content: businessData.name },
    { tagName: 'link', rel: 'canonical', href: businessData.url },
    { property: 'og:image', content: `${businessData.url}/hero.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
        property: 'og:image:alt',
        content: 'MTB Earthmoving — rural earthmoving in Gunnedah NSW',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: TITLE },
    { name: 'twitter:description', content: businessData.description },
    { name: 'twitter:image', content: `${businessData.url}/hero.png` },
    {
        name: 'twitter:image:alt',
        content: 'MTB Earthmoving — rural earthmoving in Gunnedah NSW',
    },
    { 'script:ld+json': JSON_LD },
];

export default function HomePage() {
    return (
        <>
            <Hero />
            <Benefits />
            <Services />
            <Gallery />
            <Contact />
        </>
    );
}
