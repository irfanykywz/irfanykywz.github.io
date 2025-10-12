---
date: 2025-10-08
type: html
---

<script src="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js" crossorigin="anonymous"></script>

<style>
      h1 {
          color: var(--accent-primary);
          margin-bottom: var(--space-8);
          border-bottom: 2px solid var(--border-color);
          padding-bottom: var(--space-4);
      }

      h2 {
          color: var(--text-secondary);
          margin-top: var(--space-8);
          margin-bottom: var(--space-4);
          padding-left: var(--space-2);
          border-left: 4px solid var(--accent-secondary);
      }
      
    .country-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    .country-card {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        display: flex;
        align-items: center;
        transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
        box-shadow: var(--shadow-sm);
    }

    .country-card:hover {
        background-color: var(--hover-bg);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    /* Styling for the Twemoji image inside the container */
    .flag-container {
        font-size: 2rem; /* Initial size for the emoji */
        margin-right: var(--space-4);
        line-height: 1;
        display: flex; /* Ensures Twemoji image is aligned properly */
        align-items: center;
        justify-content: center;
        width: 32px; /* Set a fixed width for consistent alignment */
        height: 32px; /* Set a fixed height */
    }

    .flag-container img.emoji {
        width: 32px !important; /* Force size for Twemoji image */
        height: 32px !important; /* Force size for Twemoji image */
        vertical-align: middle;
    }

    .country-info {
        flex-grow: 1;
    }

    .country-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.2;
    }

    .country-code {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: var(--accent-primary);
        background-color: var(--bg-tertiary);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        margin-top: var(--space-1);
        display: inline-block;
    }

    .country-details {
        margin-top: var(--space-1);
    }

    .country-currency {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: var(--accent-secondary);
        background-color: var(--bg-tertiary);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        display: inline-block;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity var(--transition-normal);
    }

    .modal-overlay.active {
        display: flex;
        opacity: 1;
    }

    .modal-content {
        background-color: var(--bg-secondary);
        padding: var(--space-8);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-xl);
        width: 90%;
        max-width: 500px;
        position: relative;
        transform: scale(0.95);
        transition: transform var(--transition-normal);
    }

    .modal-overlay.active .modal-content {
        transform: scale(1);
    }

    .modal-close {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        font-size: 1.5rem;
        color: var(--text-muted);
        cursor: pointer;
        line-height: 1;
        transition: color var(--transition-fast);
    }
    .modal-close:hover {
        color: var(--text-primary);
    }

    /* Search Bar Styles */
    .search-container {
        margin-bottom: var(--space-8);
    }

    #search-input {
        width: 100%;
        padding: var(--space-3) var(--space-4);
        font-size: 1rem;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        box-sizing: border-box; /* Ensures padding doesn't affect width */
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    #search-input:focus {
        outline: none;
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 25%, transparent);
    }

    .no-results {
        color: var(--text-muted);
        text-align: center;
        padding: var(--space-8);
    }
</style>

<div class="search-container">
    <input type="text" id="search-input" placeholder="Search by name, code, currency, or phone code...">
</div>

<div class="sort-container">
    <label for="sort-select">Sort by:</label>
    <select id="sort-select">
        <option value="name-asc">Alphabetical (A-Z)</option>
        <option value="name-desc">Alphabetical (Z-A)</option>
        <option value="continent">Continent</option>
    </select>
</div>

<div id="countries-container">
    <!-- Country grids will be generated here by JavaScript -->
</div>

<div class="modal-overlay" id="modal-overlay">
    <div class="modal-content" id="country-modal">
        <span class="modal-close" id="modal-close">&times;</span>
        <div class="country-card" style="border: none; background: transparent; box-shadow: none;">
            <span class="flag-container" id="modal-flag"></span>
            <div class="country-info">
                <p class="country-name" id="modal-country-name"></p>
                <p style="color: var(--text-secondary); margin: var(--space-1) 0 0 0;" id="modal-continent"></p>
            </div>
        </div>
        <p><strong>Capital:</strong> <span id="modal-capital"></span></p>
        <p><strong>Phone Code:</strong> <span id="modal-phone-code"></span></p>
        <p><strong>Currency:</strong> <span id="modal-currency-full"></span></p>
        <a id="modal-gmaps-link" href="#" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary);">View on Google Maps</a>
    </div>
</div>

<script>
    // This script finds all standard emojis (flags in this case) and replaces them
    // with high-quality Twemoji images for consistent cross-platform display.
    document.addEventListener('DOMContentLoaded', function () {

        const countriesData = [
            { name: "Afghanistan", code: "AF", currency: "AFN", flag: "🇦🇫", continent: "Asia", phone: "+93", gmaps: "Afghanistan", capital: "Kabul", currencyName: "Afghan afghani", currencySymbol: "؋" },
            { name: "Albania", code: "AL", currency: "ALL", flag: "🇦🇱", continent: "Europe", phone: "+355", gmaps: "Albania", capital: "Tirana", currencyName: "Albanian lek", currencySymbol: "L" },
            { name: "Algeria", code: "DZ", currency: "DZD", flag: "🇩🇿", continent: "Africa", phone: "+213", gmaps: "Algeria", capital: "Algiers", currencyName: "Algerian dinar", currencySymbol: "د.ج" },
            { name: "American Samoa", code: "AS", currency: "USD", flag: "🇦🇸", continent: "Oceania", phone: "+1-684", gmaps: "American Samoa", capital: "Pago Pago", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Andorra", code: "AD", currency: "EUR", flag: "🇦🇩", continent: "Europe", phone: "+376", gmaps: "Andorra", capital: "Andorra la Vella", currencyName: "Euro", currencySymbol: "€" },
            { name: "Angola", code: "AO", currency: "AOA", flag: "🇦🇴", continent: "Africa", phone: "+244", gmaps: "Angola", capital: "Luanda", currencyName: "Angolan kwanza", currencySymbol: "Kz" },
            { name: "Anguilla", code: "AI", currency: "XCD", flag: "🇦🇮", continent: "North America", phone: "+1-264", gmaps: "Anguilla", capital: "The Valley", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Antarctica", code: "AQ", currency: "", flag: "🇦🇶", continent: "Antarctica", phone: "+672", gmaps: "Antarctica", capital: "N/A", currencyName: "No currency", currencySymbol: "" },
            { name: "Antigua & Barbuda", code: "AG", currency: "XCD", flag: "🇦🇬", continent: "North America", phone: "+1-268", gmaps: "Antigua and Barbuda", capital: "St. John's", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Argentina", code: "AR", currency: "ARS", flag: "🇦🇷", continent: "South America", phone: "+54", gmaps: "Argentina", capital: "Buenos Aires", currencyName: "Argentine peso", currencySymbol: "$" },
            { name: "Armenia", code: "AM", currency: "AMD", flag: "🇦🇲", continent: "Asia", phone: "+374", gmaps: "Armenia", capital: "Yerevan", currencyName: "Armenian dram", currencySymbol: "֏" },
            { name: "Aruba", code: "AW", currency: "AWG", flag: "🇦🇼", continent: "North America", phone: "+297", gmaps: "Aruba", capital: "Oranjestad", currencyName: "Aruban florin", currencySymbol: "ƒ" },
            { name: "Australia", code: "AU", currency: "AUD", flag: "🇦🇺", continent: "Oceania", phone: "+61", gmaps: "Australia", capital: "Canberra", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "Austria", code: "AT", currency: "EUR", flag: "🇦🇹", continent: "Europe", phone: "+43", gmaps: "Austria", capital: "Vienna", currencyName: "Euro", currencySymbol: "€" },
            { name: "Azerbaijan", code: "AZ", currency: "AZN", flag: "🇦🇿", continent: "Asia", phone: "+994", gmaps: "Azerbaijan", capital: "Baku", currencyName: "Azerbaijani manat", currencySymbol: "₼" },
            { name: "Bahamas", code: "BS", currency: "BSD", flag: "🇧🇸", continent: "North America", phone: "+1-242", gmaps: "Bahamas", capital: "Nassau", currencyName: "Bahamian dollar", currencySymbol: "$" },
            { name: "Bahrain", code: "BH", currency: "BHD", flag: "🇧🇭", continent: "Asia", phone: "+973", gmaps: "Bahrain", capital: "Manama", currencyName: "Bahraini dinar", currencySymbol: ".د.ب" },
            { name: "Bangladesh", code: "BD", currency: "BDT", flag: "🇧🇩", continent: "Asia", phone: "+880", gmaps: "Bangladesh", capital: "Dhaka", currencyName: "Bangladeshi taka", currencySymbol: "৳" },
            { name: "Barbados", code: "BB", currency: "BBD", flag: "🇧🇧", continent: "North America", phone: "+1-246", gmaps: "Barbados", capital: "Bridgetown", currencyName: "Barbadian dollar", currencySymbol: "$" },
            { name: "Belarus", code: "BY", currency: "BYN", flag: "🇧🇾", continent: "Europe", phone: "+375", gmaps: "Belarus", capital: "Minsk", currencyName: "Belarusian ruble", currencySymbol: "Br" },
            { name: "Belgium", code: "BE", currency: "EUR", flag: "🇧🇪", continent: "Europe", phone: "+32", gmaps: "Belgium", capital: "Brussels", currencyName: "Euro", currencySymbol: "€" },
            { name: "Belize", code: "BZ", currency: "BZD", flag: "🇧🇿", continent: "North America", phone: "+501", gmaps: "Belize", capital: "Belmopan", currencyName: "Belize dollar", currencySymbol: "$" },
            { name: "Benin", code: "BJ", currency: "XOF", flag: "🇧🇯", continent: "Africa", phone: "+229", gmaps: "Benin", capital: "Porto-Novo", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Bermuda", code: "BM", currency: "BMD", flag: "🇧🇲", continent: "North America", phone: "+1-441", gmaps: "Bermuda", capital: "Hamilton", currencyName: "Bermudian dollar", currencySymbol: "$" },
            { name: "Bhutan", code: "BT", currency: "BTN", flag: "🇧🇹", continent: "Asia", phone: "+975", gmaps: "Bhutan", capital: "Thimphu", currencyName: "Bhutanese ngultrum", currencySymbol: "Nu." },
            { name: "Bolivia", code: "BO", currency: "BOB", flag: "🇧🇴", continent: "South America", phone: "+591", gmaps: "Bolivia", capital: "Sucre", currencyName: "Bolivian boliviano", currencySymbol: "Bs." },
            { name: "Bosnia & Herzegovina", code: "BA", currency: "BAM", flag: "🇧🇦", continent: "Europe", phone: "+387", gmaps: "Bosnia and Herzegovina", capital: "Sarajevo", currencyName: "Bosnia and Herzegovina convertible mark", currencySymbol: "KM" },
            { name: "Botswana", code: "BW", currency: "BWP", flag: "🇧🇼", continent: "Africa", phone: "+267", gmaps: "Botswana", capital: "Gaborone", currencyName: "Botswana pula", currencySymbol: "P" },
            { name: "Brazil", code: "BR", currency: "BRL", flag: "🇧🇷", continent: "South America", phone: "+55", gmaps: "Brazil", capital: "Brasília", currencyName: "Brazilian real", currencySymbol: "R$" },
            { name: "Brunei Darussalam", code: "BN", currency: "BND", flag: "🇧🇳", continent: "Asia", phone: "+673", gmaps: "Brunei Darussalam", capital: "Bandar Seri Begawan", currencyName: "Brunei dollar", currencySymbol: "$" },
            { name: "Bulgaria", code: "BG", currency: "BGN", flag: "🇧🇬", continent: "Europe", phone: "+359", gmaps: "Bulgaria", capital: "Sofia", currencyName: "Bulgarian lev", currencySymbol: "лв" },
            { name: "Burkina Faso", code: "BF", currency: "XOF", flag: "🇧🇫", continent: "Africa", phone: "+226", gmaps: "Burkina Faso", capital: "Ouagadougou", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Burundi", code: "BI", currency: "BIF", flag: "🇧🇮", continent: "Africa", phone: "+257", gmaps: "Burundi", capital: "Gitega", currencyName: "Burundian franc", currencySymbol: "Fr" },
            { name: "Cabo Verde", code: "CV", currency: "CVE", flag: "🇨🇻", continent: "Africa", phone: "+238", gmaps: "Cabo Verde", capital: "Praia", currencyName: "Cape Verdean escudo", currencySymbol: "Esc" },
            { name: "Cambodia", code: "KH", currency: "KHR", flag: "🇰🇭", continent: "Asia", phone: "+855", gmaps: "Cambodia", capital: "Phnom Penh", currencyName: "Cambodian riel", currencySymbol: "៛" },
            { name: "Cameroon", code: "CM", currency: "XAF", flag: "🇨🇲", continent: "Africa", phone: "+237", gmaps: "Cameroon", capital: "Yaoundé", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Canada", code: "CA", currency: "CAD", flag: "🇨🇦", continent: "North America", phone: "+1", gmaps: "Canada", capital: "Ottawa", currencyName: "Canadian dollar", currencySymbol: "$" },
            { name: "Cayman Islands", code: "KY", currency: "KYD", flag: "🇰🇾", continent: "North America", phone: "+1-345", gmaps: "Cayman Islands", capital: "George Town", currencyName: "Cayman Islands dollar", currencySymbol: "$" },
            { name: "Central African Rep.", code: "CF", currency: "XAF", flag: "🇨🇫", continent: "Africa", phone: "+236", gmaps: "Central African Republic", capital: "Bangui", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Chad", code: "TD", currency: "XAF", flag: "🇹🇩", continent: "Africa", phone: "+235", gmaps: "Chad", capital: "N'Djamena", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Chile", code: "CL", currency: "CLP", flag: "🇨🇱", continent: "South America", phone: "+56", gmaps: "Chile", capital: "Santiago", currencyName: "Chilean peso", currencySymbol: "$" },
            { name: "China", code: "CN", currency: "CNY", flag: "🇨🇳", continent: "Asia", phone: "+86", gmaps: "China", capital: "Beijing", currencyName: "Chinese yuan", currencySymbol: "¥" },
            { name: "Christmas Island", code: "CX", currency: "AUD", flag: "🇨🇽", continent: "Asia", phone: "+61", gmaps: "Christmas Island", capital: "Flying Fish Cove", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "Colombia", code: "CO", currency: "COP", flag: "🇨🇴", continent: "South America", phone: "+57", gmaps: "Colombia", capital: "Bogotá", currencyName: "Colombian peso", currencySymbol: "$" },
            { name: "Comoros", code: "KM", currency: "KMF", flag: "🇰🇲", continent: "Africa", phone: "+269", gmaps: "Comoros", capital: "Moroni", currencyName: "Comorian franc", currencySymbol: "Fr" },
            { name: "Congo (DR)", code: "CD", currency: "CDF", flag: "🇨🇩", continent: "Africa", phone: "+243", gmaps: "Congo (DR)", capital: "Kinshasa", currencyName: "Congolese franc", currencySymbol: "Fr" },
            { name: "Congo (Republic)", code: "CG", currency: "XAF", flag: "🇨🇬", continent: "Africa", phone: "+242", gmaps: "Congo (Republic)", capital: "Brazzaville", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Cook Islands", code: "CK", currency: "NZD", flag: "🇨🇰", continent: "Oceania", phone: "+682", gmaps: "Cook Islands", capital: "Avarua", currencyName: "New Zealand dollar", currencySymbol: "$" },
            { name: "Costa Rica", code: "CR", currency: "CRC", flag: "🇨🇷", continent: "North America", phone: "+506", gmaps: "Costa Rica", capital: "San José", currencyName: "Costa Rican colón", currencySymbol: "₡" },
            { name: "Côte d'Ivoire", code: "CI", currency: "XOF", flag: "🇨🇮", continent: "Africa", phone: "+225", gmaps: "Côte d'Ivoire", capital: "Yamoussoukro", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Croatia", code: "HR", currency: "EUR", flag: "🇭🇷", continent: "Europe", phone: "+385", gmaps: "Croatia", capital: "Zagreb", currencyName: "Euro", currencySymbol: "€" },
            { name: "Cuba", code: "CU", currency: "CUP", flag: "🇨🇺", continent: "North America", phone: "+53", gmaps: "Cuba", capital: "Havana", currencyName: "Cuban peso", currencySymbol: "$" },
            { name: "Curaçao", code: "CW", currency: "ANG", flag: "🇨🇼", continent: "North America", phone: "+599", gmaps: "Curaçao", capital: "Willemstad", currencyName: "Netherlands Antillean guilder", currencySymbol: "ƒ" },
            { name: "Cyprus", code: "CY", currency: "EUR", flag: "🇨🇾", continent: "Europe", phone: "+357", gmaps: "Cyprus", capital: "Nicosia", currencyName: "Euro", currencySymbol: "€" },
            { name: "Czechia", code: "CZ", currency: "CZK", flag: "🇨🇿", continent: "Europe", phone: "+420", gmaps: "Czechia", capital: "Prague", currencyName: "Czech koruna", currencySymbol: "Kč" },
            { name: "Denmark", code: "DK", currency: "DKK", flag: "🇩🇰", continent: "Europe", phone: "+45", gmaps: "Denmark", capital: "Copenhagen", currencyName: "Danish krone", currencySymbol: "kr" },
            { name: "Djibouti", code: "DJ", currency: "DJF", flag: "🇩🇯", continent: "Africa", phone: "+253", gmaps: "Djibouti", capital: "Djibouti", currencyName: "Djiboutian franc", currencySymbol: "Fr" },
            { name: "Dominica", code: "DM", currency: "XCD", flag: "🇩🇲", continent: "North America", phone: "+1-767", gmaps: "Dominica", capital: "Roseau", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Dominican Republic", code: "DO", currency: "DOP", flag: "🇩🇴", continent: "North America", phone: "+1-809, +1-829, +1-849", gmaps: "Dominican Republic", capital: "Santo Domingo", currencyName: "Dominican peso", currencySymbol: "$" },
            { name: "Ecuador", code: "EC", currency: "USD", flag: "🇪🇨", continent: "South America", phone: "+593", gmaps: "Ecuador", capital: "Quito", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Egypt", code: "EG", currency: "EGP", flag: "🇪🇬", continent: "Africa", phone: "+20", gmaps: "Egypt", capital: "Cairo", currencyName: "Egyptian pound", currencySymbol: "£" },
            { name: "El Salvador", code: "SV", currency: "USD", flag: "🇸🇻", continent: "North America", phone: "+503", gmaps: "El Salvador", capital: "San Salvador", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Equatorial Guinea", code: "GQ", currency: "XAF", flag: "🇬🇶", continent: "Africa", phone: "+240", gmaps: "Equatorial Guinea", capital: "Malabo", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Eritrea", code: "ER", currency: "ERN", flag: "🇪🇷", continent: "Africa", phone: "+291", gmaps: "Eritrea", capital: "Asmara", currencyName: "Eritrean nakfa", currencySymbol: "Nfk" },
            { name: "Estonia", code: "EE", currency: "EUR", flag: "🇪🇪", continent: "Europe", phone: "+372", gmaps: "Estonia", capital: "Tallinn", currencyName: "Euro", currencySymbol: "€" },
            { name: "Eswatini", code: "SZ", currency: "SZL", flag: "🇸🇿", continent: "Africa", phone: "+268", gmaps: "Eswatini", capital: "Mbabane", currencyName: "Eswatini lilangeni", currencySymbol: "L" },
            { name: "Ethiopia", code: "ET", currency: "ETB", flag: "🇪🇹", continent: "Africa", phone: "+251", gmaps: "Ethiopia", capital: "Addis Ababa", currencyName: "Ethiopian birr", currencySymbol: "Br" },
            { name: "Falkland Islands", code: "FK", currency: "FKP", flag: "🇫🇰", continent: "South America", phone: "+500", gmaps: "Falkland Islands", capital: "Stanley", currencyName: "Falkland Islands pound", currencySymbol: "£" },
            { name: "Faroe Islands", code: "FO", currency: "DKK", flag: "🇫🇴", continent: "Europe", phone: "+298", gmaps: "Faroe Islands", capital: "Tórshavn", currencyName: "Danish krone", currencySymbol: "kr" },
            { name: "Fiji", code: "FJ", currency: "FJD", flag: "🇫🇯", continent: "Oceania", phone: "+679", gmaps: "Fiji", capital: "Suva", currencyName: "Fijian dollar", currencySymbol: "$" },
            { name: "Finland", code: "FI", currency: "EUR", flag: "🇫🇮", continent: "Europe", phone: "+358", gmaps: "Finland", capital: "Helsinki", currencyName: "Euro", currencySymbol: "€" },
            { name: "France", code: "FR", currency: "EUR", flag: "🇫🇷", continent: "Europe", phone: "+33", gmaps: "France", capital: "Paris", currencyName: "Euro", currencySymbol: "€" },
            { name: "French Guiana", code: "GF", currency: "EUR", flag: "🇬🇫", continent: "South America", phone: "+594", gmaps: "French Guiana", capital: "Cayenne", currencyName: "Euro", currencySymbol: "€" },
            { name: "French Polynesia", code: "PF", currency: "XPF", flag: "🇵🇫", continent: "Oceania", phone: "+689", gmaps: "French Polynesia", capital: "Papeete", currencyName: "CFP franc", currencySymbol: "Fr" },
            { name: "Gabon", code: "GA", currency: "XAF", flag: "🇬🇦", continent: "Africa", phone: "+241", gmaps: "Gabon", capital: "Libreville", currencyName: "Central African CFA franc", currencySymbol: "Fr" },
            { name: "Gambia", code: "GM", currency: "GMD", flag: "🇬🇲", continent: "Africa", phone: "+220", gmaps: "Gambia", capital: "Banjul", currencyName: "Gambian dalasi", currencySymbol: "D" },
            { name: "Georgia", code: "GE", currency: "GEL", flag: "🇬🇪", continent: "Asia", phone: "+995", gmaps: "Georgia", capital: "Tbilisi", currencyName: "Georgian lari", currencySymbol: "₾" },
            { name: "Germany", code: "DE", currency: "EUR", flag: "🇩🇪", continent: "Europe", phone: "+49", gmaps: "Germany", capital: "Berlin", currencyName: "Euro", currencySymbol: "€" },
            { name: "Ghana", code: "GH", currency: "GHS", flag: "🇬🇭", continent: "Africa", phone: "+233", gmaps: "Ghana", capital: "Accra", currencyName: "Ghanaian cedi", currencySymbol: "₵" },
            { name: "Gibraltar", code: "GI", currency: "GIP", flag: "🇬🇮", continent: "Europe", phone: "+350", gmaps: "Gibraltar", capital: "Gibraltar", currencyName: "Gibraltar pound", currencySymbol: "£" },
            { name: "Greece", code: "GR", currency: "EUR", flag: "🇬🇷", continent: "Europe", phone: "+30", gmaps: "Greece", capital: "Athens", currencyName: "Euro", currencySymbol: "€" },
            { name: "Greenland", code: "GL", currency: "DKK", flag: "🇬🇱", continent: "North America", phone: "+299", gmaps: "Greenland", capital: "Nuuk", currencyName: "Danish krone", currencySymbol: "kr" },
            { name: "Grenada", code: "GD", currency: "XCD", flag: "🇬🇩", continent: "North America", phone: "+1-473", gmaps: "Grenada", capital: "St. George's", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Guadeloupe", code: "GP", currency: "EUR", flag: "🇬🇵", continent: "North America", phone: "+590", gmaps: "Guadeloupe", capital: "Basse-Terre", currencyName: "Euro", currencySymbol: "€" },
            { name: "Guam", code: "GU", currency: "USD", flag: "🇬🇺", continent: "Oceania", phone: "+1-671", gmaps: "Guam", capital: "Hagåtña", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Guatemala", code: "GT", currency: "GTQ", flag: "🇬🇹", continent: "North America", phone: "+502", gmaps: "Guatemala", capital: "Guatemala City", currencyName: "Guatemalan quetzal", currencySymbol: "Q" },
            { name: "Guernsey", code: "GG", currency: "GBP", flag: "🇬🇬", continent: "Europe", phone: "+44", gmaps: "Guernsey", capital: "St. Peter Port", currencyName: "Pound sterling", currencySymbol: "£" },
            { name: "Guinea", code: "GN", currency: "GNF", flag: "🇬🇳", continent: "Africa", phone: "+224", gmaps: "Guinea", capital: "Conakry", currencyName: "Guinean franc", currencySymbol: "Fr" },
            { name: "Guinea-Bissau", code: "GW", currency: "XOF", flag: "🇬🇼", continent: "Africa", phone: "+245", gmaps: "Guinea-Bissau", capital: "Bissau", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Guyana", code: "GY", currency: "GYD", flag: "🇬🇾", continent: "South America", phone: "+592", gmaps: "Guyana", capital: "Georgetown", currencyName: "Guyanese dollar", currencySymbol: "$" },
            { name: "Haiti", code: "HT", currency: "HTG", flag: "🇭🇹", continent: "North America", phone: "+509", gmaps: "Haiti", capital: "Port-au-Prince", currencyName: "Haitian gourde", currencySymbol: "G" },
            { name: "Honduras", code: "HN", currency: "HNL", flag: "🇭🇳", continent: "North America", phone: "+504", gmaps: "Honduras", capital: "Tegucigalpa", currencyName: "Honduran lempira", currencySymbol: "L" },
            { name: "Hong Kong", code: "HK", currency: "HKD", flag: "🇭🇰", continent: "Asia", phone: "+852", gmaps: "Hong Kong", capital: "City of Victoria", currencyName: "Hong Kong dollar", currencySymbol: "$" },
            { name: "Hungary", code: "HU", currency: "HUF", flag: "🇭🇺", continent: "Europe", phone: "+36", gmaps: "Hungary", capital: "Budapest", currencyName: "Hungarian forint", currencySymbol: "Ft" },
            { name: "Iceland", code: "IS", currency: "ISK", flag: "🇮🇸", continent: "Europe", phone: "+354", gmaps: "Iceland", capital: "Reykjavik", currencyName: "Icelandic króna", currencySymbol: "kr" },
            { name: "India", code: "IN", currency: "INR", flag: "🇮🇳", continent: "Asia", phone: "+91", gmaps: "India", capital: "New Delhi", currencyName: "Indian rupee", currencySymbol: "₹" },
            { name: "Indonesia", code: "ID", currency: "IDR", flag: "🇮🇩", continent: "Asia", phone: "+62", gmaps: "Indonesia", capital: "Jakarta", currencyName: "Indonesian rupiah", currencySymbol: "Rp" },
            { name: "Iran", code: "IR", currency: "IRR", flag: "🇮🇷", continent: "Asia", phone: "+98", gmaps: "Iran", capital: "Tehran", currencyName: "Iranian rial", currencySymbol: "﷼" },
            { name: "Iraq", code: "IQ", currency: "IQD", flag: "🇮🇶", continent: "Asia", phone: "+964", gmaps: "Iraq", capital: "Baghdad", currencyName: "Iraqi dinar", currencySymbol: "ع.د" },
            { name: "Ireland", code: "IE", currency: "EUR", flag: "🇮🇪", continent: "Europe", phone: "+353", gmaps: "Ireland", capital: "Dublin", currencyName: "Euro", currencySymbol: "€" },
            { name: "Israel", code: "IL", currency: "ILS", flag: "🇮🇱", continent: "Asia", phone: "+972", gmaps: "Israel", capital: "Jerusalem", currencyName: "Israeli new shekel", currencySymbol: "₪" },
            { name: "Italy", code: "IT", currency: "EUR", flag: "🇮🇹", continent: "Europe", phone: "+39", gmaps: "Italy", capital: "Rome", currencyName: "Euro", currencySymbol: "€" },
            { name: "Jamaica", code: "JM", currency: "JMD", flag: "🇯🇲", continent: "North America", phone: "+1-876", gmaps: "Jamaica", capital: "Kingston", currencyName: "Jamaican dollar", currencySymbol: "$" },
            { name: "Japan", code: "JP", currency: "JPY", flag: "🇯🇵", continent: "Asia", phone: "+81", gmaps: "Japan", capital: "Tokyo", currencyName: "Japanese yen", currencySymbol: "¥" },
            { name: "Jordan", code: "JO", currency: "JOD", flag: "🇯🇴", continent: "Asia", phone: "+962", gmaps: "Jordan", capital: "Amman", currencyName: "Jordanian dinar", currencySymbol: "د.ا" },
            { name: "Kazakhstan", code: "KZ", currency: "KZT", flag: "🇰🇿", continent: "Asia", phone: "+7", gmaps: "Kazakhstan", capital: "Astana", currencyName: "Kazakhstani tenge", currencySymbol: "₸" },
            { name: "Kenya", code: "KE", currency: "KES", flag: "🇰🇪", continent: "Africa", phone: "+254", gmaps: "Kenya", capital: "Nairobi", currencyName: "Kenyan shilling", currencySymbol: "Sh" },
            { name: "Kiribati", code: "KI", currency: "AUD", flag: "🇰🇮", continent: "Oceania", phone: "+686", gmaps: "Kiribati", capital: "South Tarawa", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "Korea (DPRK)", code: "KP", currency: "KPW", flag: "🇰🇵", continent: "Asia", phone: "+850", gmaps: "North Korea", capital: "Pyongyang", currencyName: "North Korean won", currencySymbol: "₩" },
            { name: "Korea (Republic)", code: "KR", currency: "KRW", flag: "🇰🇷", continent: "Asia", phone: "+82", gmaps: "South Korea", capital: "Seoul", currencyName: "South Korean won", currencySymbol: "₩" },
            { name: "Kuwait", code: "KW", currency: "KWD", flag: "🇰🇼", continent: "Asia", phone: "+965", gmaps: "Kuwait", capital: "Kuwait City", currencyName: "Kuwaiti dinar", currencySymbol: "د.ك" },
            { name: "Kyrgyzstan", code: "KG", currency: "KGS", flag: "🇰🇬", continent: "Asia", phone: "+996", gmaps: "Kyrgyzstan", capital: "Bishkek", currencyName: "Kyrgyzstani som", currencySymbol: "с" },
            { name: "Laos", code: "LA", currency: "LAK", flag: "🇱🇦", continent: "Asia", phone: "+856", gmaps: "Laos", capital: "Vientiane", currencyName: "Lao kip", currencySymbol: "₭" },
            { name: "Latvia", code: "LV", currency: "EUR", flag: "🇱🇻", continent: "Europe", phone: "+371", gmaps: "Latvia", capital: "Riga", currencyName: "Euro", currencySymbol: "€" },
            { name: "Lebanon", code: "LB", currency: "LBP", flag: "🇱🇧", continent: "Asia", phone: "+961", gmaps: "Lebanon", capital: "Beirut", currencyName: "Lebanese pound", currencySymbol: "ل.ل" },
            { name: "Lesotho", code: "LS", currency: "LSL", flag: "🇱🇸", continent: "Africa", phone: "+266", gmaps: "Lesotho", capital: "Maseru", currencyName: "Lesotho loti", currencySymbol: "L" },
            { name: "Liberia", code: "LR", currency: "LRD", flag: "🇱🇷", continent: "Africa", phone: "+231", gmaps: "Liberia", capital: "Monrovia", currencyName: "Liberian dollar", currencySymbol: "$" },
            { name: "Libya", code: "LY", currency: "LYD", flag: "🇱🇾", continent: "Africa", phone: "+218", gmaps: "Libya", capital: "Tripoli", currencyName: "Libyan dinar", currencySymbol: "ل.د" },
            { name: "Liechtenstein", code: "LI", currency: "CHF", flag: "🇱🇮", continent: "Europe", phone: "+423", gmaps: "Liechtenstein", capital: "Vaduz", currencyName: "Swiss franc", currencySymbol: "Fr" },
            { name: "Lithuania", code: "LT", currency: "EUR", flag: "🇱🇹", continent: "Europe", phone: "+370", gmaps: "Lithuania", capital: "Vilnius", currencyName: "Euro", currencySymbol: "€" },
            { name: "Luxembourg", code: "LU", currency: "EUR", flag: "🇱🇺", continent: "Europe", phone: "+352", gmaps: "Luxembourg", capital: "Luxembourg", currencyName: "Euro", currencySymbol: "€" },
            { name: "Macao", code: "MO", currency: "MOP", flag: "🇲🇴", continent: "Asia", phone: "+853", gmaps: "Macao", capital: "N/A", currencyName: "Macanese pataca", currencySymbol: "P" },
            { name: "Madagascar", code: "MG", currency: "MGA", flag: "🇲🇬", continent: "Africa", phone: "+261", gmaps: "Madagascar", capital: "Antananarivo", currencyName: "Malagasy ariary", currencySymbol: "Ar" },
            { name: "Malawi", code: "MW", currency: "MWK", flag: "🇲🇼", continent: "Africa", phone: "+265", gmaps: "Malawi", capital: "Lilongwe", currencyName: "Malawian kwacha", currencySymbol: "MK" },
            { name: "Malaysia", code: "MY", currency: "MYR", flag: "🇲🇾", continent: "Asia", phone: "+60", gmaps: "Malaysia", capital: "Kuala Lumpur", currencyName: "Malaysian ringgit", currencySymbol: "RM" },
            { name: "Maldives", code: "MV", currency: "MVR", flag: "🇲🇻", continent: "Asia", phone: "+960", gmaps: "Maldives", capital: "Malé", currencyName: "Maldivian rufiyaa", currencySymbol: ".ރ" },
            { name: "Mali", code: "ML", currency: "XOF", flag: "🇲🇱", continent: "Africa", phone: "+223", gmaps: "Mali", capital: "Bamako", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Malta", code: "MT", currency: "EUR", flag: "🇲🇹", continent: "Europe", phone: "+356", gmaps: "Malta", capital: "Valletta", currencyName: "Euro", currencySymbol: "€" },
            { name: "Martinique", code: "MQ", currency: "EUR", flag: "🇲🇶", continent: "North America", phone: "+596", gmaps: "Martinique", capital: "Fort-de-France", currencyName: "Euro", currencySymbol: "€" },
            { name: "Mauritania", code: "MR", currency: "MRU", flag: "🇲🇷", continent: "Africa", phone: "+222", gmaps: "Mauritania", capital: "Nouakchott", currencyName: "Mauritanian ouguiya", currencySymbol: "UM" },
            { name: "Mauritius", code: "MU", currency: "MUR", flag: "🇲🇺", continent: "Africa", phone: "+230", gmaps: "Mauritius", capital: "Port Louis", currencyName: "Mauritian rupee", currencySymbol: "₨" },
            { name: "Mayotte", code: "YT", currency: "EUR", flag: "🇾🇹", continent: "Africa", phone: "+262", gmaps: "Mayotte", capital: "Mamoudzou", currencyName: "Euro", currencySymbol: "€" },
            { name: "Mexico", code: "MX", currency: "MXN", flag: "🇲🇽", continent: "North America", phone: "+52", gmaps: "Mexico", capital: "Mexico City", currencyName: "Mexican peso", currencySymbol: "$" },
            { name: "Micronesia", code: "FM", currency: "USD", flag: "🇫🇲", continent: "Oceania", phone: "+691", gmaps: "Micronesia", capital: "Palikir", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Moldova", code: "MD", currency: "MDL", flag: "🇲🇩", continent: "Europe", phone: "+373", gmaps: "Moldova", capital: "Chișinău", currencyName: "Moldovan leu", currencySymbol: "L" },
            { name: "Monaco", code: "MC", currency: "EUR", flag: "🇲🇨", continent: "Europe", phone: "+377", gmaps: "Monaco", capital: "Monaco", currencyName: "Euro", currencySymbol: "€" },
            { name: "Mongolia", code: "MN", currency: "MNT", flag: "🇲🇳", continent: "Asia", phone: "+976", gmaps: "Mongolia", capital: "Ulaanbaatar", currencyName: "Mongolian tögrög", currencySymbol: "₮" },
            { name: "Montenegro", code: "ME", currency: "EUR", flag: "🇲🇪", continent: "Europe", phone: "+382", gmaps: "Montenegro", capital: "Podgorica", currencyName: "Euro", currencySymbol: "€" },
            { name: "Montserrat", code: "MS", currency: "XCD", flag: "🇲🇸", continent: "North America", phone: "+1-664", gmaps: "Montserrat", capital: "Plymouth", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Morocco", code: "MA", currency: "MAD", flag: "🇲🇦", continent: "Africa", phone: "+212", gmaps: "Morocco", capital: "Rabat", currencyName: "Moroccan dirham", currencySymbol: "د.م." },
            { name: "Mozambique", code: "MZ", currency: "MZN", flag: "🇲🇿", continent: "Africa", phone: "+258", gmaps: "Mozambique", capital: "Maputo", currencyName: "Mozambican metical", currencySymbol: "MT" },
            { name: "Myanmar", code: "MM", currency: "MMK", flag: "🇲🇲", continent: "Asia", phone: "+95", gmaps: "Myanmar", capital: "Naypyidaw", currencyName: "Burmese kyat", currencySymbol: "K" },
            { name: "Namibia", code: "NA", currency: "NAD", flag: "🇳🇦", continent: "Africa", phone: "+264", gmaps: "Namibia", capital: "Windhoek", currencyName: "Namibian dollar", currencySymbol: "$" },
            { name: "Nauru", code: "NR", currency: "AUD", flag: "🇳🇷", continent: "Oceania", phone: "+674", gmaps: "Nauru", capital: "Yaren", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "Nepal", code: "NP", currency: "NPR", flag: "🇳🇵", continent: "Asia", phone: "+977", gmaps: "Nepal", capital: "Kathmandu", currencyName: "Nepalese rupee", currencySymbol: "₨" },
            { name: "Netherlands", code: "NL", currency: "EUR", flag: "🇳🇱", continent: "Europe", phone: "+31", gmaps: "Netherlands", capital: "Amsterdam", currencyName: "Euro", currencySymbol: "€" },
            { name: "New Caledonia", code: "NC", currency: "XPF", flag: "🇳🇨", continent: "Oceania", phone: "+687", gmaps: "New Caledonia", capital: "Nouméa", currencyName: "CFP franc", currencySymbol: "Fr" },
            { name: "New Zealand", code: "NZ", currency: "NZD", flag: "🇳🇿", continent: "Oceania", phone: "+64", gmaps: "New Zealand", capital: "Wellington", currencyName: "New Zealand dollar", currencySymbol: "$" },
            { name: "Nicaragua", code: "NI", currency: "NIO", flag: "🇳🇮", continent: "North America", phone: "+505", gmaps: "Nicaragua", capital: "Managua", currencyName: "Nicaraguan córdoba", currencySymbol: "C$" },
            { name: "Niger", code: "NE", currency: "XOF", flag: "🇳🇪", continent: "Africa", phone: "+227", gmaps: "Niger", capital: "Niamey", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Nigeria", code: "NG", currency: "NGN", flag: "🇳🇬", continent: "Africa", phone: "+234", gmaps: "Nigeria", capital: "Abuja", currencyName: "Nigerian naira", currencySymbol: "₦" },
            { name: "Niue", code: "NU", currency: "NZD", flag: "🇳🇺", continent: "Oceania", phone: "+683", gmaps: "Niue", capital: "Alofi", currencyName: "New Zealand dollar", currencySymbol: "$" },
            { name: "Norfolk Island", code: "NF", currency: "AUD", flag: "🇳🇫", continent: "Oceania", phone: "+672", gmaps: "Norfolk Island", capital: "Kingston", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "North Macedonia", code: "MK", currency: "MKD", flag: "🇲🇰", continent: "Europe", phone: "+389", gmaps: "North Macedonia", capital: "Skopje", currencyName: "Macedonian denar", currencySymbol: "ден" },
            { name: "Northern Mariana Is.", code: "MP", currency: "USD", flag: "🇲🇵", continent: "Oceania", phone: "+1-670", gmaps: "Northern Mariana Islands", capital: "Saipan", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Norway", code: "NO", currency: "NOK", flag: "🇳🇴", continent: "Europe", phone: "+47", gmaps: "Norway", capital: "Oslo", currencyName: "Norwegian krone", currencySymbol: "kr" },
            { name: "Oman", code: "OM", currency: "OMR", flag: "🇴🇲", continent: "Asia", phone: "+968", gmaps: "Oman", capital: "Muscat", currencyName: "Omani rial", currencySymbol: "ر.ع." },
            { name: "Pakistan", code: "PK", currency: "PKR", flag: "🇵🇰", continent: "Asia", phone: "+92", gmaps: "Pakistan", capital: "Islamabad", currencyName: "Pakistani rupee", currencySymbol: "₨" },
            { name: "Palau", code: "PW", currency: "USD", flag: "🇵🇼", continent: "Oceania", phone: "+680", gmaps: "Palau", capital: "Ngerulmud", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Palestine", code: "PS", currency: "ILS", flag: "🇵🇸", continent: "Asia", phone: "+970", gmaps: "Palestine", capital: "Ramallah", currencyName: "Israeli new shekel", currencySymbol: "₪" },
            { name: "Panama", code: "PA", currency: "PAB", flag: "🇵🇦", continent: "North America", phone: "+507", gmaps: "Panama", capital: "Panama City", currencyName: "Panamanian balboa", currencySymbol: "B/." },
            { name: "Papua New Guinea", code: "PG", currency: "PGK", flag: "🇵🇬", continent: "Oceania", phone: "+675", gmaps: "Papua New Guinea", capital: "Port Moresby", currencyName: "Papua New Guinean kina", currencySymbol: "K" },
            { name: "Paraguay", code: "PY", currency: "PYG", flag: "🇵🇾", continent: "South America", phone: "+595", gmaps: "Paraguay", capital: "Asunción", currencyName: "Paraguayan guaraní", currencySymbol: "₲" },
            { name: "Peru", code: "PE", currency: "PEN", flag: "🇵🇪", continent: "South America", phone: "+51", gmaps: "Peru", capital: "Lima", currencyName: "Peruvian sol", currencySymbol: "S/" },
            { name: "Philippines", code: "PH", currency: "PHP", flag: "🇵🇭", continent: "Asia", phone: "+63", gmaps: "Philippines", capital: "Manila", currencyName: "Philippine peso", currencySymbol: "₱" },
            { name: "Pitcairn", code: "PN", currency: "NZD", flag: "🇵🇳", continent: "Oceania", phone: "+870", gmaps: "Pitcairn", capital: "Adamstown", currencyName: "New Zealand dollar", currencySymbol: "$" },
            { name: "Poland", code: "PL", currency: "PLN", flag: "🇵🇱", continent: "Europe", phone: "+48", gmaps: "Poland", capital: "Warsaw", currencyName: "Polish złoty", currencySymbol: "zł" },
            { name: "Portugal", code: "PT", currency: "EUR", flag: "🇵🇹", continent: "Europe", phone: "+351", gmaps: "Portugal", capital: "Lisbon", currencyName: "Euro", currencySymbol: "€" },
            { name: "Puerto Rico", code: "PR", currency: "USD", flag: "🇵🇷", continent: "North America", phone: "+1-787, +1-939", gmaps: "Puerto Rico", capital: "San Juan", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Qatar", code: "QA", currency: "QAR", flag: "🇶🇦", continent: "Asia", phone: "+974", gmaps: "Qatar", capital: "Doha", currencyName: "Qatari riyal", currencySymbol: "ر.ق" },
            { name: "Reunion", code: "RE", currency: "EUR", flag: "🇷🇪", continent: "Africa", phone: "+262", gmaps: "Reunion", capital: "Saint-Denis", currencyName: "Euro", currencySymbol: "€" },
            { name: "Romania", code: "RO", currency: "RON", flag: "🇷🇴", continent: "Europe", phone: "+40", gmaps: "Romania", capital: "Bucharest", currencyName: "Romanian leu", currencySymbol: "lei" },
            { name: "Russian Federation", code: "RU", currency: "RUB", flag: "🇷🇺", continent: "Europe", phone: "+7", gmaps: "Russian Federation", capital: "Moscow", currencyName: "Russian ruble", currencySymbol: "₽" },
            { name: "Rwanda", code: "RW", currency: "RWF", flag: "🇷🇼", continent: "Africa", phone: "+250", gmaps: "Rwanda", capital: "Kigali", currencyName: "Rwandan franc", currencySymbol: "Fr" },
            { name: "Saint Barthélemy", code: "BL", currency: "EUR", flag: "🇧🇱", continent: "North America", phone: "+590", gmaps: "Saint Barthélemy", capital: "Gustavia", currencyName: "Euro", currencySymbol: "€" },
            { name: "Saint Helena", code: "SH", currency: "SHP", flag: "🇸🇭", continent: "Africa", phone: "+290", gmaps: "Saint Helena", capital: "Jamestown", currencyName: "Saint Helena pound", currencySymbol: "£" },
            { name: "Saint Kitts & Nevis", code: "KN", currency: "XCD", flag: "🇰🇳", continent: "North America", phone: "+1-869", gmaps: "Saint Kitts & Nevis", capital: "Basseterre", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Saint Lucia", code: "LC", currency: "XCD", flag: "🇱🇨", continent: "North America", phone: "+1-758", gmaps: "Saint Lucia", capital: "Castries", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Samoa", code: "WS", currency: "WST", flag: "🇼🇸", continent: "Oceania", phone: "+685", gmaps: "Samoa", capital: "Apia", currencyName: "Samoan tālā", currencySymbol: "T" },
            { name: "San Marino", code: "SM", currency: "EUR", flag: "🇸🇲", continent: "Europe", phone: "+378", gmaps: "San Marino", capital: "San Marino", currencyName: "Euro", currencySymbol: "€" },
            { name: "Sao Tome & Principe", code: "ST", currency: "STN", flag: "🇸🇹", continent: "Africa", phone: "+239", gmaps: "Sao Tome & Principe", capital: "São Tomé", currencyName: "São Tomé and Príncipe dobra", currencySymbol: "Db" },
            { name: "Saudi Arabia", code: "SA", currency: "SAR", flag: "🇸🇦", continent: "Asia", phone: "+966", gmaps: "Saudi Arabia", capital: "Riyadh", currencyName: "Saudi riyal", currencySymbol: "ر.s" },
            { name: "Senegal", code: "SN", currency: "XOF", flag: "🇸🇳", continent: "Africa", phone: "+221", gmaps: "Senegal", capital: "Dakar", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Serbia", code: "RS", currency: "RSD", flag: "🇷🇸", continent: "Europe", phone: "+381", gmaps: "Serbia", capital: "Belgrade", currencyName: "Serbian dinar", currencySymbol: "дин." },
            { name: "Seychelles", code: "SC", currency: "SCR", flag: "🇸🇨", continent: "Africa", phone: "+248", gmaps: "Seychelles", capital: "Victoria", currencyName: "Seychellois rupee", currencySymbol: "₨" },
            { name: "Sierra Leone", code: "SL", currency: "SLL", flag: "🇸🇱", continent: "Africa", phone: "+232", gmaps: "Sierra Leone", capital: "Freetown", currencyName: "Sierra Leonean leone", currencySymbol: "Le" },
            { name: "Singapore", code: "SG", currency: "SGD", flag: "🇸🇬", continent: "Asia", phone: "+65", gmaps: "Singapore", capital: "Singapore", currencyName: "Singapore dollar", currencySymbol: "$" },
            { name: "Sint Maarten (NL)", code: "SX", currency: "ANG", flag: "🇸🇽", continent: "North America", phone: "+1-721", gmaps: "Sint Maarten", capital: "Philipsburg", currencyName: "Netherlands Antillean guilder", currencySymbol: "ƒ" },
            { name: "Slovakia", code: "SK", currency: "EUR", flag: "🇸🇰", continent: "Europe", phone: "+421", gmaps: "Slovakia", capital: "Bratislava", currencyName: "Euro", currencySymbol: "€" },
            { name: "Slovenia", code: "SI", currency: "EUR", flag: "🇸🇮", continent: "Europe", phone: "+386", gmaps: "Slovenia", capital: "Ljubljana", currencyName: "Euro", currencySymbol: "€" },
            { name: "Solomon Islands", code: "SB", currency: "SBD", flag: "🇸🇧", continent: "Oceania", phone: "+677", gmaps: "Solomon Islands", capital: "Honiara", currencyName: "Solomon Islands dollar", currencySymbol: "$" },
            { name: "Somalia", code: "SO", currency: "SOS", flag: "🇸🇴", continent: "Africa", phone: "+252", gmaps: "Somalia", capital: "Mogadishu", currencyName: "Somali shilling", currencySymbol: "Sh" },
            { name: "South Africa", code: "ZA", currency: "ZAR", flag: "🇿🇦", continent: "Africa", phone: "+27", gmaps: "South Africa", capital: "Pretoria", currencyName: "South African rand", currencySymbol: "R" },
            { name: "South Sudan", code: "SS", currency: "SSP", flag: "🇸🇸", continent: "Africa", phone: "+211", gmaps: "South Sudan", capital: "Juba", currencyName: "South Sudanese pound", currencySymbol: "£" },
            { name: "Spain", code: "ES", currency: "EUR", flag: "🇪🇸", continent: "Europe", phone: "+34", gmaps: "Spain", capital: "Madrid", currencyName: "Euro", currencySymbol: "€" },
            { name: "Sri Lanka", code: "LK", currency: "LKR", flag: "🇱🇰", continent: "Asia", phone: "+94", gmaps: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", currencyName: "Sri Lankan rupee", currencySymbol: "Rs" },
            { name: "St. Pierre & Miquelon", code: "PM", currency: "EUR", flag: "🇵🇲", continent: "North America", phone: "+508", gmaps: "St. Pierre & Miquelon", capital: "Saint-Pierre", currencyName: "Euro", currencySymbol: "€" },
            { name: "St. Vincent & Grenadines", code: "VC", currency: "XCD", flag: "🇻🇨", continent: "North America", phone: "+1-784", gmaps: "St. Vincent & Grenadines", capital: "Kingstown", currencyName: "East Caribbean dollar", currencySymbol: "$" },
            { name: "Sudan", code: "SD", currency: "SDG", flag: "🇸🇩", continent: "Africa", phone: "+249", gmaps: "Sudan", capital: "Khartoum", currencyName: "Sudanese pound", currencySymbol: "ج.س." },
            { name: "Suriname", code: "SR", currency: "SRD", flag: "🇸🇷", continent: "South America", phone: "+597", gmaps: "Suriname", capital: "Paramaribo", currencyName: "Surinamese dollar", currencySymbol: "$" },
            { name: "Sweden", code: "SE", currency: "SEK", flag: "🇸🇪", continent: "Europe", phone: "+46", gmaps: "Sweden", capital: "Stockholm", currencyName: "Swedish krona", currencySymbol: "kr" },
            { name: "Switzerland", code: "CH", currency: "CHF", flag: "🇨🇭", continent: "Europe", phone: "+41", gmaps: "Switzerland", capital: "Bern", currencyName: "Swiss franc", currencySymbol: "Fr" },
            { name: "Syrian Arab Rep.", code: "SY", currency: "SYP", flag: "🇸🇾", continent: "Asia", phone: "+963", gmaps: "Syrian Arab Rep.", capital: "Damascus", currencyName: "Syrian pound", currencySymbol: "£" },
            { name: "Taiwan", code: "TW", currency: "TWD", flag: "🇹🇼", continent: "Asia", phone: "+886", gmaps: "Taiwan", capital: "Taipei", currencyName: "New Taiwan dollar", currencySymbol: "$" },
            { name: "Tajikistan", code: "TJ", currency: "TJS", flag: "🇹🇯", continent: "Asia", phone: "+992", gmaps: "Tajikistan", capital: "Dushanbe", currencyName: "Tajikistani somoni", currencySymbol: "ЅМ" },
            { name: "Tanzania", code: "TZ", currency: "TZS", flag: "🇹🇿", continent: "Africa", phone: "+255", gmaps: "Tanzania", capital: "Dodoma", currencyName: "Tanzanian shilling", currencySymbol: "Sh" },
            { name: "Thailand", code: "TH", currency: "THB", flag: "🇹🇭", continent: "Asia", phone: "+66", gmaps: "Thailand", capital: "Bangkok", currencyName: "Thai baht", currencySymbol: "฿" },
            { name: "Timor-Leste", code: "TL", currency: "USD", flag: "🇹🇱", continent: "Asia", phone: "+670", gmaps: "Timor-Leste", capital: "Dili", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Togo", code: "TG", currency: "XOF", flag: "🇹🇬", continent: "Africa", phone: "+228", gmaps: "Togo", capital: "Lomé", currencyName: "West African CFA franc", currencySymbol: "Fr" },
            { name: "Tokelau", code: "TK", currency: "NZD", flag: "🇹🇰", continent: "Oceania", phone: "+690", gmaps: "Tokelau", capital: "Fakaofo", currencyName: "New Zealand dollar", currencySymbol: "$" },
            { name: "Tonga", code: "TO", currency: "TOP", flag: "🇹🇴", continent: "Oceania", phone: "+676", gmaps: "Tonga", capital: "Nuku'alofa", currencyName: "Tongan paʻanga", currencySymbol: "T$" },
            { name: "Trinidad & Tobago", code: "TT", currency: "TTD", flag: "🇹🇹", continent: "North America", phone: "+1-868", gmaps: "Trinidad & Tobago", capital: "Port of Spain", currencyName: "Trinidad and Tobago dollar", currencySymbol: "$" },
            { name: "Tunisia", code: "TN", currency: "TND", flag: "🇹🇳", continent: "Africa", phone: "+216", gmaps: "Tunisia", capital: "Tunis", currencyName: "Tunisian dinar", currencySymbol: "د.ت" },
            { name: "Turkey", code: "TR", currency: "TRY", flag: "🇹🇷", continent: "Asia", phone: "+90", gmaps: "Turkey", capital: "Ankara", currencyName: "Turkish lira", currencySymbol: "₺" },
            { name: "Turkmenistan", code: "TM", currency: "TMT", flag: "🇹🇲", continent: "Asia", phone: "+993", gmaps: "Turkmenistan", capital: "Ashgabat", currencyName: "Turkmenistan manat", currencySymbol: "m" },
            { name: "Turks & Caicos Is.", code: "TC", currency: "USD", flag: "🇹🇨", continent: "North America", phone: "+1-649", gmaps: "Turks & Caicos Is.", capital: "Cockburn Town", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Tuvalu", code: "TV", currency: "AUD", flag: "🇹🇻", continent: "Oceania", phone: "+688", gmaps: "Tuvalu", capital: "Funafuti", currencyName: "Australian dollar", currencySymbol: "$" },
            { name: "Uganda", code: "UG", currency: "UGX", flag: "🇺🇬", continent: "Africa", phone: "+256", gmaps: "Uganda", capital: "Kampala", currencyName: "Ugandan shilling", currencySymbol: "Sh" },
            { name: "Ukraine", code: "UA", currency: "UAH", flag: "🇺🇦", continent: "Europe", phone: "+380", gmaps: "Ukraine", capital: "Kyiv", currencyName: "Ukrainian hryvnia", currencySymbol: "₴" },
            { name: "United Arab Emirates", code: "AE", currency: "AED", flag: "🇦🇪", continent: "Asia", phone: "+971", gmaps: "United Arab Emirates", capital: "Abu Dhabi", currencyName: "United Arab Emirates dirham", currencySymbol: "د.إ" },
            { name: "United Kingdom", code: "GB", currency: "GBP", flag: "🇬🇧", continent: "Europe", phone: "+44", gmaps: "United Kingdom", capital: "London", currencyName: "Pound sterling", currencySymbol: "£" },
            { name: "United States", code: "US", currency: "USD", flag: "🇺🇸", continent: "North America", phone: "+1", gmaps: "United States", capital: "Washington, D.C.", currencyName: "United States dollar", currencySymbol: "$" },
            { name: "Uruguay", code: "UY", currency: "UYU", flag: "🇺🇾", continent: "South America", phone: "+598", gmaps: "Uruguay", capital: "Montevideo", currencyName: "Uruguayan peso", currencySymbol: "$" },
            { name: "Uzbekistan", code: "UZ", currency: "UZS", flag: "🇺🇿", continent: "Asia", phone: "+998", gmaps: "Uzbekistan", capital: "Tashkent", currencyName: "Uzbekistani soʻm", currencySymbol: "so'm" },
            { name: "Vanuatu", code: "VU", currency: "VUV", flag: "🇻🇺", continent: "Oceania", phone: "+678", gmaps: "Vanuatu", capital: "Port Vila", currencyName: "Vanuatu vatu", currencySymbol: "Vt" },
            { name: "Vatican City", code: "VA", currency: "EUR", flag: "🇻🇦", continent: "Europe", phone: "+379", gmaps: "Vatican City", capital: "Vatican City", currencyName: "Euro", currencySymbol: "€" },
            { name: "Venezuela", code: "VE", currency: "VES", flag: "🇻🇪", continent: "South America", phone: "+58", gmaps: "Venezuela", capital: "Caracas", currencyName: "Venezuelan bolívar soberano", currencySymbol: "Bs.S." },
            { name: "Vietnam", code: "VN", currency: "VND", flag: "🇻🇳", continent: "Asia", phone: "+84", gmaps: "Vietnam", capital: "Hanoi", currencyName: "Vietnamese đồng", currencySymbol: "₫" },
            { name: "Yemen", code: "YE", currency: "YER", flag: "🇾🇪", continent: "Asia", phone: "+967", gmaps: "Yemen", capital: "Sana'a", currencyName: "Yemeni rial", currencySymbol: "﷼" },
            { name: "Zambia", code: "ZM", currency: "ZMW", flag: "🇿🇲", continent: "Africa", phone: "+260", gmaps: "Zambia", capital: "Lusaka", currencyName: "Zambian kwacha", currencySymbol: "ZK" },
            { name: "Zimbabwe", code: "ZW", currency: "ZWL", flag: "🇿🇼", continent: "Africa", phone: "+263", gmaps: "Zimbabwe", capital: "Harare", currencyName: "Zimbabwean dollar", currencySymbol: "$" },
        ];

        const countriesContainer = document.getElementById('countries-container');
        const searchInput = document.getElementById('search-input');
        const sortSelect = document.getElementById('sort-select');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');

        const modalFlag = document.getElementById('modal-flag');
        const modalCountryName = document.getElementById('modal-country-name');
        const modalContinent = document.getElementById('modal-continent');
        const modalPhoneCode = document.getElementById('modal-phone-code');
        const modalGmapsLink = document.getElementById('modal-gmaps-link');
        const modalCapital = document.getElementById('modal-capital');
        const modalCurrencyFull = document.getElementById('modal-currency-full');

        // --- 1. Render Countries ---
        function renderCountries(countriesToRender, sortOrder) {
            const isGroupedByContinent = sortOrder === 'continent';

            // Group countries
            const groupedCountries = countriesToRender.reduce((acc, country) => {
                let firstLetter;
                if (isGroupedByContinent) {
                    firstLetter = country.continent;
                } else {
                    firstLetter = country.name[0].toUpperCase();
                }

                if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                }
                acc[firstLetter].push(country);
                return acc;
            }, {});

            // Clear the container
            countriesContainer.innerHTML = '';

            if (countriesToRender.length === 0) {
                countriesContainer.innerHTML = `<p class="no-results">No countries found.</p>`;
                return;
            }

            // Create and append the HTML for each letter group
            Object.keys(groupedCountries).sort().forEach(letter => {
                const section = document.createElement('div');
                section.innerHTML = `<h2>${letter}</h2>`;

                const grid = document.createElement('div');
                grid.className = 'country-grid';

                groupedCountries[letter].forEach(country => {
                    const card = document.createElement('div');
                    card.className = 'country-card';
                    // Store the index to easily retrieve full data later
                    card.dataset.countryIndex = countriesData.findIndex(c => c.code === country.code);

                    card.innerHTML = `
                        <span class="flag-container">${country.flag}</span>
                        <div class="country-info">
                            <p class="country-name">${country.name}</p>
                            <div class="country-details">
                                <span class="country-code">${country.code}</span>
                                <span class="country-currency">${country.currency}</span>
                            </div>
                        </div>
                    `;
                    grid.appendChild(card);
                });

                section.appendChild(grid);
                countriesContainer.appendChild(section);
            });

            // Parse all the new emojis
            twemoji.parse(countriesContainer, { folder: 'svg', ext: '.svg' });
        }

        // --- 2. Modal Logic ---
        countriesContainer.addEventListener('click', function (event) {
            const card = event.target.closest('.country-card');
            if (!card) return;

            const countryIndex = card.dataset.countryIndex;
            const country = countriesData[countryIndex];

            modalFlag.innerHTML = country.flag;
            twemoji.parse(modalFlag);
            modalCountryName.textContent = country.name;
            modalContinent.textContent = country.continent;
            modalPhoneCode.textContent = country.phone;
            modalGmapsLink.href = `https://www.google.com/maps/place/${encodeURIComponent(country.gmaps)}`;
            modalCapital.textContent = country.capital;
            modalCurrencyFull.textContent = `${country.currencyName} (${country.currencySymbol})`;

            modalOverlay.classList.add('active');
        });

        function closeModal() {
            modalOverlay.classList.remove('active');
        }

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', event => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });

        // --- 3. Filter & Sort Logic ---
        function updateDisplay() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortOrder = sortSelect.value;

            // Filter
            let processedCountries = countriesData.filter(country => {
                return (
                    country.name.toLowerCase().includes(searchTerm) ||
                    country.code.toLowerCase().includes(searchTerm) ||
                    country.currency.toLowerCase().includes(searchTerm) ||
                    country.phone.includes(searchTerm) // Search by phone code
                );
            });

            // Sort
            if (sortOrder === 'name-asc') {
                processedCountries.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOrder === 'name-desc') {
                processedCountries.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sortOrder === 'continent') {
                processedCountries.sort((a, b) => a.continent.localeCompare(b.continent) || a.name.localeCompare(b.name));
            }

            renderCountries(processedCountries, sortOrder);
        }

        // Event Listeners
        searchInput.addEventListener('input', updateDisplay);
        sortSelect.addEventListener('change', updateDisplay);

        // --- Initial Render ---
        updateDisplay();
    });
</script>