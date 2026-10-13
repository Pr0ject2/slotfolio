# Slotfolio: переход на slotfolio.org (план, НЕ опубликовано)

Дата: 2026-10-13. Регистратор: Porkbun. Текущий Pages preview `https://pr0ject2.github.io/slotfolio/` должен оставаться доступным до готовности домена.

## Стоп-фактор перед merge этого PR

**НЕ мержить PR с заменой `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_PATH`, пока не подтверждены GitHub Pages Custom domain, DNS и HTTPS.** Мы используем GitHub Actions, поэтому `CNAME` в репозитории не требуется и GitHub его игнорирует. Этот PR намеренно собирает статический сайт в корень hostname и принудительно оставляет `NEXT_PUBLIC_INDEXABLE=false`.

## Настройки, требующие действий владельца

1. В GitHub под владельцем `Pr0ject2` желательно подтвердить право на `slotfolio.org` (Settings → Pages → Verified domains). Для подтверждения GitHub покажет **уникальную TXT-запись**; не придумывать значение.
2. В репозитории `Pr0ject2/slotfolio`: Settings → Pages → Custom domain → `slotfolio.org`. Это настройка Pages администратора репозитория, в этом PR её нельзя заменить файлом.
3. В Porkbun: Domain Management → `slotfolio.org` → DNS Records. Для корневого домена Host оставить пустым; четыре A-записи:

   | Type | Host | Answer |
   |---|---|---|
   | A | (пусто) | 185.199.108.153 |
   | A | (пусто) | 185.199.109.153 |
   | A | (пусто) | 185.199.110.153 |
   | A | (пусто) | 185.199.111.153 |
   | CNAME | www | pr0ject2.github.io |

   Удалить только **конфликтующие парковочные/старые** A, AAAA, ALIAS, CNAME для `@` и `www`. Не удалять случайно TXT подтверждения или MX для будущей почты. Не ставить CNAME на apex и не направлять `www` на путь `/slotfolio`. Не использовать wildcard `*`.
4. Подождать DNS (иногда до 24 часов), проверить запись и успешное HTTPS в GitHub Pages. При доступной опции включить **Enforce HTTPS**.
5. Перед merge проверить доступность `https://slotfolio.org/` и перенаправление `https://www.slotfolio.org/` → корневой hostname. В процессе переноса возможна временная несовместимость пути со старым Pages preview; поэтому менять workflow только на финальном этапе.

## Порядок публикации

1. Полный CI SUCCESS на точном финальном PR head, проверка `mergeable_state=clean`, guarded merge с `expected_head_sha`.
2. Pages workflow build/deploy SUCCESS и `main == merge SHA == Pages head SHA`.
3. Проверка нового статического сайта: корень, `/slots/`, досье, каталог, фильтры, изображения, CSS, /404 и ссылки; canonical / OG / Article / BreadcrumbList / sitemap должны содержать **только** `https://slotfolio.org/` без `github.io/slotfolio`, `localhost` или удвоенного префикса.
4. `https://slotfolio.org/robots.txt` должен остаться запретительным во время проверки, главные страницы должны иметь `noindex`; `/search`, `/compare`, `/slots/catalog/*` дополнительно останутся noindex и исключены из sitemap.
5. **Отдельно после проверки:** назначить реальный контакт редакции, проверить политику конфиденциальности/ответственную игру/партнёрские ссылки, решить вопрос индексации. Только затем отдельный PR для осознанного включения `NEXT_PUBLIC_INDEXABLE=true` на реальном домене, с повторным SEO QA, GSC и Яндекс Вебмастером.

Не утверждать, что домен уже настроен или сайт официально запущен, до успешных внешних проверок.

Документация: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site и https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun .
