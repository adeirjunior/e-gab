import { SVGProps } from "react";

export default function Bookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0V17.7299C1 18.2126 1.25163 18.6698 1.64052 18.873C2.05229 19.0762 2.5098 19.0254 2.85294 18.7206L2.87582 18.6952L8 13.8944L13.1242 18.6952L13.1471 18.7206C13.3529 18.8984 13.6046 19 13.8562 19C14.0163 19 14.1993 18.9492 14.3595 18.8476C14.7484 18.6444 15 18.1872 15 17.7045V0"
        stroke="#102037"
      />
    </svg>
  );
}
