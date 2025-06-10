export type Contract = {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  budget: number;
  additionalDetails?: string;
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
  members: number | null;
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
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
};