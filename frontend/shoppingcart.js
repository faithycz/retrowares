let cartProductTotal = 0;

function updateCartTotal() {
  $("#total").text(cartProductTotal.toFixed(2));
}

$(document).on("click", ".add-item", function () {
  const shoppingCart = {
    productName: $(this).data("name"),
    productPrice: $(this).data("price"),
  };

  $.ajax({
    url: "https://ist411.up.ist.psu.edu:3001/shoppingcart",
    method: "POST", // Create
    data: JSON.stringify(shoppingCart),
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (data) {
      console.log("Success:", data);

      $("#cart").append(`
            <li class="list-group-item">
                ${data.productName} - $${data.productPrice}
            </li>
            `);

      cartProductTotal += data.productPrice;
      updateCartTotal();
    })
    .fail(function (jqXHR) {
      console.log("Error: ", jqXHR);
    });
});

const products = [
  {
    name: "Original iPod Mini",
    price: 30.99,
  },
  {
    name: "Game Boy Advance",
    price: 130.99,
  },
  {
    name: "Original Tamagotchi",
    price: 30.99,
  },
  {
    name: "Silver Nokia 3310",
    price: 50.99,
  },
  {
    name: "Blueberry iMac G3",
    price: 200.99,
  },
  {
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
            <button class="btn btn-primary add-item" data-name="${p.name}" data-price="${p.price}">
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

// Form validation
$("#shoppingCartForm").submit(function (e) {
  e.preventDefault();

  if ($("#cart li").length === 0) {
    alert("Please put an item(s) in your cart before continuing.");
    return;
  }

  const successModalAlt = new bootstrap.Modal(
    document.getElementById("successModal"),
  );
  successModalAlt.show();
});
