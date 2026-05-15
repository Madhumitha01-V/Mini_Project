
const API = "http://localhost:3000/employees";

// Load employees
async function loadEmployees() {

    const response = await fetch(API);

    const employees = await response.json();

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(employee => {

        table.innerHTML += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>

                <td>
                    <button onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Add employee
async function addEmployee() {

    const employee = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value,

        salary: document.getElementById("salary").value
    };

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)
    });

    loadEmployees();
}

// Delete employee
async function deleteEmployee(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadEmployees();
}

loadEmployees();






