export type Contract = {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  budget: string; // Pode ser number, dependendo do backend
  additionalDetails: string;
  isConfirmed: boolean | null;
  createdAt: string;
  updatedAt: string;

  provider: Provider;
  requester: Requester;
};

export type Provider = {
  id: number;
  bandName: string;
  city: string;
  contact: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  description: string | null;
  genre: string;
  members: string | null;
};

export type Requester = {
  id: string;
  name: string;
  type: string;
  address: string;
  cep: string;
  city: string;
  contact: string | null;
  description: string | null;
  coverPhoto: string | null;
  profilePhoto: string | null;
  socialMedia: string | null;
};
