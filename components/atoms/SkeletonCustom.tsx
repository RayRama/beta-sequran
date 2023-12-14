import styled from "@emotion/styled";
import { Skeleton } from "@mantine/core";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  padding: 15px;
  gap: 15px;

  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 10%;
  // gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .circle-skeleton {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    min-width: 100%;

    .circle-skeleton {
      margin-top: 0;
    }
  }
`;

export const SkeletonCustom = () => {
  return (
    <Container>
      <Column>
        <Skeleton height={30} width={30} visible />
        <Skeleton
          height={30}
          width={30}
          circle
          visible
          className="circle-skeleton"
        />
      </Column>
      <Skeleton height={100} width="100%" visible />
    </Container>
  );
};
