import clsx from "clsx";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };

export const Avatar = ({ src, alt, initials, size = "md", className }: AvatarProps) => (
  <div className={clsx("relative flex items-center justify-center rounded-full bg-primary-500/20 font-semibold text-primary-300 select-none overflow-hidden", sizes[size], className)}>
    {src ? <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" /> : <span>{initials ?? "?"}</span>}
  </div>
);
