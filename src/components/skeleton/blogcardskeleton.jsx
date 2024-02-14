import React from "react";
import {
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";

export const BlogcardSkeleton = () => {
  return (
    <div>
      <Stack spacing={4} padding="10px" borderRadius="8" border="1px">
        <Skeleton width="350px" height="200px" />
        <Stack direction="row" justify="between">
          <Skeleton width="70px" height="20px" />
          <Stack direction="row" alignItems="end">
            <Skeleton width="70px" height="20px" />
            <Skeleton width="70px" height="20px" />
          </Stack>
        </Stack>
        <SkeletonText noOfLines={4} width="350px" height="50px" />
        <Stack direction="row" justify="between" alignItems="center">
          <SkeletonCircle size="10" />
          <Skeleton width="120px" height="10px" />
        </Stack>
      </Stack>
    </div>
  );
};
