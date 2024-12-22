const accordionHeaders = document.querySelectorAll('.according-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        
        const openHeader = document.querySelector('.according-header.active');
        if (openHeader && openHeader !== header) {
            openHeader.classList.remove('active'); 
            openHeader.nextElementSibling.style.display = 'none'; 
        }

        header.classList.toggle('active');
        const content = header.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
