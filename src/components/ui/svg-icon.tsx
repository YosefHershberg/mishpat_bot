
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
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;