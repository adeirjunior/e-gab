import { Card, cn, Image, Link } from "@nextui-org/react";
import styles from "./post-card-small.module.scss";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BlurImage from "../arquives/blur-image";
import { placeholderBlurhash } from "@/lib/utils";

export interface PostCardProps {
 post: {
    description: string | null;
    image: string | null;
    imageBlurhash: string | null;
    createdAt: Date;
    title: string | null;
    slug: string;
  }
}

export const PostCardSmall = ({ post }: PostCardProps) => {
  return (
    <Card
      as={Link}
      isPressable
      href={`/posts/${post.slug}`}
      className={cn(styles.root)}
    >
      <div className={styles["post-card-image-wrapper"]}>
        <BlurImage
          alt={post.title ?? ""}
          blurDataURL={post.imageBlurhash ?? placeholderBlurhash}
          className={styles["post-card-image"]}
          width={60}
          height={60}
          placeholder="blur"
          src={post.image ?? "/placeholder.png"}
        />
      </div>
      <div>
        <h3 className={styles["post-card-title"]}>{post.title}</h3>
        <time
          dateTime={format(post.createdAt, "P")}
          className={styles["post-card-time"]}
        >
          {format(post.createdAt, "PPP", { locale: ptBR })}{" "}
        </time>
      </div>
    </Card>
  );
};
