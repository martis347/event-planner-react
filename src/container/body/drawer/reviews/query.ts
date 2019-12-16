import { gql } from "apollo-boost";

export const GET_REVIEWS = gql`
  query eventReviews($eventId: String!) {
    eventReviews(eventId: $eventId) {
      id
      rating
      comment
      user {
        id
        name
      }
    }
  }
`;

export const SUBMIT_EVENT_REVIEW = gql`
  mutation submitEventReview($data: EventReviewInputType!) {
    submitEventReview(eventReview: $data) {
      id
    }
  }
`;

export interface EventReviewInput {
  data: {
    eventId: string;
    userId: string;
    rating: number;
    comment: string;
  };
}
