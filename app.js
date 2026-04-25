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
    "Jacob Cline bee balm (3)",
    "Wild bergamot",
    "Spotted bee balm",
    "Mountain mint",
    "Obedient plant",
    "Coral honeysuckle",
    "Purple passionflower"
  ],
  "Back Porch Left": [
    "Jacob Cline bee balm (2)",
    "Blue lobelia"
  ]
};

const plantList = document.getElementById("plantList");
const title = document.getElementById("title");
const zones = document.querySelectorAll(".zone");
const map = document.getElementById("map");

let activeZone = null;
let startX = 0;
let startY = 0;
let startLeft = 0;
let startTop = 0;
let didDrag = false;

function showBed(bed) {
  title.textContent = bed;
  plantList.innerHTML = "";

  gardenData[bed].forEach(plant => {
    const li = document.createElement("li");
    li.textContent = plant;
    plantList.appendChild(li);
  });
}

zones.forEach(zone => {
  zone.addEventListener("pointerdown", e => {
    activeZone = zone;
    didDrag = false;

    startX = e.clientX;
    startY = e.clientY;
    startLeft = zone.offsetLeft;
    startTop = zone.offsetTop;

    zone.setPointerCapture(e.pointerId);
  });

  zone.addEventListener("pointermove", e => {
    if (!activeZone) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      didDrag = true;
    }

    const mapRect = map.getBoundingClientRect();
    const zoneRect = activeZone.getBoundingClientRect();

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    newLeft = Math.max(0, Math.min(newLeft, mapRect.width - zoneRect.width));
    newTop = Math.max(0, Math.min(newTop, mapRect.height - zoneRect.height));

    activeZone.style.left = newLeft + "px";
    activeZone.style.top = newTop + "px";
  });

  zone.addEventListener("pointerup", e => {
    if (!activeZone) return;

    savePositions();

    if (!didDrag) {
      showBed(activeZone.dataset.bed || activeZone.textContent.trim());
    }

    activeZone = null;
  });
});

function savePositions() {
  const saved = {};

  zones.forEach(zone => {
    saved[zone.id] = {
      left: zone.style.left || zone.offsetLeft + "px",
      top: zone.style.top || zone.offsetTop + "px"
    };
  });

  localStorage.setItem("gardenLayout", JSON.stringify(saved));
}

function loadPositions() {
  const saved = localStorage.getItem("gardenLayout");
  if (!saved) return;

  const positions = JSON.parse(saved);

  zones.forEach(zone => {
    if (positions[zone.id]) {
      zone.style.left = positions[zone.id].left;
      zone.style.top = positions[zone.id].top;
    }
  });
}

function resetPositions() {
  localStorage.removeItem("gardenLayout");
  location.reload();
}

loadPositions();
showBed("Front Right");
