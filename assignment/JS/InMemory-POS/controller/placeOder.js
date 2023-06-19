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
            let name = $("#OderCusName").val(cus.name);
        }
    }
}
function searchItem(code) {
    for (let item of itemDb){
        if(item.itemId==code){
            let dec=$("#OderDec").val(item.itemName);
            let unitPrice=$("#unitPrice").val(item.itemPrice);
            let qtonhand=$("#QtyOnHand").val(item.itemQty);

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