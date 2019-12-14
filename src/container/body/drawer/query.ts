import { gql } from "apollo-boost";

export const CREATE_EVENT = gql`
  mutation CreateEvent($event: EventCreateInput!) {
    createEvent(event: $event) {
      id
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($event: EventUpdateInput!) {
    updateEvent(event: $event) {
      id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: String!) {
    deleteEvent(eventId: $eventId)
  }
`;

export interface EventCreateVars {
  event: {
    name: string;
    location: string;
    description: string;
    startTime: string;
    endTime?: string;
  };
}

export interface EventModifyVars {
  event: {
    id: string;
    name: string;
    location: string;
    description: string;
    startTime: string;
    endTime?: string;
  };
}

export interface EventDeleteVars {
  eventId: string;
}
