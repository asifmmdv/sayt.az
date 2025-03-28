// Page pricing calculator
const pagesPrice = document.getElementById('pagesPrice');
const pagesPrice2 = document.getElementById('pagesPrice2');
const pagesRange = document.getElementById('pagesRange');
const designRange = document.getElementById('designRange');

function updatePrice() {
    const basePrice = pagesRange.value * 100;
    const totalPagesPrice = basePrice * (designRange ? designRange.value : 1);
    pagesPrice.textContent = `${pagesRange.value} səhifə / ₼ ${totalPagesPrice}`;
    pagesPrice2.textContent = `₼ ${totalPagesPrice}`;
}

updatePrice();

pagesRange.oninput = updatePrice;
if (designRange) {
    designRange.oninput = updatePrice;
}

const addOnsPrices = {
    "Bloq": 200,
    "Üzv girişi / Profillər": 400,
    "Responsive": 100,
    "Forum": 400,
    "Mesajlaşma": 50,
    "Canlı Söhbət": 50,
    "Qalereya": 100,
    "Əlaqə Forması": 100,
    "Saytda Axtarış": 100,
    "Xəritə Məlumatı / Geolocation": 100,
    "Rezervasyon": 400,
    "Sosial Media inteqrasiyası": 50,
    "Analitika / İzləmə": 50,
    "Admin Panel": 300
};

function updateAddOnsTotal() {
    let total = 0;
    
    document.querySelectorAll('.elave input[type="checkbox"]:checked').forEach(checkbox => {
        total += addOnsPrices[checkbox.name] || 0;
    });
    document.querySelectorAll('.addOns').forEach(element => {
        element.textContent = `₼ ${total}`;
    });
}

// Initialize checkboxes
document.querySelectorAll('.elave input[type="checkbox"]').forEach(checkbox => {
    checkbox.onclick = updateAddOnsTotal;
});

// Calculate initial total
updateAddOnsTotal();



// SEO (Motor) add-ons
const motorPrices = {
    "Başlıqlar & Meta": 200,
    "Açar söz": 300, 
    "+20 Qabaqcıl Texnika": 300,
    "Başlıq Teqləri": 100,
    "Sitemap": 100
};

function updateMotorTotal() {
    let total = 0;
    
    document.querySelectorAll('.seoPage input[type="checkbox"]:checked').forEach(cb => {
        total += motorPrices[cb.name] || 0;
    });
    
    document.querySelectorAll('.motorAddons').forEach(el => {
        el.textContent = `₼ ${total}`;
    });
}

document.querySelectorAll('.seoPage input[type="checkbox"]').forEach(cb => {
    cb.onclick = updateMotorTotal;
});
updateMotorTotal();

// E-commerce add-ons
const eCommerceAddons = {
    "Ödəniş": 200,
    "Səbət": 500,
    "Məhsullar": 300,
    "Bəyəndiklərim": 300,
    "Filtr": 300,
    "Məhsul Haqqında": 200
};

function updateEcomTotal() {
    let total = 0;
    
    document.querySelectorAll('.addOnsPage input[type="checkbox"]:checked').forEach(cb => {
        total += eCommerceAddons[cb.name] || 0;
    });
    
    document.querySelectorAll('.elektron').forEach(el => {
        el.textContent = `₼ ${total}`;
    });
}

document.querySelectorAll('.addOnsPage input[type="checkbox"]').forEach(cb => {
    cb.onclick = updateEcomTotal;
});
updateEcomTotal();