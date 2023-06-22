$(document).ready(function () {
  generateNextOrderId();
})
fillCurrentDate();


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



$("#btnCart").click(function () {
addItemsToTable();
})

function addItemsToTable() {
    let oderId =$("#OderId").val();
    let date = $("#OderDate").val();
    let cusId = $("#OderCusId").val();
    let cusname = $("#OderCusName").val();
    let itemCode = $('#OderItemCode').val();
    let description = $('#OderDec').val();
    let unitPrice = parseFloat($('#unitPrice').val());
    let quantity = parseInt($('#OderQty').val());
    let qtyOnHand = $("#QtyOnHand").val();

    // Check if the quantity is available
    let item = itemDb.find(i => i.itemId === itemCode);
    if (item && quantity <= item.itemQty) {
        let total = unitPrice * quantity;

        // Check if the item already exists in the table
        let existingItem = placeOderDB.find(i => i.OdItemId === itemCode);
        if (existingItem) {
            existingItem.oderQty += quantity;
            existingItem.total += total;
        } else {
            placeOderDB.push({
                OderId: oderId,
                OdDate: date,
                odCusId: cusId,
                odCusName: cusname,
                OdItemId: itemCode,
                OdItemName: description,
                OdItemPrice: unitPrice,
                OdItemQty: qtyOnHand,
                oderQty: quantity,
                total: total
            });
        }

        // Update the table
        updateTable();
        calculateTotal();
    } else {
        alert('Insufficient quantity!');

    }
}
function updateTable() {
    $("#cartTBody").empty();
    for (let oder of placeOderDB) {
        let row = `<tr>
<td>${oder.OderId}</td>
<td>${oder.OdItemId}</td>
<td>${oder.OdItemName}</td>
<td>${oder.oderQty}</td>
<td>${oder.OdItemPrice.toFixed(2)}</td>
<td>${oder.total.toFixed(2)}</td>
</tr>`;
        $("#cartTBody").append(row);

    }
}
function calculateTotal() {
    let total = 0;
    for (let item of placeOderDB) {
        total += item.total;
    }
    $('#total').val(total.toFixed(2));
    $('#subTotal').val(total.toFixed(2));

}
/*let disTOGave=0;
$('#discount').on('keyup',function (){
    let dis=$('#discount').val();
    let tot=$('#total').val();
    var totMin=0;
    let subTot=0;

    console.log(dis+"=="+tot);
    totMin=parseFloat(tot)*(dis/100);
    console.log("dis Dis: "+totMin)

    subTot=tot-totMin;
    disTOGave=totMin;

    $('#subTotal').val(subTot);
    balance();

});
$("#cash").on("keydown", function() {
    var cashValue = parseFloat($(this).val());
    var subtotalValue = parseFloat($("#subTotal").val());
    if (cashValue !== "" && cashValue < subtotalValue) {
        $("#cash").css("border", "2px solid red");
        $("#lblCash").text("Insufficient credit");
    } else {
        $("#cash").css("border", "");
        $("#lblCash").text("");
    }
    $('#balance').val(cashValue - subtotalValue);});*/

let disTOGave = 0;

$('#discount').on('keyup', function() {
    let dis = parseFloat($('#discount').val());
    let tot = parseFloat($('#total').val());

    console.log(dis + "==" + tot);

    let totMin = tot * (dis / 100);
    console.log("Discount Amount: " + totMin);

    let subTot = tot - totMin;
    disTOGave = totMin;

    $('#subTotal').val(subTot);
    updateBalance();
});

$("#cash").on("keyup", function() {
    var cashValue = parseFloat($(this).val());
    var subtotalValue = parseFloat($("#subTotal").val());

    if (isNaN(cashValue) || cashValue > subtotalValue) {
        $("#cash").css("border", "2px solid red");
        $("#lblCash").text("Insufficient credit");
    } else {
        $("#cash").css("border", "");
        $("#lblCash").text("");
    }

    updateBalance();
});

function updateBalance() {
    var cashValue = parseFloat($("#cash").val());
    var subtotalValue = parseFloat($("#subTotal").val());

    var balance = cashValue - (subtotalValue - disTOGave);
    $('#balance').val(balance.toFixed(2));
}
function clearAll() {
    $("#OderDate").val("");
    $("#OderCusId").val("");
    $("#OderCusName").val("");
    $("#OderItemCode").val("");
    $("#OderDec").val("");
    $("#unitPrice").val("");
    $("#OderQty").val("");
    $("#QtyOnHand").val("");
    $("#balance").val("");
    $("#subTotal").val("");
    $("#total").val("");
    $("#discount").val("");
    $("#cash").val("");
    $("#cash").css("border" ,"");
    $("#lblCash").val("");
}

$("#placeOder").click(function () {
    let oderId =  $("#OderId").val();
    let cusName = $("#OderCusName").val();
    let date = $("#OderDate").val();
    let discount = $("#discount").val();
    let cost = $("#subTotal").val();

    placeOderDB2.push({
        OdId: oderId,
        oderCusName: cusName,
        OdDate: date,
        discount: discount,
        odCost: cost
    });

    clearAll();
    clearTable();
     generateNextOrderId();
    loadAllOderId();
});

function clearTable() {
    $("#cartTBody").empty();
}
function generateNextOrderId() {
    let existingOrderIds = placeOderDB2.map(function(order) {
        return order.OdId;
    });

    let maxId = existingOrderIds.reduce(function(max, orderId) {
        let orderIdNumber = parseInt(orderId.split('-')[1]);
        return orderIdNumber > max ? orderIdNumber : max;
    }, 0);

    let nextIdNumber = maxId + 1;
    let nextId = 'ODI-' + nextIdNumber.toString().padStart(3, '0');

    $("#OderId").val(nextId);
    placeOderObj.OdId = nextId; // Update the OdId in placeOderObj
}






