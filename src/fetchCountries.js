export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then(
            response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
}