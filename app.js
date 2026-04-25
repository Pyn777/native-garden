const gardenData = {
  "Front Right": [
    { name: "Wild bergamot", bloom: "Jun–Aug" },
    { name: "Largeflower aster (2)", bloom: "Sep–Oct" },
    { name: "Rattlesnake master", bloom: "Jun–Aug" },
    { name: "Western sunflower (2)", bloom: "Jul–Sep" },
    { name: "Kobold blazing star (5)", bloom: "Jul–Aug" },
    { name: "Snow Flurry aster (3)", bloom: "Sep–Oct" },
    { name: "Fireworks sundrops (3)", bloom: "May–Sep" },
    { name: "Garden phlox", bloom: "Jun–Aug" },
    { name: "Lanceleaf coreopsis", bloom: "May–Jul" },
    { name: "Threadleaf coreopsis", bloom: "Jun–Aug" },
    { name: "Blue Moon phlox", bloom: "Mar–May" }
  ],

  "Back Porch Right": [
    { name: "Peonies (2)", bloom: "Apr–May" },
    { name: "Jacob Cline bee balm (3)", bloom: "Jun–Aug" },
    { name: "Wild bergamot", bloom: "Jun–Aug" },
    { name: "Spotted bee balm", bloom: "Jul–Sep" },
    { name: "Mountain mint", bloom: "Jul–Sep" },
    { name: "Obedient plant", bloom: "Jul–Sep" },
    { name: "Coral honeysuckle", bloom: "Apr–Jun" },
   ],

  "Back Porch Left": [
    { name: "Jacob Cline bee balm (2)", bloom: "Jun–Aug" },
    { name: "Blue lobelia", bloom: "Jul–Sep" }
   { name: "Purple passionflower", bloom: "Jun–Aug" }
  ],

  "Garage Left": [
    { name: "Aromatic aster", bloom: "Sep–Oct" },
    { name: "Summer phlox", bloom: "Jun–Aug" },
    { name: "Rough blazing star (2)", bloom: "Jul–Sep" },
    { name: "Beardtongue (3)", bloom: "May–Jun" },
    { name: "Gray goldenrod", bloom: "Aug–Oct" },
    { name: "Butterfly weed (8 tubers)", bloom: "Jun–Aug" }
  ],

  "Garage Right": [
    { name: "Black-eyed Susan (2)", bloom: "Jun–Sep" },
    { name: "Butterfly weed (2 tubers)", bloom: "Jun–Aug" }
  ],

  "Front Left": [
    { name: "Southern bush honeysuckle (2)", bloom: "Jun–Jul" },
    { name: "Prairie golden aster", bloom: "Aug–Oct" },
    { name: "Wild columbine", bloom: "Apr–May" },
    { name: "Fameflower", bloom: "Jun–Sep" },
    { name: "Celandine poppy", bloom: "Mar–May" },
    { name: "Native white petunia", bloom: "Jun–Sep" },
    { name: "Coral honeysuckle (2)", bloom: "Apr–Jun" },
    { name: "Tennessee coneflower", bloom: "Jun–Aug" },
    { name: "Black-eyed Susan (2)", bloom: "Jun–Sep" },
    { name: "Anise hyssop", bloom: "Jun–Sep" }
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
