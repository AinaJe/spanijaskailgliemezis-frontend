// src/data/simulatedCards.js

export const simulatedCards = [
  // Kartītes ar tēmu "Sākums" (ID 1)
  {
    id: 1001,
    theme: 1, // "Sākums" tēmas ID
    title: "Spānijas kailgliemezis: Kas mums jāzina?",
    summary: "Galvenā informācija par invazīvo sugu un tās draudiem Latvijā.",
    description:
      "<p>Spānijas kailgliemezis (<i>Arion vulgaris</i>) ir nopietns drauds Latvijas dārzniekiem un lauksaimniekiem. Šī kartīte sniedz ieskatu par tā izplatību un to, kāpēc tas ir tik bīstams.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_1.jpg", // Relatīvs ceļš
        description: "Spānijas kailgliemezis uz auga lapas",
        authorId: 6, // Autors: Latvijas Dabas aizsardzības pārvalde
      },
    ],
    authorId: 6, // Autors: Latvijas Dabas aizsardzības pārvalde
  },
  {
    id: 1002,
    theme: 1, // "Sākums" tēmas ID
    title: "Ziņo par atradnēm!",
    summary:
      "Palīdzi ierobežot Spānijas kailgliemeža izplatību, ziņojot par katru atradni.",
    description:
      "<p>Jūsu ziņojumi ir ārkārtīgi svarīgi! Lūdzam ziņot par katru pamanīto <b>Spānijas kailgliemeža</b> atradni, lai varētu efektīvāk kartēt tā izplatību un koordinēt apkarošanas pasākumus. Izmantojiet zemāk norādītās kartes un Dabas aizsardzības pārvaldes e-pastu.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_2.jpg",
        description: "Spānijas kailgliemezis uz auga lapas",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1003,
    theme: 1, // "Sākums" tēmas ID
    title: "Ozols.gov.lv karte",
    summary: "Interaktīva karte Spānijas kailgliemeža atradņu reģistrēšanai.",
    description:
      "<p>Apmeklējiet <u>ozols.gov.lv</u>, lai atzīmētu Spānijas kailgliemežu atradnes un sekotu līdzi to izplatības dinamikai visā Latvijā. Jūsu ieguldījums ir būtisks.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_3.jpg",
        description: "Ozols.gov.lv kartes ekrānuzņēmums",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 6, // Autors: Latvijas Dabas aizsardzības pārvalde
  },
  {
    id: 1004,
    theme: 1, // "Sākums" tēmas ID
    title: "Dabasdati.lv atradnes",
    summary: "Reģistrē Spānijas kailgliemežu atradnes Dabasdati.lv.",
    description:
      "<p>Izmantojiet <a href='https://www.dabasdati.lv/'>Dabasdati.lv</a> platformu, lai ziņotu par invazīvās sugas novērojumiem. Tas palīdzēs zinātniekiem un dabas aizsardzības speciālistiem iegūt precīzākus datus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_4.jpg",
        description: "Spānijas kailgliemeži spainī",
        authorId: 2, // Autors: Haralds Jēkabsons
      },
    ],
    authorId: 6, // Autors: Latvijas Dabas aizsardzības pārvalde
  },
  {
    id: 1005,
    theme: 1, // "Sākums" tēmas ID
    title: "Dabas aizsardzības pārvaldes informācija",
    summary: "Saziņa ar Dabas aizsardzības pārvaldi par invazīvajām sugām.",
    description:
      "<p>Sazinieties ar Dabas aizsardzības pārvaldi (DAP), rakstot uz e-pastu <b>invazivs@daba.gov.lv</b>, lai ziņotu par atradnēm vai saņemtu papildu informāciju par rīcību ar Spānijas kailgliemezi.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_5.jpg",
        description: "Spānijas kailgliemeži spainī",
        authorId: 3, // Autors: Ilze Mājeniece
      },
    ],
    authorId: 6, // Autors: Latvijas Dabas aizsardzības pārvalde
  },
  {
    id: 1006,
    theme: 100, // "Spānijas kailgliemezis" tēmas ID
    title: "Spānijas kailgliemeža izskats",
    summary: "Kā atpazīt Spānijas kailgliemezi starp citiem gliemežiem.",
    description:
      "<p>Uzziniet par Spānijas kailgliemeža raksturīgajām pazīmēm: tā krāsu (no oranži brūnas līdz tumši brūnai), izmēru (līdz 15 cm) un gļotu daudzumu. Svarīgi atšķirt to no citiem kailgliemežiem, piemēram, meža kailgliemeža.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_6.jpg",
        description: "Oranži brūns kailgliemezis uz zemes",
        authorId: 4, // Autors: Ieva Krotova
      },
    ],
    authorId: 3, // Autors: Ilze Mājeniece
  },
  {
    id: 1007,
    theme: 100, // "Spānijas kailgliemezis" tēmas ID
    title: "Vairošanās un dzīves cikls",
    summary: "Ātrā vairošanās spēja un tās ietekme uz invāziju.",
    description:
      "<p>Spānijas kailgliemezis ir hermafrodīts un ļoti ātri vairojas. Uzziniet par tā dzīves ciklu, oliņu dēšanas periodiem un to, kā tas ietekmē tā izplatību.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_7.jpg",
        description: "Kailgliemežu oliņas",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 3, // Autors: Ilze Mājeniece
  },
  {
    id: 1008,
    theme: 100, // "Spānijas kailgliemezis" tēmas ID
    title: "Kailgliemeža paradumi",
    summary: "Uzzini, kur un kā aktīvi darbojas Spānijas kailgliemezis.",
    description:
      "<p>Šie gliemeži ir nakts aktīvi un patversmi meklē mitrās, tumšās vietās. Izpētiet to barošanās paradumus un pārvietošanās veidus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_8.jpg",
        description: "Kailgliemezis ēd augu",
        authorId: 2, // Autors: Haralds Jēkabsons
      },
    ],
    authorId: 3, // Autors: Ilze Mājeniece
  },
  {
    id: 1009,
    theme: 101, // "Cēloņi" tēmas ID
    title: "Augu tirdzniecība kā izplatības avots",
    summary: "Kā inficēti stādi veicina invazīvās sugas izplatību.",
    description:
      "<p>Viens no galvenajiem <b>Spānijas kailgliemeža</b> izplatības veidiem ir ar inficētiem stādiem un augsnes substrātu, kas tiek ievests no citām valstīm.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_9.png",
        description: "Podiņos augu stādi",
        authorId: 3, // Autors: Ilze Mājeniece
      },
    ],
    authorId: 4, // Autors: Ieva Krotova
  },
  {
    id: 1010,
    theme: 101, // "Cēloņi" tēmas ID
    title: "Nekoptas teritorijas un atkritumi",
    summary: "Mitrās un nekoptas vietas kā ideāla vide gliemežiem.",
    description:
      "<p>Nekoptas teritorijas, atkritumu kaudzes un celtniecības atliekas nodrošina ideālas slēptuves un vairošanās vietas Spānijas kailgliemežiem. Šo vietu sakopšana ir būtiska to ierobežošanai.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_10.jpg",
        description: "Atkritumu kaudze",
        authorId: 4, // Autors: Ieva Krotova
      },
    ],
    authorId: 4, // Autors: Ieva Krotova
  },
  {
    id: 1011,
    theme: 102, // "Atradnes" tēmas ID
    title: "Zem dēļiem un akmeņiem",
    summary: "Mitrās un tumšās slēptuves.",
    description:
      "<p>Spānijas kailgliemeži un to oliņas bieži slēpjas zem dēļiem, akmeņiem, plēvēm un citiem materiāliem, kas nodrošina mitru un tumšu vidi.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_11.jpg",
        description: "Gliemezis zem dēļa",
        authorId: 5, // Autors: Jānis Ozols
      },
    ],
    authorId: 1, // Autors: Aina Jēkabsone
  },
  {
    id: 1012,
    theme: 102, // "Atradnes" tēmas ID
    title: "Krūmos un zālē",
    summary: "Bieži sastopami blīvā veģetācijā.",
    description:
      "<p>Blīvi apstādījumi, krūmi un augsta zāle nodrošina lielisku patvērumu Spānijas kailgliemežiem. Regulāra zāles pļaušana un dārza kopšana ir svarīga.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_12.jpg",
        description: "Kailgliemezis zālē",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 1, // Autors: Aina Jēkabsone
  },
  {
    id: 1013,
    theme: 102, // "Atradnes" tēmas ID
    title: "Būvgruži un komposts",
    summary: "Bīstamas vietas Spānijas kailgliemežu vairošanās.",
    description:
      "<p>Celtniecības atliekas, būvgruži un nesakārtotas komposta kaudzes ir ideālas vietas, kur Spānijas kailgliemeži var vairoties un slēpties. Nekādā gadījumā nemetiet beigtos gliemežus kompostā!</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_13.jpg",
        description: "Būvgružu kaudze",
        authorId: 2, // Autors: Haralds Jēkabsons
      },
    ],
    authorId: 1, // Autors: Aina Jēkabsone
  },
  {
    id: 1014,
    theme: 103, // "Metodes" tēmas ID
    title: "Metožu apvienošana",
    summary: "Visaptveroša pieeja efektīvai cīņai.",
    description:
      "<p>Visefektīvākā pieeja cīņā pret Spānijas kailgliemezi ir dažādu metožu (mehānisko, bioloģisko, preventīvo) apvienošana. Tikai kompleksi pasākumi dos ilgtermiņa rezultātus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_14.jpg",
        description: "Dažādas apkarošanas metodes",
        authorId: 3, // Autors: Ilze Mājeniece
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1015,
    theme: 103, // "Metodes" tēmas ID
    title: "Mehāniskā lasīšana",
    summary: "Regulāra gliemežu nolasīšana ar rokām.",
    description:
      "<p>Regulāra Spānijas kailgliemežu nolasīšana ir viena no efektīvākajām metodēm. Vislabāk to darīt agri no rīta vai vakarā, kad tie ir aktīvāki. Salasītos gliemežus jāiznīcina pareizi.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_15.jpg",
        description: "Cilvēks lasa gliemežus",
        authorId: 4, // Autors: Ieva Krotova
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1016,
    theme: 103, // "Metodes" tēmas ID
    title: "Aizsargjoslas un barjeras",
    summary: "Fizisku šķēršļu izveidošana ap dārziem.",
    description:
      "<p>Izveidojiet fiziskas barjeras ap dārziem, izmantojot metāla sētiņas, smiltis, pelnus, kaļķi vai olu čaumalas. Šīs barjeras apgrūtina gliemežu piekļuvi augiem.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_16.jpg",
        description: "Barjera pret gliemežiem",
        authorId: 5, // Autors: Jānis Ozols
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1017,
    theme: 103, // "Metodes" tēmas ID
    title: "Indijas skrējējgaļas pīles",
    summary: "Dabiskie palīgi cīņā ar gliemežiem.",
    description:
      "<p>Indijas skrējējgaļas pīles ir lielisks dabisks līdzeklis pret Spānijas kailgliemežiem. Tās aktīvi barojas ar gliemežiem un ir videi draudzīgs risinājums.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_17.jpg",
        description: "Indijas skrējējgaļas pīles",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1018,
    theme: 103, // "Metodes" tēmas ID
    title: "Limacīdi (gliemežu granulas)",
    summary: "Ķīmiskie līdzekļi ierobežotā apjomā.",
    description:
      "<p>Limacīdi uz dzelzs fosfāta bāzes ir efektīvs līdzeklis, taču tie jālieto uzmanīgi un saskaņā ar instrukcijām. Izvēlieties videi draudzīgus preparātus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_18.jpg",
        description: "Gliemežu granulas",
        authorId: 2, // Autors: Haralds Jēkabsons
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1019,
    theme: 103, // "Metodes" tēmas ID
    title: "Lamatas",
    summary: "Alus lamatas un citi pievilināšanas veidi.",
    description:
      "<p>Izmantojiet alus lamatas vai citas pievilināšanas vietas (piemēram, dēļus ar barību), lai koncentrētu gliemežus vienuviet un atvieglotu to savākšanu.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_19.jpg",
        description: "Alus lamatas gliemežiem",
        authorId: 3, // Autors: Ilze Mājeniece
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1020,
    theme: 104, // "Biedrība" tēmas ID
    title: "Biedrības Statūti",
    summary: "Biedrības darbības pamatprincipi un mērķi.",
    description:
      "<p>Iepazīstieties ar biedrības 'Pret Spānijas Kailgliemezi' statūtiem, lai saprastu mūsu darbības pamatprincipus un mērķus cīņā pret invazīvo sugu.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_20.jpg",
        description: "Dokuments ar statūtiem",
        authorId: 4, // Autors: Ieva Krotova
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1021,
    theme: 104, // "Biedrība" tēmas ID
    title: "Semināri un apmācības",
    summary: "Pasākumi zināšanu un pieredzes apmaiņai.",
    description:
      "<p>Regulāri rīkojam seminārus un apmācības, lai dalītos ar jaunāko informāciju par Spānijas kailgliemeža apkarošanu un nodrošinātu praktiskus padomus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_21.jpg",
        description: "Cilvēki seminārā",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1022,
    theme: 104, // "Biedrība" tēmas ID
    title: "Kopīgas talkas",
    summary: "Iesaisties aktīvā cīņā pret kailgliemežiem!",
    description:
      "<p>Pievienojieties mūsu kopīgajām talkām, lai kopīgi sakoptu teritorijas un samazinātu Spānijas kailgliemežu skaitu. Tava palīdzība ir svarīga!</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_22.jpg",
        description: "Talkas dalībnieki vāc gliemežus",
        authorId: 2, // Autors: Haralds Jēkabsons
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  {
    id: 1023,
    theme: 104, // "Biedrība" tēmas ID
    title: "Sazinies ar biedrību",
    summary: "Jautājumi, sadarbība un ieteikumi.",
    description:
      "<p>Ja jums ir jautājumi, ieteikumi vai vēlaties sadarboties, sazinieties ar mums, izmantojot norādīto kontaktinformāciju. Mēs esam atvērti jaunām idejām un iniciatīvām.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_23.jpg",
        description: "Kontaktu informācija",
        authorId: 1, // Autors: Aina Jēkabsone
      },
    ],
    authorId: 7, // Autors: Biedrība 'Pret Spānijas Kailgliemezi'
  },
  // Kartītes Tirdzniecības sadaļai (ID 105)
  {
    id: 1024,
    theme: 105,
    title: "Tirgotājiem: pievienojies mūsu platformai!",
    summary:
      "Informācija tirgotājiem par iespējām piedāvāt pretgliemežu produktus.",
    description:
      "<p>Ja jūs ražojat vai izplatāt efektīvus pretgliemežu apkarošanas līdzekļus, mēs aicinām jūs pievienoties mūsu platformai. Sazinieties ar mums, lai uzzinātu vairāk par sadarbības iespējām!</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_24.jpg",
        description: "Tirgotājs ar produktiem",
        authorId: 7,
      },
    ],
    authorId: 7,
  },
  {
    id: 1025,
    theme: 105,
    title: "Stādu audzētājiem: profilakse un aizsardzība",
    summary:
      "Kā pasargāt stādus no gliemežiem un izvairīties no to izplatīšanas.",
    description:
      "<p>Stādu audzētājiem ir īpaši svarīgi pievērst uzmanību Spānijas kailgliemeža profilaksei un aizsardzībai, jo tie var kļūt par galveno gliemežu izplatīšanās avotu. Ir būtiski nodrošināt, lai stādi būtu brīvi no gliemežiem un to olām pirms pārdošanas.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_25.jpg",
        description: "Stādu audzētava",
        authorId: 4,
      },
    ],
    authorId: 4,
  },
  {
    id: 1026,
    theme: 105,
    title: "Pircējiem: atrodiet labākos risinājumus",
    summary: "Kur iegādāties pārbaudītus un efektīvus pretgliemežu produktus.",
    description:
      "<p>Šeit mēs apkopojam uzticamus avotus, kur varat iegādāties dažādus produktus un risinājumus, lai efektīvi cīnītos pret Spānijas kailgliemezi savā dārzā vai saimniecībā.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_26.jpg",
        description: "Cilvēks ar pretgliemežu līdzekli",
        authorId: 5,
      },
    ],
    authorId: 5,
  },
  {
    id: 1027,
    theme: 105,
    title: "Pašvaldībām: sadarbība gliemežu apkarošanā",
    summary:
      "Aicinām pašvaldības sadarboties kopīgā cīņā pret invazīvajām sugām.",
    description:
      "<p>Mēs aicinām pašvaldības iesaistīties aktīvā gliemežu apkarošanā, piedāvājot resursus, koordinējot talkas un izglītojot iedzīvotājus. Sazinieties ar mums, lai rastu kopīgus risinājumus!</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_27.jpg",
        description: "Pašvaldības logo un dārzs",
        authorId: 6,
      },
    ],
    authorId: 7,
  },
  // Kartītes Stāstu sadaļai (ID 106)
  {
    id: 1028,
    theme: 106,
    title: "Mans pirmais gliemezis: Pārsteigums dārzā",
    summary: "Ineses stāsts par pirmo sastapšanos ar Spānijas kailgliemezi.",
    description:
      "<p>Inese dalās savā pieredzē, kā viņa pirmo reizi pamanīja Spānijas kailgliemezi savā dārzā un kādas bija viņas sākotnējās reakcijas. Stāsts par izpratnes veidošanos un cīņas sākumu.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_28.jpg",
        description: "Gliemezis uz zieda",
        authorId: 1,
      },
    ],
    authorId: 1,
  },
  {
    id: 1029,
    theme: 106,
    title: "Kaimiņu sadarbība: Kopīgais spēks",
    summary: "Stāsts par to, kā kaimiņi apvienojās cīņā pret gliemežiem.",
    description:
      "<p>Šis stāsts ilustrē, cik svarīga ir kopienas sadarbība. Uzziniet, kā kaimiņi nolēma rīkoties kopā, organizējot talkas un daloties ar pieredzi, lai efektīvāk apkarotu Spānijas kailgliemezi.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_29.jpg",
        description: "Kaimiņi strādā dārzā",
        authorId: 2,
      },
    ],
    authorId: 7,
  },
  {
    id: 1030,
    theme: 106,
    title: "Alternatīvās metodes: Kas palīdzēja mums",
    summary: "Jāņa un Annas eksperimenti ar dabīgiem līdzekļiem.",
    description:
      "<p>Jānis un Anna dalās ar saviem atklājumiem par alternatīvām metodēm, kas palīdzēja viņiem samazināt gliemežu skaitu dārzā, izmantojot dabīgus risinājumus un mazāk invazīvas pieejas.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_30.jpg",
        description: "Dabisks gliemežu atbaidīšanas līdzeklis",
        authorId: 5,
      },
    ],
    authorId: 5,
  },
  // Kartītes Izdrukām sadaļai (ID 107)
  {
    id: 1031,
    theme: 107,
    title: "Plakāts: Atpazīsti Spānijas kailgliemezi!",
    summary: "Lejupielādē plakātu, lai palīdzētu atpazīt invazīvo sugu.",
    description:
      "<p>Šis plakāts satur vizuālas norādes un īsu aprakstu, kas palīdzēs atpazīt Spānijas kailgliemezi. Izdrukājiet to un izvietojiet publiskās vietās vai savā dārzā, lai informētu citus.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_31.jpg",
        description: "Plakāta dizains",
        authorId: 7,
      },
    ],
    authorId: 7,
  },
  {
    id: 1032,
    theme: 107,
    title: "Informatīvā brošūra: Kā cīnīties?",
    summary: "Detalizēta brošūra par efektīvām apkarošanas metodēm.",
    description:
      "<p>Šī brošūra piedāvā padziļinātu ieskatu dažādās apkarošanas metodēs, to priekšrocībās un trūkumos, kā arī sniedz praktiskus padomus par to ieviešanu. Izdrukājiet un izplatiet to!</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_32.jpg",
        description: "Brošūras izkārtojums",
        authorId: 7,
      },
    ],
    authorId: 7,
  },
  {
    id: 1033,
    theme: 107,
    title: "Ziņojuma veidlapa: Paziņo par atradni",
    summary: "Atradņu ziņošanas veidlapa, ko var izdrukāt un aizpildīt.",
    description:
      "<p>Ja jums nav pieejams internets vai viedtālrunis, izmantojiet šo drukājamo veidlapu, lai reģistrētu Spānijas kailgliemežu atradnes. Aizpildīto veidlapu varat iesniegt biedrībā.</p>",
    images: [
      {
        // JAUNS: izmanto import.meta.env.BASE_URL
        url: import.meta.env.BASE_URL + "images/img_33.jpg",
        description: "Veidlapas dizains",
        authorId: 7,
      },
    ],
    authorId: 7,
  },
];