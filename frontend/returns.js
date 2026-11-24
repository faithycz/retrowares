// Form validation
$("#returnsForm").submit(function (e) {
  e.preventDefault();

  const returns = {
    fullName: $("#fullName").val(),
    email: $("#email").val(),
    returnProduct: $("#returnProduct").val(),
    returnReason: $("#returnReason").val(),
  };

  const requiredFields = ["fullName", "email", "returnProduct", "returnReason"];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/returns",
      method: "POST", // Create
      data: JSON.stringify(returns),
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
