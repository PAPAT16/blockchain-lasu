export interface TeamMember {
  id: string;
  name: string;
  role: string;
  xHandle: string;
  seed: string; // seed for DiceBear avatar
}

export type EventStatus = 'PAST' | 'UPCOMING';

export interface ClubEvent {
  id: string; // e.g. EVT-001
  status: EventStatus;
  category: string; // e.g. CONFERENCE, WORKSHOP, PANEL, HACKATHON
  isFeatured?: boolean;
  title: string;
  hostOrVenue: string; // e.g. Web3bridge Africa, LASU Main Campus
  description: string;
  imageUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface JoinFormInput {
  fullName: string;
  studentId: string;
  facultyDept: string;
  level: string;
  email: string;
  phoneNumber: string;
  priorKnowledge: string;
  reason: string;
}

export interface InviteFormInput {
  eventName: string;
  eventDate: string;
  eventType: string;
  contactNameOrg: string;
  contactEmail: string;
  description: string;
}
