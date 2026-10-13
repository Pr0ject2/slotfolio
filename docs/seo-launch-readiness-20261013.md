# SEO: подготовка Slotfolio к запуску

Дата: 2026-10-13. База: main bd4eadde0ce5950cad883a929129237d83925844 (PR #471, Pages #451 SUCCESS).

## Режим публикации

Основной домен ещё не выбран. Текущий GitHub Pages остаётся превью с NEXT_PUBLIC_INDEXABLE=false (или отсутствующим значением). Не включать индексацию как часть этого PR. Catalog-only, поиск и сравнение сохраняют собственный noindex и исключение из sitemap. Каталог остаётся 100 full dossiers + 900 catalog-only.

## Что подготовлено

- Нормализованные абсолютные canonical/OG/schema/sitemap URL: регистр hostname, Pages subpath без удвоения, slash перед query/fragment для static export. При включении индексации требуется явно заданный HTTPS hostname; localhost, IP и тестовые домены отклоняются.
- Общая BreadcrumbList по видимым хлебным крошкам. Существующие схемы досье, провайдеров и механик не дублируются.
- Article для двух материалов журнала и редакционной подборки: автор-редакция, URL страницы, описание, язык. Дата добавлена только каскадной статье, где 7 сентября 2026 уже указано в видимом тексте. Новые даты, рейтинги и отзывы не выдумываются.
- Главная получает предметный title «Slotfolio — каталог слотов, механики и RTP».
- Регрессионные проверки для основного домена и Pages, sitemap, canonical параметризованного каталога, JSON-LD и исключённых страниц.

## Перед включением индексации

1. Выбрать домен и хостинг. Настроить HTTPS и одну основную версию hostname; остальные версии должны отдавать постоянный redirect. DNS, домен и Search Console в этом PR не настраиваются.
2. Для корневого домена установить NEXT_PUBLIC_SITE_URL=https://<основной-домен>, NEXT_PUBLIC_BASE_PATH="". Текущий deploy-pages.yml жёстко задаёт github.io/slotfolio: при переезде его требуется изменить либо заменить конфигурацией целевого хостинга. Не включать INDEXABLE у старого workflow для запуска другого домена.
3. Если сохраняется static export, trailingSlash должен соответствовать хостингу. При серверном Next.js отдельно проверить серверные routes и HTTP security headers. Нынешний export включается через GITHUB_ACTIONS=true.
4. Сначала собрать и проверить новый домен с INDEXABLE=false. Проверить 200 у canonical URL, 404 у отсутствующей страницы, CSS/изображения, отсутствие ссылок canonical/OG/JSON-LD/sitemap на localhost или старое превью.
5. Назначить реальный контакт редакции: editorial-policy пока обещает адрес для исправлений перед публичным запуском. Не подставлять выдуманный email. Проверить страницы about/privacy/responsible-gaming на соответствие фактической работе сайта.
6. После проверки включить NEXT_PUBLIC_INDEXABLE=true только на основном домене и пересобрать. Проверить robots meta индексируемых страниц, noindex у /search, /compare, /slots/catalog/* и sitemap без этих URL. robots.txt должен находиться в корне hostname: файл /slotfolio/robots.txt не управляет всем github.io hostname. Для noindex-страниц нельзя одновременно закрывать обход в production robots.txt, иначе поисковик не увидит метатег.
7. Подтвердить владение в Google Search Console и Яндекс Вебмастере. Передать sitemap основного домена, проверить несколько URL и structured data через Rich Results Test. Владение аккаунтами/токены подтверждения потребуются отдельно.
8. После запуска наблюдать за исключениями индексации, canonical, 404 и Core Web Vitals по реальным пользователям. Этот PR не обещает позиции или расширенный сниппет.

## Отдельные следующие задачи

- Решение об индексации 900 catalog-only страниц требует отдельной контентной и поисковой оценки; наличие технических характеристик само по себе не отменяет нынешнюю политику noindex.
- Индексируемая пагинация каталога: текущие query-варианты canonical к /slots, а открываемые досье перечислены в sitemap. Если понадобится самостоятельная индексация страниц списка, сначала подготовить серверные URL с отличающимся HTML и self-canonical, затем менять политику query-параметров.
- Подготовить редакционную OG-обложку для общих разделов: нынешний fallback использует существующий artwork Gates of Olympus. В этом PR изображения не менялись.

## Первичные рекомендации

- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

Проверки публикации и итоговый SHA фиксируются в CURRENT MASTER после полного CI и Pages SUCCESS.
