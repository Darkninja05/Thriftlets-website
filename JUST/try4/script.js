const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.folder-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});