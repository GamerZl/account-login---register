const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
     // Get the text typed into the username and password boxes
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // If either box is empty, show a message and stop the code
    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

     
     // Send the username and password to the server
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server response:", data);
       
        // If login was successful
        if (data.success) {
            alert("Login successful!");
            window.location.href = "Homepage.html";
        } else {
           // If login failed, show the message from the server
            alert(data.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
});