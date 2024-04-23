# API @cmda-minor-web 2023 - 2024 Stef

Dit is mijn API Project. in dit project gebruik ik de Jikan API om een anime app te maken.

Dit project is heel erg groot en iets te groot om in 4 weken af te kunnen ronden maar ik ga het dynamisch en modulair bouwen dat elke functie beoordeeld kan worden en dan kijk ik hoever ik kom



## Doelen

Ik heb een aantal doelen die ik wil halen met dit blok. daarnaast heb ik ook nog een aantal dingen die ik ga doen als ik extra tijd heb. Dit zijn een heleboel dingen aangezien deze api best wel groot en uitgebreid is.

Mijn Hoofd doelen zijn:

* Home Pagina
* Detailpagina
* Top anime pagina

Als ik extra tijd heb dan ga ik dit maken:

* Schedule (wanneer afleveringen uitkomen)
* Manga pagina's
* Genres
* Sorteren
* Zoeken naar anime

## Week 1

Ik begon mijn project met een andere api dan dat ik mee ben geeindigd. Dit kwam doordat de API's die ik wilde gebruiken of niet gratis of niet goed genoeg waren. Mijn idee was om een doomscroll nieuwsapp te maken maar dit is niet gelukt. Toen ik besefte dat het niet ging lukken ben ik snel op zoek gegaan naar een nieuwe API en ik had al snel een nieuwe API gevonden. JIKAN. Deze api is een onofficiele api die informatie van Myanimelist haalt en die in jsons zet. het is een grote en uitgebreide API waar je heel veel mee kan.

Dit nam helaas wel het grootste gedeelte van de week op. Dus hier heb ik niet veel progressie gemaakt

## Week 2

In week 2 ben ik echt begonnen met werken. Ik begon met de homepage netjes maken en vooral uitzoeken hoe ik werk met liquid en met de api. Ik heb een boel uren lopen worstelen met liquid en hoe ik de api data goed binnen krijg.

Ook kwam ik erachter dat mijn api 3 calls per seconde als max heeft. wat geen probleem moet zijn maar er moet wel over nagedacht worden.

Ik heb ook goed over de structuur en het doel an mijn app nagedacht. Ik wilde een app maken waar je anime's en alle informatie over specifieke anime kunt bekijken. 

Het eerste wat ik ging bouwen was een topanime pagina. Hier zie je de top 25 beste anime op het moment. Deze pagina wilde ik genereren gebaseerd op de anime die ik van de api binnenkrijg. Dit heb ik afgerond in week 2 en daarop ben ik verder gaan bouwen


## Week 3

Week 3 begon goed. Ik heb hier heel veel werk uitgevoerd.

Ik begon met heel veel verschillende pagina's bouwen en de basisstructuur uitwerken. Ook liep ik erg tegen een aantal dingen aan met Vite. bijvoorbeeld het linken van css en js. Dit heb ik werkend gekregen op de dev structuur. 

Ik heb hier de schedules gebouwd op de homepagina. Dit heb ik op heel veel verschillende manieren geprobeerd maar uiteindelijk was de beste oplossing om een fetch te doen elke keer als er een dag aangeklikt wordt. Dit is het handigste aangezien er maar max 3 calls per seconde uitgevoerd kunnen worden.

Week 3 was voor mij voor de rest een korte week aangezien ik midden in de week een operatie had en dus niet op school aanwezig kon zijn.

## Week 4

Week 4 was vooral afronden. Puntjes op de i zetten en zorgen dat alles klaarstaat voor gebruik.


## Conclusie

Mijn eindproduct ben ik best wel blij mee. Het is iets waar ik zelf ook nog wel eens wat aan kan hebben.
Ik vond het een leuk project om aan te werken en de laatste API was 100 keer beter dan de nieuwsapi.


## Resources

- Owlcarousel [https://owlcarousel2.github.io/OwlCarousel2/]

Ik heb owlcarousel gebruikt omdat ik dit persoonlijk mega handig vind in gebruik en doet wat ik al kan veel beter. je kunt het gebruiken om nette en responsive carousels te bouwen die automatisch scrollen en zowel op telefoon als laptop werken.
voor owlcarousel heb je ook JQuery nodig maar dit heb ik zo goed als niet gebruikt bij andere dingen.

- Vite[https://vitejs.dev/]
- Liquid[https://shopify.github.io/liquid/]
- Tinyhttp[https://github.com/tinyhttp/tinyhttp]