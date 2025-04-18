async function predictSatisfaction(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const features = [
        document.querySelector(".customer_type:checked")?.value || 0,
        document.getElementById("age").value,
        document.querySelector(".travel_type:checked")?.value || 0,
        document.querySelector(".classes:checked")?.value || 0,
        document.getElementById("flight_distance").value,
        document.querySelector(".seat_comfort:checked")?.value || 0,
        document.querySelector(".convenience:checked")?.value || 0,
        document.querySelector(".food_drink:checked")?.value || 0,
        document.querySelector(".wifi:checked")?.value || 0,
        document.querySelector(".entertainment:checked")?.value || 0,
        document.querySelector(".online_support:checked")?.value || 0,
        document.querySelector(".booking_ease:checked")?.value || 0,
        document.querySelector(".onboard_service:checked")?.value || 0,
        document.querySelector(".legroom:checked")?.value || 0,
        document.querySelector(".baggage_handling:checked")?.value || 0,
        document.querySelector(".checkin_service:checked")?.value || 0,
        document.querySelector(".cleanliness:checked")?.value || 0,
        document.querySelector(".online_boarding:checked")?.value || 0
    ].map(Number);

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        document.getElementById("result").innerText = "Prediction: " + result.prediction;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Prediction failed. Check console for details.";
    }

    document.getElementById("age").addEventListener("submit", function (event) {
        let ageValue = parseInt(document.getElementById("age").value, 10);
    
        if (isNaN(ageValue) || ageValue < 1 || ageValue > 100) {
            alert("Age must be between 1 and 100!");
            event.preventDefault(); // Stop form submission
        }
    });
    
}
