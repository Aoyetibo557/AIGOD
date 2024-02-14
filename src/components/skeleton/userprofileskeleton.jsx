import React from "react";
import {
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";

export const UserProfileSkeleton = () => {
  return (
    <div>
      <Stack spacing={4} alignItems="center">
        <Stack direction="row" spacing={4} justifyContent="center">
          <SkeletonCircle size="40" />
          <Stack justifyContent="center">
            <Skeleton width="100px" height="20px" />
            <Skeleton width="100px" height="20px" />
          </Stack>
        </Stack>
        <Skeleton width="300px" height="30px" />
        <Skeleton width="300px" height="30px" />
        <Skeleton width="150px" height="30px" />
      </Stack>
    </div>
  );
};
