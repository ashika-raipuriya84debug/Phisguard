// ================= LOGIN =================

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {

        alert("Login successful!");

        window.location.href = "dashboard.html";
    }
}


// ================= SIGNUP =================

function signupUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword)
        alert("Passwords do not match!");
        return;
    }

    if (name && email && password) {

        alert("Account created successfully!");

        window.location.href = "login.html";
    }
}


// ================= SCANNER TABS =================

async function scanEmail() {

    const email = document.getElementById("emailInput").value;
    const result = document.getElementById("scanResult");

    if (email.trim() === "") {
        alert("Please enter email content.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input_type: "EMAIL",
                input_data: email
            })
        });

        const data = await response.json();

        result.innerHTML = `
            <div class="result-icon">📧</div>
            <h2>${data.result}</h2>
            <span class="badge">${data.result}</span>
        `;

    } catch (error) {
        console.error(error);
        alert("Backend connection failed.");
    }
}


// ================= EMAIL SCANNER =================

async function scanEmail() {

    const email = document.getElementById("emailInput").value;
    const result = document.getElementById("scanResult");

    if (email.trim() === "") {
        alert("Please enter email content.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input_type: "EMAIL",
                input_data: email
            })
        });

        const data = await response.json();

        result.innerHTML = `
            <div class="result-icon">📧</div>
            <h2>${data.result}</h2>
            <span class="badge">${data.result}</span>
        `;

    } catch (error) {
        console.error(error);
        alert("Backend connection failed.");
    }
}

// ================= HISTORY SEARCH =================

function searchHistory() {

    const input =
        document.getElementById("searchHistory").value.toLowerCase();

    const rows =
        document.querySelectorAll("#historyTable tbody tr");


    rows.forEach(function(row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }

    });
}
