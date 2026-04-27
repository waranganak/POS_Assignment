import { Items } from '../db/DB.js';

export function getAllItems() {
    return Items;
}

export function saveItem(item) {
    if (Items.some(i => i.itemId === item.itemId)) return false;
    Items.push(item);
    return true;
}

export function findItem(code) {
    return Items.find(i => i.itemId === code) || null;
}

export function updateItem(item) {
    const index = Items.findIndex(i => i.itemId === item.itemId);
    if (index !== -1) {
        Items[index] = item;
        return true;
    }
    return false;
}

export function deleteItem(code) {
    const index = Items.findIndex(i => i.itemId === code);
    if (index !== -1) {
        Items.splice(index, 1);
        return true;
    }
    return false;
}

export function generateItemCode() {
    if (Items.length === 0) return "I001";
    const lastItem = Items[Items.length - 1].itemId;
    const lastNum = parseInt(lastItem.substring(1));
    return "I" + String(lastNum + 1).padStart(3, "0");
}