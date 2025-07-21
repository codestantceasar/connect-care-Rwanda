import React, { useState } from "react";
import { database } from "./firebase-config";
import { ref, push } from "firebase/database";

function ConsultationForm() {
  const [consultation, setConsultation] = useState({
    patient_id: "",
    doctor_id: "",
    consultation_date: "",
    notes: "",
    diagnosis: "",
    prescription: ""
  });

  const handleChange = (e) => {
    setConsultation({ ...consultation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const refPath = ref(database, "consultations");
      await push(refPath, consultation);
      alert("Consultation saved!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Add Consultation</h2>
      <input name="patient_id" placeholder="Patient ID" onChange={handleChange} />
      <input name="doctor_id" placeholder="Doctor ID" onChange={handleChange} />
      <input name="consultation_date" type="date" onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" onChange={handleChange} />
      <input name="diagnosis" placeholder="Diagnosis" onChange={handleChange} />
      <input name="prescription" placeholder="Prescription" onChange={handleChange} />
      <br />
      <button onClick={handleSubmit}>Submit Consultation</button>
    </div>
  );
}

export default ConsultationForm;

