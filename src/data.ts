import type { BusinessData } from './types';

export const businessData: BusinessData = {
    name: 'MTB Earthmoving',
    tagline: 'Built for the Land. Ready for the Job.',
    description:
        'Professional rural earthmoving, road construction, and civil works across Gunnedah NSW and the North West. Owner-operated, locally based, built for the bush.',
    phone: '+61 461 522 409',
    email: 'michealbrattan1994@yahoo.com',
    address: '',
    city: 'Gunnedah',
    state: 'NSW',
    postcode: '',
    hours: 'Mon–Sat: 7am – 5pm',
    navItems: [
        { label: 'Services', href: '#services' },
        { label: 'Why Us', href: '#benefits' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
    ],
    benefits: [
        {
            title: 'Local Knowledge',
            description:
                'Deep roots in the Gunnedah region — we know the land, the conditions, and exactly what each job demands. No guesswork.',
            iconName: 'map-pin',
        },
        {
            title: 'Owner-Operator Quality',
            description:
                "Every job gets the owner's full personal attention. No subcontractors, no shortcuts — just quality work done the right way.",
            iconName: 'award',
        },
        {
            title: 'Full Service Range',
            description:
                "From earthmoving to drainage, dam construction to welding — one crew handles it all so you don't have to call around.",
            iconName: 'layers',
        },
        {
            title: 'Built for the Bush',
            description:
                "Remote property, rough terrain, tight timeline — we operate in rural conditions without flinching. That's what we're built for.",
            iconName: 'shield',
        },
    ],
    services: [
        {
            title: 'Rural Earthmoving & Clearing',
            description:
                'Land clearing, bulk earthworks, and site preparation for rural properties across Gunnedah and the North West.',
            iconName: 'mountain',
        },
        {
            title: 'Site Preparation — House & Shed Pads',
            description:
                'Precision levelling and compaction for house slabs, shed pads, and hardstand areas built to last.',
            iconName: 'home',
        },
        {
            title: 'Road Construction & Gravelling',
            description:
                'New farm and station roads built to handle heavy traffic — with proper grading, shaping, and drainage design.',
            iconName: 'route',
        },
        {
            title: 'Drainage Solutions',
            description:
                'Cut-off drains, table drains, and subsurface drainage systems designed to protect your land and infrastructure.',
            iconName: 'droplets',
        },
        {
            title: 'Dam Construction & De-silting',
            description:
                'New farm dam construction and existing dam de-silting to restore water storage capacity on your property.',
            iconName: 'waves',
        },
        {
            title: 'Road Maintenance & Repair',
            description:
                'Ongoing road grading, pothole repair, and surface restoration to keep your access tracks in safe working order.',
            iconName: 'wrench',
        },
        {
            title: 'Welding, Fabrication & Machinery Repair',
            description:
                'On-site welding, custom steel fabrication, and machinery repair to keep your equipment moving and your site running.',
            iconName: 'hammer',
        },
    ],
    testimonials: [],
    faqs: [],
    rating: 5.0,
    reviewCount: 0,
    areas: [
        'Gunnedah',
        'Narrabri',
        'Tamworth',
        'Quirindi',
        'Boggabri',
        'Coonabarabran',
        'Manilla',
        'North West NSW',
    ],
};
