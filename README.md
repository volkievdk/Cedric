# Cédric — Lucky Lands

Een vrolijke, isometrische ontdekgame. Verdien munten met klusjes, koop tools, open lucky blocks en speel steeds nieuwe stukjes wereld vrij.

## Spelen

Download `index.html` en open het in een moderne browser. Geen installatie, account, build, server, externe afbeeldingen of internet nodig. Alle code, tekeningen, geluiden en vertalingen zitten in dit ene bestand.

- **Lopen:** klik/tik op een vakje, gebruik WASD of de pijltjes. Op je telefoon zijn er ook richtingknoppen.
- **Werken:** klik op de smid, tuinier, bakker of het postkantoor. Start de wijzer en stop hem in groen voor dubbel loon.
- **Tools:** koop bijlen, houwelen en hamers in de winkel. Elke tool blijft in je rugzak. Het volgende lucky block toont de vereiste soort en sterkte.
- **Ontdekken:** hak het lucky block een paar keer. Je ontvangt munten en een nieuw gebied met nieuwe werkplekken en een volgend block.
- **Auto:** klik op een auto, stap in en klik op een leeg vrijgespeeld vakje. Escape annuleert.
- **Camera:** sleep over het veld, zoom met +/− of het muiswiel, centreer met ⌖.
- **Taal:** NL / EN rechtsboven wisselt tussen Nederlands en Engels.
- **Voortgang:** automatisch opgeslagen in de lokale browseropslag. Een andere browser of een ander apparaat heeft een eigen avontuur. Wissen van browsergegevens wist ook het spel. Uitleg bevat een bevestigde resetknop.

## Ontwerp

Het spel begint zonder munten. Drie gewone klusjes zijn voldoende voor de eerste bijl. Nieuwe districten van 4 × 4 vakjes volgen een vierkante spiraal. De reeks heeft geen ontworpen eindpunt; praktische grootte en snelheid zijn afhankelijk van het apparaat. Na elke drie blocks stijgt het benodigde toolniveau. Hogere gebieden betalen meer loon. Elke klus betaalt ook als de bonuszone wordt gemist.

De wereld gebruikt Canvas 2D met isometrische projectie, gelaagde blokken, een afgerond geanimeerd personage en confetti. De interface gebruikt lichte, transparante panelen. Alle assets worden ter plekke getekend of zijn systeememoji. Het spel bevat geen tracking, advertenties, aankopen of externe verbindingen.

## GitHub Pages

Deze repository is direct geschikt voor statische hosting. Kies in GitHub **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub maakt daarna de speel-URL aan. Alleen het opslaan van de broncode activeert Pages nog niet.

## Techniek

- `index.html`: complete runtime, inclusief CSS, renderer, padzoeker, spelregels en NL/EN-teksten.
- `tests/logic.cjs`: regressietest op de daadwerkelijke inline spelcode voor verdienen, kopen, toolvereisten, 60 uitbreidingen, bereikbaarheid, teleporteren, taal en opslaan. Gebruikt Node.js zonder dependencies en een gesimuleerde DOM/Canvas.
- Save key: `cedric-lucky-lands-v1`, schema versie 1.
- Tijdelijke looproutes en schade aan een nog ongeopend block worden niet bewaard; munten, tools, vrijgespeelde landen, taal en positie wel.

Testen: `node tests/logic.cjs`. De spelregels zijn hiermee gecontroleerd; een volledige browser- en touchtest op echte apparaten blijft aanbevolen. De wereldrenderer is apart met Canvas visueel gecontroleerd.
