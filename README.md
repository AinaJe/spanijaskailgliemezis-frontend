# Projekta komponentu struktūra

Šis ir pārskats par visām projekta React komponentēm, to atrašanās vietu un funkcionalitāti.

### `/src/pages` - Galvenās lapas

- **`AdminPage.jsx`**: Administratīvais panelis, kas apkopo visas datu pārvaldības sadaļas.
- **`ArticlesPage.jsx`**: Lapa, kas attēlo rakstu sarakstu un lapošanu.
- **`CardsPage.jsx`**: Lapa, kas attēlo kartīšu sarakstu ar filtriem un lapošanu. Izmanto `recommendations`, `association` u.c. sadaļām.
- **`HomePage.jsx`**: Sākumlapa, kas attēlo galveno informāciju un sākumlapas kartītes.
- **`VideosPage.jsx`**: Lapa, kas attēlo video sarakstu un lapošanu.

### `/src/components/layout` - Izkārtojuma komponentes

- **`Header.jsx`**: Vietnes galvene ar logo, navigāciju un meklēšanu.
- **`Footer.jsx`**: Vietnes kājene ar autortiesību informāciju un saitēm.

### `/src/components/cards` - Kartīšu komponentes

- **`Card.jsx`**: Attēlo vienu kartīti ar kopsavilkumu un attēlu.
- **`CardList.jsx`**: Attēlo kartīšu sarakstu.
- **`CardFilter.jsx`**: Nodrošina filtrēšanas logu kartītēm (pēc autora, tēmas).
- **`ActiveFiltersDisplay.jsx`**: Attēlo aktīvos filtrus virs kartīšu saraksta.
- **`ImageCarousel.jsx`**: Attēlu karuselis, ko izmanto kartītes detalizētajā skatā.

### `/src/components/forms` - Formu komponentes

- **`AddAuthorForm.jsx`**: Forma jauna autora pievienošanai.
- **`AddThemeForm.jsx`**: Forma jaunas tēmas pievienošanai.
- **`AddArticleForm.jsx`**: Forma jauna raksta pievienošanai.
- **`AddVideoForm.jsx`**: Forma jauna video pievienošanai.
- **`CardForm.jsx`**: Sarežģīta forma jaunas kartītes izveidei ar vairākām cilnēm.
- **`CardFormImageSection.jsx`**: `CardForm` apakškomponente, kas pārvalda attēlu pievienošanu.

### `/src/components/lists` - Sarakstu komponentes

- **`ArticleList.jsx`**: Attēlo rakstu sarakstu tabulas formā.
- **`VideoList.jsx`**: Attēlo video sarakstu tabulas formā.

### `/src/components/common` - Koplietojamās komponentes

- **`Accordion.jsx`**: Atkārtoti lietojama akordeona komponente.
- **`AdminActionButtons.jsx`**: Pogu grupa administratīvajā panelī jaunu ierakstu pievienošanai.
- **`AdminModals.jsx`**: Komponente, kas satur visus administratīvā paneļa modālos logus.
- **`AdminSection.jsx`**: Universāla sadaļa administratīvajam panelim, kas satur tabulu un lapošanu.
- **`PageRenderer.jsx`**: Komponente, kas nosaka, kuru lapu attēlot, atkarībā no aktīvās sadaļas.
- **`Pagination.jsx`**: Lapošanas komponente sarakstu navigācijai.
- **`RichTextEditor.jsx`**: Teksta redaktors ar formatēšanas iespējām (`TipTap`).
- **`ThemeDetailDisplay.jsx`**: Attēlo detalizētu informāciju par tēmu.

### `/src/components/common/Modals` - Modālo logu komponentes

- **`Modal.jsx`**: Universāla modālā loga komponente.
- **`CardDetailModal.jsx`**: Modālais logs, kas attēlo pilnu informāciju par kartīti.
- **`ImageFullscreenModal.jsx`**: Modālais logs attēla attēlošanai pilnekrāna režīmā.

### `/src/hooks` - Pielāgotie āķi

- **`useData.js`**: Pārvalda aplikācijas galveno datu ielādi un stāvokli.
- **`useFilters.js`**: Pārvalda filtrēšanas stāvokli un loģiku.
- **`usePagination.js`**: Pārvalda lapošanas stāvokli un loģiku.