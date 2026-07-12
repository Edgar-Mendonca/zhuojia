// js/language.js
// Language switching logic

let currentLang = 'en';

// Apply language to all elements with data-en / data-zh attributes
function applyLanguage(lang) {
    currentLang = lang;
    const attr = `data-${lang}`;

    // 1. Update all elements with data-en / data-zh
    document.querySelectorAll(`[${attr}]`).forEach(el => {
        const text = el.getAttribute(attr);
        if (text !== null) {
            // Preserve inner HTML if element has icons/children, otherwise use textContent
            if (el.children.length === 0 || el.querySelector('i, svg, img')) {
                // If only icons, replace text nodes
                const icon = el.querySelector('i, svg, img');
                if (icon && icon.nextSibling && icon.nextSibling.nodeType === 3) {
                    icon.nextSibling.nodeValue = ' ' + text;
                } else {
                    el.textContent = text;
                }
            } else {
                el.textContent = text;
            }
        }
    });

    // 2. Update ALL language toggle icons in navbar (desktop & mobile)
    document.querySelectorAll('.lang-icon').forEach(icon => {
        icon.textContent = lang === 'en' ? 'EN' : '中';
    });

    // 3. Update lang attribute for accessibility/SEO
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // 4. Save preference
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
        // localStorage may be unavailable
    }
}

// Public function called from navbar buttons
function changeLanguage(lang) {
    applyLanguage(lang);
    // Close ALL dropdowns after selection
    document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
        dropdown.classList.add('hidden');
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Load saved preference or default to English
    let savedLang = 'en';
    try {
        savedLang = localStorage.getItem('preferredLanguage') || 'en';
    } catch (e) {}

    applyLanguage(savedLang);

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const dropdowns = document.querySelectorAll('.lang-dropdown');
        const toggles = document.querySelectorAll('.lang-toggle');
        
        let isInsideToggle = false;
        toggles.forEach(toggle => {
            if (toggle.contains(e.target)) isInsideToggle = true;
        });
        
        let isInsideDropdown = false;
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) isInsideDropdown = true;
        });

        if (!isInsideToggle && !isInsideDropdown) {
            dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
        }
    });
});

// Toggle dropdown visibility
document.addEventListener('DOMContentLoaded', () => {
    const langToggles = document.querySelectorAll('.lang-toggle');
    const langDropdowns = document.querySelectorAll('.lang-dropdown');
    
    langToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.nextElementSibling;
            
            // Close other dropdowns if multiple are open
            langDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });
            
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
    });
});