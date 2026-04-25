const gardenData = {
  "Front Right": [
    "Wild bergamot",
    "Largeflower aster (2)",
    "Rattlesnake master",
    "Western sunflower (2)",
    "Kobold blazing star (5)",
    "Snow Flurry aster (3)",
    "Fireworks sundrops (3)",
    "Garden phlox",
    "Lanceleaf coreopsis",
    "Threadleaf coreopsis",
    "Blue Moon phlox"
  ],

  "Front Left": [
    "Southern bush honeysuckle (2)",
    "Prairie golden aster",
    "Wild columbine",
    "Fameflower",
    "Celandine poppy",
    "Native white petunia",
    "Coral honeysuckle (2)",
    "Tennessee coneflower",
    "Black-eyed Susan (2)",
    "Anise hyssop"
  ],

  "Garage Left": [
    "Aromatic aster",
    "Summer phlox",
    "Rough blazing star (2)",
    "Beardtongue (3)",
    "Gray goldenrod",
    "Butterfly weed (8 tubers)"
  ],

  "Garage Right": [
    "Black-eyed Susan (2)",
    "Butterfly weed (2 tubers)"
  ],

  "Back Porch Right": [
    "Peonies (2)",
    "Jacob Cline (3)",
    "Wild bergamot",
    "Spotted bee balm",
    "Mountain mint",
    "Obedient plant",
    "Coral honeysuckle",
    "Purple passionflower (Passiflora incarnata)" // added here
  ],

  "Back Porch Left": [
    "Jacob Cline (2)",
    "Blue lobelia"
  ]
};

const plantList = document.getElementById("plantList");
const title = document.getElementById("title");

function showBed(bed) {
  title.textContent = bed;
  plantList.innerHTML = "";

  gardenData[bed].forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    plantList.appendChild(li);
  });
}

/* -------- DRAG FUNCTIONALITY -------- */

const zones = document.querySelectorAll(".zone");
let active = null;
let offsetX = 0;
let offsetY = 0;

zones.forEach(zone => {
  zone.addEventListener("pointerdown", e => {
    active = zone;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    zone.setPointerCapture(e.pointerId);
  });

  zone.addEventListener("pointermove", e => {
    if (!active) return;

    const map = document.getElementById("map");
    const rect = map.getBoundingClientRect();

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    active.style.left = x + "px";
    active.style.top = y + "px";
  });

  zone.addEventListener("pointerup", () => {
    if (!active) return;

    savePositions();
    active = null;
  });
});

/* -------- SAVE / LOAD -------- */

function savePositions() {
  const data = {};
  zones.forEach(z => {
    data[z.id] = {
      left: z.style.left,
      top: z.style.top
    };
  });
  localStorage.setItem("gardenLayout", JSON.stringify(data));
}

function loadPositions() {
  const data = JSON.parse(localStorage.getItem("gardenLayout"));
  if (!data) return;

  zones.forEach(z => {
    if (data[z.id]) {
      z.style.left = data[z.id].left;
      z.style.top = data[z.id].top;
    }
  });
}

function resetPositions() {
  localStorage.removeItem("gardenLayout");
  location.reload();
}

loadPositions();
