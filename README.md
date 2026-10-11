# Cédric — Lucky Lands · V2

Een zelfstandige, isometrische ontdekgame met Liquid Glass, vier minigames, tools, lucky blocks en steeds nieuwe stukjes wereld.

**Website:** https://cedric-chi.vercel.app/

## Nieuw in V2

### Liquid Glass en lichtbreking

De glazen panelen krijgen een eigen Canvas-laag. Die bemonstert het actuele speelveld met vergrote en gebogen coördinaten: de wereld achter het glas wordt werkelijk vervormd. Daarboven liggen lichte randen, kleurzweem, schaduw en transparante lagen. CSS-blur en highlights vormen de fallback. De glaslaag ververst maximaal circa 11 keer per seconde; het speelveld heeft een eigen animatielus. Bij een voorkeur voor minder beweging wordt de dynamische breking uitgeschakeld.

### Vier verschillende minigames

| Werkplaats | Uitdaging | Moeilijker door |
|---|---|---|
| Smid | Oven op temperatuur brengen, meerdere gerichte hamerslagen, afkoelen in het juiste venster | Meer slagen, snellere wijzer en smallere doelen |
| Bakker | Bestelling bekijken en ingrediënten in dezelfde volgorde terughalen | Langere reeks, meer ingrediënten en kortere kijktijd |
| Tuinier | Zaadjes op een 4 × 4 veld onthouden en terugplanten | Meer zaadjes en kortere kijktijd |
| Postkantoor | Pakketjes sorteren op kleur én symbool | Meer combinaties, meer pakketjes en minder tijd |

- **Rustig / Pittig / Expert** zijn direct beschikbaar; standaard staat het spel op Pittig.
- Elke werkplaats heeft een eigen rang en beste score. Vanaf 50% nauwkeurigheid levert een voltooide klus één ervaringspunt op. Elke drie punten verhogen de rang.
- Hogere rangen verhogen de uitdaging tot een begrensd maximum, zodat de minigames speelbaar blijven.
- Een voltooide klus betaalt een basisloon; nauwkeurigheid en gekozen moeilijkheid leveren extra munten op. Je ontvangt maximaal 2,5×, 3× of 3,5× het basisloon.
- Stop je halverwege, dan ontvang je geen loon. Een verlopen postronde wordt eenmaal afgerekend op basis van de behaalde score.
- Bij wisselen naar een ander tabblad pauzeren de tijdvensters en geheugenvoorbeelden.

## Spelen

Open de website of download `index.html` en open het in een moderne browser. Geen installatie, account, build, server, externe afbeeldingen of internet nodig voor het gedownloade bestand. Alle code, tekeningen, geluiden en vertalingen zitten in één bestand.

- **Lopen:** klik/tik op een vakje, gebruik WASD of de pijltjes. Op de telefoon staan ook richtingknoppen.
- **Werken:** klik op een werkplaats. De knop Werkplaatsen loopt naar de dichtstbijzijnde werkplek.
- **Tools:** koop bijlen, houwelen en hamers. Je houdt je tools. Elk lucky block toont de vereiste soort en sterkte.
- **Ontdekken:** hak een lucky block open voor munten en een nieuw gebied.
- **Auto:** klik op een auto, stap in en klik op een leeg vrijgespeeld vakje. Escape annuleert.
- **Camera:** sleep over het veld, zoom met +/− of het muiswiel, centreer met ⌖.
- **Taal:** NL / EN rechtsboven wisselt de interface en minigames.
- **Voortgang:** wordt lokaal in de browser opgeslagen. Een andere browser of ander apparaat heeft een eigen avontuur. Uitleg bevat een resetknop met bevestiging.

V1-opslag wordt automatisch aangevuld met rang, records en moeilijkheid. Munten, tools en gebieden blijven behouden. Een lopende minigame en schade aan een nog ongeopend block worden niet opgeslagen.

## Ontwerp en techniek

Districten van 4 × 4 vakjes volgen een vierkante spiraal zonder ontworpen eindpunt. De praktische wereldgrootte is afhankelijk van het apparaat. Na elke drie blocks stijgt het vereiste toolniveau. Hogere landen betalen meer loon.

- `index.html`: complete runtime, CSS, Canvas-renderer, padzoeker, minigames en NL/EN-teksten.
- `tests/logic.cjs`: regressietests op de daadwerkelijke inline spelcode in een gesimuleerde DOM/Canvas. Alleen Node.js nodig.
- Save key: `cedric-lucky-lands-v1`, schema versie 1 met achterwaarts compatibele toevoegingen.
- Geen tracking, advertenties, aankopen, externe libraries of netwerkverzoeken vanuit de game.

## Testen

```sh
node tests/logic.cjs
```

Controleert vier minigames, drie moeilijkheidsgraden, goede en foute invoer, tijdslimieten, dubbele uitbetaling, vakervaring, pauzeren, oude saves, 60 wereldexpansies, bereikbaarheid, teleporteren en taal.

De tests simuleren de DOM. Een volledige visuele browser- en touchtest blijft nodig; Liquid Glass en performance moeten op echte browsers/apparaten worden beoordeeld.

## Deploy

De GitHub-repository is door de eigenaar gekoppeld aan Vercel. De game is statische HTML zonder buildstap; publiceer de hoofdmap. Nieuwe commits op de gekoppelde productiebranch kunnen automatisch een Vercel-deployment starten.
