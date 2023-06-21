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
fillCurrentDate();
let OdId = generateOrderId();
$("#OderId").val(OdId);
/*$("#OrderQty").on('input', function () {
    let unitPrice = parseFloat($("#unitPrice").val());
    let qty = parseFloat($("#OrderQty").val());
    let total = unitPrice * qty;
    $("#total").text(total.toFixed(2)); // Display the total in the separate element
});*/
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
        if (item) {
            $("#OderDec").val(item.itemName);
            $("#unitPrice").val(item.itemPrice);
            $("#QtyOnHand").val(item.itemQty);
        } else {
            // Clear the values if no item is found
            $("#OderDec").val("");
            $("#unitPrice").val("");
            $("#QtyOnHand").val("");
        }
    });

function fillCurrentDate() {
    let currentDate = new Date().toISOString().split('T')[0];
    $('#OderDate').val(currentDate);

}
generateOrderId();
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
/*/!*function addToCart() {
    let oderId=$("#OderId").val();
    let date=$("#OderDate").val();
    let cusId=$("#OderCusId").val();
    let cusname=$("#OderCusName").val();
    let itemid=$("#OderItemCode").val();
    let itemName=$("#OderDec").val();
    let unitPrice=$("#unitPrice").val();
    let qtyOnHand=$("#QtyOnHand").val();
    let qty=$("#OderQty").val();
    let total=unitPrice*qty;
    let total1=$("#total").val(total);
    let newOder = Object.assign({}, cartObj);
    newOder.OderId = oderId;
    newOder.OdDate = date;
    newOder.odCusId = cusId;
    newOder.odCusName = cusname;
    newOder.OdItemId=itemid;
    newOder.OdItemName=itemName;
    newOder.OdItemPrice=unitPrice;
    newOder.OdItemQty=qtyOnHand;
    newOder.oderQty=qty;
    newOder.total=total1;
    placeOderDB.push(newOder);*!/
    loadcartData();
/!*if( placeOderDB.push(newOder)){
    for( let oder of placeOderDB){
        let row=`<tr>
<td>${oder.OderId}</td>
<td>${oder.OdItemId}</td>
<td>${oder.OdItemName}</td>
<td>${oder.OdItemPrice}</td>
<td>${oder.oderQty}</td>
<td>${oder.total}</td>
</tr>`;
        $("#cartTBody").append(row);
    }
}else {
    alert("not adde")
}*!/

}*/
function addToCart() {
    let oderId = $("#OderId").val();
    let date = $("#OderDate").val();
    let cusId = $("#OderCusId").val();
    let cusname = $("#OderCusName").val();
    let itemid = $("#OderItemCode").val();
    let itemName = $("#OderDec").val();
    let unitPrice = $("#unitPrice").val();
    let qtyOnHand = $("#QtyOnHand").val();
    let qty = $("#OderQty").val();
    let total = unitPrice * qty;
$("#total").val(total);

    let existingOder = placeOderDB.find(oder => oder.OdItemId === itemid);
    if (existingOder) {
        existingOder.oderQty = parseInt(existingOder.oderQty) + parseInt(qty);
        existingOder.total = parseFloat(existingOder.total) + parseFloat(total);
        $("#total").val(existingOder.total);

    }else {
        let newOder = {
            OderId: oderId,
            OdDate: date,
            odCusId: cusId,
            odCusName: cusname,
            OdItemId: itemid,
            OdItemName: itemName,
            OdItemPrice: unitPrice,
            OdItemQty: qtyOnHand,
            oderQty: qty,
            total: total
        };
        placeOderDB.push(newOder);
    }

    loadcartData();
}

$("#btnCart").click(function () {
addToCart();

})
function loadcartData() {
    $("#cartTBody").empty();
    for (let oder of placeOderDB) {
        let row = `<tr>
<td>${oder.OderId}</td>
<td>${oder.OdItemId}</td>
<td>${oder.OdItemName}</td>
<td>${oder.OdItemPrice}</td>
<td>${oder.oderQty}</td>
<td>${oder.total}</td>
</tr>`;
        $("#cartTBody").append(row);

    }
}
