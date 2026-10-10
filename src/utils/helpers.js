export function createId() {
  return Date.now().toString() + Math.random().toString(16).substring(2);
}

export const LOW_STOCK_LIMIT = 2;

export function isLowStock(book) {
  return Number(book.quantity) < LOW_STOCK_LIMIT;
}
