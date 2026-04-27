import { getAllCustomers } from '../models/CustomerModel.js';
import { getAllItems } from '../models/ItemModel.js';
import { getAllOrders } from '../models/OrderModel.js';

export function updateDashboardCounts() {
    const customerCount = getAllCustomers().length;
    const itemCount = getAllItems().length;
    const orderCount = getAllOrders().length;

    $('.customer-box .box-value').text(customerCount);
    $('.item-box .box-value').text(itemCount);
    $('.order-box .box-value').text(orderCount);
}

export function navigateToSection(sectionId) {
    const sections = ["home_section", "customer_section", "item_section", "order_section"];

    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = (id === sectionId) ? "block" : "none";
        }
    });

    if (sectionId === "home_section") {
        updateDashboardCounts();
    }
}

window.navigateToSection = navigateToSection;

window.addEventListener("load", () => {
    const hash = window.location.hash.substring(1) || 'home_section';
    navigateToSection(hash);
    updateDashboardCounts();
});

window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToSection(hash);
    }
});

document.querySelectorAll(".navBar a").forEach(link => {
    link.addEventListener("click", function(event) {
        const targetHash = this.getAttribute("href");
        if (targetHash && targetHash.startsWith("#")) {
            window.location.hash = targetHash;
        }
    });
});