

export function formatDate( dateDB ) {
    const date = new Date(dateDB);
    return date.toLocaleString();
}