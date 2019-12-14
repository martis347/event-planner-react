import gql from "graphql-tag";
import { Event } from "models";

export const UPCOMING_EVENTS = gql`
  query upcomingEvents($from: DateTime!) {
    events(from: $from, limit: 5) {
      id
      name
      startTime
      description
      endTime
      location
    }
  }
`;

export interface EventData {
  events: Event[];
}

export interface EventVars {
  from: Date;
}
