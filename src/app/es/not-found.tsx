import { NotFoundContent } from "@/components/not-found-content";
export const metadata = { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } };
export default function NotFound(){return <NotFoundContent locale="es" />;}
