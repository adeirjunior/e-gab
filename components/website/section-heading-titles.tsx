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
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-bold text-[#3B5DD9] sm:text-xl">{subtitle}</span>
      <h2 id={id} className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 hidden text-gray-500 sm:block sm:text-xl">
        {description}
      </p>
    </div>
  );
}

   //     <div className="mx-auto max-w-3xl text-center">
  //        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
  //          Trusted by eCommerce Businesses
 //         </h2>

  //        <p className="mt-4 text-gray-500 sm:text-xl">
 //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
  //          dolores laborum labore provident impedit esse recusandae facere
 //           libero harum sequi.
 //         </p>
 //       </div>;

