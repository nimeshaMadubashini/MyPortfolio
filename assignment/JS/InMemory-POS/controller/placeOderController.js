/*
$(document).ready(function () {

    // Generate automatic order ID
    function generateOrderId() {
        let existingOrderIds = []; // Replace with your actual existing order IDs

        let maxId = existingOrderIds.reduce(function (max, orderId) {
            let orderIdNumber = parseInt(orderId.split('-')[1]);
            return orderIdNumber > max ? orderIdNumber : max;
        }, 0);

        let nextIdNumber = maxId + 1;
        let nextId = 'OID-' + nextIdNumber.toString().padStart(3, '0');

        return nextId;
    }
    function fillCurrentDate() {
        let currentDate = new Date().toISOString().split('T')[0];
        $('#OderDate').val(currentDate);
    }
    $('#OderId').val(generateOrderId());
    fillCurrentDate();
});
$("#OderItemCode").on('click',function () {
    $("#OderItemCode").empty();
    for (let item of itemDb){
        let id=`<option>${item.itemId}</option>`;
        $("#OderItemCode").append(id);
    }
});
$("#OderCusId").on('click',function () {
    $("#OderCusId").empty();
    for (let cus of customerDb){
        let id=`<option>${cus.id}</option>`;
        $("#OderCusId").append(id);
    }
});


function searchCus(id) {
    for (let cus of customerDb) {
        if (cus.id == id) {
            return $("#OderCusName").val(cus.name);
        }
    }
}

function searchItem(code) {
    for (let item of itemDb){
        if(item.itemId==code){
            $("#OderDec").val(item.itemName);
            $("#unitPrice").val(item.itemPrice);
           $("#QtyOnHand").val(item.itemQty);
return;
        }
    }
}

$("#OderCusId").keydown(function (e) {
    let id = $("#OderCusId").val();
    searchCus(id);
});
$("#OderItemCode").keydown(function (e) {
    let id = $("#OderItemCode").val();
    searchItem(id);
});

$("#cash").on("input", function() {
    var cashValue = $(this).val();
    var subtotalValue = parseFloat($("#subTotal").val());

    if (cashValue !== "" && parseFloat(cashValue) < subtotalValue) {
        $(this).addClass("is-invalid");
    } else {
        $(this).removeClass("is-invalid");
    }
});
$("#btnCart").click(function () {
    let orderId = $("#OrderId").val();
    let code = $("#OrderItemCode").val();
    let desc = $("#OrderDesc").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#OrderQty").val();
    let total = unitPrice * qty;
    let row = `<tr><td>${orderId}</td><td>${code}</td><td>${desc}</td><td>${unitPrice}</td><td>${qty}</td><td>${total}</td></tr>`;
    $("#cartTBody").append(row);
    console.log(orderId,code,desc,unitPrice,qty,total)
});

$("#OrderQty").on('input', function () {
    let unitPrice = $("#unitPrice").val();
    let qty = $("#OrderQty").val();
    let total = unitPrice * qty;
    $("#total").val(total);
});
*/
function loadAllCusId() {
    $("#OderCusId").empty();
    for (let cus of customerDb){
        let id=`<option>${cus.id}</option>`;
        $("#OderCusId").append(id);
    }
}
$("#OderCusId").on('change',function (){
    let customer=searchCustomer($('#OderCusId').val());
    $("#OderCusName").val(customer.name);
});

function loadAllItemId() {
    $("#OderItemCode").empty();
    for (let item of itemDb){
        let id=`<option>${item.itemId}</option>`;
        $("#OderItemCode").append(id);
    }
}
$("#OderItemCode").on('change',function (){
    let item=searchItem($('#OderItemCode').val());
    $("#OderDec").val(item.itemName);
    $("#unitPrice").val(item.itemPrice);
    $("#QtyOnHand").val(item.itemQty);
});
