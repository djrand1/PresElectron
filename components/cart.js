var cartProducts = [];
var cart = [];
function addProduct() {
   var productIMG = document.getElementById("product-img").value;
   var price = document.getElementById("price").value;

   var newProduct = {
       product-img: null,
       product_price: 0.00,
   };

   newProduct.product-img = productIMG;
   newProduct.product_price = price;

   cartProducts.push(newProduct);

   var html = "<table border='1|1' >";
   html += "<td>Product IMG</td>";
   html += "<td>Price</td>";
   for (var i = 0; i < products.length; i++) {
       html += "<tr>";
       html += "<td>" + products[i].product-img + "</td>";
       html += "<td>" + products[i].product_price + "</td>";
       html += "</tr>";
   }
   html += "</table>";
   document.getElementById("demo").innerHTML = html;
}

function renderCartTable() {
   var html = '';
   var ele = document.getElementById("demo2");
   ele.innerHTML = '';

   html += "<table id='tblCart' border='1|1'>";
   html += "<tr><td>Product IMG</td>";
   html += "<td>Price</td>";
   html += "<td>Total</td></tr>";
   var GrandTotal = 0;
   for (var i = 0; i < cart.length; i++) {
       html += "<tr>";
       html += "<td>" + cart[i].product.product_id + "</td>";
       html += "<td>" + cart[i].product.product-img + "</td>";
       html += "<td>" + cart[i].product.product_price + "</td>";
       html += "<td>" + parseFloat(cart[i].product.product_price) + "</td>";
       html += "</tr>";

       GrandTotal += parseFloat(cart[i].product.product_price);

   }
   document.getElementById('demo3').innerHTML = GrandTotal;
   html += "</table>";
   ele.innerHTML = html;
}
