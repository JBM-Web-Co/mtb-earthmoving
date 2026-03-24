export type NavItem = {
    label: string;
    href: string;
};

export type Benefit = {
    title: string;
    description: string;
    iconName: string;
};

export type Service = {
    title: string;
    description: string;
    iconName: string;
};

export type Testimonial = {
    name: string;
    text: string;
    rating: number;
    location: string;
};

export type FAQItem = {
    question: string;
    answer: string;
};

export type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    serviceSelect: string;
    message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

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
    benefits: Benefit[];
    services: Service[];
    testimonials: Testimonial[];
    faqs: FAQItem[];
    rating: number;
    reviewCount: number;
    areas: string[];
};
