import React from "react";
import { Star as StarFull } from "icons/solid";
import { Star } from "icons/regular";
import styled from "styled-components";

interface OwnProps {
  comment: string;
  rating: number;
}

const EmptyStar = styled(Star)`
  color: lightgray;
`;
const FullStar = styled(StarFull)`
  color: #ffd700;
`;
const getStar = (full: boolean, key: number) => {
  if (full) {
    return <FullStar key={key} />;
  }
  return <EmptyStar key={key} />;
};

const StarsWrapper = styled.div`
  margin-left: -2px;

  svg {
    width: 12px;
    height: 12px;
    padding: 2px;
  }
`;

const ReviewWrapper = styled.div`
  margin: 8px 0;
  height: 40px;
`;

const SingleReview = ({ comment, rating }: OwnProps) => {
  return (
    <ReviewWrapper>
      <StarsWrapper>
        {[0, 1, 2, 3, 4].map(r => getStar(rating > r, r))}
        <div>{comment}</div>
      </StarsWrapper>
    </ReviewWrapper>
  );
};

export default SingleReview;
