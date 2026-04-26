const gardenData = {
  "Front Right": {
    display: "Front Yard — Right Bed",
    summary: "Meadow-style front bed, mapped left to right.",
    plants: [
      ["Wild bergamot", "Monarda fistulosa", "Jun–Aug", "Spring 2026", "Pollinator plant; can spread."],
      ["Largeflower aster (2)", "Symphyotrichum grandiflorum", "Sep–Oct", "Spring 2026", "Late-season fall bloom."],
      ["Rattlesnake master", "Eryngium yuccifolium", "Jun–Aug", "Spring 2026", "Architectural plant; slow early growth."],
      ["Western sunflower (2)", "Helianthus occidentalis", "Jul–Sep", "Spring 2026", "Tall yellow summer bloom."],
      ["Kobold blazing star (5)", "Liatris spicata", "Jul–Aug", "Spring 2026", "Purple vertical spikes."],
      ["Snow Flurry aster (3)", "Symphyotrichum ericoides", "Sep–Oct", "Spring 2026", "Low spreading fall aster."],
      ["Fireworks sundrops (3)", "Oenothera lindheimeri", "May–Sep", "Spring 2026", "Airy texture."],
      ["Garden phlox", "Phlox paniculata", "Jun–Aug", "Spring 2026", "Watch for powdery mildew."],
      ["Lanceleaf coreopsis", "Coreopsis lanceolata", "May–Jul", "Spring 2026", "Can reseed lightly."],
      ["Threadleaf coreopsis", "Coreopsis verticillata", "Jun–Aug", "Spring 2026", "Fine foliage."],
      ["Wild columbine", "Aquilegia canadensis", "Apr–May", "Spring 2026", "Early bloomer; may reseed."],
      ["Blue Moon phlox", "Phlox divaricata", "Mar–May", "Spring 2026", "Back corner; may fade in summer."]
    ]
  },

  "Front Left": {
    display: "Front Yard — Left Bed",
    summary: "Sunny meadow-like front bed.",
    plants: [
      ["Southern bush honeysuckle (2)", "Diervilla sessilifolia", "Jun–Jul", "Spring 2026", "Native shrub."],
      ["Prairie golden aster", "Chrysopsis", "Aug–Oct", "Spring 2026", "Late yellow bloom."],
      ["Fameflower", "Phemeranthus calycinus", "Jun–Sep", "Spring 2026", "Low dry-site plant."],
      ["Celandine poppy", "Stylophorum diphyllum", "Mar–May", "Spring 2026", "May go dormant in summer."],
      ["Native white petunia", "Ruellia humilis", "Jun–Sep", "Spring 2026", "Low summer bloomer."],
      ["Coral honeysuckle (2)", "Lonicera sempervirens", "Apr–Jun", "Spring 2026", "On trellis."],
      ["Tennessee coneflower", "Echinacea tennesseensis", "Jun–Aug", "Spring 2026", "Native coneflower."],
      ["Black-eyed Susan (2)", "Rudbeckia hirta", "Jun–Sep", "Existing / moved Spring 2026", "May reseed."],
      ["Anise hyssop", "Agastache foeniculum", "Jun–Sep", "Spring 2026", "Pollinator favorite."]
    ]
  },

  "Garage Left": {
    display: "Garage Side — Left Bed",
    summary: "Garage-side bed with 8 butterfly weed tubers.",
    plants: [
      ["Aromatic aster", "Symphyotrichum oblongifolium", "Sep–Oct", "Spring 2026", "Late fall color."],
      ["Summer phlox", "Phlox paniculata", "Jun–Aug", "Spring 2026", "Mid-summer color."],
      ["Rough blazing star (2)", "Liatris aspera", "Jul–Sep", "Spring 2026", "Tall purple spikes."],
      ["Husker Red beardtongue (3)", "Penstemon digitalis", "May–Jun", "Spring 2026", "Early bloom."],
      ["Gray goldenrod", "Solidago nemoralis", "Aug–Oct", "Moved Spring 2026"],
      ["Butterfly weed (8 tubers)", "Asclepias tuberosa", "Jun–Aug", "Spring 2026", "Tubers may emerge late."]
    ]
  },

  "Garage Right": {
    display: "Garage Side — Right Bed",
    summary: "Small 2x2 accent bed.",
    plants: [
      ["Black-eyed Susan (2)", "Rudbeckia hirta", "Jun–Sep", "Spring 2026", "Small accent bed."],
      ["Butterfly weed (2 tubers)", "Asclepias tuberosa", "Jun–Aug", "Spring 2026", "Small tubers; may emerge late."]
    ]
  },

  "Back Porch Right": {
    display: "Rear Yard — Right Bed",
    summary: "Peony bed with several strong spreaders and Passiflora.",
    plants: [
      ["Peonies (2)", "Paeonia", "Apr–May", "Established", "Huge established anchors."],
      ["Jacob Cline bee balm (3)", "Monarda didyma", "Jun–Aug", "Spring 2026 / established", "Spreads by rhizomes."],
      ["Wild bergamot", "Monarda fistulosa", "Jun–Aug", "Spring 2026", "Can spread."],
      ["Spotted bee balm", "Monarda punctata", "Jul–Sep", "Spring 2026", "Drought-tolerant Monarda."],
      ["Virginia mountain mint", "Pycnanthemum virginianum", "Jul–Sep", "Spring 2026", "Excellent pollinator plant."],
      ["Obedient plant", "Physostegia virginiana", "Jul–Sep", "Spring 2026", "Very aggressive spreader."],
      ["Coral honeysuckle", "Lonicera sempervirens", "Apr–Jun", "Established", "Vine; keep trained."]
     ]
  },

  "Back Porch Left": {
    display: "Rear Yard — Left Bed",
    summary: "Smaller rear bed.",
    plants: [
      ["Jacob Cline bee balm (2)", "Monarda didyma", "Jun–Aug", "Spring 2026", "Will spread."],
      ["Blue lobelia", "Lobelia siphilitica", "Jul–Sep", "Spring 2026", "Likes more moisture."],
      ["Purple passionflower", "Passiflora incarnata", "Jun–Aug", "Can spread by root suckers."]
    ]
  }
};

const zones = document.querySelectorAll(".zone");
const bedButtons = document.querySelectorAll("[data-bed-button]");
const bedTitle = document.getElementById("bedTitle");
const bedSummary = document.getElementById("bedSummary");
const plantList = document.getElementById("plantList");

async function getPlantImage(scientific) {
  const page = scientific.split(" ").slice(0, 2).join("_");

  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`);
    const data = await res.json();
    return data.thumbnail?.source || "";
  } catch {
    return "";
  }
}

async function showBed(bed) {
  const bedData = gardenData[bed];
  if (!bedData) return;

  bedTitle.textContent = bedData.display;
  bedSummary.textContent = bedData.summary;
  plantList.innerHTML = "";

  zones.forEach(zone => {
    zone.classList.toggle("active", zone.dataset.bed === bed);
  });

  for (const plant of bedData.plants) {
    const [name, scientific, bloom, planted, notes] = plant;

    const card = document.createElement("article");
    card.className = "plant-card";

    card.innerHTML = `
      <h3>${name}</h3>
      <em>${scientific}</em>
      <p>Loading image...</p>
      <div>
        <span class="pill">Bloom: ${bloom}</span>
        <span class="pill">Planted: ${planted}</span>
      </div>
      <p class="note">${notes}</p>
    `;

    plantList.appendChild(card);

    const image = await getPlantImage(scientific);

    card.innerHTML = `
      <h3>${name}</h3>
      <em>${scientific}</em>
      ${image ? `<img src="${image}" alt="${name}">` : `<p class="note">No image available.</p>`}
      <div>
        <span class="pill">Bloom: ${bloom}</span>
        <span class="pill">Planted: ${planted}</span>
      </div>
      <p class="note">${notes}</p>
    `;
  }
}

zones.forEach(zone => {
  zone.addEventListener("click", () => showBed(zone.dataset.bed));
});

bedButtons.forEach(button => {
  button.addEventListener("click", () => showBed(button.dataset.bedButton));
});

showBed("Front Right");