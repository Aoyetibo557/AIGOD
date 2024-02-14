import React from "react";
import {
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";

export const NavbarSkeleton = () => {
  return (
    <div>
      <Stack spacing={4} direction="row" alignItems="center">
        <Skeleton width="100px" height="30px" />
      </Stack>
    </div>
  );
};
