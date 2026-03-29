import type { MetaFunction } from 'react-router';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import SocialProof from '../components/SocialProof';
import Contact from '../components/Contact';
import { businessData } from '../data';

const CLIENT_URL = 'https://www.mtb-earthmoving.com';

const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessData.name,
    description: businessData.description,
    url: CLIENT_URL,
    telephone: businessData.phone,
    email: businessData.email,
    image: `${CLIENT_URL}/logo.png`,
    priceRange: '$$',
    address: {
        '@type': 'PostalAddress',
        streetAddress: businessData.address,
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        postalCode: businessData.postcode,
        addressCountry: 'AU',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -30.9776,
        longitude: 150.2576,
    },
    openingHours: businessData.hours,
    areaServed: businessData.areas.map((area) => ({
        '@type': 'City',
        name: area,
    })),
    sameAs: ['https://www.facebook.com/profile.php?id=61563674456496'],
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
    { title: `${businessData.name} | ${businessData.tagline}` },
    { name: 'description', content: businessData.description },
    {
        property: 'og:title',
        content: `${businessData.name} | ${businessData.tagline}`,
    },
    { property: 'og:description', content: businessData.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: CLIENT_URL },
    { property: 'og:site_name', content: businessData.name },
    { tagName: 'link', rel: 'canonical', href: CLIENT_URL },
    { property: 'og:image', content: `${CLIENT_URL}/hero.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
        property: 'og:image:alt',
        content: 'MTB Earthmoving — rural earthmoving in Gunnedah NSW',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
        name: 'twitter:title',
        content: `${businessData.name} | ${businessData.tagline}`,
    },
    { name: 'twitter:description', content: businessData.description },
    { name: 'twitter:image', content: `${CLIENT_URL}/hero.png` },
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
            <SocialProof />
            <Contact />
        </>
    );
}
