export function formatDate(isoString: Date): string {
    const date = new Date(isoString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' } as const;
    return date.toLocaleDateString('en-GB', options);
}
