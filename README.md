# Cédric — Lucky Lands · V4

Een zelfstandige, isometrische ontdekgame met Liquid Glass, een donker boslandschap, twaalf soorten denkpuzzels, houttransport en één centraal lucky block.

**Website:** [cedric-chi.vercel.app](https://cedric-chi.vercel.app/)

## Nieuw in V4

- Donkere bos-, aarde- en leisteenkleuren, warme verlichting en Liquid Glass-panelen.
- Een menselijker personage met kleding, rugzak, gezicht, benen en loop- en hakanimaties.
- Herkenbare werkplaatsen met eigen architectuur: een smidsoven en aambeeld, een bakkerij met brood en luifel, een glazen kas en een postkantoor met laadperron.
- Bossen met hakbare bomen. Een boom kost drie basisslagen en levert twee stammen op; sterkere bijlen hakken sneller. Afgekapte bomen groeien na 90 seconden terug.
- Een bestuurbare pick-up: draag vier stammen, laad maximaal twintig in de auto en rijd naar de houtwerf. Elke afgeleverde stam levert zes munten op. De auto rijdt sneller dan het personage loopt en volgt vrije routes.
- Twaalf volgende gebieden zijn alvast doorzichtig zichtbaar, inclusief bomen en gebouwen. Je kunt er pas na vrijspelen komen.
- Precies één lucky block blijft op het centrale plein. Elke opening vernieuwt het block, verhoogt de volgende opdracht en ontsluit één gebied. De ◆-knop loopt naar dit plein.

Hout verdient munten; voor elke werelduitbreiding blijft een bouwster uit een educatief contract nodig. Houttransport vervangt de oude teleportauto.

Zie [CHANGELOG.md](CHANGELOG.md) voor de releasewijzigingen.

## Educatieve bouwcontracten

### Bouwcontracten: denken, proberen en verbeteren

Elke werkplaats biedt een contract met drie bouwdoelen: drie verschillende puzzeltypen. Los de doelen op voor munten en één bouwster. Koop het passende gereedschap en gebruik één bouwster om een lucky block te openen. De ster wordt pas bij het openen verbruikt; je gereedschap houd je.

| Werkplaats | Puzzeltypen | Wat je oefent |
|---|---|---|
| Smid | Metaal combineren, binnen budget blijven, hitteplanning | Rekenen, voorwaarden combineren, bewerkingen plannen |
| Bakker | Recept opschalen, wisselgeld, breuken | Verhoudingen, geldrekenen, deel-geheelbegrip |
| Tuinier | Rij- en kolomregels, naast water planten, spiegelen | Logica, ruimtelijk redeneren, symmetrie |
| Postkantoor | Route plannen, eerst een pakket ophalen, een foute route herstellen | Algoritmisch denken, volgorde, debugging |

Opdrachten variëren in getallen, posities en voorwaarden. Een volgend contract wisselt de startsoort. Bij routeherstel zit de fout op een willekeurige stap: selecteer een bestaande pijl en kies een richting om hem te vervangen, of verwijder de geselecteerde stap.

### Zelfgekozen uitdaging, zonder timers

- **Rustig / Pittig / Expert** zijn direct beschikbaar; standaard staat het spel op Pittig.
- Moeilijkere niveaus gebruiken meer voorwaarden en denkstappen. Het gekozen niveau stijgt nooit automatisch door eerdere prestaties.
- Een voltooid contract betaalt `basisloon × (3 + moeilijkheid)` plus één bouwster. Moeilijkheid is 1, 2 of 3: respectievelijk 4×, 5× of 6× het basisloon van de werkplaats.
- **Hints en herstel verlagen het loon niet.** Het bedrag is vooraf zichtbaar; dezelfde werkplaats en hetzelfde niveau betalen hetzelfde bedrag.
- Er zijn geen timers. Je kunt je plan aanpassen en onbeperkt herstellen.
- Een onafgemaakt contract levert geen loon of bouwster op. Al geregistreerde, afgeronde bouwdoelen blijven wel in het paspoort staan.

### Feedback en een nieuwe toepassing

Een fout antwoord geeft feedback. Een eerste hint helpt met de aanpak; verdere hulp kan een werkende oplossing laten zien.

Na een fout of hint moet eerst de huidige puzzel kloppen. Daarna verschijnt de knop **Probeer een nieuwe variant**: pas hetzelfde idee toe op een nieuwe equivalente oefening voordat het bouwdoel telt. Per bouwdoel verschijnt maximaal één dergelijke extra oefening, ook als daarbij opnieuw hulp of herstel nodig is.

Het paspoort bewaart de categorie **zelfstandig**, **na herstel** of **met hulp**, zowel per puzzeltype als per niveau. Een extra oefening wist het eerdere hulp- of herstellabel niet. Hulp weegt bij samenloop zwaarder dan herstel. ‘Zelfstandig’ betekent een nieuwe opdracht direct goed bij controle, zonder hint.

Dit zijn registraties van opgeloste opdrachten in de game, geen bewijs van leerwinst buiten de game. Zie [BLUE_TEAM.md](BLUE_TEAM.md) voor de ontwerpbedoeling, aannames en een korte gebruikstest met Cédric.

### Donkere wereld, met Liquid Glass

Zes gedempte landschappaletten en warme lampen geven de wereld afwisseling. Transparante bomen houden het personage en de pick-up zichtbaar wanneer ze erachter staan. Glazen panelen behouden hun Canvas-laag: die bemonstert het actuele speelveld met vergrote en gebogen coördinaten, zodat de wereld achter het glas vervormt. Lichte randen, kleurzweem, schaduw en transparante lagen versterken het effect. CSS-blur en highlights vormen de fallback.

De glaslaag ververst maximaal circa elf keer per seconde; het speelveld heeft een eigen animatielus. Bij een voorkeur voor minder beweging wordt de dynamische breking uitgeschakeld.

## Spelen

Open de website of download `index.html` en open het in een moderne browser. Het gedownloade bestand heeft geen installatie, account, build, server, externe afbeeldingen of internet nodig. Code, tekeningen, geluiden en NL/EN-teksten zitten in één bestand.

- **Lopen:** klik/tik op een vakje, gebruik WASD of de pijltjes. Op de telefoon staan ook richtingknoppen.
- **Werken:** klik op een werkplaats. De knop Werkplaatsen loopt naar de dichtstbijzijnde werkplek.
- **Tools:** koop bijlen, houwelen en hamers. Het centrale lucky block toont de vereiste soort en sterkte.
- **Ontdekken:** open het centrale lucky block met de juiste tool en één bouwster voor munten en een nieuw gebied.
- **Bos:** klik op een boom om erheen te lopen en te hakken. Klik opnieuw voor de volgende slag. Een bijl is vereist.
- **Pick-up:** de autoknop of F loopt naar de pick-up. Laad of los hout, stap in en klik op een vrijgespeeld vakje om te rijden. F of de autoknop laat je uitstappen. Bomen en gebouwen blokkeren de route.
- **Verkopen:** rijd of loop naar de houtwerf. Een geparkeerde pick-up moet vlakbij staan om ook de laadbak te verkopen. Afleveren kan ook vanuit de auto.
- **Stoppen:** Escape stopt de huidige route. Bij een open venster sluit Escape eerst het venster.
- **Camera:** sleep over het veld, zoom met +/− of het muiswiel, centreer met ⌖.
- **Taal:** NL / EN rechtsboven wisselt de interface en puzzels.
- **Paspoort:** bekijk opgeloste opdrachten per puzzeltype en niveau, inclusief gebruikte ondersteuning.
- **Voortgang:** wordt lokaal in de browser opgeslagen. Een andere browser of ander apparaat heeft een eigen avontuur. Uitleg bevat een resetknop met bevestiging.

## Bestaande saves

V1-, V2- en V3-saves behouden hun munten, tools, vrijgespeelde gebieden en bestaande leerregistraties. Het vernieuwde terrein plaatst het personage en de pick-up opnieuw op het beginland; de houtvoorraad begint leeg. Voor V1/V2 begint de leerregistratie leeg: oude scores worden niet als leerbewijs overgenomen. Een oude save zonder bouwsterrenregistratie en met `stage > 0` krijgt eenmalig één bouwster om verder te ontdekken.

Houtvoorraad, laadbak, voertuigpositie en teruggroeitijden van gekapte bomen worden opgeslagen. Een lopend contract en schade aan een nog ongeopend block of gedeeltelijk gehakte boom worden niet opgeslagen. Afgeronde bouwdoelen worden wel direct in het paspoort opgeslagen; het loon en de bouwster volgen uitsluitend na afronding van het hele contract.

## Ontwerp en techniek

Districten van 6 × 6 vakjes volgen een vierkante spiraal zonder ontworpen eindpunt. De praktische wereldgrootte hangt af van het apparaat. Na elke drie openingen van het centrale block stijgt het vereiste toolniveau. Werkplaatsen in hogere landen betalen meer basisloon.

- `index.html`: complete runtime, CSS, Canvas-renderer, padzoeker, puzzels en NL/EN-teksten.
- `tests/logic.cjs`: regressietests op de daadwerkelijke inline spelcode in een gesimuleerde DOM/Canvas. Alleen Node.js nodig.
- Save key: `cedric-lucky-lands-v1`, schema versie 1 met achterwaarts compatibele toevoegingen.
- Geen tracking, advertenties, aankopen, externe libraries of netwerkverzoeken vanuit de game.

## Testen

```sh
node tests/logic.cjs
```

Automatische controles dekken 2.160 gegenereerde puzzeloplossingen op alle drie niveaus, 60 wereldexpansies, contractbedragen, geen dubbele uitbetaling, bouwsterren, extra oefeningen na hulp of herstel, routemutaties, leerregistratie per niveau, vaste moeilijkheid en oude saves. Daarnaast worden bereikbaarheid, echt lopen en rijden, één centraal block, afgesloten vooruitzichten, houthakken, laadcapaciteit, parkeren, afleveren zonder dubbele of verre uitbetaling, vertalingen, de renderlus en lichtbreking met gesimuleerde componenten gecontroleerd.

**Deze tests gebruiken een gesimuleerde DOM/Canvas en zijn geen browser-QA.** De Canvas-wereld is daarnaast als afbeelding gerenderd en visueel bekeken. Een volledige browser- en touchtest blijft nodig; Liquid Glass, leesbaarheid en prestaties moeten op echte apparaten worden beoordeeld.

## Deploy

De GitHub-repository is door de eigenaar gekoppeld aan Vercel. De game is statische HTML zonder buildstap; publiceer de hoofdmap. Nieuwe commits op de gekoppelde productiebranch kunnen automatisch een Vercel-deployment starten.
