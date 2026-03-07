const apiBaseUrl = "http://127.0.0.1:8000";

const patientList = document.getElementById("patient-list");
const loadPatientsButton = document.getElementById("load-patients");
const patientForm = document.getElementById("patient-form");
const formMessage = document.getElementById("form-message");

async function loadPatients() {
  patientList.innerHTML = "";

  try {
    const response = await fetch(`${apiBaseUrl}/patients`);
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
    age: parseInt(document.getElementById("age").value),
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
      throw new Error("Failed to create patient");
    }

    formMessage.textContent = "Patient added successfully.";
    patientForm.reset();
    loadPatients();
  } catch (error) {
    formMessage.textContent = "Error adding patient.";
    console.error("Error creating patient:", error);
  }
});

loadPatientsButton.addEventListener("click", loadPatients);

// Load patients automatically on page load
loadPatients();
