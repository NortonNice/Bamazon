var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to mysql database//

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});

//first thing, display all available items//

connection.connect(function (err) {
  if (err) throw err;
  console.log("");
  console.log("~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~")
  console.log("WELCOME TO BLIGIN' AND STRINGIN'");
  console.log("THE ONLINE GUITAR EMPORIUM OF THE STARS")
  console.log("~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~")
  var sql = "SELECT * from products";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("")
    console.log("Available Products: ")
    console.log("")
    console.log("~+~+~+~+~+~+~+~+~")
    console.log("")
    console.log("Item ID: " + result[0].item_id + " - " + result[0].product_name + " - " + result[0].price);
    console.log("Item ID: " + result[1].item_id + " - " + result[1].product_name + " - " + result[1].price);
    console.log("Item ID: " + result[2].item_id + " - " + result[2].product_name + " - " + result[2].price);
    console.log("Item ID: " + result[3].item_id + " - " + result[3].product_name + " - " + result[3].price);
    console.log("Item ID: " + result[4].item_id + " - " + result[4].product_name + " - " + result[4].price);
    console.log("Item ID: " + result[5].item_id + " - " + result[5].product_name + " - " + result[5].price);
    console.log("Item ID: " + result[6].item_id + " - " + result[6].product_name + " - " + result[6].price);
    console.log("Item ID: " + result[7].item_id + " - " + result[7].product_name + " - " + result[7].price);
    console.log("Item ID: " + result[8].item_id + " - " + result[8].product_name + " - " + result[8].price);
    console.log("Item ID: " + result[9].item_id + " - " + result[9].product_name + " - " + result[9].price);
    console.log("")
    console.log("~+~+~+~+~+~+~+~+~")
    console.log("")

    var questions =

      //first prompt: which item would you like to buy?//

      inquirer.prompt([
        {
          message: "What product would you like? Enter Item ID #",
          type: "input",
          name: "product",

        },

        //second prompt: how many of this item would you like to buy?//
        {
          message: "How many of this item would you like?",
          type: "input",
          name: "quantity"
        }
      ]).then(answers => {

        var itemBought = answers.product;
        var numberBought = answers.quantity;
        var choiceDisplay = "SELECT * FROM products WHERE item_id=?"
        connection.query(choiceDisplay, [itemBought],

          function (err, res, fields) {
            if (err) { throw err }

            //app now checks quantity of order vs quantity in stock//

            else if (numberBought > res[0].stock_quantity) {
              console.log("")

              //if not enough stock, notify customer "insufficent quantity" AND prevent order from going through//

              console.log("Dang, those " + res[0].product_name + "'s"
                + " have been selling like hotcakes!")
              console.log("I'm afraid we can't fill that order because we only have " +
                res[0].stock_quantity + " in stock.")
              console.log("We'd be happy to start over and sell you all we have though!")
            }
            else {
              console.log("")

              //app now process the order, returns the total, and politely requests payment//

              console.log("Whoa baby, you have exquisite taste!")
              console.log("Excellent choice. Your total is $" + res[0].price * numberBought + ".")
              console.log("Time to pony up that cash. Fork it over.")
            }
          }
        )
      }

      )
  })
});


















