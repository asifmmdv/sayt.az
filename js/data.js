document.addEventListener('DOMContentLoaded', function() {
    // Complete pricing data
    const pricingData = {
        staticPages: {
            basePrice: 100,
            complexityMultipliers: [1, 1.5, 2] // Simple, Medium, Custom
        },
        websiteAddons: [
            { id: 1, name: "Bloq", price: 200 },
            { id: 2, name: "Üzv girişi / Profillər", price: 400 },
            { id: 8, name: "Responsive", price: 100 },
            { id: 22, name: "Forum", price: 400 },
            { id: 23, name: "Mesajlaşma", price: 50 },
            { id: 24, name: "Canlı Söhbət", price: 50 },
            { id: 25, name: "Qalereya", price: 100 },
            { id: 26, name: "Əlaqə Forması", price: 100 },
            { id: 27, name: "Saytda Axtarış", price: 100 },
            { id: 28, name: "Xəritə Məlumatı / Geolocation", price: 100 },
            { id: 29, name: "Rezervasyon", price: 400 },
            { id: 30, name: "Sosial Media inteqrasiyası", price: 50 },
            { id: 31, name: "Analitika / İzləmə", price: 50 },
            { id: 36, name: "Admin Panel", price: 300 }
        ],
        seoAddons: [
            { id: 3, name: "Başlıqlar & Meta", price: 200 },
            { id: 32, name: "Açar söz", price: 300 },
            { id: 33, name: "+20 Qabaqcıl Texnika", price: 300 },
            { id: 34, name: "Başlıq Teqləri", price: 100 },
            { id: 35, name: "Sitemap", price: 100 }
        ],
        ecommerceAddons: [
            { id: 38, name: "Ödəniş", price: 200 },
            { id: 39, name: "Səbət", price: 500 },
            { id: 40, name: "Məhsullar", price: 300 },
            { id: 41, name: "Bəyəndiklərim", price: 300 },
            { id: 42, name: "Filtr", price: 300 },
            { id: 43, name: "Məhsul Haqqında", price: 200 }
        ],
        logoDesign: [
            { level: 1, name: "Ehtiyac yoxdur", price: 0 },
            { level: 2, name: "Sadə", price: 100 },
            { level: 3, name: "Xüsusi", price: 200 }
        ]
    };

    // Constants
    const MIN_WEBSITE_PRICE = 450;

    // DOM Elements
    const elements = {
        // Input elements
        staticPageRange: document.querySelector('input[type="range"][min="1"][max="20"]'),
        designComplexityRange: document.querySelector('input[type="range"][min="1"][max="3"]:not(.logoPage input)'),
        logoComplexityRange: document.querySelector('.logoPage input[type="range"]'),
        
        // Cost display elements
        costDisplays: {
            staticPages: document.querySelector('.staticPage .bg-\\[\\#4a84bf26\\] p:last-child'),
            websiteAddons: document.querySelector('.addOnsPage .bg-\\[\\#4a84bf26\\] p:last-child'),
            seoAddons: document.querySelector('.seoPage .bg-\\[\\#4a84bf26\\] p:last-child'),
            ecommerce: document.querySelector('h3:contains("Elektron ticarət")').closest('.bg-\\[\\#f8f8fa\\]').nextElementSibling.querySelector('p:last-child'),
            logo: document.querySelector('.logoPage .bg-\\[\\#4a84bf26\\] p:last-child')
        },
        
        // Summary display elements
        summaryDisplays: {
            staticPages: document.querySelector('.flex.flex-col.gap-4 p:nth-child(2) span:last-child'),
            websiteAddons: document.querySelector('.flex.flex-col.gap-4 p:nth-child(3) span:last-child'),
            seoAddons: document.querySelector('.flex.flex-col.gap-4 p:nth-child(4) span:last-child'),
            ecommerce: document.querySelector('.flex.flex-col.gap-4 p:nth-child(5) span:last-child'),
            logo: document.querySelector('.flex.flex-col.gap-4 p:nth-child(6) span:last-child')
        },
        
        // Total display
        totalCostDisplay: document.querySelector('.bg-\\[rgb\\(162\\2c 113\\2c 242\\)\\] span:last-child'),
        
        // Order button
        orderButton: document.querySelector('button.bg-\\[\\#2bc48a\\]')
    };

    // Application state
    const state = {
        staticPages: {
            count: 4,
            complexity: 1,
            cost: 0
        },
        websiteAddons: {
            selected: [],
            cost: 0
        },
        seoAddons: {
            selected: [],
            cost: 0
        },
        ecommerce: {
            selected: [],
            cost: 0
        },
        logo: {
            complexity: 1,
            cost: 0
        }
    };

    // Initialize the calculator
    function init() {
        // Set initial values from DOM
        state.staticPages.count = parseInt(elements.staticPageRange.value);
        state.staticPages.complexity = parseInt(elements.designComplexityRange.value);
        state.logo.complexity = elements.logoComplexityRange ? parseInt(elements.logoComplexityRange.value) : 1;

        // Calculate initial costs
        calculateStaticPagesCost();
        calculateLogoCost();
        updateAllDisplays();

        // Set up event listeners
        setupEventListeners();
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Range inputs
        elements.staticPageRange.addEventListener('input', handleStaticPageChange);
        elements.designComplexityRange.addEventListener('input', handleDesignComplexityChange);
        
        if (elements.logoComplexityRange) {
            elements.logoComplexityRange.addEventListener('input', handleLogoComplexityChange);
        }

        // Website addons checkboxes
        document.querySelectorAll('.addOnsPage input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                handleAddonChange(this, 'websiteAddons');
            });
        });

        // SEO addons checkboxes
        document.querySelectorAll('.seoPage input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                handleAddonChange(this, 'seoAddons');
            });
        });

        // E-commerce addons checkboxes - fixed selector
        const ecommerceSection = document.querySelector('h3:contains("Elektron ticarət")').closest('.bg-\\[\\#f8f8fa\\]');
        if (ecommerceSection) {
            ecommerceSection.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    handleAddonChange(this, 'ecommerce');
                });
            });
        }

        // Order button
        if (elements.orderButton) {
            elements.orderButton.addEventListener('click', handleOrder);
        }
    }

    // Event handlers
    function handleStaticPageChange(e) {
        state.staticPages.count = parseInt(e.target.value);
        calculateStaticPagesCost();
        updateAllDisplays();
    }

    function handleDesignComplexityChange(e) {
        state.staticPages.complexity = parseInt(e.target.value);
        calculateStaticPagesCost();
        updateAllDisplays();
    }

    function handleLogoComplexityChange(e) {
        state.logo.complexity = parseInt(e.target.value);
        calculateLogoCost();
        updateAllDisplays();
    }

    function handleAddonChange(checkbox, section) {
        const addonName = checkbox.name;
        const addon = pricingData[section + 'Addons'].find(item => item.name === addonName);
        
        if (addon) {
            if (checkbox.checked) {
                state[section].selected.push(addon.id);
                state[section].cost += addon.price;
            } else {
                state[section].selected = state[section].selected.filter(id => id !== addon.id);
                state[section].cost -= addon.price;
            }
            
            updateAllDisplays();
        }
    }

    function handleOrder() {
        const total = calculateTotal();
        alert(`Sifarişiniz qəbul edildi! Ümumi məbləğ: ₼${total}`);
        // In a real application, you would send this data to your server
    }

    // Calculation functions
    function calculateStaticPagesCost() {
        const multiplier = pricingData.staticPages.complexityMultipliers[state.staticPages.complexity - 1];
        state.staticPages.cost = Math.round(state.staticPages.count * pricingData.staticPages.basePrice * multiplier);
    }

    function calculateLogoCost() {
        const logoOption = pricingData.logoDesign.find(item => item.level === state.logo.complexity);
        state.logo.cost = logoOption ? logoOption.price : 0;
    }

    function calculateTotal() {
        let total = state.staticPages.cost + 
                   state.websiteAddons.cost + 
                   state.seoAddons.cost + 
                   state.ecommerce.cost + 
                   state.logo.cost;
        
        // Apply minimum website price if any services are selected
        if (total > 0 && total < MIN_WEBSITE_PRICE) {
            total = MIN_WEBSITE_PRICE;
        }
        
        return total;
    }

    // Display update functions
    function updateAllDisplays() {
        // Update individual cost displays
        elements.costDisplays.staticPages.textContent = `${state.staticPages.count} səhifə / ₼ ${state.staticPages.cost}`;
        elements.costDisplays.websiteAddons.textContent = `₼ ${state.websiteAddons.cost}`;
        elements.costDisplays.seoAddons.textContent = `₼ ${state.seoAddons.cost}`;
        elements.costDisplays.ecommerce.textContent = `₼ ${state.ecommerce.cost}`;
        elements.costDisplays.logo.textContent = `₼ ${state.logo.cost}`;
        
        // Update summary displays
        elements.summaryDisplays.staticPages.textContent = `₼ ${state.staticPages.cost}`;
        elements.summaryDisplays.websiteAddons.textContent = `₼ ${state.websiteAddons.cost}`;
        elements.summaryDisplays.seoAddons.textContent = `₼ ${state.seoAddons.cost}`;
        elements.summaryDisplays.ecommerce.textContent = `₼ ${state.ecommerce.cost}`;
        elements.summaryDisplays.logo.textContent = `₼ ${state.logo.cost}`;
        
        // Update total
        elements.totalCostDisplay.textContent = `₼ ${calculateTotal()}`;
    }

    // Helper function to check if element contains text (for :contains selector simulation)
    function elementContainsText(element, text) {
        return element.textContent.includes(text);
    }

    // Polyfill for :contains selector if needed
    if (!Document.prototype.querySelectorAll && !Element.prototype.querySelectorAll) {
        const originalQuerySelectorAll = Document.prototype.querySelectorAll;
        Document.prototype.querySelectorAll = Element.prototype.querySelectorAll = function(selector) {
            if (selector.includes(':contains(')) {
                const text = selector.match(/:contains\(["']?(.*?)["']?\)/)[1];
                const allElements = originalQuerySelectorAll.call(this, selector.split(':contains')[0]);
                return Array.from(allElements).filter(el => elementContainsText(el, text));
            }
            return originalQuerySelectorAll.call(this, selector);
        };
    }

    // Initialize the application
    init();
});

{rangeData : [
    {
        "id": 1,
        "name": "Bloq",
        "price": 200,
        "type": "website_addons"
    },
    {
        "id": 2,
        "name": "Üzv girişi /‍‍‍ Profillər",
        "price": 400,
        "type": "website_addons"
    },
    {
        "id": 8,
        "name": "Responsive",
        "price": 100,
        "type": "website_addons"
    },
    {
        "id": 22,
        "name": "Forum",
        "price": 400,
        "type": "website_addons"
    },
    {
        "id": 23,
        "name": "Mesajlaşma",
        "price": 50,
        "type": "website_addons"
    },
    {
        "id": 24,
        "name": "Canlı Söhbət",
        "price": 50,
        "type": "website_addons"
    },
    {
        "id": 25,
        "name": "Qalereya",
        "price": 100,
        "type": "website_addons"
    },
    {
        "id": 26,
        "name": "Əlaqə Forması",
        "price": 100,
        "type": "website_addons"
    },
    {
        "id": 27,
        "name": "Saytda Axtarış",
        "price": 100,
        "type": "website_addons"
    },
    {
        "id": 28,
        "name": "Xəritə Məlumatı / Geolocation",
        "price": 100,
        "type": "website_addons"
    },
    {
        "id": 29,
        "name": "Rezervasyon",
        "price": 400,
        "type": "website_addons"
    },
    {
        "id": 30,
        "name": "Sosial Media inteqrasiyası",
        "price": 50,
        "type": "website_addons"
    },
    {
        "id": 31,
        "name": "Analitika / İzləmə",
        "price": 50,
        "type": "website_addons"
    },
    {
        "id": 36,
        "name": "Admin Panel",
        "price": 300,
        "type": "website_addons"
    }
],
checkData : [
    {
        "id": 3,
        "name": "Başlıqlar & Meta",
        "price": 200,
        "type": "seo_addons"
    },
    {
        "id": 32,
        "name": "Açar söz",
        "price": 300,
        "type": "seo_addons"
    },
    {
        "id": 33,
        "name": "+20 Qabaqcıl Texnika",
        "price": 300,
        "type": "seo_addons"
    },
    {
        "id": 34,
        "name": "Başlıq Teqləri",
        "price": 100,
        "type": "seo_addons"
    },
    {
        "id": 35,
        "name": "Sitemap",
        "price": 100,
        "type": "seo_addons"
    }
],

eccomerceData : [
    {
        "id": 38,
        "name": "Ödəniş",
        "price": 200,
        "type": "ecommerce"
    },
    {
        "id": 39,
        "name": "Səbət",
        "price": 500,
        "type": "ecommerce"
    },
    {
        "id": 40,
        "name": "Məhsullar",
        "price": 300,
        "type": "ecommerce"
    },
    {
        "id": 41,
        "name": "Bəyəndiklərim",
        "price": 300,
        "type": "ecommerce"
    },
    {
        "id": 42,
        "name": "Filtr",
        "price": 300,
        "type": "ecommerce"
    },
    {
        "id": 43,
        "name": "Məhsul Haqqında",
        "price": 200,
        "type": "ecommerce"
    }
]}
