import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Flame, Timer, Scale, Zap, Droplets, Wind } from "lucide-react";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const ProductsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products = [
    {
      grade: "Grade A",
      description: "Premium choice for professional grilling and long-lasting heat.",
      specs: [
        { label: "Ash Content", value: "Max 5%", icon: Scale },
        { label: "Calories", value: "Above 7000 Kcal", icon: Flame },
        { label: "Fix Carbon", value: "Min 75%", icon: Zap },
        { label: "Moisture", value: "Max 5%", icon: Droplets },
        { label: "Volatile", value: "Max 15%", icon: Wind },
        { label: "Time Burn", value: "7-8 Hours", icon: Timer },
      ],
      highlight: true,
    },
    {
      grade: "Grade A+",
      description: "Balanced composition for versatile usage and consistent performance.",
      specs: [
        { label: "Ash Content", value: "8-10%", icon: Scale },
        { label: "Calories", value: "6500 - 7500 Kcal", icon: Flame },
        { label: "Fixed Carbon", value: "70-75%", icon: Zap },
        { label: "Moisture", value: "Max 5%", icon: Droplets },
        { label: "Volatile", value: "15% - 18%", icon: Wind },
        { label: "Time Burn", value: "6-7 Hours", icon: Timer },
      ],
      highlight: false,
    },
  ];

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          label="Technical Specifications"
          title={t("products.title")}
          subtitle="Discover the precise standards of our premium charcoal grades."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CorporateCard 
                className={`h-full p-8 flex flex-col relative group ${product.highlight ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/5'}`}
                hoverEffect={true}
              >
                {product.highlight && (
                  <div className="absolute top-0 right-0 bg-gold text-charcoal text-xs font-bold px-3 py-1 rounded-bl-lg">
                    BEST SELLER
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className={`font-[Onest] text-4xl font-bold mb-3 ${product.highlight ? 'text-gold' : 'text-white'}`}>
                    {product.grade}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  {product.specs.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:border-gold/20 transition-colors group/item">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${product.highlight ? 'bg-gold/10 text-gold' : 'bg-white/5 text-gray-400 group-hover/item:text-gold group-hover/item:bg-gold/10'} transition-colors`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm text-gray-300 font-medium">{spec.label}</span>
                        </div>
                        <span className="text-sm font-bold text-white tracking-wide">{spec.value}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <button 
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                      product.highlight 
                        ? 'bg-gold text-charcoal hover:bg-gold-dark shadow-gold hover:shadow-gold-lg' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:text-gold'
                    }`}
                  >
                    Request Quote for {product.grade}
                  </button>
                </div>
              </CorporateCard>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            * Specifications may vary slightly depending on the raw material batch. 
            <br className="hidden md:block" />
            Contact us for the most up-to-date lab reports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
