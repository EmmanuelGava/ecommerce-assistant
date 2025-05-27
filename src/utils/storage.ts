export function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
} 