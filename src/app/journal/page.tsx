import { ComparisonLinks } from "@/components/editorial-comparison";
import Link from "next/link";
import { Breadcrumbs } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { journalGuides } from "@/lib/journal-guides";
import styles from "./guides.module.css";

export const metadata = pageMetadata({
  title: "Разборы и гайды",
  description:
    "Редакционные разборы Slotfolio: игровые механики, RTP, бонусные условия и практические объяснения без обещаний выигрыша.",
  path: "/journal",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Разборы" }]} />
      <div className="page-heading">
        <div>
          <span className="eyebrow accent">Механики, RTP и бонусы</span>
          <h1>Разборы и гайды</h1>
        </div>
        <p>
          Как устроены игровые автоматы, что значит RTP
          <br />и на какие условия стоит обратить внимание.
        </p>
      </div>
      <section className="feature-band" style={{ marginTop: 0 }}>
        <div className="feature-band-title">
          <span className="eyebrow">Большой разбор / 9 минут</span>
          <h2>
            <Link href="/journal/how-cascades-work">
              Один спин.
              <br />
              <em>Несколько событий.</em>
            </Link>
          </h2>
          <p>
            Как каскады изменили устройство слотов — и почему цепная реакция не
            означает бесконечную игру.
          </p>
          <Link className="text-link" href="/journal/how-cascades-work">
            Читать материал ↗
          </Link>
        </div>
        <div className="cascade-art" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div className="cascade-column" key={i}>
              <span>◆</span>
              <span className={i === 1 ? "falling" : ""}>
                {i === 1 ? "↓" : "✦"}
              </span>
              <span>◆</span>
            </div>
          ))}
          <small>ВНУТРИ МЕХАНИКИ</small>
        </div>
      </section>
      <section className={styles.index} aria-labelledby="practical-guides">
        <h2 id="practical-guides">Разобраться в правилах</h2>
        <div className={styles.list}>
          {journalGuides.map((guide) => (
            <article className={styles.item} key={guide.slug}>
              <span className="eyebrow accent">{guide.category}</span>
              <h3>
                <Link href={`/journal/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <p>{guide.description}</p>
              <Link className="text-link" href={`/journal/${guide.slug}`}>
                Читать гайд ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
      <div className="hub-list">
        <Link href="/journal/understanding-rtp">
          <span className="number">Гайд</span>
          <h2>Что на самом деле означает RTP</h2>
          <p>
            Почему 96% не обещают возврат в отдельной сессии. Короткое
            объяснение без мифов.
          </p>
          <b>↗</b>
        </Link>
        <Link href="/bonuses">
          <span className="number">Гайд</span>
          <h2>Бонус начинается с условий</h2>
          <p>
            Вейджер, срок действия и ограничения: как прочитать предложение до
            активации.
          </p>
          <b>↗</b>
        </Link>
      </div>
    <ComparisonLinks locale="ru" />
    </>
  );
}
