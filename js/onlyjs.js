function calPositionSize() {
    "use strict"

    let max_loss_rupees
        , stoploss_price
        , entry_price
        , finalPositionSize
        , position
        , shares = 1
        , loss = 0;

    max_loss_rupees = document.getElementById("maxlossrupees").value;
    stoploss_price = document.getElementById('stoplossprice').value;
    entry_price = document.getElementById('entryprice').value;
    // if (document.getElementById("long").checked)
    //     position = "L";
    // else if (document.getElementById("short").checked)
    //     position = "S";

    position = document.getElementById("position").value;

    // let tax = calTotalTax(400, entry_price, stoploss_price, position);
    // alert(tax);

    let riskpershare = Math.abs(entry_price - stoploss_price);
    for (shares = 1; loss <= max_loss_rupees; shares++) {
        let tempTax = calTotalTax(shares, entry_price, stoploss_price, position);
        loss = tempTax + (riskpershare * shares);
        // alert("temptax" + tempTax + " | " + "Shares:" + shares + " | " + "loss: " + loss);
    }

    finalPositionSize = shares - 2;

    //alert("entry_price");
    // document.getElementById("maxlossrupees1").innerHTML = max_loss_rupees;
    // document.getElementById("stoplossprice1").innerHTML = stoploss_price;
    // document.getElementById("entryprice1").innerHTML = entry_price;

    //finalPositionSize = "Jai Mata Di";
    //The position size is
    document.getElementById("finalPositionSize").innerHTML = finalPositionSize;
}


function calTotalTax(shares, entry_price, exit_price, position) {
    let turnover, brokerage, stt, exchange_transaction_charges, gst, stamp_duty, sebi_charges, totalTax;

    /*
    alert("Shares:" + shares + "|" + "Entry Price:" + entry_price + "|"
        + "Exit Price:" + exit_price + "|" + "Position:" + position);
    */

    turnover = shares * (parseFloat(entry_price) + parseFloat(exit_price));

    if (turnover * 0.0003 < 40)
        brokerage = turnover * 0.0003;
    else
        brokerage = 40;

    exchange_transaction_charges = 0.0000325 * turnover;

    gst = 0.18 * (exchange_transaction_charges + brokerage);

    sebi_charges = 0.000001 * turnover;
    stamp_duty = 0.00003 * entry_price * shares;

    if (position == "L")
        stt = 0.00025 * shares * exit_price;
    else
        stt = 0.00025 * shares * entry_price;

    if (stt >= 0.5)
        stt = Math.round(stt);

    // alert("Turnover:" + turnover + "|" + "Brokerage:" + brokerage + "|" + "Exc Txn Charges:"
    //     + exchange_transaction_charges + "|" + "GST:" + gst + "|"
    //     + "Sebi:" + sebi_charges + "|" + "Stamp Duty:" + stamp_duty + "|" + "STT" + stt);

    totalTax = brokerage + exchange_transaction_charges + gst + sebi_charges + stt + stamp_duty;

    return totalTax;
}