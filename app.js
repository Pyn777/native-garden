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

const zones = document.querySelectorAll(".zone");
const map = document.getElementById("map");
const title = document.getElementById("bedTitle");
const plantList = document.getElementById("plantList");

let active = null;
let startX = 0;
let startY = 0;
let startLeft = 0;
let startTop = 0;
let moved = false;

function showBed(bed) {
  title.textContent = bed;
  plantList.innerHTML = "";

  zones.forEach(z => z.classList.remove("active"));

  zones.forEach(z => {
    if (z.dataset.bed === bed) z.classList.add("active");
  });

  gardenData[bed].forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    plantList.appendChild(li);
  });
}

zones.forEach(zone => {
  zone.addEventListener("pointerdown", e => {
    active = zone;
    moved = false;

    startX = e.clientX;
    startY = e.clientY;
    startLeft = zone.offsetLeft;
    startTop = zone.offsetTop;

    zone.setPointerCapture(e.pointerId);
  });

  zone.addEventListener("pointermove", e => {
    if (!active) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      moved = true;
    }

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    const maxLeft = map.clientWidth - zone.offsetWidth;
    const maxTop = map.clientHeight - zone.offsetHeight;

    newLeft = Math.max(0, Math.min(maxLeft, newLeft));
    newTop = Math.max(0, Math.min(maxTop, newTop));

    zone.style.left = newLeft + "px";
    zone.style.top = newTop + "px";
  });

  zone.addEventListener("pointerup", () => {
    if (!active) return;

    savePositions();

    if (!moved) {
      showBed(active.dataset.bed);
    }

    active = null;
  });
});

function savePositions() {
  const data = {};
  zones.forEach(z => {
    data[z.id] = {
      left: z.offsetLeft,
      top: z.offsetTop
    };
  });
  localStorage.setItem("gardenLayout", JSON.stringify(data));
}

function loadPositions() {
  const saved = JSON.parse(localStorage.getItem("gardenLayout"));
  if (!saved) return;

  zones.forEach(z => {
    if (saved[z.id]) {
      z.style.left = saved[z.id].left + "px";
      z.style.top = saved[z.id].top + "px";
    }
  });
}

function resetPositions() {
  localStorage.removeItem("gardenLayout");
  location.reload();
}

document.getElementById("resetButton").onclick = resetPositions;

loadPositions();
showBed("Front Right");
