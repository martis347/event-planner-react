import React, { useMemo } from "react";
import { EventReview } from "models";
import { Star as StarSolid } from "icons/solid";
import { Star } from "icons/regular";
import styled from "styled-components";

interface OwnProps {
  reviews: EventReview[];
}

const NoReviewsText = styled.span`
  font-size: 13px;
  color: gray;
`;

const solidStar = <StarSolid style={{ color: "#FFD700" }} />;
const star = (averageValue: number, index: number) => {
  const fraction = averageValue > index ? averageValue % index : 0;

  return (
    <div style={{ position: "relative", top: 1 }}>
      <Star
        style={{
          color: "lightgray",
          opacity: 0.4
        }}
      />
      <span
        style={{
          position: "absolute",
          color: "#FFD700",
          overflowX: "hidden",
          maxWidth: 14 * fraction,
          left: 0,
          height: 14,
          top: -0.5
        }}
      >
        <StarSolid style={{ color: "#FFD700" }} />
      </span>
    </div>
  );
};

const ReviewWrapper = styled.div`
  & {
    display: flex;

    span {
      margin-right: 8px;
      font-size: 13px;
      padding-top: 3px;
      color: gray;
    }

    svg {
      width: 14px;
    }
  }
`;

const EventReviewComponent = ({ reviews }: OwnProps) => {
  const averageRating = useMemo(() => {
    const sum = reviews.reduce((acc, rating) => {
      acc += rating.rating;
      return acc;
    }, 0);

    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  if (reviews.length === 0) {
    return <NoReviewsText>No reviews yet</NoReviewsText>;
  }

  return (
    <ReviewWrapper>
      <span>
        {averageRating} ({reviews.length})
      </span>
      {averageRating >= 1 ? solidStar : star(averageRating, 0)}
      {averageRating >= 2 ? solidStar : star(averageRating, 1)}
      {averageRating >= 3 ? solidStar : star(averageRating, 2)}
      {averageRating >= 4 ? solidStar : star(averageRating, 3)}
      {averageRating >= 5 ? solidStar : star(averageRating, 4)}
    </ReviewWrapper>
  );
};

export default EventReviewComponent;
