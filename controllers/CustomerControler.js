import * as CustomerModel from '../models/CustomerModel.js';

let dashboardUpdater = {
     updateCustomerCount: function(count) {
          $('.customer-box .box-value').text(count);
    }
};

$(document).ready(function () {
    generateCustomerId();
    dashboardUpdater.updateCustomerCount(CustomerModel.getAllCustomers().length);

    $("#saveCustomer").on("click", handleSaveCustomer);
    $("#removeCustomer").on("click", handleRemoveCustomer);
    $("#updateCustomer").on("click", handleUpdateCustomer);
    $("#getAllCustomers").on("click", loadAllCustomers);
    $("#clearCustomerForm").on("click", clearCustomerForm);
    $("#table_body").on("click", "tr", handleCustomerSelection);

    loadAllCustomers();
});

function generateCustomerId() {
    const nextId = CustomerModel.generateCustomerId();
    $("#customerId").val(nextId);
}

function handleSaveCustomer() {
    if (!validateCustomerForm()) return;

    let customer = {
        custId: $("#customerId").val(),
        custName: $("#customerName").val(),
        custAddress: $("#customerAddress").val(),
        custSalary: $("#customerSalary").val()
    };

    if (CustomerModel.saveCustomer(customer)) {
        loadAllCustomers();
        clearCustomerForm();
        generateCustomerId();
        dashboardUpdater.updateCustomerCount(CustomerModel.getAllCustomers().length);
        alert("Customer saved successfully!");
    } else {
        alert("Customer ID already exists.");
    }
}

function loadAllCustomers() {
    const customerTable = $("#table_body");
    customerTable.empty();
    CustomerModel.getAllCustomers().forEach(c => {
        customerTable.append(`<tr><td>${c.custId}</td><td>${c.custName}</td><td>${c.custAddress}</td><td>${c.custSalary}</td></tr>`);
    });
}

function handleRemoveCustomer() {
    let id = $("#customerId").val();
    if (CustomerModel.deleteCustomer(id)) {
        loadAllCustomers();
        clearCustomerForm();
        dashboardUpdater.updateCustomerCount(CustomerModel.getAllCustomers().length);
        alert("Customer Deleted!");
    }
}

function handleUpdateCustomer() {
    let customer = {
        custId: $("#customerId").val(),
        custName: $("#customerName").val(),
        custAddress: $("#customerAddress").val(),
        custSalary: $("#customerSalary").val()
    };
    if (CustomerModel.updateCustomer(customer)) {
        loadAllCustomers();
        alert("Customer Updated!");
    }
}

function handleCustomerSelection() {
    let id = $(this).children(":first").text();
    let customer = CustomerModel.findCustomer(id);
    if (customer) {
        $("#customerId").val(customer.custId);
        $("#customerName").val(customer.custName);
        $("#customerAddress").val(customer.custAddress);
        $("#customerSalary").val(customer.custSalary);
    }
}

function clearCustomerForm() {
    $("#customerId, #customerName, #customerAddress, #customerSalary").val("");
    generateCustomerId();
}

function validateCustomerForm() {
    return $("#customerName").val() && $("#customerAddress").val() && $("#customerSalary").val();
}