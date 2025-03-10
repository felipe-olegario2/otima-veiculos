"use client";

interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="bg-[#e9edf2] text-[#67696b] text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
      {children}
    </span>
  );
}
