const apiBaseUrl =
  "https://api-medical-portal-keegan-d5h3c7ehg4etaqgb.westus3-01.azurewebsites.net";

const patientList = document.getElementById("patient-list");
const loadPatientsButton = document.getElementById("load-patients");
const patientForm = document.getElementById("patient-form");
const formMessage = document.getElementById("form-message");

async function loadPatients() {
  patientList.innerHTML = "";

  try {
    const response = await fetch(`${apiBaseUrl}/patients`);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const patients = await response.json();

    if (patients.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No patients found.";
      patientList.appendChild(li);
      return;
    }

    patients.forEach((patient) => {
      const li = document.createElement("li");
      li.textContent = `${patient.name}, Age ${patient.age} - ${patient.condition}`;
      patientList.appendChild(li);
    });
  } catch (error) {
    const li = document.createElement("li");
    li.textContent = "Failed to load patients.";
    patientList.appendChild(li);
    console.error("Error loading patients:", error);
  }
}

patientForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newPatient = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value, 10),
    condition: document.getElementById("condition").value,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    formMessage.textContent = "Patient added successfully.";
    formMessage.style.color = "green";
    patientForm.reset();

    await loadPatients();
  } catch (error) {
    formMessage.textContent = "Error adding patient.";
    formMessage.style.color = "red";
    console.error("Error adding patient:", error);
  }
});

loadPatientsButton.addEventListener("click", loadPatients);

window.addEventListener("load", loadPatients);
