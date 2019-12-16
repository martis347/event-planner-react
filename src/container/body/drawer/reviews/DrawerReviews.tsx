import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import AddReview from "./AddReview";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { EventReview } from "models";
import { GET_REVIEWS, EventReviewInput, SUBMIT_EVENT_REVIEW } from "./query";
import { Loader } from "global-components";
import { AuthenticationContext } from "context/AuthenticationContext";
import SingleReview from "./SingleReview";

interface OwnProps {
  eventId: string;
}

const DrawerReviewsWrapper = styled.div`
  border-top: 1px solid #f1f3f4;
  padding: 32px 16px;
`;

const ReviewsHeader = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const DrawerReviews = ({ eventId }: OwnProps) => {
  const { user } = useContext(AuthenticationContext);
  const { data, loading } = useQuery<
    { eventReviews: EventReview[] },
    { eventId: string }
  >(GET_REVIEWS, {
    variables: {
      eventId
    }
  });

  const [submitEventReview] = useMutation<never, EventReviewInput>(
    SUBMIT_EVENT_REVIEW,
    {
      refetchQueries: ["eventReviews", "pastEvents"]
    }
  );

  const handleEventSubmit = useCallback(
    (rating: number, comment: string) => {
      submitEventReview({
        variables: {
          data: {
            comment,
            rating,
            eventId,
            userId: user!.id
          }
        }
      });
    },
    [eventId, submitEventReview, user]
  );

  const currentUserReview = useMemo(() => {
    if (data?.eventReviews) {
      const review = data.eventReviews.find(r => r.user.id === user!.id);
      return review;
    }

    return undefined;
  }, [data, user]);

  const content = useMemo(() => {
    if (loading) {
      return <Loader />;
    }

    return (
      <>
        <AddReview
          comment={currentUserReview?.comment}
          rating={currentUserReview?.rating}
          onSubmit={handleEventSubmit}
        />
        {data?.eventReviews?.map?.(r => (
          <SingleReview key={r.id} comment={r.comment} rating={r.rating} />
        ))}
      </>
    );
  }, [currentUserReview, data, handleEventSubmit, loading]);

  return (
    <DrawerReviewsWrapper>
      <ReviewsHeader>Reviews</ReviewsHeader>
      {content}
    </DrawerReviewsWrapper>
  );
};

export default DrawerReviews;
