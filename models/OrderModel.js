import { Orders, Items, Customers } from '../db/DB.js';

export function getAllOrders() {
    return Orders;
}

export function saveOrder(order) {
    Orders.push(order);
    return true;
}

export function generateOrderId() {
    if (!Orders || Orders.length === 0) return "O001";
    
    const lastOrder = Orders[Orders.length - 1];
    const lastId = lastOrder.id; 
    
    const lastNum = parseInt(lastId.substring(1));
    return "O" + String(lastNum + 1).padStart(3, "0");
}

export function updateItemQty(itemId, qty) {
    const item = Items.find(i => i.itemId === itemId);
    if (item) {
        item.itemQty -= qty;
        return true;
    }
    return false;
}

export function searchCustomer(id) {
    return Customers.find(c => c.custId === id) || null;
}

export function searchItem(code) {
    return Items.find(i => i.itemId === code) || null;
}