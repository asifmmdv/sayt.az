
const page2 = document.getElementById('page2')
function scrolll(){
    window.scrollTo({
        top: page2.offsetTop,
        behavior: "smooth"
    })
}


function choose(x) {
    const selectedCard = document.getElementById(`card${x}`);
    const isSelected = selectedCard.classList.contains('cardstyle');
    
    if (isSelected) {
        return;
    }
    
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`card${i}`).classList.remove('cardstyle');
    }
    selectedCard.classList.add('cardstyle');
}
choose(2)


function switchstuff(x) {
    const ayliqillik = document.getElementById(`ayliqillik${x}`);
    const ayil = document.getElementById('ayil');
    const card1 = document.querySelector('#card1money');
    const card2 = document.querySelector('#card2money');
    const card3 = document.querySelector('#card3money');
    const illikElements = document.querySelectorAll('.illikpul');
    
    if (ayliqillik.classList.contains('active')) {
        return;
    }
    
    document.querySelectorAll('[id^="ayliqillik"]').forEach(el => {
        el.classList.remove('active');
    });
    
    if (ayil.classList.contains('switch')) {
        card1.textContent = "₼5";
        card2.textContent = "₼10";
        card3.textContent = "₼20";
        illikElements.forEach(el => el.textContent = "/ay"); 
    } else {
        card1.textContent = "₼60";
        card2.textContent = "₼120";
        card3.textContent = "₼240";
        illikElements.forEach(el => el.textContent = "/il");
    }
    
    ayliqillik.classList.add('active');
    ayil.classList.toggle('switch');
}