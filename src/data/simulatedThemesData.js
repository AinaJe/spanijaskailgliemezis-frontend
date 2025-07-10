// src/data/simulatedThemesData.js

export const simulatedThemesData = [
  // Piezīme: "Sākums" un "Visas" tiek pievienotas App.jsx inicializācijas laikā,
  // tāpēc šīs simulētajos datos var nebūt.
  // Esmu tās atstājis simulētajos datos, ja vēlaties tās izmantot kā fallback.
  // Svarīgi: Pārliecināties, ka ID ir unikāli.
  {
    id: 1, // Speciāls ID "Sākums" tēmai
    name: "Sākums",
    summary: "Laipni lūdzam mūsu mājaslapā! Šeit atradīsiet jaunāko un aktuālāko informāciju.",
    description: "<p>Esiet sveicināti mūsu digitālajā centrā! Mēs esam priecīgi dalīties ar jums jaunākajām <b>kartītēm</b>, <b>rakstiem</b> un <b>video</b>, kas aptver dažādas aizraujošas tēmas. Izpētiet mūsu saturu un atklājiet jaunas zināšanas!</p>",
  },
  {
    id: 'all', // Speciāls ID "Visas" tēmai - labots uz 'all'
    name: "Visas",
    summary: "Visas kartītes kopā, neatkarīgi no tēmas.",
    description: "<p>Šeit ir redzami visi mūsu pieejamie kartīšu ieraksti, neatkarīgi no tēmas.</p>",
  },
  {
    id: 100,
    name: "Spānijas kailgliemezis",
    summary:
      "Detalizēta informācija par Spānijas kailgliemeža bioloģiju un atpazīšanu.",
    description:
      "<p>Iepazīstieties ar <em>Spānijas kailgliemeža izskatu</em>, tā vairošanās paradumiem un dzīves ciklu. Svarīgi padomi, kā to atšķirt no citiem gliemežiem.</p>",
  },
  {
    id: 101,
    name: "Cēloņi",
    summary: "Kas veicina Spānijas kailgliemeža izplatību Latvijā.",
    description:
      "<p>Izpratne par galvenajiem faktoriem, kas veicina <b>Spānijas kailgliemeža</b> izplatību, piemēram, augu tirdzniecība un nekoptas teritorijas.</p>",
  },
  {
    id: 102,
    name: "Atradnes",
    summary: "Vietas, kur visbiežāk sastopams Spānijas kailgliemezis.",
    description:
      "<p>Uzziniet, kurās vietās visbiežāk varat pamanīt <em>Spānijas kailgliemežus</em> – zem dēļiem, krūmos, zālē un citviet.</p>",
  },
  {
    id: 103,
    name: "Metodes",
    summary:
      "Efektīvas metodes Spānijas kailgliemeža ierobežošanai un apkarošanai.",
    description:
      "<p>Apskatiet dažādas <b>apkarošanas metodes</b>, tostarp mehānisko nolasīšanu, aizsargjoslu veidošanu, bioloģiskos līdzekļus un sabiedrības sadarbības nozīmi.</p>",
  },
  {
    id: 104,
    name: "Biedrība",
    summary: "Informācija par biedrības 'Pret Spānijas Kailgliemezi' darbību.",
    description:
      "<p>Uzziniet par biedrības <em>mērķiem un aktivitātēm</em>, kā arī par iespējām iesaistīties kopīgajā cīņā pret invazīvo kailgliemezi.</p>",
  },
  {
    id: 105,
    name: "Tirdzniecība",
    summary:
      "Informācija par tirdzniecību ar pretgliemežu produktiem un pakalpojumiem.",
    description:
      "<p>Šeit atradīsiet informāciju par mūsu sadarbības partneriem un pieejamajiem risinājumiem.</p>",
  },
  {
    id: 106,
    name: "Stāsti",
    summary: "Cilvēku pieredzes stāsti ar kailgliemežiem.",
    description: '<p>Lasiet iedzīvotāju pieredzes stāstus par cīņu ar Spānijas kailgliemezi.</p>'
  },
  {
    id: 107,
    name: "Izdrukām",
    summary: "Materiāli drukāšanai.",
    description: '<p>Šeit atradīsiet materiālus, kurus varat izdrukāt un izmantot informācijas izplatīšanai.</p>'
  },
  {
    id: 108,
    name: "Raksti",
    summary: "Noderīgi raksti un publikācijas par Spānijas kailgliemezi un tā apkarošanu.",
    description: "<p>Šajā sadaļā apkopoti informatīvi raksti, pētījumi un publikācijas, kas palīdzēs jums padziļināt izpratni par Spānijas kailgliemeža bioloģiju, izplatību un efektīvākajām apkarošanas stratēģijām.</p>"
  },
  {
    id: 109,
    name: "Video",
    summary: "Video pamācības un sižeti par Spānijas kailgliemezi un tā ierobežošanu.",
    description: "<p>Šeit atradīsiet vizuālus materiālus – video pamācības, intervijas ar ekspertiem un sižetus – par Spānijas kailgliemeža atpazīšanu, tā dzīvesveidu un praktiskiem padomiem cīņā pret šo invazīvo sugu.</p>"
  }
];