// Form validation
$("#loginForm").submit(function (e) {
  e.preventDefault();

  const login = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  const requiredFields = ["email", "password"];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/userlogin",
      method: "POST", // Create
      data: JSON.stringify(login),
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
  $.ajax({
    url: "https://ist411.up.ist.psu.edu:3001/userlogin",
    method: "GET", // Read
  })
    .done(function (data) {
      console.log("Success:", data);

      let users = "";

      data.forEach((user) => {
        users += `
        <div class="p-2 border mb-2">
          <b>Email:</b> ${user.email}<br>
          <b>Password:</b> ${user.password}
        </div>
        `;
      });

      $("#getUsers").html(users);
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
}
