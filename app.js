// ====== Data (8 Kapitel × 2 Spreads = 16 Spreads) ======


const baseLeftPaper  = document.getElementById("basePaperLeft");
const baseRightPaper = document.getElementById("basePaperRight");

const chapterTitles = [
  "Brand Design",
  "Interaktive Medien",
  "3D Visualisierung",
  "UX/UI",
  "Advertising Design",
  "Print Design",
  "Fotografie",
  "Ausstellungskonzeption"
];



const chapters = [
  {
    id: "ch-1",
    title: "Kapitel 1",
    name: "Brand Design",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Rebranding</h2>
        <h2 class="proj-title">Alte Feuerwache</h2>
        <p class="proj-desc">
          Im Rahmen des Kurses "Brand Design" bei Axel Kolaschnik erarbeitete ich mit meiner Gruppe eine Corporate Identity für die Alte Feuerwache Mannheim. Das genaue Vorgehen wurde in der Dokumentation aufgezeigt. Mein größtes Learning war die Wichtigkeit von Iterationsprozessen, die ich in diesem Projekt im direkten Austausch mit der Geschäftsführung der Alten Feuerwache erarbeiten durfte. Das Rebranding steht aktuell noch in der Umsetzung. 
        </p>

       

        <div class="proj-meta">
          <span class="pill">Illustrator</span>
          <span class="pill">Photoshop</span>
          <span class="pill">InDesign</span>
          <span class="pill">AfterEffects</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/MockupWebsite1.png|assets/AF1.png|assets/AF2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
       {
    left: `
      <div class="proj">
        <h2 class="proj-title">Rebranding Verein der Freunde</h2>
        <p class="proj-desc">
         In meinem dritten Semester an der Hochschule erarbeitete ich ein neues Corporate Design für den Verein der Freunde Mannheim. Durch die enge Zusammenarbeit mit dem Team des Vereines konnte ich erste praxisbezogene Erfahrungen sammeln und vertiefen. In der Dokumentation wird das fertige Endergebnis mit Mockups gezeigt.  
        </p>

       

        <div class="proj-meta">
          <span class="pill">Illustrator</span>
          <span class="pill">Photoshop</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/VDF1.png|assets/VDF2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
    ]
  },

  {
    id: "ch-2",
    title: "Kapitel 2",
    name: "Interaktive Medien",
    spreads: [
      { 
        left: 
        `
      <div class="proj">
        <h2 class="proj-title">Murder Mystery Website</h2>
        <p class="proj-desc2">
         Ein besonderes Herzensprojekt von mir ist meine Murder Mystery Seite Haus der Kruste. Mir kam die Idee, eine Geschichte eines Mordfalls auszuarbeiten und als Rätsel in einer Website zu verstecken, die auf den ersten Blick unscheinbar aussieht. Bei genauerem Hinsehen jedoch können mehr und mehr Hinweise entdeckt werden—unter anderem in dem hauseigenen Intranet—, die nach und nach den Todesfall um Marcel Walde aufklären. Nach einigen Testdurchläufen ergab sich eine Spieldauer von etwa 1,5 bis 2 Stunden. Viel Spaß beim Ausprobieren!   
        </p>

       

        <div class="proj-meta">
          <span class="pill">HTML</span>
          <span class="pill">CSS</span>
          <span class="pill">JavaScript</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/CS1.png|assets/CS2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
      },
       { 
        left: 
        `
      <div class="proj">
        <h2 class="proj-title">Portfolio</h2>
        <p class="proj-desc7">
         Einer meiner Dozenten an der Hochschule sagte mir einmal, das Portfolio sei die wahrscheinlich einzige Spielwiese, auf der sich Designer:innen noch frei nach Schnauze austoben können. Diese Aussage ist in meinem Kopf hängen geblieben. Die gängigen Tools wie Framer oder ähnlichen entsprechen nicht meinen Ansprüchen an ein Portfolio. Und so wagte ich mich in bisher ungeahnte Gewässer: ich fasste den—für meine damaligen Kenntnisse sehr zielstrebigen—Plan, eine dreidimensionale Website selbst zu coden, die den Anschein eines Museums erweckt. Durch Bilder an der Wand kann durch Projektbeschreibungen näheres erfahren werden. Es sollte außerdem noch eine Art Kurzüberblick in Form eines blätterbaren Buches geben, wenn es schnell gehen muss. Im Rahmen dieses Projektes habe ich wahnsinnig viel gelernt, von strukturiertem, detailliertem Arbeiten bis zum schnellen Hineinfuchsen in fremde Themen. Hier stecken auf jeden Fall viel Blut, Schweiß und Spaß drinnen!  
        </p>

       

       
    `,
    right: `
      <div class="slideshow" data-slides="assets/PF2.png|assets/PF3.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
   <div class="proj-meta">
          <span class="pill">HTML</span>
          <span class="pill">CSS</span>
          <span class="pill">JavaScript</span>
        </div>
      </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
      },
    ]
  },
 {
    id: "ch-3",
    title: "Kapitel 3",
    name: "3D Visualisierung",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Claw Machine Movie</h2>
        <p class="proj-desc3">
          Für dieses Projekt erstellte ich verschiedene Modelle in Blender und fügte sie in einem Video in After Effects zusammen. Der Kopf ist gesculpted, es wurden keine Add-ons oder Libraries verwendet. Hier konnte ich erste Erfahrungen in 3D- und Schnittprogrammen sammeln. 
        </p>

       

        <div class="proj-meta">
          <span class="pill">Blender</span>
          <span class="pill">AfterEffects</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/3DV1.png|assets/3DV2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
       {
    left: `
      <div class="proj">
        <h2 class="proj-title">Holzzug</h2>
        <p class="proj-desc4">
         Der Holzzug war mein allererstes Projekt in einem 3D-Programm und diente mir als Einführung in Blender in dem Kurs "3D Visualisierung". Alle Figuren und Formen sind selbstgebaut.   
        </p>

       

        <div class="proj-meta">
          <span class="pill">Blender</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/HZ1.png|assets/HZ2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
      
    `
  },
    ]
  },
  {
    id: "ch-4",
    title: "Kapitel 4",
    name: "UX/UI",
    spreads: [
      { 
        left: 
        `
      <div class="proj">
        <h2 class="proj-title">App Prototyping Nachtwandel</h2>
        <p class="proj-desc6">
        In Teamarbeit erstellten wir einen Prototypen für eine Funktion einer App für den Nachtwandel im Mannheimer Jungbusch. Dieser Prototyp sollte es den Nutzer:innen ermöglichen, anhand vorgefertigter Routen durch intuitive Navigation das Event zu erleben. Der Prototyp wurde in Figma geprototyped und wird in naher Zukunft bei etwaiger Umsetzung noch optimiert.    
        </p>

       

        <div class="proj-meta">
          <span class="pill">Figma</span>
          <span class="pill">Miro</span>
          
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/UX1.png|assets/UX2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
      },
    ]
  },
   {
    id: "ch-5",
    title: "Kapitel 5",
    name: "Advertising Design",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Kampagne für Wachmacher</h2>
        <p class="proj-desc5">
          Im Rahmen einer Kursaufgabe durfte ich eine Werbekampagne für eine Kaffeefirma erstellen. Die Kampagne sollte sich um ein ausgewähltes Betroffenheitsthema drehen, hierfür suchte ich mir das Thema Rassismus aus. Die Ausarbeitung der Kampagne wurde in einem Magazin dargestellt.  
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
          <span class="pill">Illustrator</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/ADV1.png|assets/ADV3.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
       {
    left: `
      <div class="proj">
        <h2 class="proj-title">Gründung einer Agentur</h2>
        <p class="proj-desc3">
         In diesem Projekt befasste ich mich mit der Konzeption einer marktfähigen Agentur. Dazu gehörte neben dem Entwickeln einer Corporate Identity auch das Planen von Distributionsgebieten, die Recherche zu einem optimalen Firmensitz und die Planung eines Showrooms. 
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
          <span class="pill">Illustrator</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/WR1.png|assets/WR2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
      
    `
  },
    ]
  },
   {
    id: "ch-6",
    title: "Kapitel 6",
    name: "Print Design",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Magazin über Typosünden</h2>
        <p class="proj-desc3">
          Im Kurs von Veruschka Götz durfte ich in die Welt der typographischen Sündlein eintauchen. In diesem Magazin analysierte ich die Regeln des Geschriebenen und stellte diese thematisch nach den Höllenkreisen aus Dantes Inferno dar.   
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
          <span class="pill">Illustrator</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/TS1.png|assets/TS2.png|assets/TS3.png|assets/TS4.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
       {
    left: `
      <div class="proj">
        <h2 class="proj-title">Zeitung über Semesterprojekte</h2>
        <p class="proj-desc3">
         Zu Semesterabschluss gestaltete ich eine Zeitung, die alle von mir im Semester aus den Kursen von Veruschka Götz erarbeiteten Projekte vorstellt. Später werden hier Bilder von der gedruckten Version zu sehen sein, diese befindet sich jedoch gerade noch in einer Ausstellung.
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
          <span class="pill">Illustrator</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/ZS3.png|assets/ZS2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
      
    `
  },
    ]
  },
  {
    id: "ch-7",
    title: "Kapitel 7",
    name: "Fotografie",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Studioshooting Dark Wave</h2>
        <p class="proj-desc3">
          Im zweiten Semester meines Studiums plante ich ein Studio-Shooting in einem Dark-Wave Gothic Setting. Hierfür diente mir Luca Emig als Modell. Die bearbeiteten Bilder stellte ich nochmal anschaulicher in einem Magazin dar. 
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/SF1.png|assets/SF2.png|assets/SF3.png|assets/SF4.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
      
    ]
  },
   {
    id: "ch-8",
    title: "Kapitel 8",
    name: "Ausstellungskonzeption",
    spreads: [
      {
    left: `
      <div class="proj">
        <h2 class="proj-title">Konzeption einer Werkschau</h2>
        <p class="proj-desc3">
          Einmal im Jahr findet an der TH Mannheim die Werkschau statt, für die ich im dritten Semester in Teamarbeit eine Konzeption anfertigte. Mit inbegriffen ist Konzept, Vermessung und Ausstellungspläne in Form von technischen Zeichnungen. 
        </p>

       

        <div class="proj-meta">
          <span class="pill">Photoshop</span>
           <span class="pill">Illustrator</span>
          <span class="pill">InDesign</span>
        </div>
      </div>
    `,
    right: `
      <div class="slideshow" data-slides="assets/AK1.png|assets/AK2.png">
    <img class="slide-img" alt="Projektbild" />
    <button class="slide-btn prev" type="button" aria-label="Vorheriges Bild">←</button>
    <button class="slide-btn next" type="button" aria-label="Nächstes Bild">→</button>
    <div class="slide-dots" aria-hidden="true"></div>
  </div>
       <a class="proj-btn" href="assets/cafe-rebrand-case.pdf" target="_blank" rel="noopener">
          Projekt ansehen →
        </a>
    `
  },
      
    ]
  },
];


// Flatten to 16 spreads
const spreads = chapters.flatMap((ch) =>
  ch.spreads.map((s, idx) => ({
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterIndex: getChapterIndexById(ch.id),
    spreadInChapter: idx + 1, // 1..2
    leftHTML: s.left,
    rightHTML: s.right
  }))
);

function getChapterIndexById(id){
  return Number(id.split("-")[1]) - 1;
}

function pageTemplate({ kicker, title, body, bullets = [], tags = [] }){
  const bulletHTML = bullets.length
    ? `<ul>${bullets.map(b => `<li>${escapeHTML(b)}</li>`).join("")}</ul>`
    : "";
  const tagHTML = tags.length
    ? `<div class="tagrow">${tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}</div>`
    : "";
  return `
    <h3>${escapeHTML(kicker)}</h3>
    <h2>${escapeHTML(title)}</h2>
    <p>${escapeHTML(body)}</p>
    ${bulletHTML}
    ${tagHTML}
  `;
}

function escapeHTML(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ====== DOM ======
const baseLeft = document.getElementById("baseLeft");
const baseRight = document.getElementById("baseRight");
const flips = document.getElementById("flips");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const spreadLabel = document.getElementById("spreadLabel");

const bookmarkList = document.getElementById("bookmarkList");

// ====== State ======
let currentIndex = 0; // 0..15
let isAnimating = false;

// ====== Init ======
renderBaseSpread(currentIndex);
buildBookmarks();
updateUI();

prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(+1));

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(+1);
  if (e.key === "ArrowLeft") go(-1);
});

function buildBookmarks(){
  chapters.forEach((ch, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "bookmark";
    btn.type = "button";
    btn.dataset.chapter = ch.id;
    btn.innerHTML = `
  <span class="bm-num">Kapitel ${i + 1}</span>
  <span class="bm-name">${chapters[i].name}</span>
`;

    btn.addEventListener("click", () => jumpToChapter(i));
    li.appendChild(btn);
    bookmarkList.appendChild(li);
  });
  updateBookmarkActive();
}

function updateBookmarkActive(){
  const activeChapterIndex = spreads[currentIndex].chapterIndex;
  [...document.querySelectorAll(".bookmark")].forEach((b, idx) => {
    b.classList.toggle("active", idx === activeChapterIndex);
  });
}

function updateUI(){
  prevBtn.disabled = isAnimating || currentIndex === 0;
  nextBtn.disabled = isAnimating || currentIndex === spreads.length - 1;

  const s = spreads[currentIndex];
  spreadLabel.textContent = `${s.chapterTitle} · Seite ${s.spreadInChapter}/2`;

  updateBookmarkActive();
}

function renderBaseSpread(index){
  const s = spreads[index];
  baseLeft.innerHTML = s.leftHTML;
  baseRight.innerHTML = s.rightHTML;
  initSlideshows();
}

function go(direction){
  if (isAnimating) return;

  const target = currentIndex + direction;
  if (target < 0 || target >= spreads.length) return;

  if (direction === 1) flipForward(currentIndex, target);
  else flipBackward(currentIndex, target);
}

function jumpToChapter(chapterIndex){
  if (isAnimating) return;

  const target = spreads.findIndex(s => s.chapterIndex === chapterIndex && s.spreadInChapter === 1);
  if (target === -1 || target === currentIndex) return;

  currentIndex = target;
  renderBaseSpread(currentIndex);
  updateUI();
}
function flipForward(fromIndex, toIndex){
  isAnimating = true;
  updateUI();

  const from = spreads[fromIndex];
  const to = spreads[toIndex];

  // 1) Underlay: zeige NEUE rechte Seite während des Flips
  const under = createUnderlay("right", to.rightHTML);
  flips.appendChild(under);

  // 2) Flip: altes rechtes Blatt klappt nach links
  const flipEl = createFlipElement({
    dir: "rtl",
    frontHTML: from.rightHTML, // vorne: alte rechte
    backHTML: to.leftHTML,     // hinten: neue linke
    side: "right"
  });
  flips.appendChild(flipEl);

  const sheet = flipEl.querySelector(".sheet");
  sheet.classList.add("anim-rtl");

  sheet.addEventListener("animationend", () => {
  // 1) Base setzen (DOM swap)
  currentIndex = toIndex;
  renderBaseSpread(currentIndex);
  under.classList.add("fade-out");


  // 2) Erst nächster Frame: Overlays entfernen (verhindert den Jump)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (flipEl.parentNode) flips.removeChild(flipEl);
      if (under.parentNode) flips.removeChild(under);

      isAnimating = false;
      updateUI();
    });
  });
}, { once: true });

}







function flipBackward(fromIndex, toIndex){
  isAnimating = true;
  updateUI();

  const from = spreads[fromIndex];
  const to = spreads[toIndex];

  // 1) Underlay: zeige NEUE linke Seite während des Flips zurück
  const under = createUnderlay("left", to.leftHTML);
  flips.appendChild(under);

  // 2) Flip: altes linkes Blatt klappt nach rechts
  const flipEl = createFlipElement({
    dir: "ltr",
    frontHTML: from.leftHTML,  // vorne: alte linke
    backHTML: to.rightHTML,    // hinten: neue rechte
    side: "left"
  });
  flips.appendChild(flipEl);

  const sheet = flipEl.querySelector(".sheet");
  sheet.classList.add("anim-ltr");

 sheet.addEventListener("animationend", () => {
  currentIndex = toIndex;
  renderBaseSpread(currentIndex);
  under.classList.add("fade-out");


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (flipEl.parentNode) flips.removeChild(flipEl);
      if (under.parentNode) flips.removeChild(under);

      isAnimating = false;
      updateUI();
    });
  });
}, { once: true });

}




function createFlipElement({ dir, frontHTML, backHTML, side }){
  const flip = document.createElement("div");
  flip.className = "flip";

  const sheet = document.createElement("div");
  sheet.className = `sheet ${dir}`;

  // FRONT face: what you see before turning
  const faceFront = document.createElement("div");
  faceFront.className = "face front";
  faceFront.appendChild(makeSinglePage(side, frontHTML));

  // BACK face: what is revealed on the back of the turning page
  const faceBack = document.createElement("div");
  faceBack.className = "face back";
  // Back is the opposite side visually (paper shading should match its “new side”)
  const backSide = (side === "right") ? "left" : "right";
  faceBack.appendChild(makeSinglePage(backSide, backHTML));

  const shadow = document.createElement("div");
  shadow.className = `shadow ${dir}`;

  sheet.appendChild(faceFront);
  sheet.appendChild(faceBack);
  sheet.appendChild(shadow);

  flip.appendChild(sheet);
  return flip;
}

function makeSinglePage(side, html){
  const art = document.createElement("article");
  art.className = `paper ${side}`;
  const inner = document.createElement("div");
  inner.className = "page-content";
  inner.innerHTML = html;
  art.appendChild(inner);
  return art;
}
function createUnderlay(side, html){
  const u = document.createElement("div");
  u.className = `underlay ${side}`;
  u.appendChild(makeSinglePage(side, html)); // nutzt deine bestehende Funktion
  return u;
}

function initSlideshows(){
  document.querySelectorAll(".slideshow").forEach((el) => {
    if (el.dataset.inited === "1") return;   // <-- NEU
    el.dataset.inited = "1"; 
    const srcs = (el.dataset.slides || "")
      .split("|")
      .map(s => s.trim())
      .filter(Boolean);

    if (!srcs.length) return;

    const img = el.querySelector(".slide-img");
    const prev = el.querySelector(".slide-btn.prev");
    const next = el.querySelector(".slide-btn.next");
    const dotsWrap = el.querySelector(".slide-dots");

    let i = 0;

    // dots
    dotsWrap.innerHTML = srcs.map((_, idx) =>
      `<span class="slide-dot ${idx === 0 ? "active" : ""}"></span>`
    ).join("");

    const dots = [...dotsWrap.querySelectorAll(".slide-dot")];

    function render(){
      img.src = srcs[i];
      dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    }

    prev.addEventListener("click", () => {
      i = (i - 1 + srcs.length) % srcs.length;
      render();
    });

    next.addEventListener("click", () => {
      i = (i + 1) % srcs.length;
      render();
    });

    render();
  });
}

const menuBtn = document.getElementById("menuBtn");
const menuPopover = document.getElementById("menuPopover");

function openMenu(){
  menuPopover.hidden = false;
  menuBtn.setAttribute("aria-expanded", "true");
}
function closeMenu(){
  menuPopover.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menuPopover.hidden) openMenu();
  else closeMenu();
});

// Klick außerhalb schließt
window.addEventListener("click", () => {
  if (!menuPopover.hidden) closeMenu();
});

// ESC schließt
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});


