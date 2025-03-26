function opendd(x) {
    const dropdown = document.getElementById(`dropdown${x}`);
    const alldropdowns = document.querySelectorAll('.switch');
    const sidebar = document.getElementById('sidebar');

    if (x !== 8 && x !== 9 && x !== 11 &&  x !== 12 && x !== 13 && x !== 14 && x !== 15 &&  sidebar.classList.contains('opensb')) {
        sidebar.classList.remove('opensb');
        document.body.classList.remove('no-scroll'); 
    }

    if (dropdown.classList.contains('switch')) {
        dropdown.classList.remove('switch');
    } else {
        alldropdowns.forEach(dropdown => {
            dropdown.classList.remove('switch');
        });
        dropdown.classList.add('switch');
    }
}

function opensb() {
    const sidebar = document.getElementById('sidebar');
    const alldropdowns = document.querySelectorAll('.switch');

    alldropdowns.forEach(dropdown => {
        dropdown.classList.remove('switch');
    });
    sidebar.classList.toggle('opensb');
    document.body.classList.toggle('no-scroll');
}

function circle(){
    document.getElementById('circle').classList.toggle('move')
}
setInterval(circle, 900);
circle()