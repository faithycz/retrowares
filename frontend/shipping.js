// Form validation
$("#shippingForm").submit(function (e) {
  e.preventDefault();

  const shipment = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    address1: $("#address1").val(),
    address2: $("#address2").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zipCode: $("#zipCode").val(),
    carrier: $("#carrier").val(),
    method: $("#method").val(),
  };

  const requiredFields = [
    "firstName",
    "lastName",
    "address1",
    "city",
    "state",
    "zipCode",
    "carrier",
    "method",
  ];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/shipping",
      method: "POST", // Create
      data: JSON.stringify(shipment),
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
