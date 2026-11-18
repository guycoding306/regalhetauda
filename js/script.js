document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.getElementById('mainNavbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const backToTop = document.getElementById('backToTop');

    // Mobile navigation
    function setMenuOpen(open) {
        mobileMenu.classList.toggle('hidden', !open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute(
            'aria-label',
            open ? 'Close navigation menu' : 'Open navigation menu'
        );

        line1.classList.toggle('translate-y-[7px]', open);
        line1.classList.toggle('rotate-45', open);
        line2.classList.toggle('opacity-0', open);
        line3.classList.toggle('-translate-y-[7px]', open);
        line3.classList.toggle('-rotate-45', open);
    }

    menuToggle.addEventListener('click', function () {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen);
    });

    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuOpen(false);
        });
    });

    // Close mobile menu when resizing to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            setMenuOpen(false);
        }
    });

    // Close menu with Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setMenuOpen(false);
        }
    });

    // Navbar scroll styling
    function updateScrollState() {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 40);

        backToTop.classList.toggle('hidden', window.scrollY <= 450);
        backToTop.classList.toggle('flex', window.scrollY > 450);
    }

    window.addEventListener('scroll', updateScrollState, {
        passive: true
    });

    updateScrollState();

    // Back to top
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reservation dates
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const bookingForm = document.getElementById('bookingForm');

    function localDateString(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    checkin.min = localDateString(new Date());
    checkout.min = checkin.min;

    checkin.addEventListener('change', function () {
        if (!checkin.value) return;

        const nextDay = new Date(`${checkin.value}T12:00:00`);
        nextDay.setDate(nextDay.getDate() + 1);

        checkout.min = localDateString(nextDay);

        if (checkout.value && checkout.value < checkout.min) {
            checkout.value = '';
        }
    });

    // Footer year
    document.getElementById('year').textContent =
        new Date().getFullYear();

});
