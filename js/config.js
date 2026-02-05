
export const MUSEUM = {
  corridor: {
    
    start: { x: 0, y: 1.7, z: 4.0, yawDeg: 0, pitchDeg: 0 },
  },

  // 8 rooms 
  layout: {
    roomsPerSide: 4,
    firstRoomZ: -10,
    roomSpacing: 20,
    endWall: {
      image: "./assets/docs/corridor_end.png",
      text: "Contact Me :)\ne-mail: 4lillyvolti@gmail.com\ntel: 017546176665"
    }
  }

};


export const ROOMS = [
  
  {
    id: 1,
    side: "L",
    title: "Raum 1",
    menuTitle: "Raum 1: Brand Design",
    signText: "Raum 1\nBrand Design",
    wallLabel: "Brand Design",
    projects: [
      { title: "Rebranding Alte Feuerwache", 
        desc: "Im Rahmen des Kurses Brand Design bei Axel Kolaschnik erarbeitete ich mit meiner Gruppe eine Corporate Identity für die Alte Feuerwache Mannheim. Das genaue Vorgehen wurde in der Dokumentation aufgezeigt. Mein größtes Learning war die Wichtigkeit von Iterationsprozessen, die ich in diesem Projekt im direkten Austausch mit der Geschäftsführung der Alten Feuerwache erarbeiten durfte. Das Rebranding steht aktuell noch in der Umsetzung. ", 
        image: "./assets/projects/room01_01.png",
        link: "./assets/docs/docBD_01.pdf"
      },
      { title: "Rebranding Verein der Freunde", 
        desc: "In meinem dritten Semester an der Hochschule erarbeitete ich ein neues Corporate Design für den Verein der Freunde Mannheim. Durch die enge Zusammenarbeit mit dem Team des Vereines konnte ich erste praxisbezogene Erfahrungen sammeln und vertiefen. In der Dokumentation wird das fertige Endergebnis mit Mockups gezeigt. ", 
        image: "./assets/projects/room01_02.png",
        link: "./assets/docs/docBD_02.pdf" 
      },
      
    ],
  },
  {
    id: 2,
    side: "R",
    title: "Raum 2",
    menuTitle: "Raum 2: Interaktive Medien",
    signText: "Raum 2\nInteraktive Medien",
    wallLabel: "Interaktive Medien",
    projects: [
      { title: "Murder Mystery Website", 
        desc: "Ein besonderes Herzensprojekt von mir ist meine Murder Mystery Seite Haus der Kruste. Mir kam die Idee, eine Geschichte eines Mordfalls auszuarbeiten und als Rätsel in einer Website zu verstecken, die auf den ersten Blick unscheinbar aussieht. Bei genauerem Hinsehen jedoch können mehr und mehr Hinweise entdeckt werden—unter anderem in dem hauseigenen Intranet—, die nach und nach den Todesfall um Marcel Walde aufklären. Nach einigen Testdurchläufen ergab sich eine Spieldauer von etwa 1,5 bis 2 Stunden. Viel Spaß beim Ausprobieren! ", 
        image: "./assets/projects/room02_01.png", 
        link: "https://linaarens.github.io/crime_hausderkruste/" 
      },
      { title: "Portfolio", 
        desc: "Einer meiner Dozenten an der Hochschule sagte mir einmal, das Portfolio sei die wahrscheinlich einzige Spielwiese, auf der sich Designer:innen noch frei nach Schnauze austoben können. Diese Aussage ist in meinem Kopf hängen geblieben. Die gängigen Tools wie Framer oder ähnlichen entsprechen nicht meinen Ansprüchen an ein Portfolio. Und so wagte ich mich in bisher ungeahnte Gewässer: ich fasste den—für meine damaligen Kenntnisse sehr zielstrebigen—Plan, eine dreidimensionale Website selbst zu coden, die den Anschein eines Museums erweckt. Durch Bilder an der Wand (wie dieses hier) kann durch Projektbeschreibungen näheres erfahren werden. Es sollte außerdem noch eine Art Kurzüberblick in Form eines blätterbaren Buches geben, wenn es schnell gehen muss. Im Rahmen dieses Projektes habe ich wahnsinnig viel gelernt, von strukturiertem, detailliertem Arbeiten bis zum schnellen Hineinfuchsen in fremde Themen. Hier stecken auf jeden Fall viel Blut, Schweiß und Spaß drinnen!", 
        image: "./assets/projects/room02_02.png" },
  
    ],
  },

  {
    id: 3,
    side: "L",
    title: "Raum 3",
    menuTitle: "Raum 3: 3D Visualisierung",
    signText: "Raum 3\n3D Visualisierung",
    wallLabel: "3D Visualisierung",
    projects: [
      { title: "Claw Machine Movie", 
        desc: "Für dieses Projekt erstellte ich verschiedene Modelle in Blender und fügte sie in einem Video in After Effects zusammen. Der Kopf ist gesculpted, es wurden keine Add-ons oder Libraries verwendet. Hier konnte ich erste Erfahrungen in 3D- und Schnittprogrammen sammeln. ", 
        image: "./assets/projects/room03_01.png",
        link: "./assets/docs/docB_01.mp4" 
      },
      { title: "Holzzug", 
        desc: "Der Holzzug war mein allererstes Projekt in einem 3D-Programm und diente mir als Einführung in Blender in dem Kurs 3D Visualisierung. Alle Figuren und Formen sind selbstgebaut. ", 
        image: "./assets/projects/room03_02.png" },
      
    ],
  },
  {
    id: 4,
    side: "R",
    title: "Raum 4",
    menuTitle: "Raum 4: UX/UI",
    signText: "Raum 4\nUX/UI",
    wallLabel: "UX/UI",
    projects: [
      { title: "App Prototyping Nachtwandel", 
        desc: "In Teamarbeit erstellten wir einen Prototypen für eine Funktion einer App für den Nachtwandel im Mannheimer Jungbusch. Dieser Prototyp sollte es den Nutzer:innen ermöglichen, anhand vorgefertigter Routen durch intuitive Navigation das Event zu erleben. Der Prototyp wurde in Figma geprototyped und wird in naher Zukunft bei etwaiger Umsetzung noch optimiert.", 
        image: "./assets/projects/room04_01.png",
        link: "./assets/docs/docUX_01.pdf" 
      },
      
    ],
  },

  {
    id: 5,
    side: "L",
    title: "Raum 5",
    menuTitle: "Raum 5: Advertising Design",
    signText: "Raum 5\nAdvertising Design",
    wallLabel: "Advertising Design",
    projects: [
      { title: "Kampagne für Wachmacher", 
        desc: "Im Rahmen einer Kursaufgabe durfte ich eine Werbekampagne für eine Kaffeefirma erstellen. Die Kampagne sollte sich um ein ausgewähltes Betroffenheitsthema drehen, hierfür suchte ich mir das Thema Rassismus aus. Die Ausarbeitung der Kampagne wurde in einem Magazin dargestellt.", 
        image: "./assets/projects/room05_01.png",
        link: "https://heyzine.com/flip-book/bc6c53ec79.html#page/1" 
      },
      { title: "Gründung einer Agentur", 
        desc: "In diesem Projekt befasste ich mich mit der Konzeption einer marktfähigen Agentur. Dazu gehörte neben dem Entwickeln einer Corporate Identity auch das Planen von Distributionsgebieten, die Recherche zu einem optimalen Firmensitz und die Planung eines Showrooms. ", 
        image: "./assets/projects/room05_02.png",
        link: "./assets/docs/docAD_02.pdf" 
      },
      
    ],
  },
  {
    id: 6,
    side: "R",
    title: "Raum 6",
    menuTitle: "Raum 6: Print Design",
    signText: "Raum 6\nPrint Design",
    wallLabel: "Print Design",
    projects: [
      { title: "Magazin über Typosünden", 
        desc: "Im Kurs von Veruschka Götz durfte ich in die Welt der typographischen Sündlein eintauchen. In diesem Magazin analysierte ich die Regeln des Geschriebenen und stellte diese thematisch nach den Höllenkreisen aus Dantes Inferno dar. ", 
        image: "./assets/projects/room06_01.png",
        link: "https://heyzine.com/flip-book/979e257b8d.html" 
       },
      { title: "Zeitung über Semesterprojekte", 
        desc: "Zu Semesterabschluss gestaltete ich eine Zeitung, die alle von mir im Semester aus den Kursen von Veruschka Götz erarbeiteten Projekte vorstellt. Später werden hier Bilder von der gedruckten Version zu sehen sein, diese befindet sich jedoch gerade noch in einer Ausstellung.", 
        image: "./assets/projects/room06_02.png",
        link: "https://heyzine.com/flip-book/8f163fe03a.html" 
      },
      
    ],
  },

  {
    id: 7,
    side: "L",
    title: "Raum 7",
    menuTitle: "Raum 7: Fotografie",
    signText: "Raum 7\nFotografie",
    wallLabel: "Fotografie",
    projects: [
      { title: "Studioshooting Dark Wave", 
        desc: "Im zweiten Semester meines Studiums plante ich ein Studio-Shooting in einem Dark-Wave Gothic Setting. Hierfür diente mir Luca Emig als Modell. Die bearbeiteten Bilder stellte ich nochmal anschaulicher in einem Magazin dar. ", 
        image: "./assets/projects/room07_01.png",
        link: "https://heyzine.com/flip-book/ea6bdb73a6.html" 
      },
      
    ],
  },
  {
    id: 8,
    side: "R",
    title: "Raum 8",
    menuTitle: "Raum 8: Ausstellungskonzeption",
    signText: "Raum 8\nAusstellungskonzeption",
    wallLabel: "Ausstellungskonzeption",
    projects: [
      { title: "Konzeption einer Werkschau", 
        desc: "Einmal im Jahr findet an der TH Mannheim die Werkschau statt, für die ich im dritten Semester in Teamarbeit eine Konzeption anfertigte. Mit inbegriffen ist Konzept, Vermessung und Ausstellungspläne in Form von technischen Zeichnungen. ", 
        image: "./assets/projects/room08_01.png",
        link: "./assets/docs/docA_01.pdf" 
      },
     
    ],
  },
];
