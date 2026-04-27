import { getAllCustomers } from './models/CustomerModel.js';
import { getAllItems } from './models/ItemModel.js';
import { getAllOrders } from './models/OrderModel.js';

export function updateDashboardCounts() {
    const customerCount = getAllCustomers().length;
    const itemCount = getAllItems().length;
    const orderCount = getAllOrders().length;

    $('.customer-box .box-value').text(customerCount);
    $('.item-box .box-value').text(itemCount);
    $('.order-box .box-value').text(orderCount);
}

export function toggleSections() {
    const homeSection = document.getElementById("home_section");
    const customerSection = document.getElementById("customer_section");
    const itemSection = document.getElementById("item_section");
    const orderSection = document.getElementById("order_section");

    [homeSection, customerSection, itemSection, orderSection].forEach(section => {
        if (section) section.style.display = "none";
    });

    const hash = window.location.hash || "#home_section";
    const target = document.querySelector(hash);
    
    if (target) {
        target.style.display = "block";
    }

    if (hash === "#home_section") {
        updateDashboardCounts();
    }
}

window.addEventListener("load", () => {
    toggleSections();
    updateDashboardCounts();
});

window.addEventListener("hashchange", toggleSections);

document.querySelectorAll(".navBar a").forEach(link => {
    link.addEventListener("click", function(event) {
        const targetHash = this.getAttribute("href");
        if (targetHash.startsWith("#")) {
            window.location.hash = targetHash;
        }
    });
});