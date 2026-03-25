export function timeAgo(date: Date | string | number): string {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = Math.floor((now - past) / 1000); // seconds

    if (diff < 60) {
        return `${diff}s ago`;
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days}d ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months}m ago`;
    }

    const years = Math.floor(months / 12);
    return `${years}y ago`;
}
