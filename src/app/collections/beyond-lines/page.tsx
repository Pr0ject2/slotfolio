import { GameCollectionPage } from "@/components/game-collection";
import { gameCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";
const collection = gameCollections.find(item => item.slug === "beyond-lines")!;
export const metadata = pageMetadata({ title: collection.title, description: collection.introduction, path: "/collections/beyond-lines", openGraphType: "article" });
export default function Page() { return <GameCollectionPage collection={collection} />; }
