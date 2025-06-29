export interface Lecturer {
  id: string;
  nidn: string;
  name: string;
  degree: string;
  scopus_id?: string;
  functional_position: string;
  rank: string;
  last_education: string;
  serdos_status: string;
  created_at: string;
}

export interface CreateLecturerData {
  nidn: string;
  name: string;
  degree: string;
  scopus_id?: string;
  functional_position: string;
  rank: string;
  last_education: string;
  serdos_status: string;
}

export interface UpdateLecturerData extends CreateLecturerData {
  id: string;
}