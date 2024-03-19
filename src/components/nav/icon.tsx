import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  DollarSign,
  Edit3,
  FileCode,
  Globe,
  Layout,
  LayoutDashboard,
  ListChecks,
  LucideIcon,
  Megaphone,
  Menu,
  Newspaper,
  Scale,
  ScrollText,
  Settings,
  Vote,
  Users,
  Files,
  GalleryHorizontal,
  Heart,
  Album,
} from "lucide-react";

interface IconProps {
  name: string;
  width?: number;
}

export const Icon = ({ name, width, ...rest }: IconProps) => {
  const icons: Record<string, LucideIcon> = {
    ArrowLeft,
    BarChart3,
    Edit3,
    Globe,
    Layout,
    LayoutDashboard,
    Megaphone,
    Menu,
    Newspaper,
    Settings,
    FileCode,
    Vote,
    Scale,
    DollarSign,
    CalendarDays,
    ScrollText,
    ListChecks,
    Users,
    Files,
    GalleryHorizontal,
    Heart,
    Album,
  };

  const SelectedIcon = icons[name];

  return <SelectedIcon width={width} {...rest} />;
};
