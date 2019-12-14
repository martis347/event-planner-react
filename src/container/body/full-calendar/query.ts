import { gql } from "apollo-boost";
import { Event } from "models";

export const ALL_EVENTS = gql`
  query allEvents {
    events {
      id
      name
      startTime
      endTime
    }
  }
`;

export interface AllEventsData {
  events: Event[];
}
