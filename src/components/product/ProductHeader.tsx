
interface ProductHeaderProps {
  category: string;
  name: string;
  price: number;
}

export const ProductHeader = ({ category, name, price }: ProductHeaderProps) => {
  return (
    <div>
      <p className="text-zinc-400 text-sm uppercase tracking-wide mb-2">{category}</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{name}</h1>
      <p className="text-3xl font-bold text-white mb-6">${price}</p>
    </div>
  );
};
