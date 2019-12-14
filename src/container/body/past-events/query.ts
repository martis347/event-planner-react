import gql from "graphql-tag";
import { Event } from "models";

export const PAST_EVENTS = gql`
  query getPastEvenets($to: DateTime!) {
    events(to: $to) {
      id
      name
      startTime
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
