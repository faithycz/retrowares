// Form validation
$("#productForm").submit(function (e) {
  e.preventDefault();

  const product = {
    productName: $("#productName").val(),
    productDesc: $("#productDesc").val(),
    productType: $("#productType").val(),
    productPrice: $("#productPrice").val(),
  };

  const requiredFields = [
    "productName",
    "productDesc",
    "productType",
    "productPrice",
  ];
  let allFilled = requiredFields.every(
    (id) => document.getElementById(id).value.trim() !== "",
  );

  if (allFilled) {
    $.ajax({
      url: "https://ist411.up.ist.psu.edu:3001/product",
      method: "POST", // Create
      data: JSON.stringify(product),
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

function readProducts() {
  const productId = $("#readProductId").val();

  $.ajax({
    url: `https://ist411.up.ist.psu.edu:3001/product/${productId}`,
    method: "GET", // Read
  })
    .done(function (data) {
      console.log("Success:", data);

      $("#getProducts").html(`
        <div class="p-2 border mb-2">
          <b>Product Name:</b> ${data.productName}<br>
          <b>Product Description:</b> ${data.productDesc}<br>
          <b>Product Type:</b> ${data.productType}<br>
          <b>Product Price:</b> ${data.productPrice}
        </div>
        `);
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
}

const products = [
  {
    id: 1,
    name: "Original iPod Mini",
    price: 30.99,
  },
  {
    id: 2,
    name: "Game Boy Advance",
    price: 130.99,
  },
  {
    id: 3,
    name: "Original Tamagotchi",
    price: 30.99,
  },
  {
    id: 4,
    name: "Silver Nokia 3310",
    price: 50.99,
  },
  {
    id: 5,
    name: "Blueberry iMac G3",
    price: 200.99,
  },
  {
    id: 6,
    name: "Panasonic Shockwave",
    price: 60.0,
  },
];

function loadProducts() {
  const $row = $('<div class="row"></div>');
  products.forEach((p) => {
    $row.append(`
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">$${p.price.toFixed(2)}</p>
            <div class="text-end">
            <button class="btn btn-primary" onclick="addToCart(${p.id})">
              <i class="bi bi-cart2"></i>
            </button>
            </div>
          </div>
        </div>
      </div>`);
  });
  $("#product-list").append($row);
}

$(document).ready(function () {
  loadProducts();
});
