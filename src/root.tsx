import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import './styles/global.scss';
import { Analytics } from '@vercel/analytics/react';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" href="/logo.png" type="image/png" />
                <link rel="apple-touch-icon" href="/logo.png" />
                <meta name="theme-color" content="#1a1a1a" />
                <meta name="geo.region" content="AU-NSW" />
                <meta name="geo.placename" content="Gunnedah" />
                <meta name="geo.position" content="-30.9776;150.2576" />
                <meta name="ICBM" content="-30.9776, 150.2576" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>
            <Header />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
            <StickyCTA />
            <Analytics />
        </>
    );
}
