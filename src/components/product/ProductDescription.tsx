
interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="prose prose-invert max-w-none">
      <p className="text-zinc-300 leading-relaxed">{description}</p>
    </div>
  );
};
