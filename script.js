function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  if (product.badge_text) {
    const badgeButton = document.createElement("div");
    badgeButton.className = "badge";
    badgeButton.textContent = product.badge_text;
    card.appendChild(badgeButton);
  }

  const image = document.createElement("img");
  image.src = product.image;
  card.appendChild(image);

  const titleVendorContainer = document.createElement("div");
  titleVendorContainer.className = "titlevendor";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = product.title.slice(0, 10);
  titleVendorContainer.appendChild(title);

  const vendor = document.createElement("div");
  vendor.innerHTML = `&bull; ${product.vendor}`;
  titleVendorContainer.appendChild(vendor);

  card.appendChild(titleVendorContainer);

  const details = document.createElement("div");
  details.className = "card-details";

  const priceContainer = document.createElement("div");
  priceContainer.className = "price";

  const price = document.createElement("div");
  price.className = "price";
  price.textContent = `Rs: ${product.price}`;
  priceContainer.appendChild(price);
  details.appendChild(priceContainer);

  if (product.compare_at_price) {
    const comparePrice = document.createElement("div");
    comparePrice.className = "compare-price";
    comparePrice.textContent = `${product.compare_at_price}.00`;
    details.appendChild(comparePrice);

    const percentOff = document.createElement("div");
    percentOff.className = "percent-off";
    const percent = Math.round(
      ((product.compare_at_price - product.price) / product.compare_at_price) *
        100
    );
    percentOff.textContent = `${percent}% off`;
    details.appendChild(percentOff);
  }

  card.appendChild(details);
  const addToCart = document.createElement("button");
  addToCart.className = "add-to-cart";
  addToCart.textContent = "Add to Cart";
  card.appendChild(addToCart);

  return card;
}

function showProducts(category) {
  document.getElementById("menProducts").style.display = "none";
  document.getElementById("womenProducts").style.display = "none";
  document.getElementById("kidsProducts").style.display = "none";

  document.getElementById(`${category.toLowerCase()}Products`).style.display =
    "flex";
}

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => response.json())
  .then((data) => {
    const menProductsContainer = document.getElementById("menProducts");
    data.categories[0].category_products.forEach((product) => {
      const card = createProductCard(product);
      menProductsContainer.appendChild(card);
    });

    const womenProductsContainer = document.getElementById("womenProducts");
    data.categories[1].category_products.forEach((product) => {
      const card = createProductCard(product);
      womenProductsContainer.appendChild(card);
    });

    const kidsProductsContainer = document.getElementById("kidsProducts");
    data.categories[2].category_products.forEach((product) => {
      const card = createProductCard(product);
      kidsProductsContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
