function opendd(x) {
    const dropdown = document.getElementById(`dropdown${x}`);
    const alldropdowns = document.querySelectorAll('.switch');
    const sidebar = document.getElementById('sidebar');

    // Close the sidebar only if x is NOT 8 or 9
    if (x !== 8 && x !== 9 && x !== 11 &&  x !== 12 && x !== 13 && x !== 14 && x !== 15 &&  sidebar.classList.contains('opensb')) {
        sidebar.classList.remove('opensb');
    }

    // Toggle the dropdown
    if (dropdown.classList.contains('switch')) {
        dropdown.classList.remove('switch');
    } else {
        // Close all other dropdowns
        alldropdowns.forEach(dropdown => {
            dropdown.classList.remove('switch');
        });
        // Open the selected dropdown
        dropdown.classList.add('switch');
    }
}

function opensb() {
    const sidebar = document.getElementById('sidebar');
    const alldropdowns = document.querySelectorAll('.switch');

    // Close all dropdowns if any are open
    alldropdowns.forEach(dropdown => {
        dropdown.classList.remove('switch');
    });

    // Toggle the sidebar
    sidebar.classList.toggle('opensb');
}

