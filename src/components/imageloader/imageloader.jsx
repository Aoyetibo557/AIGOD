import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image, Skeleton, Box } from "@chakra-ui/react";

export const ImageLoader = ({ src, alt, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      className={className}>
      <Skeleton
        isLoaded={!isLoading && !error}
        startColor="gray.100"
        endColor="gray.300">
        <Image
          src={src || "https://via.placeholder.com/300x150"}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          display={isLoading || error ? "none" : "block"}
          width={width}
          height={height}
          objectFit="cover"
          borderRadius="md"
        />
      </Skeleton>
    </Box>
  );
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  className: PropTypes.string,
};
