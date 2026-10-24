import { NotFoundContent } from "@/components/not-found-content";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({title:"Página no encontrada",description:"Busca un juego por su nombre o vuelve a la página de inicio de Slotfolio.",path:"/es/404",noIndex:true});
export default function Page(){return <NotFoundContent locale="es" />;}
