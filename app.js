const gardenData = {
  "Front Right": [
    { name: "Wild bergamot", scientific: "Monarda fistulosa", bloom: "Jun–Aug" },
    { name: "Largeflower aster (2)", scientific: "Symphyotrichum grandiflorum", bloom: "Sep–Oct" },
    { name: "Rattlesnake master", scientific: "Eryngium yuccifolium", bloom: "Jun–Aug" },
    { name: "Western sunflower (2)", scientific: "Helianthus occidentalis", bloom: "Jul–Sep" },
    { name: "Kobold blazing star (5)", scientific: "Liatris spicata", bloom: "Jul–Aug" },
    { name: "Snow Flurry aster (3)", scientific: "Symphyotrichum ericoides", bloom: "Sep–Oct" },
    { name: "Fireworks sundrops (3)", scientific: "Oenothera lindheimeri", bloom: "May–Sep" },
    { name: "Garden phlox", scientific: "Phlox paniculata", bloom: "Jun–Aug" },
    { name: "Lanceleaf coreopsis", scientific: "Coreopsis lanceolata", bloom: "May–Jul" },
    { name: "Threadleaf coreopsis", scientific: "Coreopsis verticillata", bloom: "Jun–Aug" },
    { name: "Blue Moon phlox", scientific: "Phlox divaricata", bloom: "Mar–May" }
  ],

  "Front Left": [
    { name: "Southern bush honeysuckle (2)", scientific: "Diervilla sessilifolia", bloom: "Jun–Jul" },
    { name: "Prairie golden aster", scientific: "Chrysopsis", bloom: "Aug–Oct" },
    { name: "Wild columbine", scientific: "Aquilegia canadensis", bloom: "Apr–May" },
    { name: "Fameflower", scientific: "Phemeranthus calycinus", bloom: "Jun–Sep" },
    { name: "Celandine poppy", scientific: "Stylophorum diphyllum", bloom: "Mar–May" },
    { name: "Native white petunia", scientific: "Ruellia humilis", bloom: "Jun–Sep" },
    { name: "Coral honeysuckle (2)", scientific: "Lonicera sempervirens", bloom: "Apr–Jun" },
    { name: "Tennessee coneflower", scientific: "Echinacea tennesseensis", bloom: "Jun–Aug" },
    { name: "Black-eyed Susan (2)", scientific: "Rudbeckia hirta", bloom: "Jun–Sep" },
    { name: "Anise hyssop", scientific: "Agastache foeniculum", bloom: "Jun–Sep" }
  ],

  "Garage Left": [
    { name: "Aromatic aster", scientific: "Symphyotrichum oblongifolium", bloom: "Sep–Oct" },
    { name: "Summer phlox", scientific: "Phlox paniculata", bloom: "Jun–Aug" },
    { name: "Rough blazing star (2)", scientific: "Liatris aspera", bloom: "Jul–Sep" },
    { name: "Beardtongue (3)", scientific: "Penstemon digitalis", bloom: "May–Jun" },
    { name: "Gray goldenrod", scientific: "Solidago nemoralis", bloom: "Aug–Oct" },
    { name: "Butterfly weed (8 tubers)", scientific: "Asclepias tuberosa", bloom: "Jun–Aug" }
  ],

  "Garage Right": [
    { name: "Black-eyed Susan (2)", scientific: "Rudbeckia hirta", bloom: "Jun–Sep" },
    { name: "Butterfly weed (2 tubers)", scientific: "Asclepias tuberosa", bloom: "Jun–Aug" }
  ],

  "Back Porch Right": [
    { name: "Peonies (2)", scientific: "Paeonia", bloom: "Apr–May" },
    { name: "Jacob Cline bee balm (3)", scientific: "Monarda didyma", bloom: "Jun–Aug" },
    { name: "Wild bergamot", scientific: "Monarda fistulosa", bloom: "Jun–Aug" },
    { name: "Spotted bee balm", scientific: "Monarda punctata", bloom: "Jul–Sep" },
    { name: "Mountain mint", scientific: "Pycnanthemum virginianum", bloom: "Jul–Sep" },
    { name: "Obedient plant", scientific: "Physostegia virginiana", bloom: "Jul–Sep" },
    { name: "Coral honeysuckle", scientific: "Lonicera sempervirens", bloom: "Apr–Jun" },
    { name: "Purple passionflower", scientific: "Passiflora incarnata", bloom: "Jun–Aug" }
  ],

  "Back Porch Left": [
    { name: "Jacob Cline bee balm (2)", scientific: "Monarda didyma", bloom: "Jun–Aug" },
    { name: "Blue lobelia", scientific: "Lobelia siphilitica", bloom: "Jul–Sep" }
  ]
};

const zones = document.querySelectorAll(".zone");
const title = document.getElementById("bedTitle");
const plantList = document.getElementById("plantList");

function showBed(bed) {
  title.textContent = bed;
  plantList.innerHTML = "";

  zones.forEach(z => z.classList.remove("active"));
  zones.forEach(z => {
    if (z.dataset.bed === bed) z.classList.add("active");
  });

  gardenData[bed].forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.name}</strong><br>
      <em>${p.scientific}</em><br>
      Bloom: ${p.bloom}
      <br><br>
    `;
    plantList.appendChild(li);
  });
}

/* ONLY CLICK — NO DRAGGING */
zones.forEach(zone => {
  zone.addEventListener("click", () => {
    showBed(zone.dataset.bed);
  });
});

/* Reset button still works */
document.getElementById("resetButton").onclick = () => {
  location.reload();
};

showBed("Front Right");