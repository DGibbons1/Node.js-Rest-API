// Require DB connection
const sql = require("./db.js");

class Customer {
  // Constructor
  constructor(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
  }

  // Create method
  static create(newCustomer, result) {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  }

  // Find By ID Method
  static findById(customerId, result) {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
      // Customer ID was not found in the database
      result({ kind: "not_found" }, null);
    });
  }

  // Get all method
  static getAll(result) {
    console.log("Test location");
    sql.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("customers: ", res);
      result(null, res);
    });
  }

  // Update by ID method
  static updateById(id, customer, result) {
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?", [customer.email, customer.name, customer.active, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // Customer ID was not found in the database
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    });
  }

  // Remove method
  static remove(id, result) {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // Customer ID was not found in the database
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  }

  // Remove All method
  static removeAll(result) {
    sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  }
}

// Export Customer
module.exports = Customer;