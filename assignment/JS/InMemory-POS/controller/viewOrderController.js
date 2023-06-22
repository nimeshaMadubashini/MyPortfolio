function loadAllOderId() {
    $("#loadOderId").empty();
    for (let oder of placeOderDB2){
        let id=`<option>${oder.OdId}</option>`;
        $("#loadOderId").append(id);
    }
}
function searchOderDetail(id) {
    // Find the order object that matches the selected ID
    let oder = placeOderDB2.find(ode => ode.OdId == id);

    if (oder) {
        // Set the input values based on the found order object
        $("#id").val(oder.OdId);
        $("#date").val(oder.odDate);
        $("#cusId").val(oder.oderCusName);
        $("#CusName").val(oder.discount);
        $("#dis").val(oder.odCost.toFixed(2));

        // Clear and populate the table with the order data
        $("#odersTBody").empty();
        let row = `<tr>
            <td>${oder.OdId}</td>
            <td>${oder.oderCusName}</td>
            <td>${oder.odDate}</td>
            <td>${oder.discount}</td>
            <td>${oder.odCost.toFixed(2)}</td>
        </tr>`;
        $("#odersTBody").append(row);
    }
}


$("#OdIdSearch").click(function () {
    let id= $("#loadOderId>option").val();
searchOderDetail(id);
})

