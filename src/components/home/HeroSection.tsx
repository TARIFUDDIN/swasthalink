import Link from "next/link"; // Changed: Next.js Link instead of react-router-dom
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { heroSection } from "@/lib/config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-tertiary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <div className="relative container px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl animate-fade-in-up">
            <span className="block">{heroSection.title}</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              {heroSection.subtitle}
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {heroSection.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button asChild className="hero-button group">
              <Link href={heroSection.primaryButton.href}> {/* Changed: href instead of to */}
                {heroSection.primaryButton.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild className="hero-button-outline group">
              <Link href={heroSection.secondaryButton.href}> {/* Changed: href instead of to */}
                <Play className="mr-2 h-4 w-4" />
                {heroSection.secondaryButton.text}
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-sm font-medium text-muted-foreground mb-4">
              Trusted by healthcare professionals and patients worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-xs font-semibold tracking-wide text-muted-foreground">HIPAA COMPLIANT</div>
              <div className="w-px h-4 bg-border"></div>
              <div className="text-xs font-semibold tracking-wide text-muted-foreground">24/7 SUPPORT</div>
              <div className="w-px h-4 bg-border"></div>
              <div className="text-xs font-semibold tracking-wide text-muted-foreground">SECURE & PRIVATE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}