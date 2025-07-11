# Projekta komponentu struktūra

Šis ir pārskats par visām projekta React komponentēm, to atrašanās vietu un funkcionalitāti, kā arī katrā komponentē izmantotajām CSS klasēm.

### `/src/pages` - Galvenās lapas

- **`AdminPage.jsx`**
  - **Apraksts**: Administratīvais panelis, kas apkopo visas datu pārvaldības sadaļas, ļaujot pievienot, rediģēt un dzēst autorus, tēmas, kartītes, rakstus un video. Nodrošina arī iespēju mainīt kartīšu secību un filtrēt administratora skatu.
  - **Izmantotās klases (no `AdminPage.css` un koplietotajiem stiliem)**:
    - `.admin-page-container`
    - `.admin-page-title`
    - `.admin-action-buttons`
    - `.admin-action-button`
    - `.admin-content-sections`
    - `.admin-table-wrapper`
    - `.admin-data-table`
    - `.admin-data-table th`
    - `.admin-data-table td`
    - `.admin-data-table tr:nth-child(even)`
    - `.admin-data-table tr:hover`
    - `.admin-table-actions`
    - `.admin-table-button`
    - `.view-button`
    - `.edit-button`
    - `.delete-button`
    - `.admin-data-table th:last-child`
    - `.admin-data-table td:last-child`
    - `.drag-handle`
    - `.admin-table-filters`
    - (Koplietotās klases no `Accordion.css`, `Modal.css`, `AddForm.css`, `Pagination.css`)

- **`ArticlesPage.jsx`**
  - **Apraksts**: Lapa, kas attēlo rakstu sarakstu, nodrošinot lapošanas funkcionalitāti. Tajā tiek integrēts `ThemeDetailDisplay`, lai rādītu detalizētu informāciju par aktīvo tēmu.
  - **Izmantotās klases**: (Galvenokārt no koplietotajiem stiliem un bērnu komponentēm)
    - (Klases no `ArticleList.css`, `Pagination.css`, `ThemeDetailDisplay.css`)

- **`CardsPage.jsx`**
  - **Apraksts**: Lapa, kas attēlo kartīšu sarakstu ar plašām filtrēšanas opcijām (pēc autora, tēmas un atlasītajām kartītēm) un lapošanu. Tā izmanto modālo logu filtru konfigurēšanai un parāda aktīvos filtrus.
  - **Izmantotās klases**: (Galvenokārt no koplietotajiem stiliem un bērnu komponentēm)
    - `.toggle-filters-button`
    - (Klases no `CardFilter.css`, `ActiveFiltersDisplay.css`, `ThemeDetailDisplay.css`, `CardList.css`, `Pagination.css`, `Modal.css`)

- **`HomePage.jsx`**
  - **Apraksts**: Sākumlapa, kas attēlo galveno informāciju par vietni (caur `ThemeDetailDisplay`) un atlasītas kartītes no "Sākums" tēmas ar lapošanu.
  - **Izmantotās klases**: (Galvenokārt no koplietotajiem stiliem un bērnu komponentēm)
    - (Klases no `ThemeDetailDisplay.css`, `CardList.css`, `Pagination.css`)

- **`VideosPage.jsx`**
  - **Apraksts**: Lapa, kas attēlo video sarakstu un lapošanas kontroles. Tāpat kā `ArticlesPage`, tā ietver `ThemeDetailDisplay` aktīvās tēmas detaļu attēlošanai.
  - **Izmantotās klases**: (Galvenokārt no koplietotajiem stiliem un bērnu komponentēm)
    - (Klases no `ArticleList.css` (koplieto video sarakstam), `Pagination.css`, `ThemeDetailDisplay.css`)

### `/src/components/layout` - Izkārtojuma komponentes

- **`Header.jsx`**
  - **Apraksts**: Vietnes galvene ar vietnes nosaukumu/logo, galveno navigāciju, kas ietver dinamiskus ieteikumu tēmu sarakstus (izkrītošajā izvēlnē) un mobilās izvēlnes funkcionalitāti.
  - **Izmantotās klases (no `Header.css`)**:
    - `.app-header`
    - `.site-tagline`
    - `.header-banner`
    - `.main-header-content`
    - `.site-logo-placeholder`
    - `.main-navigation ul`
    - `.main-navigation li`
    - `.main-navigation li button`
    - `.main-navigation li button:hover`
    - `.main-navigation li button.active`
    - `.dropdown-arrow-icon`
    - `.nav-item.dropdown.open-desktop .dropdown-arrow-icon`
    - `.dropdown-content`
    - `.nav-item.dropdown.open-desktop .dropdown-content`
    - `.dropdown-content button`
    - `.dropdown-content button:last-child`
    - `.dropdown-content button:hover`
    - `.dropdown-content button.active`
    - `.hamburger-menu-button`
    - `.hamburger-label`
    - `.hamburger-icon-wrapper`
    - `.hamburger-icon`
    - `.hamburger-menu-button.open .hamburger-icon:nth-child(1)`
    - `.hamburger-menu-button.open .hamburger-icon:nth-child(2)`
    - `.hamburger-menu-button.open .hamburger-icon:nth-child(3)`
    - `.main-navigation.open ul`
    - `.nav-item.dropdown.open-mobile-submenu .dropdown-content`
    - `.nav-item.dropdown.open-mobile-submenu .dropdown-arrow-icon`

- **`Footer.jsx`**
  - **Apraksts**: Vietnes kājene ar autortiesību informāciju, sociālo tīklu saitēm un noderīgām ārējām saitēm.
  - **Izmantotās klases (no `Footer.css`)**:
    - `.app-footer`
    - `.footer-content-wrapper`
    - `.footer-section`
    - `.footer-section:nth-child(1)`
    - `.footer-section:nth-child(2)`
    - `.footer-section:nth-child(3)`
    - `.copyright p`
    - `.footer-section h4`
    - `.social-icons`
    - `.social-icon-link`
    - `.social-icon-link:hover`
    - `.external-links ul`
    - `.external-links li`
    - `.external-links a`
    - `.external-links a:hover`

### `/src/components/cards` - Kartīšu komponentes

- **`Card.jsx`**
  - **Apraksts**: Attēlo vienu kartīti ar virsrakstu, attēla priekšskatījumu (vai vietturi), kopsavilkumu, autora informāciju un "Lasīt vairāk" pogu, kas atver detalizētu skatu.
  - **Izmantotās klases (no `Card.css`)**:
    - `.card`
    - `.card h3`
    - `.card-image-preview`
    - `.card-preview-main-image`
    - `.card-image-placeholder`
    - `.card-image-placeholder p`
    - `.card-summary`
    - `.card-author-display`
    - `.card-read-more-button`
    - `.card-read-more-button:hover`

- **`CardList.jsx`**
  - **Apraksts**: Attēlo kartīšu sarakstu, izmantojot `Card` komponentes. Ja nav kartīšu, parāda atbilstošu ziņojumu.
  - **Izmantotās klases (no `CardList.css`)**:
    - `.card-list-container`
    - `.no-cards-message`

- **`CardFilter.jsx`**
  - **Apraksts**: Nodrošina filtrēšanas funkcionalitāti kartītēm, ļaujot lietotājiem filtrēt pēc autora un atlasīt kartītes pēc nosaukuma, tās grupējot pa tēmām, izmantojot akordeona interfeisu.
  - **Izmantotās klases (no `CardFilter.css` un koplietotajiem stiliem)**:
    - `.card-filter-container`
    - `.filter-group`
    - `.filter-label`
    - `.author-checkbox-group`
    - `.card-selection-list`
    - `.accordion-filter-wrapper`
    - `.card-selection-list.nested`
    - `.author-checkbox-label`
    - `.card-selection-label`
    - `.card-selection-title`
    - `.card-selection-theme-summary`
    - `.author-checkbox`
    - `.card-selection-checkbox`
    - `.no-cards-message-filter`
    - `.selection-actions`
    - `.selection-button`
    - `.selection-button.primary`
    - `.selection-button.primary:hover`
    - `.selection-button.secondary`
    - `.selection-button.secondary:hover`
    - `.selection-button.confirm`
    - `.selection-button.confirm:hover`
    - `.toggle-filters-button`
    - `.toggle-filters-button:hover`
    - (Klases no `Accordion.css`)

- **`ActiveFiltersDisplay.jsx`**
  - **Apraksts**: Attēlo pašlaik aktīvos filtrus kā "tagus" virs satura, nodrošinot iespēju tos individuāli noņemt vai notīrīt visus.
  - **Izmantotās klases (no `ActiveFiltersDisplay.css`)**:
    - `.active-filters-display-container`
    - `.active-filters-label`
    - `.active-filters-list`
    - `.active-filter-tag`
    - `.remove-filter-button`
    - `.remove-filter-button:hover`
    - `.clear-all-filters-button`
    - `.clear-all-filters-button:hover`

- **`ImageCarousel.jsx`**
  - **Apraksts**: Attēlu karuseļa komponente, kas attēlo attēlu kolekciju ar navigācijas bultām un lapošanas indikatoru. Attēlus var noklikšķināt, lai atvērtu pilnekrāna skatu.
  - **Izmantotās klases (no `ImageCarousel.css`)**:
    - `.image-carousel`
    - `.image-carousel-display`
    - `.image-carousel-image`
    - `.image-carousel-description`
    - `.image-carousel-button`
    - `.image-carousel-button:hover`
    - `.image-carousel-button.prev`
    - `.image-carousel-button.next`
    - `.image-carousel-pagination`
    - `.image-carousel-no-images`

### `/src/components/forms` - Formu komponentes

- **`AddAuthorForm.jsx`**
  - **Apraksts**: Vienkārša forma jauna autora vārda pievienošanai.
  - **Izmantotās klases (no `AddForm.css`)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `.form-control:focus`
    - `.form-actions`
    - `.submit-button`
    - `.submit-button:hover`
    - `.cancel-button`
    - `.cancel-button:hover`

- **`AddThemeForm.jsx`**
  - **Apraksts**: Forma jaunas tēmas pievienošanai ar nosaukuma, kopsavilkuma un detalizēta apraksta laukiem, izmantojot `RichTextEditor`.
  - **Izmantotās klases (no `AddForm.css` un koplietotajiem stiliem)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.add-form .tiptap-editor`
    - `.add-form .tiptap-toolbar`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`
    - (Klases no `RichTextEditor.css`)

- **`AddArticleForm.jsx`**
  - **Apraksts**: Forma jauna raksta pievienošanai ar datuma, nosaukuma, kopsavilkuma, saites un autora izvēles laukiem (iespēja izvēlēties esošu autoru vai pievienot jaunu).
  - **Izmantotās klases (no `AddForm.css`)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`

- **`AddVideoForm.jsx`**
  - **Apraksts**: Forma jauna video pievienošanai. Ietver datuma, nosaukuma, kopsavilkuma, video avota (URL vai fails), apraksta (ar `RichTextEditor`) un autora izvēles (esošs vai jauns) laukus.
  - **Izmantotās klases (no `AddForm.css` un koplietotajiem stiliem)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.source-type-selector`
    - `.add-form .tiptap-editor`
    - `.add-form .tiptap-toolbar`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`
    - (Klases no `RichTextEditor.css`)

- **`CardForm.jsx`**
  - **Apraksts**: Sarežģīta forma jaunas kartītes izveidei, sadalīta vairākās cilnēs ("Tēma", "Pamatinformācija", "Attēlu slaidrāde"). Ietver laukus tēmai, nosaukumam, kopsavilkumam, aprakstam (ar `RichTextEditor`), autora izvēlei un attēlu pārvaldībai (ar vilkšanas un nomešanas funkcionalitāti).
  - **Izmantotās klases (no `CardForm.css` un koplietotajiem stiliem)**:
    - `.card-form-container`
    - `.card-form-title`
    - `.tab-navigation`
    - `.tab-button`
    - `.tab-button:hover`
    - `.tab-button.active`
    - `.tab-content`
    - `.tab-pane`
    - `.card-form-group`
    - `.card-form-label`
    - `.card-form-input`
    - `.card-form-textarea`
    - `.card-form-select`
    - `.card-form-input.new-theme`
    - `.card-form-submit-button`
    - (Klases no `AddForm.css` (Submit/Cancel pogas), `RichTextEditor.css`, `CardFormImageSection.css`)

- **`CardFormImageSection.jsx`**
  - **Apraksts**: `CardForm` apakškomponente, kas pārvalda attēlu pievienošanu, rediģēšanu, noņemšanu un secības maiņu (izmantojot Dnd-kit), kā arī attēla avota (URL vai augšupielāde) un autora norādīšanu.
  - **Izmantotās klases (no `CardForm.css`)**:
    - `.card-form-image-section`
    - `.card-form-image-section h3`
    - `.image-source-type-selector`
    - `.image-source-type-selector label`
    - `.image-form-items-container`
    - `.image-form-item`
    - `.image-form-item .card-form-label`
    - `.image-form-item input[type="text"]`
    - `.image-form-item textarea`
    - `.image-form-item select`
    - `.image-form-item input[type="file"]`
    - `.image-remove-button`
    - `.image-remove-button:hover`
    - `.card-form-image-preview-wrapper`
    - `.card-form-image-preview`
    - `.card-form-image-placeholder`
    - `.card-form-add-image-button`
    - `.card-form-add-image-button:hover`
    - `.drag-handle-images`
    - `.drag-handle-images:active`
    - `.new-author-input`

- **`EditArticleForm.jsx`**
  - **Apraksts**: Forma esoša raksta rediģēšanai, līdzīga `AddArticleForm`, bet ar sākotnējiem datiem no rediģējamā raksta.
  - **Izmantotās klases (no `AddForm.css`)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`

- **`EditAuthorForm.jsx`**
  - **Apraksts**: Forma esoša autora vārda rediģēšanai.
  - **Izmantotās klases (no `AddForm.css`)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`

- **`EditCardForm.jsx`**
  - **Apraksts**: Forma esošas kartītes rediģēšanai, līdzīga `CardForm`, bet ar ielādētiem esošajiem kartītes datiem un funkcionalitāti to atjaunināšanai.
  - **Izmantotās klases**: (Tās pašas, kas `CardForm`, jo izmanto `CardForm.css` un `CardFormImageSection`)
    - (Klases no `CardForm.css`, `RichTextEditor.css`)

- **`EditThemeForm.jsx`**
  - **Apraksts**: Forma esošas tēmas rediģēšanai, līdzīga `AddThemeForm`, bet ar ielādētiem esošajiem tēmas datiem.
  - **Izmantotās klases (no `AddForm.css` un koplietotajiem stiliem)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`
    - (Klases no `RichTextEditor.css`)

- **`EditVideoForm.jsx`**
  - **Apraksts**: Forma esoša video rediģēšanai, līdzīga `AddVideoForm`, bet ar ielādētiem esošajiem video datiem.
  - **Izmantotās klases (no `AddForm.css` un koplietotajiem stiliem)**:
    - `.add-form`
    - `.form-group`
    - `.form-group label`
    - `.form-control`
    - `textarea.form-control`
    - `.form-actions`
    - `.submit-button`
    - `.cancel-button`
    - (Klases no `RichTextEditor.css`)

### `/src/components/lists` - Sarakstu komponentes

- **`ArticleList.jsx`**
  - **Apraksts**: Attēlo rakstu sarakstu tabulas formā.
  - **Izmantotās klases (no `ArticleList.css`)**:
    - `.article-list-container`
    - `.empty-list-message`
    - `.article-table`
    - `.article-table th`
    - `.article-table td`
    - `.article-table tr:nth-child(even)`
    - `.article-table tr:hover`
    - `.action-button`
    - `.view-button`
    - `.view-button:hover`
    - `.no-link-message`

- **`VideoList.jsx`**
  - **Apraksts**: Attēlo video sarakstu tabulas formā, koplietojot stilus ar `ArticleList`.
  - **Izmantotās klases (no `ArticleList.css` (kas tiek importēts) un pašu komponenti)**:
    - `.video-list-container`
    - `.empty-list-message`
    - `.video-table`
    - `.video-table th`
    - `.video-table td`
    - `.video-table tr:nth-child(even)`
    - `.video-table tr:hover`
    - `.action-button`
    - `.view-button`
    - `.view-button:hover`
    - `.video-description-text`
    - `.no-link-message`

### `/src/components/common` - Koplietojamās komponentes

- **`Accordion.jsx`**
  - **Apraksts**: Atkārtoti lietojama akordeona komponente, kas ļauj parādīt vai paslēpt saturu, noklikšķinot uz virsraksta.
  - **Izmantotās klases (no `Accordion.css`)**:
    - `.accordion-item`
    - `.accordion-button`
    - `.accordion-button:hover`
    - `.accordion-button[aria-expanded="true"]`
    - `.accordion-button[aria-expanded="true"] .accordion-icon`
    - `.accordion-title`
    - `.accordion-icon`
    - `.accordion-content`

- **`AdminActionButtons.jsx`**
  - **Apraksts**: Pogu grupa administratīvajā panelī, kas nodrošina ātru piekļuvi jaunu ierakstu (autoru, tēmu, kartīšu, rakstu, video) pievienošanas modālajiem logiem.
  - **Izmantotās klases (no `AdminPage.css`)**:
    - `.admin-action-buttons`
    - `.admin-action-button`

- **`AdminModals.jsx`**
  - **Apraksts**: Komponente, kas centralizē visus administratīvajā panelī izmantotos pievienošanas modālos logus (`AddAuthorForm`, `AddThemeForm`, `CardForm`, `AddArticleForm`, `AddVideoForm`), atvieglojot to pārvaldību.
  - **Izmantotās klases**: (Galvenokārt no bērnu komponentēm un `Modal.css`)
    - (Klases no `Modal.css`)

- **`AdminSection.jsx`**
  - **Apraksts**: Universāla sadaļa administratīvajam panelim, kas ietver akordeonu, datu tabulu ar kolonnu definīcijām, rindu renderēšanas funkciju un lapošanas funkcionalitāti. Var ietvert arī papildu filtrus kā bērnu elementus.
  - **Izmantotās klases**: (Galvenokārt no bērnu komponentēm un koplietotajiem stiliem)
    - (Klases no `Accordion.css`, `AdminPage.css` (tabulu stili), `Pagination.css`)

- **`PageRenderer.jsx`**
  - **Apraksts**: Komponente, kas dinamiski nosaka un attēlo atbilstošo lapu (Sākums, Ieteikumi, Raksti, Video, Pārvaldība) atkarībā no aktīvās sadaļas lietojumprogrammā.
  - **Izmantotās klases**: Nav tiešu CSS klašu, jo tā ir loģikas komponente, kas tikai renderē citas lapas.

- **`Pagination.jsx`**
  - **Apraksts**: Lapošanas komponente, kas nodrošina navigāciju starp datu lapām un iespēju mainīt ierakstu skaitu vienā lapā.
  - **Izmantotās klases (no `Pagination.css`)**:
    - `.pagination-container`
    - `.items-per-page-selector`
    - `.items-per-page-selector label`
    - `.items-per-page-select`
    - `.pagination-list`
    - `.pagination-item`
    - `.pagination-button`
    - `.pagination-button:hover:not(:disabled)`
    - `.pagination-button.active`
    - `.pagination-button:disabled`
    - `.pagination-ellipsis`

- **`RichTextEditor.jsx`**
  - **Apraksts**: Teksta redaktora komponente, kas izmanto TipTap bibliotēku. Nodrošina bagātinātā teksta rediģēšanas iespējas (treknraksts, kursīvs, saraksti, saites, krāsas utt.) un var darboties arī tikai skatīšanās režīmā.
  - **Izmantotās klases (no `RichTextEditor.css`)**:
    - `.rich-text-editor-container`
    - `.rich-text-editor-container.is-view-only`
    - `.rich-text-editor-container.is-view-only .tiptap-editor`
    - `.rich-text-editor-container.is-view-only .tiptap-editor .ProseMirror`
    - `.tiptap-toolbar`
    - `.tiptap-toolbar-row`
    - `.tiptap-toolbar-row.top-border`
    - `.tiptap-button`
    - `.tiptap-button:hover`
    - `.tiptap-button.is-active`
    - `.tiptap-button.color-swatch`
    - `.tiptap-button.color-swatch.is-active`
    - `.tiptap-editor`
    - `.tiptap-editor:focus-visible`
    - `.tiptap-editor img`
    - `.tiptap-editor img.ProseMirror-selectednode`
    - `.tiptap-editor.ProseMirror`
    - `.tiptap-editor.ProseMirror-focused`
    - `.tiptap-toolbar button.is-active`
    - `.tiptap-toolbar button.is-active[style*="background-color: rgb"]`

- **`ThemeDetailDisplay.jsx`**
  - **Apraksts**: Komponente, kas attēlo detalizētu informāciju par tēmu, tostarp tās nosaukumu, kopsavilkumu un aprakstu, izmantojot `RichTextEditor` apraksta attēlošanai.
  - **Izmantotās klases (no `ThemeDetailDisplay.css` un koplietotajiem stiliem)**:
    - `.theme-detail-display-container`
    - `.theme-detail-title`
    - `.theme-detail-summary`
    - `.theme-detail-description`
    - (Klases no `RichTextEditor.css`)

### `/src/components/common/Modals` - Modālo logu komponentes

- **`Modal.jsx`**
  - **Apraksts**: Universāla modālā loga komponente, kas parāda saturu virs citiem lapas elementiem. Nodrošina atvēršanas/aizvēršanas loģiku, virsrakstu un satura ievietošanu.
  - **Izmantotās klases (no `Modal.css`)**:
    - `.modal-overlay`
    - `.modal-content`
    - `.modal-title`
    - `.modal-close-button`
    - `.modal-close-button:hover`
    - `.modal-body`

- **`CardDetailModal.jsx`**
  - **Apraksts**: Modālais logs, kas attēlo pilnu informāciju par kartīti, ielādējot `CardDetailModalContent` ar kartītes datiem.
  - **Izmantotās klases**: (Galvenokārt no `Modal.css` un `CardDetailModalContent.jsx` stiliem)

- **`CardDetailModalContent.jsx`**
  - **Apraksts**: Modālā loga satura komponente, kas attēlo kartītes nosaukumu, tēmu, autoru, kopsavilkumu, detalizētu aprakstu (izmantojot `RichTextEditor`) un attēlu karuseli.
  - **Izmantotās klases (no `CardDetailModal.css` un koplietotajiem stiliem)**:
    - `.card-detail-modal-meta`
    - `.card-detail-modal-theme`
    - `.card-detail-modal-author`
    - `.card-detail-modal-summary`
    - `.card-detail-content-section`
    - `.card-detail-content-section h3`
    - (Klases no `RichTextEditor.css`, `ImageCarousel.css`)

- **`ConfirmDeleteModal.jsx`**
  - **Apraksts**: Modālais logs, kas prasa lietotājam apstiprināt ieraksta dzēšanu, parādot īsu informāciju par dzēšamo elementu.
  - **Izmantotās klases**: (Galvenokārt no `Modal.css` un `CardDetailModal.css`)
    - `.item-to-delete-info`
    - `.card-detail-modal-actions`
    - `.action-button`
    - (Klases no `Modal.css`, `CardDetailModal.css`)

### `/src/hooks` - Pielāgotie āķi

- **`useData.js`**
  - **Apraksts**: Pielāgots React āķis, kas atbild par aplikācijas galveno datu (autoru, tēmu, kartīšu, rakstu, video) ielādi no simulētiem datiem un to bagātināšanu (piemēram, pievienojot autora un tēmas nosaukumus). Nodrošina datus visām aplikācijas lapām.
  - **Izmantotās klases**: Nav tiešu CSS klašu, jo tas ir loģikas āķis.

- **`useFilters.js`**
  - **Apraksts**: Pielāgots React āķis, kas pārvalda filtrēšanas stāvokli un loģiku, tostarp aktīvās tēmas, atlasīto autoru un manuāli atlasīto kartīšu ID. Nodrošina funkcijas filtru atjaunināšanai, noņemšanai un notīrīšanai, kā arī aktīvo filtru saraksta sagatavošanai.
  - **Izmantotās klases**: Nav tiešu CSS klašu, jo tas ir loģikas āķis.

- **`usePagination.js`**
  - **Apraksts**: Pielāgots React āķis, kas pārvalda lapošanas stāvokli (pašreizējā lapa, ieraksti lapā) un loģiku. Tas nodrošina lapotus datus no ienākošā masīva un atgriež rekvizītus, kas nepieciešami `Pagination` komponentei.
  - **Izmantotās klases**: Nav tiešu CSS klašu, jo tas ir loģikas āķis.