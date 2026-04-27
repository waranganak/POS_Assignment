import { Customers } from '../db/DB.js';

export function getAllCustomers() {
    return Customers;
}

export function saveCustomer(customer) {
    if (Customers.some(c => c.custId === customer.custId)) return false;
    Customers.push(customer);
    return true;
}

export function findCustomer(id) {
    return Customers.find(c => c.custId === id) || null;
}

export function updateCustomer(customer) {
    const index = Customers.findIndex(c => c.custId === customer.custId);
    if (index !== -1) {
        Customers[index] = customer;
        return true;
    }
    return false;
}

export function deleteCustomer(id) {
    const index = Customers.findIndex(c => c.custId === id);
    if (index !== -1) {
        Customers.splice(index, 1);
        return true;
    }
    return false;
}

export function generateCustomerId() {
    if (Customers.length === 0) return "C001";
    const lastId = Customers[Customers.length - 1].custId;
    const lastNum = parseInt(lastId.substring(1));
    return "C" + String(lastNum + 1).padStart(3, "0");
}