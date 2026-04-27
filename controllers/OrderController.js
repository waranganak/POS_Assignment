import * as OrderModel from '../models/OrderModel.js';

$(document).ready(function () {
    $("#orderID").val(OrderModel.generateOrderId());
    loadCustomers();
    loadItems();

    $("#select-customer").on("change", function() {
        let customer = OrderModel.searchCustomer($(this).val());
        if (customer) {
            $("#oreder_customerName").val(customer.custName);
            $("#order_customerSalary").val(customer.custSalary);
            $("#order_customerAddress").val(customer.custAddress);
        }
    });

    $("#select-item").on("change", function() {
        let item = OrderModel.searchItem($(this).val());
        if (item) {
            $("#order_itemName").val(item.itemName);
            $("#order_itemPrice").val(item.itemPrice);
            $("#order_itemQty").val(item.itemQty);
        }
    });


});

function loadCustomers() {
    let cmb = $('#select-customer').empty().append('<option>Select Customer</option>');
    OrderModel.searchCustomer; 
}

function loadItems() {
    let cmb = $('#select-item').empty().append('<option>Select Item</option>');
}