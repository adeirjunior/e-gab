type Props = {
  subtitle: string;
  title: string;
  description: string;
  id: string;
};

export default function SectionHeadingTitles({
  id,
  subtitle,
  title,
  description,
}: Props) {
  return (
    <div className="text-center">
      <span className="text-sm font-bold text-[#3B5DD9]">{subtitle}</span>
      <h1 id={id} className="text-xl font-bold">{title}</h1>
      <p className="hidden sm:block">{description}</p>
    </div>
  );
}
