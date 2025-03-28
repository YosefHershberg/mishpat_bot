import Image from "next/image";

type IconProps = {
  src: string;
  alt?: string; 
  width?: number | string; 
  height?: number | string; 
  className?: string; 
}

const Icon: React.FC<IconProps> = ({
  src,
  alt = 'icon',
  width = 24,
  height = 24,
  className = '',
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      className={className}
    />
  );
};

export default Icon;