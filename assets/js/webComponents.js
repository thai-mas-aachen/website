class MainHeader extends HTMLElement {
    connectedCallback() {
        // Determine if we're in the English version
        const isEnglish = window.location.pathname.includes('/en/');
        const basePath = isEnglish ? '../' : '';

        // Map of page translations for language switching
        const pageTranslations = {
            'index.html': 'index.html',
            'team.html': 'team.html',
            'galerie.html': 'gallery.html',
            'gallery.html': 'galerie.html',
            'massagen.html': 'massages.html',
            'massages.html': 'massagen.html',
            'preise.html': 'prices.html',
            'prices.html': 'preise.html',
            'kontakt.html': 'contact.html',
            'contact.html': 'kontakt.html',
            'impressum.html': 'legal-notice.html',
            'legal-notice.html': 'impressum.html',
            'datenschutz.html': 'privacy-policy.html',
            'privacy-policy.html': 'datenschutz.html'
        };

        // Get current page name from URL
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const translatedPage = pageTranslations[currentPage] || currentPage;

        const languageSwitcher = `
            <div class="language-switcher">
                <a href="${isEnglish ? `../${translatedPage}` : translatedPage}" class="me-2 ${!isEnglish ? 'active' : ''}" lang="de">DE</a>
                |
                <a href="${isEnglish ? translatedPage : `en/${translatedPage}`}" class="ms-2 ${isEnglish ? 'active' : ''}" lang="en">EN</a>
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

        // Define navigation items for both languages
        const navItems = isEnglish ? [
            { href: "index.html", text: "Home" },
            { href: "team.html", text: "Our Team" },
            { href: "gallery.html", text: "Gallery" },
            { href: "massages.html", text: "Massages" },
            { href: "prices.html", text: "Prices" },
            { href: "contact.html", text: "Contact" }
        ] : [
            { href: "index.html", text: "Home" },
            { href: "team.html", text: "Unser Team" },
            { href: "galerie.html", text: "Galerie" },
            { href: "massagen.html", text: "Massagen" },
            { href: "preise.html", text: "Preise" },
            { href: "kontakt.html", text: "Kontakt" }
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
                    <a class="navbar-brand" href="${isEnglish ? 'index.html' : 'index.html'}">
                        <img
                            src="${basePath}assets/img/logo/logo_header.png"
                            alt="${isEnglish ? 'Traditional Thai Massage Aachen Logo - Back to Homepage' : 'Logo der Traditionellen Thaimassage Aachen - Zurück zur Startseite'}"
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
    connectedCallback() {
        // Determine if we're in the English version
        const isEnglish = window.location.pathname.includes('/en/');
        const basePath = isEnglish ? '../' : '';

        // Phone number formats
        const phoneDisplay = isEnglish ? '+49 241 9437 7687' : '0241 9437 7687';
        const whatsappDisplay = isEnglish ? '+49 152 0707 0312' : '0152 0707 0312';
        const phoneLink = isEnglish ? '+492419437687' : '024194377687';
        const whatsappLink = isEnglish ? '4915207070312' : '4915207070312';

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
                    <a href="${isEnglish ? 'index.html' : 'index.html'}">
                    <img
                        src="${basePath}assets/img/logo/logo_header.png"
                        alt="${isEnglish ? 'Traditional Thai Massage Aachen Logo' : 'Traditionelle Thaimassage Aachen Logo'}"
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
                ${isEnglish ? 'Germany' : 'Deutschland'}<br />
                ${isEnglish ? 'Phone' : 'Telefon'}: <a href="tel:${phoneLink}">${phoneDisplay}</a><br />
                WhatsApp: <a href="https://wa.me/${whatsappLink}">${whatsappDisplay}</a>
                </address>
            </div>

            <!-- Additional Links -->
            <div class="col-12 col-md-6 col-lg-2 mb-4 mb-md-0">
                <h5 class="text-uppercase">${isEnglish ? 'Links' : 'Links'}</h5>
                <ul class="list-unstyled">
                <li>
                    <a href="${isEnglish ? '../en/legal-notice.html' : 'impressum.html'}" class="text-dark">
                        ${isEnglish ? 'Legal Notice' : 'Impressum'}
                    </a>
                </li>
                <li>
                    <a href="${isEnglish ? '../en/privacy-policy.html' : 'datenschutz.html'}" class="text-dark">
                        ${isEnglish ? 'Privacy Policy' : 'Datenschutz'}
                    </a>
                </li>
                </ul>
            </div>

            <!-- Social Links -->
            <div class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
                <h5 class="text-uppercase">${isEnglish ? 'Follow Us' : 'Folgen Sie uns'}</h5>
                <div>
                    <a
                    href="https://www.facebook.com/people/Traditionelle-Thaimassage-Aachen/pfbid0fnNC5fuuMnZFq6NEzJ8NbzGBH1i9cBBH9R8xRTtf5bp4WxiMzCgnFoMsnKXbARHEl/"
                    class="me-4"
                    target="_blank"
                    >
                    <img src="${basePath}assets/img/logo/facebook-logo.png" alt="Facebook" class="social-icon">
                    </a>
                    <a
                    href="https://www.instagram.com/traditionellethaimassageaachen/"
                    class="me-4"
                    target="_blank"
                    >
                    <img src="${basePath}assets/img/logo/instagram-logo.png" alt="Instagram" class="social-icon">
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
            © <span id="current-year"></span> ${isEnglish ? 'Traditional Thai Massage Aachen' : 'Traditionelle Thaimassage Aachen'}
        </div>
    `;

        //Set the current year to copyright
        var yearElement = document.getElementById("current-year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}
customElements.define("main-footer", MainFooter);
