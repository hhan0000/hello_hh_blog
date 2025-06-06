import { Image } from "@imagekit/react";

const HHImage = ({ src, className, width, height, alt }) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_HH_URL_ENDPOINT}
      // src="/logo.png"
      src={src}
      className={className}
      alt={alt}
      loading="lazy"
      lqip={{ active: true, quality: 40 }}
      width={width}
      height={height}
    />
  );
};

export default HHImage;
