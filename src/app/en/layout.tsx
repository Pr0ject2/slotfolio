// English pages remain static: no runtime locale negotiation or server headers.
// The explicit language boundary also works when JavaScript is disabled.
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
