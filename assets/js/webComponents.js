class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.translations = {
            'en': {
                home: 'Home',
                team: 'Our Team',
                gallery: 'Gallery',
                massages: 'Massages',
                prices: 'Prices',
                contact: 'Contact',
                logoAlt: 'Traditional Thai Massage Aachen Logo - Back to Homepage'
            },
            'de': {
                home: 'Home',
                team: 'Unser Team',
                gallery: 'Galerie',
                massages: 'Massagen',
                prices: 'Preise',
                contact: 'Kontakt',
                logoAlt: 'Logo der Traditionellen Thaimassage Aachen - Zurück zur Startseite'
            },
            'fr': {
                home: 'Accueil',
                team: 'Notre Équipe',
                gallery: 'Galerie',
                massages: 'Massages',
                prices: 'Tarifs',
                contact: 'Contact',
                logoAlt: 'Logo du Massage Thaï Traditionnel Aachen - Retour à la page d\'accueil'
            }
            // Add more languages here as needed
        };

        this.paths = {
            'en': {
                home: 'index.html',
                team: 'team.html',
                gallery: 'gallery.html',
                massages: 'massages.html',
                prices: 'prices.html',
                contact: 'contact.html',
                basePath: '../'
            },
            'fr': {
                home: 'accueil.html',
                team: 'equipe.html',
                gallery: 'galerie.html',
                massages: 'massages.html',
                prices: 'tarifs.html',
                contact: 'contact.html',
                basePath: '../'
            },
            'de': {
                home: 'index.html',
                team: 'team.html',
                gallery: 'galerie.html',
                massages: 'massagen.html',
                prices: 'preise.html',
                contact: 'kontakt.html',
                basePath: ''
            }
            // Add more language paths here
        };
    }

    getLanguage() {
        const path = window.location.pathname;
        for (const [lang, config] of Object.entries(this.paths)) {
            if (path.includes(`/${lang}/`)) return lang;
        }
        return 'de'; // Default to German if no language match
    }

    connectedCallback() {
        const lang = this.getLanguage();
        const t = this.translations[lang];
        const p = this.paths[lang];

        // Helper function to get correct page name for target language
        const getTargetPage = (currentPage, targetLang) => {
            // First, determine which page we're on
            let basePage;
            
            // Handle home page variations
            if (['index.html', 'accueil.html'].includes(currentPage)) {
                basePage = 'home';
            }
            // Handle team page variations
            else if (['team.html', 'equipe.html'].includes(currentPage)) {
                basePage = 'team';
            }
            // Handle gallery page variations
            else if (['gallery.html', 'galerie.html'].includes(currentPage)) {
                basePage = 'gallery';
            }
            // Handle massages page variations
            else if (['massages.html', 'massagen.html'].includes(currentPage)) {
                basePage = 'massages';
            }
            // Handle prices page variations
            else if (['prices.html', 'tarifs.html', 'preise.html'].includes(currentPage)) {
                basePage = 'prices';
            }
            // Handle contact page variations
            else if (['contact.html', 'kontakt.html'].includes(currentPage)) {
                basePage = 'contact';
            }
            // Handle legal notice page variations
            else if (['legal-notice.html', 'mentions-legales.html', 'impressum.html'].includes(currentPage)) {
                basePage = 'legal';
            }
            // Handle privacy policy page variations
            else if (['privacy-policy.html', 'politique-de-confidentialite.html', 'datenschutz.html'].includes(currentPage)) {
                basePage = 'privacy';
            }
            else {
                return currentPage; // If no match found, return original
            }

            // Now map the base page to the correct target language version
            const pageMap = {
                'home': {
                    'en': 'index.html',
                    'fr': 'accueil.html',
                    'de': 'index.html'
                },
                'team': {
                    'en': 'team.html',
                    'fr': 'equipe.html',
                    'de': 'team.html'
                },
                'gallery': {
                    'en': 'gallery.html',
                    'fr': 'galerie.html',
                    'de': 'galerie.html'
                },
                'massages': {
                    'en': 'massages.html',
                    'fr': 'massages.html',
                    'de': 'massagen.html'
                },
                'prices': {
                    'en': 'prices.html',
                    'fr': 'tarifs.html',
                    'de': 'preise.html'
                },
                'contact': {
                    'en': 'contact.html',
                    'fr': 'contact.html',
                    'de': 'kontakt.html'
                },
                'legal': {
                    'en': 'legal-notice.html',
                    'fr': 'mentions-legales.html',
                    'de': 'impressum.html'
                },
                'privacy': {
                    'en': 'privacy-policy.html',
                    'fr': 'politique-de-confidentialite.html',
                    'de': 'datenschutz.html'
                }
            };

            return pageMap[basePage][targetLang];
        };

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log('Current page:', currentPage);

        // Helper function to construct the correct URL for language switching
        const getLanguageUrl = (targetLang) => {
            const targetPage = getTargetPage(currentPage, targetLang);
            
            if (targetLang === 'de') {
                return `/${targetPage}`; // German pages are at root
            } else {
                return `/${targetLang}/${targetPage}`; // Other languages in their respective folders
            }
        };

        const languageSwitcher = `
            <div class="language-switcher">
                <a href="${getLanguageUrl('de')}" class="me-2 ${lang === 'de' ? 'active' : ''}" lang="de">DE</a>
                |
                <a href="${getLanguageUrl('en')}" class="ms-2 me-2 ${lang === 'en' ? 'active' : ''}" lang="en">EN</a>
                |
                <a href="${getLanguageUrl('fr')}" class="ms-2 ${lang === 'fr' ? 'active' : ''}" lang="fr">FR</a>
            </div>
        `;

        const styles = `
            .language-switcher {
                position: absolute;
                top: 10px;
                right: 20px;
            }
            .language-switcher a {
                text-decoration: none;
                color: #333;
            }
            .language-switcher a.active {
                font-weight: bold;
            }
        `;

        // Define navigation items
        const navItems = [
            { href: p.home, text: t.home },
            { href: p.team, text: t.team },
            { href: p.gallery, text: t.gallery },
            { href: p.massages, text: t.massages },
            { href: p.prices, text: t.prices },
            { href: p.contact, text: t.contact }
        ];

        // Generate navigation HTML
        const navHTML = navItems.map(item => `
            <li class="nav-item">
                <a class="nav-link" href="${item.href}">${item.text}</a>
            </li>
        `).join('');

        this.innerHTML = `
            <style>
                ${styles}
            </style>
            <nav class="navbar navbar-expand-md navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="${p.home}">
                        <img
                            src="${p.basePath}assets/img/logo/logo_header.png"
                            alt="${t.logoAlt}"
                            width="auto"
                            height="100"
                            class="d-inline-block align-top"
                        />
                    </a>
                    ${languageSwitcher}
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            ${navHTML}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        this.setActiveLink();
    }

    setActiveLink() {
        const links = this.querySelectorAll(".nav-link");
        const currentUrl = window.location.pathname.split('/').pop() || 'index.html';
        links.forEach((link) => {
            if (currentUrl === link.getAttribute("href")) {
                link.classList.add("active", "fw-bold", "text-decoration-underline");
            }
        });
    }
}
customElements.define("main-header", MainHeader);

class MainFooter extends HTMLElement {
    constructor() {
        super();
        this.translations = {
            'en': {
                country: 'Germany',
                phone: 'Phone',
                links: 'Links',
                legalNotice: 'Legal Notice',
                privacyPolicy: 'Privacy Policy',
                followUs: 'Follow Us',
                businessName: 'Traditional Thai Massage Aachen',
                phoneNumber: '+49 241 9437 7687',
                logoAlt: 'Traditional Thai Massage Aachen Logo'
            },
            'de': {
                country: 'Deutschland',
                phone: 'Telefon',
                links: 'Links',
                legalNotice: 'Impressum',
                privacyPolicy: 'Datenschutz',
                followUs: 'Folgen Sie uns',
                businessName: 'Traditionelle Thaimassage Aachen',
                phoneNumber: '0241 9437 7687',
                logoAlt: 'Traditionelle Thaimassage Aachen Logo'
            },
            // Add more languages here as needed
            'fr': {
                country: 'Allemagne',
                phone: 'Téléphone',
                links: 'Liens',
                legalNotice: 'Mentions légales',
                privacyPolicy: 'Politique de confidentialité',
                followUs: 'Suivez-nous',
                businessName: 'Massage Thaï Traditionnel Aachen',
                phoneNumber: '+49 241 9437 7687',
                logoAlt: 'Logo Massage Thaï Traditionnel Aachen'
            }
        };

        this.paths = {
            'en': {
                home: 'index.html',
                legal: 'legal-notice.html',
                privacy: 'privacy-policy.html',
                basePath: '../'
            },
            'de': {
                home: 'index.html',
                legal: 'impressum.html',
                privacy: 'datenschutz.html',
                basePath: ''
            },
            // Add more language paths here
            'fr': {
                home: 'index.html',
                legal: 'mentions-legales.html',
                privacy: 'politique-de-confidentialite.html',
                basePath: '../'
            }
        };
    }

    getLanguage() {
        const path = window.location.pathname;
        for (const [lang, config] of Object.entries(this.paths)) {
            if (path.includes(`/${lang}/`)) return lang;
        }
        return 'de'; // Default to German if no language match
    }

    connectedCallback() {
        const lang = this.getLanguage();
        const t = this.translations[lang];
        const p = this.paths[lang];

        // Phone number formats for links
        const phoneLink = lang === 'de' ? '024194377687' : '492419437687';

        // Helper function to construct correct paths for footer links
        const getFooterLink = (page) => {
            if (lang === 'de') {
                return page; // German pages are at root
            } else {
                return `${lang}/${page}`; // Other languages in their respective folders
            }
        };

        this.innerHTML = `
        <style>
            .social-icon {
                width: 30px;
                height: 30px;
                transition: opacity 0.3s ease;
                display: inline-block;
                vertical-align: middle;
            }
            .social-icon:hover {
                opacity: 0.8;
            }
        </style>
        <div class="container p-4">
            <div class="row">
                <!-- Logo -->
                <div class="col-12 col-md-6 col-lg-3 mb-4 mb-md-0">
                    <div class="d-flex justify-content-center">
                        <a href="${lang === 'de' ? p.home : `/${lang}/${p.home}`}">
                            <img
                                src="${p.basePath}assets/img/logo/logo_header.png"
                                alt="${t.logoAlt}"
                                class="img-fluid"
                            />
                        </a>
                    </div> 
                </div>

                <!-- Address and Contact Information -->
                <div class="col-12 col-md-6 col-lg-3 mb-4 mb-md-0">
                    <address>
                        <strong>Alexanderstraße 121</strong><br />
                        52062 Aachen<br />
                        ${t.country}<br />
                        ${t.phone}: <a href="tel:${phoneLink}">${t.phoneNumber}</a>
                    </address>
                </div>

                <!-- Additional Links -->
                <div class="col-12 col-md-6 col-lg-2 mb-4 mb-md-0">
                    <h5 class="text-uppercase">${t.links}</h5>
                    <ul class="list-unstyled">
                        <li>
                            <a href="/${getFooterLink(p.legal)}" class="text-dark">
                                ${t.legalNotice}
                            </a>
                        </li>
                        <li>
                            <a href="/${getFooterLink(p.privacy)}" class="text-dark">
                                ${t.privacyPolicy}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Social Links -->
                <div class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
                    <h5 class="text-uppercase">${t.followUs}</h5>
                    <div>
                        <a href="https://www.facebook.com/people/Traditionelle-Thaimassage-Aachen/pfbid0fnNC5fuuMnZFq6NEzJ8NbzGBH1i9cBBH9R8xRTtf5bp4WxiMzCgnFoMsnKXbARHEl/" class="me-4" target="_blank">
                            <img src="${p.basePath}assets/img/logo/facebook-logo.png" alt="Facebook" class="social-icon">
                        </a>
                        <a href="https://www.instagram.com/traditionellethaimassageaachen/" class="me-4" target="_blank">
                            <img src="${p.basePath}assets/img/logo/instagram-logo.png" alt="Instagram" class="social-icon">
                        </a>
                    </div>
                </div>

                <!-- Kayak Link -->
                <div class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
                    <a href='https://www.kayak.de/Aachen.14636.guide' target='_blank'>
                        <img height='150' src='https://content.r9cdn.net/rimg/seo/badges/v1/ORANGE_LARGE_FEATURED_KAYAK.png' alt='Kayak' />
                    </a>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="text-center p-3 bg-light">
            © <span id="current-year"></span> ${t.businessName}
        </div>
        `;

        // Set the current year
        const yearElement = this.querySelector("#current-year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}
customElements.define("main-footer", MainFooter);
