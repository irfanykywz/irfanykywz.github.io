document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('docsSearchInput');
    const docCards = document.querySelectorAll('.doc-card');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsFound = 0;

        docCards.forEach(card => {
            const title = card.querySelector('.doc-card-title').textContent.toLowerCase();
            const description = card.querySelector('.doc-card-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                resultsFound++;
            } else {
                card.style.display = 'none';
            }
        });

        // Tampilkan atau sembunyikan pesan "tidak ada hasil"
        noResultsMessage.style.display = resultsFound === 0 ? 'block' : 'none';
    });
});