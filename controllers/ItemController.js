import * as ItemModel from '../models/ItemModel.js';

let dashboardUpdaterItem = {
    updateItemCount: function(count) {
       $('.item-box .box-value').text(count);
    }
};

$(document).ready(function () {
    generateItemCode();
    dashboardUpdaterItem.updateItemCount(ItemModel.getAllItems().length);

    $("#addItem").on("click", addItem);
    $("#removeItem").on("click", removeItem);
    $("#updateItem").on("click", updateItem);
    $("#item_table_body").on("click", "tr", itemSelection);

    loadAllItem();
});

function generateItemCode() {
    $("#itemCode").val(ItemModel.generateItemCode());
}

function addItem() {
    let item = {
        itemId: $("#itemCode").val(),
        itemName: $("#itemName").val(),
        itemQty: parseInt($("#itemQty").val()),
        itemPrice: parseFloat($("#itemPrice").val())
    };

    if (ItemModel.saveItem(item)) {
        loadAllItem();
        clearItemForm();
        dashboardUpdaterItem.updateItemCount(ItemModel.getAllItems().length);
        alert("Item Saved!");
    }
}

function loadAllItem() {
    let table = $("#item_table_body");
    table.empty();
    ItemModel.getAllItems().forEach(i => {
        table.append(`<tr><td>${i.itemId}</td><td>${i.itemName}</td><td>${i.itemQty}</td><td>${i.itemPrice}</td></tr>`);
    });
}

function removeItem() {
    if (ItemModel.deleteItem($("#itemCode").val())) {
        loadAllItem();
        clearItemForm();
        dashboardUpdaterItem.updateItemCount(ItemModel.getAllItems().length);
    }
}

function updateItem() {
    let item = {
        itemId: $("#itemCode").val(),
        itemName: $("#itemName").val(),
        itemQty: parseInt($("#itemQty").val()),
        itemPrice: parseFloat($("#itemPrice").val())
    };
    ItemModel.updateItem(item);
    loadAllItem();
}

function itemSelection() {
    let code = $(this).children(":first").text();
    let item = ItemModel.findItem(code);
    if (item) {
        $("#itemCode").val(item.itemId);
        $("#itemName").val(item.itemName);
        $("#itemQty").val(item.itemQty);
        $("#itemPrice").val(item.itemPrice);
    }
}

function clearItemForm() {
    $("#itemCode, #itemName, #itemQty, #itemPrice").val("");
    generateItemCode();
}