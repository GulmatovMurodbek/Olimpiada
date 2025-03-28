
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description?: string;
    image: string;
  };
  className?: string;
}
export default function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={``}
      className={`group relative overflow-hidden rounded-xl block ${className || ""}`}
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
        <img
          src={category.image}
          alt={category.name}
          width={500}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
        {category.description && <p className="text-white mb-3 line-clamp-2">{category.description}</p>}
        <div className="mt-3 flex items-center text-white text-sm font-medium transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          Explore
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
