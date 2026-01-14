import React from "react";
import { cn } from "@/lib/utils";

interface CorporateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

export const CorporateCard: React.FC<CorporateCardProps> = ({
  children,
  hoverEffect = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/5 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300",
        hoverEffect && "hover:border-gold/30 hover:bg-card/40 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
