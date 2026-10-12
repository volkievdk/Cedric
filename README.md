# Cédric — Lucky Lands · V3

Een zelfstandige, isometrische ontdekgame met Liquid Glass, zes kleurrijke biomen, twaalf soorten denkpuzzels, gereedschappen en lucky blocks.

**Website:** [cedric-chi.vercel.app](https://cedric-chi.vercel.app/)

## Nieuw in V3

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

### Meer kleur, met Liquid Glass

Zes feller gekleurde biomen geven de wereld meer afwisseling. Glazen panelen behouden hun Canvas-laag: die bemonstert het actuele speelveld met vergrote en gebogen coördinaten, zodat de wereld achter het glas vervormt. Lichte randen, kleurzweem, schaduw en transparante lagen versterken het effect. CSS-blur en highlights vormen de fallback.

De glaslaag ververst maximaal circa elf keer per seconde; het speelveld heeft een eigen animatielus. Bij een voorkeur voor minder beweging wordt de dynamische breking uitgeschakeld.

## Spelen

Open de website of download `index.html` en open het in een moderne browser. Het gedownloade bestand heeft geen installatie, account, build, server, externe afbeeldingen of internet nodig. Code, tekeningen, geluiden en NL/EN-teksten zitten in één bestand.

- **Lopen:** klik/tik op een vakje, gebruik WASD of de pijltjes. Op de telefoon staan ook richtingknoppen.
- **Werken:** klik op een werkplaats. De knop Werkplaatsen loopt naar de dichtstbijzijnde werkplek.
- **Tools:** koop bijlen, houwelen en hamers. Elk lucky block toont de vereiste soort en sterkte.
- **Ontdekken:** open een lucky block met de juiste tool en één bouwster voor munten en een nieuw gebied.
- **Auto:** klik op een auto, stap in en klik op een leeg vrijgespeeld vakje. Escape annuleert.
- **Camera:** sleep over het veld, zoom met +/− of het muiswiel, centreer met ⌖.
- **Taal:** NL / EN rechtsboven wisselt de interface en puzzels.
- **Paspoort:** bekijk opgeloste opdrachten per puzzeltype en niveau, inclusief gebruikte ondersteuning.
- **Voortgang:** wordt lokaal in de browser opgeslagen. Een andere browser of ander apparaat heeft een eigen avontuur. Uitleg bevat een resetknop met bevestiging.

## Bestaande saves

V1- en V2-saves behouden hun munten, tools en gebieden. De nieuwe leerregistratie begint leeg: oude scores worden niet als leerbewijs overgenomen. Een oude save zonder bouwsterrenregistratie en met `stage > 0` krijgt eenmalig één bouwster om verder te ontdekken.

Een lopend contract en schade aan een nog ongeopend block worden niet opgeslagen. Afgeronde bouwdoelen worden wel direct in het paspoort opgeslagen; het loon en de bouwster volgen uitsluitend na afronding van het hele contract.

## Ontwerp en techniek

Districten van 4 × 4 vakjes volgen een vierkante spiraal zonder ontworpen eindpunt. De praktische wereldgrootte hangt af van het apparaat. Na elke drie blocks stijgt het vereiste toolniveau. Werkplaatsen in hogere landen betalen meer basisloon.

- `index.html`: complete runtime, CSS, Canvas-renderer, padzoeker, puzzels en NL/EN-teksten.
- `tests/logic.cjs`: regressietests op de daadwerkelijke inline spelcode in een gesimuleerde DOM/Canvas. Alleen Node.js nodig.
- Save key: `cedric-lucky-lands-v1`, schema versie 1 met achterwaarts compatibele toevoegingen.
- Geen tracking, advertenties, aankopen, externe libraries of netwerkverzoeken vanuit de game.

## Testen

```sh
node tests/logic.cjs
```

Automatische controles dekken 2.160 gegenereerde puzzeloplossingen op alle drie niveaus, 60 wereldexpansies, contractbedragen, geen dubbele uitbetaling, bouwsterren, extra oefeningen na hulp of herstel, routemutaties, leerregistratie per niveau, vaste moeilijkheid en oude saves. Daarnaast worden bereikbaarheid, teleporteren, vertalingen, de renderlus en lichtbreking met gesimuleerde componenten gecontroleerd.

**Deze tests gebruiken een gesimuleerde DOM/Canvas en zijn geen browser-QA.** Een volledige visuele browser- en touchtest blijft nodig; Liquid Glass, leesbaarheid en prestaties moeten op echte apparaten worden beoordeeld.

## Deploy

De GitHub-repository is door de eigenaar gekoppeld aan Vercel. De game is statische HTML zonder buildstap; publiceer de hoofdmap. Nieuwe commits op de gekoppelde productiebranch kunnen automatisch een Vercel-deployment starten.
