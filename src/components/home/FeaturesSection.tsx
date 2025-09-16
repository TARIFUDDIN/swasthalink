import Link from "next/link"; // Changed: Next.js Link instead of react-router-dom
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { featuresSection } from "@/lib/config";

export function FeaturesSection() {
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Circle;
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "from-primary/20 to-primary/5 border-primary/20 text-primary";
      case "secondary":
        return "from-secondary/20 to-secondary/5 border-secondary/20 text-secondary";
      case "tertiary":
        return "from-tertiary/20 to-tertiary/5 border-tertiary/20 text-tertiary";
      default:
        return "from-primary/20 to-primary/5 border-primary/20 text-primary";
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-in-up">
            {featuresSection.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {featuresSection.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresSection.features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            const colorClasses = getColorClasses(feature.color);
            
            return (
              <div
                key={feature.title}
                className="feature-card group animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br border ${colorClasses} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* CTA */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-primary-hover">
                  Learn more
                  <LucideIcons.ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to start your healthcare journey?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust our platform for comprehensive, 
            secure, and convenient healthcare services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="hero-button">
              <Link href="/dashboard"> {/* Changed: href instead of to */}
                Get Started Today
                <LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/consultation"> {/* Changed: href instead of to */}
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}