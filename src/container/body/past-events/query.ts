import gql from "graphql-tag";
import { Event } from "models";

export const PAST_EVENTS = gql`
  query pastEvents($to: DateTime!) {
    events(to: $to, limit: 5) {
      id
      name
      startTime
      description
      endTime
      location
      ratings {
        rating
      }
    }
  }
`;

export interface EventData {
  events: Event[];
}

export interface EventVars {
  to: Date;
}
