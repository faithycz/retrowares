// Form validation
$("#managementForm").submit(function (e) {
  e.preventDefault();

  const user = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    age: $("#age").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    streetAddress: $("#streetAddress").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zipCode: $("#zipCode").val(),
  };

  const requiredFields = [
    "firstName",
    "lastName",
    "age",
    "email",
    "phone",
    "streetAddress",
    "city",
    "state",
    "zipCode",
  ];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/usermanagement",
      method: "POST", // Create
      data: JSON.stringify(user),
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

function readUsers() {
  const userId = $("#readUserId").val();

  $.ajax({
    url: `https://ist411.up.ist.psu.edu:3001/usermanagement/${userId}`,
    method: "GET", // Read
  })
    .done(function (data) {
      console.log("Success:", data);

      $("#getUsers").html(`
        <div class="p-2 border mb-2">
          <b>First Name:</b> ${data.firstName}<br>
          <b>Last Name:</b> ${data.lastName}<br>
          <b>Age:</b> ${data.age}<br>
          <b>Email:</b> ${data.email}<br>
          <b>Phone:</b> ${data.phone}<br>
          <b>Street Address:</b> ${data.streetAddress}<br>
          <b>City:</b> ${data.city}<br>
          <b>State:</b> ${data.state}<br>
          <b>Zip Code:</b> ${data.zipCode}
        </div>
        `);
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
}

function updateUsers() {
  const userId = $("#updateUserId").val();

  const userUpdated = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    age: $("#age").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    streetAddress: $("#streetAddress").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zipCode: $("#zipCode").val(),
  };

  $.ajax({
    url: `https://ist411.up.ist.psu.edu:3001/usermanagement/${userId}`,
    method: "PATCH", // Update
    data: JSON.stringify(userUpdated),
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (data) {
      console.log("Success:", data);

      $("#updateUsers").html(`
      <div class="alert alert-success">
        Your profile was updated successfully!
      </div>
    `);
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
}

function deleteUsers() {
  const userId = $("#deleteUserId").val();

  $.ajax({
    url: `https://ist411.up.ist.psu.edu:3001/usermanagement/${userId}`,
    method: "DELETE", // Delete
  })
    .done(function (data) {
      console.log("Success:", data);

      $("#deleteUsers").html(`
      <div class="alert alert-success">
        Your profile was deleted successfully!
      </div>
    `);
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
}
