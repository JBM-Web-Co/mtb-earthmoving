type NavItem = {
    label: string;
    href: string;
};

type Service = {
    title: string;
    description: string;
    iconName: string;
};

export type BusinessData = {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    hours: string;
    navItems: NavItem[];
    services: Service[];
    areas: string[];
};

export const businessData: BusinessData = {
    name: 'MTB Earthmoving',
    tagline: 'The land is our office.',
    description:
        'Professional rural earthmoving, road construction, and civil works across Gunnedah NSW and the North West. Owner-operated, locally based, built for the bush.',
    phone: '+61 461 522 409',
    email: 'michealbrattan1994@yahoo.com',
    address: '150 Little Barber St',
    city: 'Gunnedah',
    state: 'NSW',
    postcode: '2380',
    hours: 'Mon–Sat: 6am – 6pm',
    navItems: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
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
