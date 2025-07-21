const consultation = {
  // Consultation status constants
  STATUS: {
    PENDING: 'pending',
    SCHEDULED: 'scheduled', 
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_SHOW: 'no_show'
  },

  // Consultation types
  TYPES: {
    GENERAL: 'general',
    MENTAL_HEALTH: 'mental_health',
    EMERGENCY: 'emergency',
    FOLLOW_UP: 'follow_up',
  },

  // Priority levels
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
  },

  // Validate consultation data
  validateConsultationData: (data) => {
    const { patient_id, consultation_type, symptoms, preferred_date } = data;
    
    if (!patient_id) {
      return { valid: false, error: 'Patient ID is required' };
    }
    
    if (!consultation_type || !Object.values(consultation.TYPES).includes(consultation_type)) {
      return { valid: false, error: 'Valid consultation type is required' };
    }
    
    if (!symptoms || symptoms.trim().length < 5) {
      return { valid: false, error: 'Symptoms description must be at least 5 characters' };
    }
    
    if (preferred_date && !consultation.isValidDate(preferred_date)) {
      return { valid: false, error: 'Invalid preferred date format' };
    }
    
    return { valid: true };
  },

  // Validate date format
  isValidDate: (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && date > new Date();
  },

  // Check priority based on keywords in symptoms
  checkPriority: (symptoms, age, existingConditions = []) => {
    const urgentKeywords = [
      'chest pain', 'difficulty breathing', 'unconscious', 'severe bleeding',
      'stroke', 'heart attack', 'poisoning', 'allergic reaction'
    ];
    
    const highKeywords = [
      'fever', 'vomiting', 'severe pain', 'infection', 'injury'
    ];
    
    const mediumKeywords = [
      'headache', 'cough', 'cold', 'minor pain', 'skin condition'
    ];
    
    const symptomsLower = symptoms.toLowerCase();
    
    // Check for urgent symptoms
    if (urgentKeywords.some(keyword => symptomsLower.includes(keyword))) {
      return consultation.PRIORITY.URGENT;
    }
    
    // Age factor (elderly get higher priority)
    if (age >= 65) {
      if (highKeywords.some(keyword => symptomsLower.includes(keyword))) {
        return consultation.PRIORITY.URGENT;
      }
      if (mediumKeywords.some(keyword => symptomsLower.includes(keyword))) {
        return consultation.PRIORITY.HIGH;
      }
    }
    
    // Existing conditions factor
    if (existingConditions.length > 0) {
      if (highKeywords.some(keyword => symptomsLower.includes(keyword))) {
        return consultation.PRIORITY.HIGH;
      }
    }
    
    // Check for high priority symptoms
    if (highKeywords.some(keyword => symptomsLower.includes(keyword))) {
      return consultation.PRIORITY.HIGH;
    }
    
    // Check for medium priority symptoms
    if (mediumKeywords.some(keyword => symptomsLower.includes(keyword))) {
      return consultation.PRIORITY.MEDIUM;
    }
    
    return consultation.PRIORITY.LOW;
  },

  // Generate consultation reference number
  generateReferenceNumber: () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CC${timestamp}${random}`;
  },

  // Calculate estimated consultation duration
  getEstimatedDuration: (consultationType, priority) => {
    const baseDurations = {
      [consultation.TYPES.GENERAL]: 20,
      [consultation.TYPES.MENTAL_HEALTH]: 45,
      [consultation.TYPES.EMERGENCY]: 30,
      [consultation.TYPES.FOLLOW_UP]: 15,
      [consultation.TYPES.SPECIALIST]: 40
    };
    
    let duration = baseDurations[consultationType] || 20;
    
    // Adjust based on priority
    if (priority === consultation.PRIORITY.URGENT) {
      duration += 10;
    } else if (priority === consultation.PRIORITY.HIGH) {
      duration += 5;
    }
    
    return duration; // in minutes
  },

  // Format consultation data for database
  formatConsultationForDB: (data, userId, userType = 'patient') => {
    const {
      consultation_type,
      symptoms,
      preferred_date,
      patient_age,
      existing_conditions,
      emergency_contact
    } = data;
    
    const priority = consultation.checkPriority(symptoms, patient_age, existing_conditions);
    const referenceNumber = consultation.generateReferenceNumber();
    const estimatedDuration = consultation.getEstimatedDuration(consultation_type, priority);
    
    return {
      patient_id: userType === 'patient' ? userId : data.patient_id,
      consultation_type,
      symptoms,
      priority,
      status: consultation.STATUS.PENDING,
      reference_number: referenceNumber,
      preferred_date: preferred_date || null,
      estimated_duration: estimatedDuration,
      patient_age: patient_age || null,
      existing_conditions: existing_conditions || [],
      emergency_contact: emergency_contact || null,
      created_at: new Date(),
      updated_at: new Date()
    };
  },

  // Validate status transition
  canTransitionStatus: (currentStatus, newStatus, userType) => {
    const validTransitions = {
      [consultation.STATUS.PENDING]: [
        consultation.STATUS.SCHEDULED, 
        consultation.STATUS.CANCELLED
      ],
      [consultation.STATUS.SCHEDULED]: [
        consultation.STATUS.IN_PROGRESS, 
        consultation.STATUS.CANCELLED,
        consultation.STATUS.NO_SHOW
      ],
      [consultation.STATUS.IN_PROGRESS]: [
        consultation.STATUS.COMPLETED,
        consultation.STATUS.CANCELLED
      ],
      // Final status
      [consultation.STATUS.COMPLETED]: [],
      [consultation.STATUS.CANCELLED]: [],
      [consultation.STATUS.NO_SHOW]: []
    };
    
    // Only doctors and admins can transition to certain statuses
    const doctorOnlyTransitions = [
      consultation.STATUS.IN_PROGRESS,
      consultation.STATUS.COMPLETED,
      consultation.STATUS.NO_SHOW
    ];
    
    if (doctorOnlyTransitions.includes(newStatus) && 
        !['doctor', 'admin'].includes(userType)) {
      return false;
    }
    
    return validTransitions[currentStatus]?.includes(newStatus) || false;
  },

  // Search and filter consultations
  buildSearchQuery: (filters = {}) => {
    const {
      status,
      consultation_type,
      priority,
      patient_id,
      doctor_id,
      date_from,
      date_to,
      search_term
    } = filters;
    
    let query = {};
    let conditions = [];
    
    if (status) conditions.push(`status = $${conditions.length + 1}`);
    if (consultation_type) conditions.push(`consultation_type = $${conditions.length + 1}`);
    if (priority) conditions.push(`priority = $${conditions.length + 1}`);
    if (patient_id) conditions.push(`patient_id = $${conditions.length + 1}`);
    if (doctor_id) conditions.push(`doctor_id = $${conditions.length + 1}`);
    if (date_from) conditions.push(`created_at >= $${conditions.length + 1}`);
    if (date_to) conditions.push(`created_at <= $${conditions.length + 1}`);
    if (search_term) conditions.push(`(symptoms ILIKE $${conditions.length + 1} OR reference_number ILIKE $${conditions.length + 1})`);
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    const values = [
      status,
      consultation_type, 
      priority,
      patient_id,
      doctor_id,
      date_from,
      date_to,
      search_term ? `%${search_term}%` : null,
      search_term ? `%${search_term}%` : null
    ].filter(v => v !== null && v !== undefined);
    
    return {
      whereClause,
      values: values.slice(0, conditions.length)
    };
  },

  // Format consultation response for API
  formatConsultationResponse: (consultationData, includePatientInfo = false) => {
    const {
      id,
      reference_number,
      consultation_type,
      status,
      priority,
      symptoms,
      diagnosis,
      prescription,
      estimated_duration,
      actual_duration,
      preferred_date,
      scheduled_date,
      patient_age,
      existing_conditions,
      created_at,
      updated_at,
      doctor_id,
      patient_id
    } = consultationData;
    
    const formatted = {
      id,
      reference_number,
      consultation_type,
      status,
      priority,
      symptoms,
      diagnosis: diagnosis || null,
      prescription: prescription || null,
      duration: {
        estimated: estimated_duration,
        actual: actual_duration || null
      },
      dates: {
        preferred: preferred_date,
        scheduled: scheduled_date || null,
        created: created_at,
        updated: updated_at
      },
      patient_age,
      existing_conditions: existing_conditions || []
    };
    
    // Include doctor/patient info based on user permissions
    if (includePatientInfo) {
      formatted.doctor_id = doctor_id;
      formatted.patient_id = patient_id;
    }
    
    return formatted;
  },

  // Validate prescription format
  validatePrescription: (prescription) => {
    if (!prescription || !Array.isArray(prescription)) {
      return { valid: false, error: 'Prescription must be an array' };
    }
    
    for (let i = 0; i < prescription.length; i++) {
      const med = prescription[i];
      if (!med.medication || !med.dosage || !med.frequency) {
        return { 
          valid: false, 
          error: `Prescription item ${i + 1} missing required fields (medication, dosage, frequency)` 
        };
      }
    }
    
    return { valid: true };
  },

  // Generate consultation summary
  generateSummary: (consultationData) => {
    const {
      consultation_type,
      status,
      priority,
      symptoms,
      diagnosis,
      created_at
    } = consultationData;
    
    return {
      consultation_type: consultation_type.replace('_', ' ').toUpperCase(),
      status: status.replace('_', ' ').toUpperCase(),
      priority: priority.toUpperCase(),
      chief_complaint: symptoms.substring(0, 100) + (symptoms.length > 100 ? '...' : ''),
      diagnosis: diagnosis || 'Pending diagnosis',
      date: new Date(created_at).toLocaleDateString(),
      duration_days: Math.floor((new Date() - new Date(created_at)) / (1000 * 60 * 60 * 24))
    };
  }
};

module.exports = consultation;