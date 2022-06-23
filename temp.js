let userdb =
{
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'wpt',
	port: 3306

};


const express = require("express");
const app = express();
const mysql = require("mysql2");
const conn = mysql.createConnection(userdb);
app.use(express.static("abc"));


app.get("/Blur", (req, res) => {

	let data = { status: false, details: [] };
	let input = req.query.input;

	conn.query("select * from book where bookid=?", [input], (err, rows) => {
		if (err) {
			console.log("Data not found");
		}
		else {
			if (rows.length > 0) {
				console.log("Data found");
				data.status = true;
				data.details = rows;
			}
		}
		res.send(data);

	});


});




app.get("/Update", (req, res) => {
	console.log("Update Clicked");

	let data = { status: false, details: [] };
	let input = { bookid: req.query.bookid, bookname: req.query.bookname, price: req.query.price };

	console.log(input);
	conn.query("update book set bookname=?,price=? where bookid=?", [input.bookname, input.price, input.bookid], (err, rows) => {
		if (err) {
			console.log("Data not updated");
		}
		else {
			if (resp.affectedRows > 0) {
				console.log("Data updated");
				data.status = true;
			}
		}
		res.send(data);

	});


});






app.listen(7424, function () {
	console.log("server listening at port 7424...");
});