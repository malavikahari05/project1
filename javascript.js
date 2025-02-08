document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form from submitting and refreshing the page

    // Get the values from the form
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const occupation = document.getElementById("occupation").value;
    const hobbies = document.getElementById("hobbies").value;
    const inculcateHobbies = document.getElementById("inculcateHobbies").value;
    const badHabits = document.getElementById("badHabits").value;

    // Create a result message
    const resultMessage = `
        <h3>Summary of Your Input:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Occupation:</strong> ${occupation}</p>
        <p><strong>Hobbies:</strong> ${hobbies}</p>
        <p><strong>Hobbies you want to inculcate:</strong> ${inculcateHobbies}</p>
        <p><strong>Bad habits you want to lose:</strong> ${badHabits}</p>
    `;

    // Display the result in the result div
    document.getElementById("result").innerHTML = resultMessage;
});
