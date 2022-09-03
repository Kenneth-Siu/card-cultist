export default function generateId(items) {
    return items.length ? 1 + items.reduce((maxId, item) => (item.id > maxId ? item.id : maxId), 0) : 1;
}
