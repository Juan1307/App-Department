const setItem = (key: string, data: unknown) => localStorage.setItem(key, JSON.stringify(data));
const getItem = (key: string) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
const clearItems = () => localStorage.clear();
const removeItem = (key: string) => localStorage.removeItem(key);

export { setItem, getItem, clearItems, removeItem }