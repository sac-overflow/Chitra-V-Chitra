import { ReactNode } from "react";

interface Grid12Props {
  children: ReactNode;
  className?: string;
}

/** 12-column desktop grid; stacks on mobile/tablet */
export function Grid12({ children, className = "" }: Grid12Props) {
  return (
    <div
      className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 ${className}`}
    >
      {children}
    </div>
  );
}

interface ColProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

const spanClasses: Record<number, string> = {
  1: "col-span-4 md:col-span-1 lg:col-span-1",
  2: "col-span-4 md:col-span-2 lg:col-span-2",
  3: "col-span-4 md:col-span-4 lg:col-span-3",
  4: "col-span-4 md:col-span-4 lg:col-span-4",
  5: "col-span-4 md:col-span-4 lg:col-span-5",
  6: "col-span-4 md:col-span-4 lg:col-span-6",
  7: "col-span-4 md:col-span-8 lg:col-span-7",
  8: "col-span-4 md:col-span-8 lg:col-span-8",
  9: "col-span-4 md:col-span-8 lg:col-span-9",
  10: "col-span-4 md:col-span-8 lg:col-span-10",
  11: "col-span-4 md:col-span-8 lg:col-span-11",
  12: "col-span-4 md:col-span-8 lg:col-span-12",
};

export function Col({ children, span = 12, className = "" }: ColProps) {
  return <div className={`${spanClasses[span]} ${className}`}>{children}</div>;
}
