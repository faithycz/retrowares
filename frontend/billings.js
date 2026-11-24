// Form validation
$("#billingForm").submit(function (e) {
  e.preventDefault();

  const billing = {
    cardType: $("#cardType").val(),
    cardNum: $("#cardNum").val(),
    expDate: $("#expDate").val(),
    cvv: $("#cvv").val(),
    holderName: $("#holderName").val(),
  };

  const requiredFields = [
    "cardType",
    "cardNum",
    "expDate",
    "cvv",
    "holderName",
  ];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/billings",
      method: "POST", // Create
      data: JSON.stringify(billing),
      dataType: "json",
      contentType: "application/json",
    })
      .done(function (data) {
        console.log("Success:", data);

        const successModalAlt = new bootstrap.Modal(
          document.getElementById("successModal"),
        );
        successModalAlt.show();
      })
      .fail(function (jqXHR) {
        console.log("Error: ", jqXHR);
      });
  } else {
    alert("Please fill out all required fields.");
  }
});
