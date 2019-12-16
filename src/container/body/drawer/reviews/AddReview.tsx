import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { TextArea, Button } from "global-components";
import { Star as StarFull } from "icons/solid";
import { Star } from "icons/regular";

interface OwnProps {
  rating?: number;
  comment?: string;
  onSubmit: (rating: number, comment: string) => void;
}

const StyledWrapper = styled.div`
  padding: 16px 0;
`;
const EmptyStar = styled(Star)`
  color: lightgray;
`;
const FullStar = styled(StarFull)`
  color: #ffd700;
`;
const StarsWrapper = styled.div`
  margin-left: -4px;
  height: 36px;

  svg {
    width: 24px;
    padding: 4px;
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  color: inherit;
  background: transparent;

  :disabled {
    color: white;
  }

  :not(:disabled) {
    color: inherit;
    border: 1px solid #4260cc;
  }

  :hover {
    background: #fbfcfe;
  }

  :active {
    background: #eceffa;
  }
`;

const getStar = (full: boolean, onClick: () => void) => {
  if (full) {
    return <FullStar onClick={onClick} />;
  }
  return <EmptyStar onClick={onClick} />;
};

const AddReview = ({ rating, comment: currentComment, onSubmit }: OwnProps) => {
  const [starsCount, setStarsCount] = useState<number>(rating || 0);
  const [comment, setComment] = useState(currentComment || "");
  const stars = useMemo(() => {
    return (
      <StarsWrapper>
        {getStar(starsCount > 0, () => setStarsCount(1))}
        {getStar(starsCount > 1, () => setStarsCount(2))}
        {getStar(starsCount > 2, () => setStarsCount(3))}
        {getStar(starsCount > 3, () => setStarsCount(4))}
        {getStar(starsCount > 4, () => setStarsCount(5))}
      </StarsWrapper>
    );
  }, [starsCount]);

  const handleReviewSubmit = useCallback(() => {
    onSubmit(starsCount, comment);
  }, [comment, onSubmit, starsCount]);

  return (
    <StyledWrapper>
      {stars}
      <TextArea
        rows={5}
        value={comment}
        placeholder="Leave your review"
        onChange={setComment}
        onEnter={handleReviewSubmit}
      />
      <StyledButton disabled={starsCount < 1} onClick={handleReviewSubmit}>
        Submit
      </StyledButton>
    </StyledWrapper>
  );
};

export default AddReview;
