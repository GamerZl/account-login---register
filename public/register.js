
// get the form from the page
const form = document.getElementById("reg-form");

// run this when user submits the form
form.addEventListener("submit", function (e) {
       // stop page from refreshing
    e.preventDefault(); // ⭐ This line is critical

     // get what user typed
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // if something is empty, show message
    if (!email || !username || !password) {
        alert("Please fill in all fields");
        return;
    }

    // check password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }
    
    // send data to server
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password })
    })

    // get response from server
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // go to next page if success
            window.location.href = "Accountcreated.html?user=" + encodeURIComponent(username);
        } else {
            alert(data.message || "Registration failed");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
});