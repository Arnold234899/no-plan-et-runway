
interface ProductImageProps {
  image: string;
  name: string;
}

export const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
