import { statsSection } from "@/lib/config";

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-in-up">
            {statsSection.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {statsSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsSection.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card text-center animate-fade-in-up hover:shadow-glow"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}