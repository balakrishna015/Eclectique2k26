export interface Coordinator {
  name: string;
  phone: string;
}

export interface EventData {
  id: number;
  title: string;
  category: string;
  image: string;
  fee: string;
  teamSize: string;
  time: string;
  description: string;
  rules: string[];
  coordinators: Coordinator[];
  regLink: string;
  brochureLink?: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  image?: string;
  status?: string;
  designation?: string;
  roll?: string;
}

export interface Section {
  title: string;
  members: TeamMember[];
  gridClass?: string;
}

