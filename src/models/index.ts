export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime?: string;
  endTime?: string;
  canBeRated: boolean;
  ratings: EventRating[];
}

export interface EventRating {
  id: string;
  rating: number;
  comment?: string;
  event: Event;
  user: User;
}

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}
