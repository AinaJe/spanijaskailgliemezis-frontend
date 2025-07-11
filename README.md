# Projekta Tehniskais Apraksts

Šis dokuments sniedz detalizētu tehnisku pārskatu par "Spānijas kailgliemezis" frontend projektu. Tajā aprakstīta projekta arhitektūra, komponentes, izmantotās tehnoloģijas, kā arī informācija par bekendu un izvietošanas procesu.

## 1. Projekta pārskats

"Spānijas kailgliemezis" frontend projekts ir lietotāja saskarne (UI), kas izveidota, izmantojot **React** bibliotēku un **Vite** kā modernu būvēšanas rīku. Tā galvenais mērķis ir vizuāli un interaktīvi attēlot informāciju par Spānijas kailgliemežu (Arion vulgaris) invāziju, apkarošanas metodēm, biedrības aktivitātēm, kā arī nodrošināt informatīvos resursus (rakstus, video). Projekts ietver arī administrācijas paneli satura pārvaldībai.

## 2. Projekta struktūra

Projekts ir loģiski sadalīts mapēs, lai nodrošinātu moduļu veidošanu un vieglu uzturēšanu:

```text
src/
├── api/             # API pieprasījumu loģika
├── components/      # Atkārtoti lietojamas UI komponentes
│   ├── cards/       # Ar kartītēm saistītās komponentes
│   ├── common/      # Vispārīgas, koplietojamas komponentes (modālie logi, akordeoni, paginācija)
│   ├── forms/       # Formu komponentes (pievienošanai/rediģēšanai)
│   ├── layout/      # Izkārtojuma komponentes (Header, Footer)
│   └── lists/       # Sarakstu attēlošanas komponentes
├── data/            # Simulētie dati (tiks aizstāti ar reālu bekendu)
├── hooks/           # Pielāgotie React āķi (hooks)
├── pages/           # Galvenās lapu komponentes (HomePage, AdminPage u.c.)
├── utils/           # Vispārīgas utilītas funkcijas
├── App.jsx          # Galvenā aplikācijas komponente
├── App.css          # Globālie aplikācijas izkārtojuma stili
├── config.js        # Aplikācijas konfigurācijas mainīgie (piem., API URL)
├── main.jsx         # React aplikācijas sākumpunkts
└── index.css        # Globālie stili un CSS mainīgie
```


## 3. Komponentu uzskaitījums un funkcijas

Projektā ir daudzfunkcionālas un atkārtoti izmantojamas komponentes, kas nodrošina moduļu veidošanu.

### `/src/pages` - Galvenās lapas

-   **`AdminPage.jsx`**: Administratīvais panelis, kas apkopo visas datu pārvaldības sadaļas. Nodrošina iespēju pievienot, rediģēt un dzēst autorus, tēmas, kartītes, rakstus un video. Ietver arī kartīšu secības pārvaldību ar drag-and-drop funkcionalitāti.
    -   **Izmantotās klases**: `.admin-page-container`, `.admin-page-title`, `.admin-action-buttons`, `.admin-action-button`, `.admin-content-sections`, `.admin-table-wrapper`, `.admin-data-table`, `.admin-table-actions`, `.admin-table-button`, `.view-button`, `.edit-button`, `.delete-button`, `.drag-handle`, `.admin-table-filters`.
-   **`ArticlesPage.jsx`**: Attēlo rakstu sarakstu ar lapošanas funkcionalitāti un tēmas detalizēto aprakstu.
-   **`CardsPage.jsx`**: Lapa, kas attēlo kartīšu sarakstu ar plašām filtrēšanas opcijām (pēc autora, tēmas un manuāli atlasītām kartītēm) un lapošanu. Filtru konfigurēšanai izmanto modālo logu.
    -   **Izmantotās klases**: `.toggle-filters-button`.
-   **`HomePage.jsx`**: Sākumlapa, kas attēlo vispārīgu informāciju par vietni (caur `ThemeDetailDisplay`) un atlasītas kartītes no "Sākums" tēmas ar lapošanu.
-   **`VideosPage.jsx`**: Attēlo video sarakstu ar lapošanas kontroli un tēmas detalizēto aprakstu.

### `/src/components/layout` - Izkārtojuma komponentes

-   **`Header.jsx`**: Vietnes galvene ar logo ("Arion vulgaris"), galveno navigāciju, dinamiskām apakšizvēlnēm un responsīvu hamburgera izvēlni mobilajām ierīcēm. Ietver arī fiksētu banera joslu ar uzrakstu.
    -   **Izmantotās klases**: `.app-header`, `.site-tagline`, `.header-banner`, `.header-gif`, `.main-header-content`, `.site-logo-placeholder`, `.main-navigation ul`, `.main-navigation li`, `.main-navigation li button`, `.main-navigation li button:hover`, `.main-navigation li button.active`, `.dropdown-arrow-icon`, `.nav-item.dropdown.open-desktop .dropdown-content`, `.dropdown-content`, `.dropdown-content button`, `.dropdown-content button:hover`, `.dropdown-content button.active`, `.hamburger-menu-button`, `.hamburger-label`, `.hamburger-icon-wrapper`, `.hamburger-icon`.
-   **`Footer.jsx`**: Vietnes kājene ar autortiesību informāciju, sociālo tīklu saitēm un noderīgām ārējām saitēm.
    -   **Izmantotās klases**: `.app-footer`, `.footer-content-wrapper`, `.footer-section`, `.copyright p`, `.footer-section h4`, `.social-icons`, `.social-icon-link`, `.external-links ul`, `.external-links li`, `.external-links a`.

### `/src/components/cards` - Kartīšu komponentes

-   **`Card.jsx`**: Attēlo vienu kartīti ar virsrakstu, attēla priekšskatījumu (vai vietturi), kopsavilkumu, autora informāciju un "Lasīt vairāk" pogu.
    -   **Izmantotās klases**: `.card`, `.card h3`, `.card-image-preview`, `.card-preview-main-image`, `.card-image-placeholder`, `.card-summary`, `.card-author-display`, `.card-read-more-button`.
-   **`CardList.jsx`**: Attēlo kartīšu sarakstu. Ja nav kartīšu, parāda atbilstošu ziņojumu.
    -   **Izmantotās klases**: `.card-list-container`, `.no-cards-message`.
-   **`CardFilter.jsx`**: Nodrošina filtrēšanas funkcionalitāti kartītēm (autors, tēma, atlase).
    -   **Izmantotās klases**: `.card-filter-container`, `.filter-group`, `.filter-label`, `.author-checkbox-group`, `.card-selection-list`, `.accordion-filter-wrapper`, `.card-selection-list.nested`, `.author-checkbox-label`, `.card-selection-label`, `.card-selection-title`, `.card-selection-theme-summary`, `.author-checkbox`, `.card-selection-checkbox`, `.no-cards-message-filter`, `.selection-actions`, `.selection-button`, `.selection-button.primary`, `.selection-button.secondary`, `.selection-button.confirm`.
-   **`ActiveFiltersDisplay.jsx`**: Attēlo pašlaik aktīvos filtrus kā "tagus" ar iespēju tos noņemt vai notīrīt.
    -   **Izmantotās klases**: `.active-filters-display-container`, `.active-filters-label`, `.active-filters-list`, `.active-filter-tag`, `.remove-filter-button`, `.clear-all-filters-button`.
-   **`ImageCarousel.jsx`**: Attēlu karuseļa komponente ar navigācijas bultām un lapošanas indikatoru.
    -   **Izmantotās klases**: `.image-carousel`, `.image-carousel-display`, `.image-carousel-image`, `.image-carousel-description`, `.image-carousel-button`, `.image-carousel-button.prev`, `.image-carousel-button.next`, `.image-carousel-pagination`, `.image-carousel-no-images`.

### `/src/components/forms` - Formu komponentes

-   **`AddAuthorForm.jsx`**: Forma jauna autora pievienošanai.
-   **`AddThemeForm.jsx`**: Forma jaunas tēmas pievienošanai ar nosaukuma, kopsavilkuma un apraksta laukiem.
-   **`AddArticleForm.jsx`**: Forma jauna raksta pievienošanai ar datumu, nosaukumu, kopsavilkumu, saiti un autoru.
-   **`AddVideoForm.jsx`**: Forma jauna video pievienošanai ar datumu, nosaukumu, kopsavilkumu, video avotu un aprakstu.
-   **`CardForm.jsx`**: Sarežģīta forma jaunas kartītes izveidei ar vairākām cilnēm, ietverot attēlu augšupielādi un kārtošanu.
    -   **Izmantotās klases**: `.card-form-container`, `.card-form-title`, `.tab-navigation`, `.tab-button`, `.tab-button.active`, `.tab-content`, `.tab-pane`, `.card-form-group`, `.card-form-label`, `.card-form-input`, `.card-form-textarea`, `.card-form-select`, `.card-form-submit-button`.
-   **`CardFormImageSection.jsx`**: `CardForm` apakškomponente, kas pārvalda attēlu pievienošanu, rediģēšanu, noņemšanu un secības maiņu.
    -   **Izmantotās klases**: `.card-form-image-section`, `.image-source-type-selector`, `.image-form-items-container`, `.image-form-item`, `.image-remove-button`, `.card-form-image-preview-wrapper`, `.card-form-image-preview`, `.card-form-image-placeholder`, `.card-form-add-image-button`, `.drag-handle-images`.
-   **`EditArticleForm.jsx`**: Forma esoša raksta rediģēšanai.
-   **`EditAuthorForm.jsx`**: Forma esoša autora vārda rediģēšanai.
-   **`EditCardForm.jsx`**: Forma esošas kartītes rediģēšanai.
-   **`EditThemeForm.jsx`**: Forma esošas tēmas rediģēšanai.
-   **`EditVideoForm.jsx`**: Forma esoša video rediģēšanai.
    -   *(Visas pievienošanas/rediģēšanas formas izmanto koplietojamās klases no `AddForm.css`: `.add-form`, `.form-group`, `.form-control`, `.form-actions`, `.submit-button`, `.cancel-button`)*.

### `/src/components/lists` - Sarakstu komponentes

-   **`ArticleList.jsx`**: Attēlo rakstu sarakstu tabulas formā.
    -   **Izmantotās klases**: `.article-list-container`, `.empty-list-message`, `.article-table`, `.action-button`, `.view-button`, `.no-link-message`.
-   **`VideoList.jsx`**: Attēlo video sarakstu tabulas formā, koplietojot stilus ar `ArticleList`.
    -   **Izmantotās klases**: `.video-list-container`, `.empty-list-message`, `.video-table`, `.video-description-text`.

### `/src/components/common` - Koplietojamās komponentes

-   **`Accordion.jsx`**: Atkārtoti lietojama akordeona komponente satura paslēpšanai/parādīšanai.
    -   **Izmantotās klases**: `.accordion-item`, `.accordion-button`, `.accordion-title`, `.accordion-icon`, `.accordion-content`.
-   **`AdminActionButtons.jsx`**: Pogu grupa administratīvajā panelī jaunu ierakstu pievienošanai.
-   **`AdminModals.jsx`**: Komponente, kas centralizē visus administratīvajā panelī izmantotos pievienošanas modālos logus.
-   **`AdminSection.jsx`**: Universāla sadaļa administratīvajam panelim ar tabulu un lapošanu.
-   **`PageRenderer.jsx`**: Loģikas komponente, kas dinamiski attēlo atbilstošo lapu.
-   **`Pagination.jsx`**: Lapošanas komponente sarakstu navigācijai.
    -   **Izmantotās klases**: `.pagination-container`, `.items-per-page-selector`, `.items-per-page-selector label`, `.items-per-page-select`, `.pagination-list`, `.pagination-item`, `.pagination-button`, `.pagination-button.active`, `.pagination-button:disabled`, `.pagination-ellipsis`.
-   **`RichTextEditor.jsx`**: Teksta redaktors ar formatēšanas iespējām (izmantojot TipTap).
    -   **Izmantotās klases**: `.rich-text-editor-container`, `.is-view-only`, `.tiptap-toolbar`, `.tiptap-toolbar-row`, `.tiptap-toolbar-row.top-border`, `.tiptap-button`, `.is-active`, `.color-swatch`, `.tiptap-editor`.
-   **`ThemeDetailDisplay.jsx`**: Attēlo detalizētu informāciju par tēmu.
    -   **Izmantotās klases**: `.theme-detail-display-container`, `.theme-detail-title`, `.theme-detail-summary`, `.theme-detail-description`.

### `/src/components/common/Modals` - Modālo logu komponentes

-   **`Modal.jsx`**: Universāla modālā loga komponente.
    -   **Izmantotās klases**: `.modal-overlay`, `.modal-content`, `.modal-title`, `.modal-close-button`, `.modal-body`.
-   **`CardDetailModal.jsx`**: Modālais logs, kas attēlo pilnu informāciju par kartīti.
-   **`CardDetailModalContent.jsx`**: Modālā loga satura komponente, kas attēlo kartītes detalizētu informāciju.
    -   **Izmantotās klases**: `.card-detail-modal-meta`, `.card-detail-modal-theme`, `.card-detail-modal-author`, `.card-detail-modal-summary`, `.card-detail-content-section`.
-   **`ConfirmDeleteModal.jsx`**: Modālais logs dzēšanas apstiprināšanai.
    -   **Izmantotās klases**: `.item-to-delete-info`, `.card-detail-modal-actions`.
-   **`InfoModal.jsx`**: Vispārīgs informācijas modālais logs.
-   **`ImageFullscreenModal.jsx`**: Modālais logs attēla attēlošanai pilnekrāna režīmā.
    -   **Izmantotās klases**: `.fullscreen-modal-overlay`, `.fullscreen-modal-content`, `.fullscreen-modal-image`, `.fullscreen-modal-description`, `.fullscreen-modal-close-button`.

## 4. Backend un datubāzes mainīgie (simulētie dati)

Šis projekts ir izstrādāts, lai mijiedarbotos ar backend sistēmu. Pašlaik frontendā tiek izmantoti simulēti dati testēšanai un demonstrācijai, taču tas ir sagatavots reāliem API izsaukumiem.

* **Backend tehnoloģija**: Projekts ir paredzēts sadarbībai ar **CodeIgniter 4** bekendu.
* **Datubāze**: Tiek plānota izmantošana ar **phpMyAdmin** datubāzi ar nosaukumu `spanijaskailgliemezis_db`.

* **API bāzes URL**:
    * `src/config.js` definē `API_BASE_URL` kā `http://localhost:8080/api`. Izvietošanas vidē šis URL būs jāatjaunina uz jūsu reālo bekenda adresi.

* **API galapunkti (Endpointi)**:
    * `src/api/index.js` nodrošina metodes mijiedarbībai ar šādiem entītiem:
        * `authors` (autori)
        * `themes` (tēmas)
        * `cards` (kartītes/ieteikumi)
        * `articles` (raksti)
        * `videos` (video)
    * Katram entītam ir definētas standarta RESTful metodes: `GET` (iegūt), `POST` (izveidot), `PUT` (atjaunināt), `DELETE` (dzēst).

* **Simulētie dati**:
    * `src/data/simulatedAuthors.js`, `simulatedThemesData.js`, `simulatedCards.js`, `simulatedArticles.js`, `simulatedVideos.js` satur simulētus datus, kas tiks aizstāti ar reāliem API izsaukumiem.

## 5. Pielāgotie āķi (Hooks) un utilītas

* **`useData.js`**: React āķis, kas pārvalda aplikācijas galveno datu ielādi un stāvokli, bagātinot datus ar papildu informāciju (piemēram, autora vārdu).
* **`useFilters.js`**: Pārvalda filtrēšanas stāvokli (aktīvā tēma, atlasītie autori, atlasītās kartītes) un saistīto loģiku.
* **`usePagination.js`**: Pārvalda lapošanas stāvokli un loģiku, nodrošinot lapotus datus un nepieciešamos rekvizītus `Pagination` komponentei.
* **`dateUtils.js`**: Satur palīgfunkcijas datuma un laika formatēšanai.

## 6. Būvēšana un izvietošana

* **Būvēšanas rīks**: Projekts izmanto [Vite](https://vitejs.dev/) kā ātrdarbīgu un efektīvu būvēšanas rīku.
* **GitHub Pages konfigurācija**:
    * `vite.config.js` ir konfigurēts ar `base: '/spanijaskailgliemezis-frontend/'`, kas nodrošina pareizu resursu ceļu atrisināšanu, kad lapa tiek izvietota GitHub Pages apakšceļā.
    * Attēlu ceļi JavaScript un CSS failos tiek atrisināti, izmantojot absolūtos ceļus (piem., `url('/images/...')`), kurus Vite apstrādā būvēšanas laikā, pieliekot `base` URL priekšā.
* **Automatizēta izvietošana ar GitHub Actions**:
    * Projekts izmanto GitHub Actions, lai automatizētu būvēšanas un izvietošanas procesu uz GitHub Pages. Darbplūsmas fails atrodas `.github/workflows/deploy.yml`.
    * Darbplūsma kompilē projektu (`npm run build`) un izvieto `dist` mapes saturu uz `gh-pages` zaru, izmantojot `peaceiris/actions-gh-pages@v3` darbību.
    * Darbplūsmai ir piešķirtas nepieciešamās `pages: write` atļaujas, lai nodrošinātu veiksmīgu izvietošanu.
    * GitHub Pages iestatījumos ir manuāli jānorāda `gh-pages` zars un `/(root)` mape kā pasniegšanas avots.
* **`.nojekyll` fails**: Projekta saknē ir iekļauts tukšs `.nojekyll` fails, lai nodrošinātu, ka GitHub Pages apiet Jekyll apstrādi, kas varētu traucēt React aplikācijas izvietošanu.

## 7. Izmantotās tehnoloģijas

* **React**: Lietotāja saskarnes veidošanai.
* **Vite**: Ātrai būvēšanai un izstrādes serverim.
* **Font Awesome**: Ikonu izmantošanai.
* **TipTap**: Bagātinātā teksta redaktora funkcionalitātei.
* **@dnd-kit**: Drag-and-drop funkcionalitātei (piemēram, kartīšu un attēlu secības maiņai).
* **CSS Custom Properties (CSS mainīgie)**: Globālu tēmas krāsu, fontu un izmēru pārvaldībai (`src/index.css`).
* **Google Fonts (Montserrat)**: Nodrošina modernu, latviešu valodu atbalstošu fontu uzrakstam galvenē.

## 8. Responsīvais dizains un navigācija

Projekts ir izstrādāts ar responsīvu dizainu, lai nodrošinātu optimālu pieredzi dažādās ierīcēs:

* **Fiksētā galvene**: Visa galvene (`.app-header`), kas ietver uzrakstu, baneri un navigācijas joslu, ir fiksēta ekrāna augšpusē, nodrošinot vieglu piekļuvi navigācijai jebkurā brīdī.
* **Banera josla**:
    * **Datorā**: Banera josla ir 200px augsta, un tajā tiek attēlots GIF attēls. Uzraksts ("Brīvprātīgā kustība pret Spānijas kailgliemezi") ir absolūti pozicionēts un centrēts virs šī GIF attēla, bez sava fona, nodrošinot vizuālu pārklāšanos.
    * **Mobilajā ierīcē**: Banera josla ir 120px augsta un attēlo GIF attēlu kā fonu. Uzraksts ir absolūti pozicionēts un centrēts virs šī fona, saglabājot konsekventu vizuālo izkārtojumu.
* **Galvenā navigācija**:
    * **Datorā**: Galvenā navigācija tiek attēlota horizontāli zem banera.
    * **Mobilajā ierīcē**: Tiek izmantota hamburgera izvēlne, kas atver vertikālu navigācijas sarakstu. Hamburgera poga ir fiksēta labajā pusē.
* **Kartīšu izkārtojums**:
    * **Datorā**: Kartītes tiek centrētas un izvietotas vairākās kolonnās.
    * **Planšetēs**: Kartītes tiek centrētas un izvietotas divās kolonnās.
    * **Telefonos**: Kartītes tiek izvietotas vienā kolonnā un centrētas.
* **Izvēlnes elementu `hover`/`active` stāvokļi**:
    * Gan galvenajā navigācijā, gan apakšizvēlnēs `hover` efekts tiek panākts, mainot tikai teksta krāsu (uz `var(--secondary-color)`) un pievienojot nelielu `transform` efektu, lai vizuāli izceltu.
    * `Active` stāvoklim (galvenās un apakšizvēlnes elementiem) tiek izmantota atšķirīga fona krāsa (`var(--secondary-color)` galvenajai un `var(--info-color)` apakšizvēlnei) un gaiša teksta krāsa.
    * Apakšizvēlnes elementiem ir pievienota statiska atkāpe (indentācija).