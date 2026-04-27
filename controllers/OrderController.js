import * as OrderModel from '../models/OrderModel.js';
import * as CustomerModel from '../models/CustomerModel.js';
import * as ItemModel from '../models/ItemModel.js';

let dashboardUpdaterOrder = {
    updateOrdersCount: function(count) {
        $('.order-box .box-value').text(count);
    }
};

$(document).ready(function () {
    let totalAmount = 0;
    let orderItems = [];
    let orders = [];

    function init() {
        generateOrderId();
        loadCustomers();
        loadItems();
        dashboardUpdaterOrder.updateOrdersCount(OrderModel.getAllOrders().length);
    }
    init();

    function loadCustomers() {
        let cmb = $('#select-customer');
        cmb.empty().append('<option value="">Select Customer</option>');
        
        let customers = CustomerModel.getAllCustomers();
        customers.forEach(customer => {
            cmb.append(`<option value="${customer.custId}">${customer.custId} - ${customer.custName}</option>`);
        });
    }

    function loadItems() {
        let cmb = $('#select-item');
        cmb.empty().append('<option value="">Select Item</option>');
        
        let items = ItemModel.getAllItems();
        items.forEach(item => {
            cmb.append(`<option value="${item.itemId}">${item.itemId} - ${item.itemName}</option>`);
        });
    }

    $("#select-customer").on("change", function () {
        let id = $(this).val();
        if (id) {
            const customer = CustomerModel.findCustomer(id);
            if (customer) {
                $("#Oreder_customerID").val(customer.custId);
                $("#oreder_customerName").val(customer.custName);
                $("#order_customerSalary").val(customer.custSalary);
                $("#order_customerAddress").val(customer.custAddress);
            }
        } else {
            clearCustomerFields();
        }
    });

    $("#select-item").on("change", function () {
        let code = $(this).val();
        if (code) {
            let item = ItemModel.findItem(code);
            if (item) {
                $("#order_itemCode").val(item.itemId);
                $("#order_itemName").val(item.itemName);
                $("#order_qtyOnHand").val(item.itemQty);
                $("#order_itemPrice").val(item.itemPrice);
            }
        } else {
            clearItemFields();
        }
    });

    $("#addItemBtn").on("click", function () {
        const itemCode = $("#order_itemCode").val();
        const itemName = $("#order_itemName").val();
        const itemPrice = parseFloat($("#order_itemPrice").val());
        const qtyOnHand = parseInt($("#order_qtyOnHand").val());
        const orderQty = parseInt($("#orderQuantity").val()); 

        if (!itemCode || isNaN(orderQty) || orderQty <= 0) {
            alert("Please select item and enter valid quantity!");
            return;
        }

        if (orderQty > qtyOnHand) {
            alert("Insufficient stock!");
            return;
        }

        let existingItem = orderItems.find(i => i.code === itemCode);
        if (existingItem) {
            if ((existingItem.qty + orderQty) > qtyOnHand) {
                alert("Total quantity exceeds stock!");
                return;
            }
            existingItem.qty += orderQty;
            existingItem.total = existingItem.qty * itemPrice;
        } else {
            orderItems.push({
                code: itemCode,
                name: itemName,
                price: itemPrice,
                qty: orderQty,
                total: itemPrice * orderQty
            });
        }

        refreshTable();
        clearItemFields();
    });

    function refreshTable() {
        let tbody = $("#orderTableBody");
        tbody.empty();
        totalAmount = 0;

        orderItems.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.qty}</td>
                    <td>${item.total.toFixed(2)}</td>
                </tr>
            `);
            totalAmount += item.total;
        });

        $("#total").text(totalAmount.toFixed(2));
        calculateSubtotalAndBalance();
    }

    function calculateSubtotalAndBalance() {
        const discount = parseFloat($("#discount").val()) || 0;
        const cash = parseFloat($("#cash").val()) || 0;
        const subtotal = totalAmount - (totalAmount * discount / 100);
        const balance = cash - subtotal;

        $("#subtotal").text(subtotal.toFixed(2));
        $("#balance").val(balance.toFixed(2));
    }

    $("#cash, #discount").on("input", calculateSubtotalAndBalance);

    $("#purchaseBtn").on("click", function () {
        if (orderItems.length === 0) {
            alert("Add items first!");
            return;
        }

        const order = {
            id: $("#orderID").val(),
            date: new Date().toISOString().split('T')[0],
            customerID: $("#Oreder_customerID").val(),
            items: orderItems,
            total: totalAmount
        };

        if (OrderModel.saveOrder(order)) {
            alert("Order Placed!");
            clearForm();
            init();
        }
    });

    function generateOrderId() {
        $("#orderID").val(OrderModel.generateOrderId());
    }

    function clearCustomerFields() {
        $("#Oreder_customerID, #oreder_customerName, #order_customerSalary, #order_customerAddress").val("");
    }

    function clearItemFields() {
        $("#order_itemCode, #order_itemName, #order_qtyOnHand, #order_itemPrice, #orderQuantity").val("");
    }

    function clearForm() {
        clearCustomerFields();
        clearItemFields();
        orderItems = [];
        refreshTable();
        $("#cash, #discount, #balance").val("");
    }
});