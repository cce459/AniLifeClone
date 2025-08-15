import { Card } from "@/components/ui/card";

const categories = [
  { name: "액션", icon: "🥊", color: "hover:bg-accent-cyan hover:text-primary" },
  { name: "로맨스", icon: "❤️", color: "hover:bg-accent-coral hover:text-white" },
  { name: "코미디", icon: "😄", color: "hover:bg-warning hover:text-primary" },
  { name: "판타지", icon: "🔮", color: "hover:bg-success hover:text-primary" },
  { name: "호러", icon: "👻", color: "hover:bg-purple-500 hover:text-white" },
  { name: "학원", icon: "🎓", color: "hover:bg-blue-500 hover:text-white" },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-secondary" data-testid="category-section">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold gradient-text mb-8" data-testid="text-category-title">
          장르별 둘러보기
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className={`group bg-primary rounded-xl p-6 text-center ${category.color} transition-all duration-300 cursor-pointer`}
              data-testid={`card-category-${category.name}`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>
              <h4 className="font-semibold" data-testid={`text-category-name-${category.name}`}>
                {category.name}
              </h4>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
