// Backend API URL
const apiBaseUrl =
  "https://api-medical-portal-keegan-d5h3c7ehg4etagqb.westus3-01.azurewebsites.net";

// Load patients from the backend
async function loadPatients() {
  const patientList = document.getElementById("patient-list");
  patientList.innerHTML = "";

  try {
    const response = await fetch(`${apiBaseUrl}/patients`);
    const patients = await response.json();

    if (patients.length === 0) {
      patientList.innerHTML = "<li>No patients found.</li>";
      return;
    }

    patients.forEach((patient) => {
      const li = document.createElement("li");
      li.textContent = `${patient.name} (Age ${patient.age}) - ${patient.condition}`;
      patientList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading patients:", error);
    patientList.innerHTML = "<li>Failed to load patients.</li>";
  }
}

// Add patient form handler
document
  .getElementById("add-patient-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const condition = document.getElementById("condition").value;

    try {
      const response = await fetch(`${apiBaseUrl}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: age,
          condition: condition,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      // Clear form
      document.getElementById("add-patient-form").reset();

      // Reload patient list
      loadPatients();
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Error adding patient.");
    }
  });

// Load patients when page loads
window.onload = loadPatients;
