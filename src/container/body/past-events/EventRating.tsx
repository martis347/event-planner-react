import React, { useMemo } from "react";
import { EventRating } from "models";
import { Star as StarSolid } from "icons/solid";
import { Star } from "icons/regular";
import styled from "styled-components";

interface OwnProps {
  ratings: EventRating[];
}

const NoRatingsText = styled.span`
  font-size: 13px;
  color: gray;
`;

const solidStar = <StarSolid style={{ color: "#FFD700" }} />;
const star = (value: number) => (
  <div style={{ position: "relative", top: 1 }}>
    <Star style={{ color: "lightgray" }} />
    <span
      style={{
        position: "absolute",
        color: "#FFD700",
        overflowX: "hidden",
        maxWidth: 14 * value,
        left: 0,
        top: 2
      }}
    >
      <StarSolid style={{ color: "#FFD700" }} />
    </span>
  </div>
);

const RatingWrapper = styled.div`
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

const EventRatingComponent = ({ ratings }: OwnProps) => {
  const averageRating = useMemo(() => {
    const sum = ratings.reduce((acc, rating) => {
      acc += rating.rating;
      return acc;
    }, 0);

    return Math.round((sum / ratings.length) * 10) / 10;
  }, [ratings]);

  if (ratings.length === 0) {
    return <NoRatingsText>No ratings yet</NoRatingsText>;
  }

  return (
    <RatingWrapper>
      <span>{averageRating}</span>
      {averageRating > 1 ? solidStar : star(averageRating % 1)}
      {averageRating > 2 ? solidStar : star(averageRating % 1)}
      {averageRating > 3 ? solidStar : star(averageRating % 1)}
      {averageRating > 4 ? solidStar : star(averageRating % 1)}
      {averageRating > 5 ? solidStar : star(averageRating % 1)}
    </RatingWrapper>
  );
};

export default EventRatingComponent;
