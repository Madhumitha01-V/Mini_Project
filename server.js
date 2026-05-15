
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("database.db");

// Create employee table
db.run(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    department TEXT,
    salary INTEGER
)
`);

// Get all employees
app.get("/employees", (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add employee
app.post("/employees", (req, res) => {

    const { name, email, department, salary } = req.body;

    db.run(
        `INSERT INTO employees(name, email, department, salary)
         VALUES (?, ?, ?, ?)`,
        [name, email, department, salary],
        function(err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Employee Added Successfully"
            });
        }
    );
});

// Delete employee
app.delete("/employees/:id", (req, res) => {

    db.run(
        `DELETE FROM employees WHERE id = ?`,
        [req.params.id],
        function(err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Employee Deleted Successfully"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
