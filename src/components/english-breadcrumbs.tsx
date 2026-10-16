import Link from "next/link";

export function EnglishBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs" lang="en">
      <Link href="/en">Home</Link>
      {items.map((item, index) => (
        <span key={index}>
          <span aria-hidden="true">/</span>{" "}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
