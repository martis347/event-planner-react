import gql from "graphql-tag";
import { Event } from "models";

export const UPCOMING_EVENTS = gql`
  query getUpcomingEvenets($from: DateTime!) {
    events(from: $from) {
      id
      name
      startTime
    }
  }
`;

export interface EventData {
  events: Event[];
}

export interface EventVars {
  from: Date;
}
