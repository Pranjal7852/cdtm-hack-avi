
export type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  patientName?: string;
  type?: string;
};

export type HealthMetric = {
  date: string;
  value: string;
  status: string;
};

export type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
};

export type MedicalFile = {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
  category: string;
};

export type SyncItem = {
  id: number;
  fileName: string;
  lastSync: string;
  status: string;
  details: string;
};

export type HealthMetricsData = {
  bloodPressure: HealthMetric[];
  weight: HealthMetric[];
  glucose: HealthMetric[];
};

export type PatientSummary = {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  notes: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  medicalHistory: {
    condition: string;
    diagnosedDate: string;
    status: string;
  }[];
  visitHistory: {
    date: string;
    reason: string;
    notes: string;
    provider: string;
  }[];
};

export type Task = {
  id: number;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
};
