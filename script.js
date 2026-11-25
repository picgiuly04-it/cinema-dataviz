// ==========================================
// 1. CONFIGURAZIONE API & DATASET FALLBACK
// ==========================================
const TMDB_API_KEY = "INSERISCI_TUA_TMDB_API_KEY";
const MIN_MOVIES_TARGET = 109;

const GENRE_MAP = {
  28: "Azione",
  12: "Avventura",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  18: "Dramma",
  14: "Fantasy",
  27: "Horror",
  878: "Sci-Fi",
  53: "Thriller"
};

let allMovies = [];
let selectedGenre = "Tutti";

const FALLBACK_MOVIES = [
  { title: "Avatar", year: 2009, genre: "Sci-Fi", budget: 237000000, revenue: 2923706026, vote: 7.6 },
  { title: "Avengers: Endgame", year: 2019, genre: "Azione", budget: 356000000, revenue: 2799439100, vote: 8.3 },
  { title: "Titanic", year: 1997, genre: "Dramma", budget: 200000000, revenue: 2264743305, vote: 7.9 },
  { title: "Star Wars: Il risveglio della Forza", year: 2015, genre: "Avventura", budget: 245000000, revenue: 2068223624, vote: 7.3 },
  { title: "Avengers: Infinity War", year: 2018, genre: "Azione", budget: 300000000, revenue: 2048359754, vote: 8.2 },
  { title: "Spider-Man: No Way Home", year: 2021, genre: "Azione", budget: 200000000, revenue: 1921847111, vote: 8.0 },
  { title: "Jurassic World", year: 2015, genre: "Avventura", budget: 150000000, revenue: 1671537444, vote: 6.7 },
  { title: "Il re leone", year: 2019, genre: "Animazione", budget: 260000000, revenue: 1663075401, vote: 7.1 },
  { title: "The Avengers", year: 2012, genre: "Azione", budget: 220000000, revenue: 1518815515, vote: 7.7 },
  { title: "Top Gun: Maverick", year: 2022, genre: "Azione", budget: 170000000, revenue: 1495696292, vote: 8.2 },
  { title: "Barbie", year: 2023, genre: "Commedia", budget: 145000000, revenue: 1445638421, vote: 7.1 },
  { title: "Frozen II", year: 2019, genre: "Animazione", budget: 150000000, revenue: 1450026933, vote: 7.3 },
  { title: "Black Panther", year: 2018, genre: "Azione", budget: 200000000, revenue: 1347597973, vote: 7.4 },
  { title: "Harry Potter e i Doni della Morte - Parte 2", year: 2011, genre: "Fantasy", budget: 125000000, revenue: 1342480836, vote: 8.1 },
  { title: "Super Mario Bros. Il film", year: 2023, genre: "Animazione", budget: 100000000, revenue: 1361990276, vote: 7.6 },
  { title: "Jurassic Park", year: 1993, genre: "Avventura", budget: 63000000, revenue: 1037535230, vote: 8.0 },
  { title: "Il cavaliere oscuro", year: 2008, genre: "Crime", budget: 185000000, revenue: 1004558444, vote: 8.5 },
  { title: "Joker", year: 2019, genre: "Crime", budget: 55000000, revenue: 1078958629, vote: 8.2 },
  { title: "Toy Story 4", year: 2019, genre: "Animazione", budget: 200000000, revenue: 1073394593, vote: 7.5 },
  { title: "Oppenheimer", year: 2023, genre: "Dramma", budget: 100000000, revenue: 957842580, vote: 8.1 },
  { title: "Inception", year: 2010, genre: "Sci-Fi", budget: 160000000, revenue: 836836967, vote: 8.4 },
  { title: "Interstellar", year: 2014, genre: "Sci-Fi", budget: 165000000, revenue: 701729206, vote: 8.4 },
  { title: "Dune: Parte Due", year: 2024, genre: "Sci-Fi", budget: 190000000, revenue: 714444358, vote: 8.2 },
  { title: "Forrest Gump", year: 1994, genre: "Dramma", budget: 55000000, revenue: 678226465, vote: 8.5 },
  { title: "Il sesto senso", year: 1999, genre: "Thriller", budget: 40000000, revenue: 672806292, vote: 8.0 },
  { title: "Pulp Fiction", year: 1994, genre: "Crime", budget: 8000000, revenue: 213928762, vote: 8.5 },
  { title: "Le iene", year: 1992, genre: "Crime", budget: 1200000, revenue: 2832029, vote: 8.1 },
  { title: "Get Out - Scappa", year: 2017, genre: "Horror", budget: 4500000, revenue: 255407969, vote: 7.6 },
  { title: "Paranormal Activity", year: 2007, genre: "Horror", budget: 15000, revenue: 193355800, vote: 6.0 },
  { title: "The Blair Witch Project", year: 1999, genre: "Horror", budget: 60000, revenue: 248639099, vote: 6.3 },
  { title: "Saw - L'enigmista", year: 2004, genre: "Horror", budget: 1200000, revenue: 103911669, vote: 7.4 },
  { title: "Halloween - La notte delle streghe", year: 1978, genre: "Horror", budget: 325000, revenue: 70000000, vote: 7.6 },
  { title: "Shining", year: 1980, genre: "Horror", budget: 19000000, revenue: 46998772, vote: 8.2 },
  { title: "Hereditary", year: 2018, genre: "Horror", budget: 10000000, revenue: 80247715, vote: 7.3 },
  { title: "Midsommar", year: 2019, genre: "Horror", budget: 9000000, revenue: 47974454, vote: 7.1 },
  { title: "A Quiet Place - Un posto tranquillo", year: 2018, genre: "Horror", budget: 17000000, revenue: 340939361, vote: 7.4 },
  { title: "Parasite", year: 2019, genre: "Dramma", budget: 11400000, revenue: 258773645, vote: 8.5 },
  { title: "Whiplash", year: 2014, genre: "Dramma", budget: 3300000, revenue: 49000000, vote: 8.4 },
  { title: "La La Land", year: 2016, genre: "Commedia", budget: 30000000, revenue: 448966041, vote: 7.9 },
  { title: "Moonlight", year: 2016, genre: "Dramma", budget: 1500000, revenue: 65046687, vote: 7.4 },
  { title: "Everything Everywhere All at Once", year: 2022, genre: "Sci-Fi", budget: 25000000, revenue: 141195658, vote: 7.8 },
  { title: "Mad Max: Fury Road", year: 2015, genre: "Azione", budget: 150000000, revenue: 378858340, vote: 7.6 },
  { title: "Blade Runner 2049", year: 2017, genre: "Sci-Fi", budget: 150000000, revenue: 259239658, vote: 7.5 },
  { title: "Arrival", year: 2016, genre: "Sci-Fi", budget: 47000000, revenue: 203388186, vote: 7.6 },
  { title: "Ex Machina", year: 2014, genre: "Sci-Fi", budget: 15000000, revenue: 36869414, vote: 7.6 },
  { title: "District 9", year: 2009, genre: "Sci-Fi", budget: 30000000, revenue: 210819611, vote: 7.4 },
  { title: "John Wick", year: 2014, genre: "Azione", budget: 20000000, revenue: 86081724, vote: 7.4 },
  { title: "John Wick 4", year: 2023, genre: "Azione", budget: 100000000, revenue: 440146694, vote: 7.8 },
  { title: "The Social Network", year: 2010, genre: "Dramma", budget: 40000000, revenue: 224920315, vote: 7.3 },
  { title: "The Wolf of Wall Street", year: 2013, genre: "Crime", budget: 100000000, revenue: 392000694, vote: 8.0 },
  { title: "Django Unchained", year: 2012, genre: "Dramma", budget: 100000000, revenue: 425368238, vote: 8.2 },
  { title: "Bastardi senza gloria", year: 2009, genre: "Avventura", budget: 70000000, revenue: 321455689, vote: 8.2 },
  { title: "Gladiator", year: 2000, genre: "Azione", budget: 103000000, revenue: 460583960, vote: 8.2 },
  { title: "Il Signore degli Anelli: La Compagnia dell'Anello", year: 2001, genre: "Fantasy", budget: 93000000, revenue: 897690072, vote: 8.4 },
  { title: "Il Signore degli Anelli: Il ritorno del re", year: 2003, genre: "Fantasy", budget: 94000000, revenue: 1146430307, vote: 8.5 },
  { title: "Lo Hobbit: Un viaggio inaspettato", year: 2012, genre: "Fantasy", budget: 180000000, revenue: 1017003568, vote: 7.4 },
  { title: "Matrix", year: 1999, genre: "Sci-Fi", budget: 63000000, revenue: 466364845, vote: 8.2 },
  { title: "Terminator 2 - Il giorno del giudizio", year: 1991, genre: "Sci-Fi", budget: 102000000, revenue: 520881154, vote: 8.1 },
  { title: "Alien", year: 1979, genre: "Horror", budget: 11000000, revenue: 104931801, vote: 8.1 },
  { title: "Aliens - Scontro finale", year: 1986, genre: "Sci-Fi", budget: 18500000, revenue: 131060248, vote: 8.0 },
  { title: "Lo squalo", year: 1975, genre: "Thriller", budget: 7000000, revenue: 476512065, vote: 7.7 },
  { title: "E.T. l'extra-terrestre", year: 1982, genre: "Sci-Fi", budget: 10500000, revenue: 792910554, vote: 7.5 },
  { title: "Ritorno al futuro", year: 1985, genre: "Avventura", budget: 19000000, revenue: 388800000, vote: 8.3 },
  { title: "Ghostbusters - Acchiappafantasmi", year: 1984, genre: "Commedia", budget: 30000000, revenue: 295212467, vote: 7.5 },
  { title: "Mamma, ho perso l'aereo", year: 1990, genre: "Commedia", budget: 18000000, revenue: 476684675, vote: 7.4 },
  { title: "Una notte da leoni", year: 2009, genre: "Commedia", budget: 35000000, revenue: 467483912, vote: 7.3 },
  { title: "Grand Budapest Hotel", year: 2014, genre: "Commedia", budget: 25000000, revenue: 174800000, vote: 8.1 },
  { title: "Knives Out - Cena con delitto", year: 2019, genre: "Crime", budget: 40000000, revenue: 311924708, vote: 7.9 },
  { title: "Gone Girl - L'amore bugiardo", year: 2014, genre: "Thriller", budget: 61000000, revenue: 369330363, vote: 7.9 },
  { title: "Seven", year: 1995, genre: "Crime", budget: 33000000, revenue: 327311859, vote: 8.4 },
  { title: "Il silenzio degli innocenti", year: 1991, genre: "Thriller", budget: 19000000, revenue: 272742922, vote: 8.3 },
  { title: "Fight Club", year: 1999, genre: "Dramma", budget: 63000000, revenue: 101209702, vote: 8.4 },
  { title: "American Beauty", year: 1999, genre: "Dramma", budget: 15000000, revenue: 356296601, vote: 8.0 },
  { title: "Truman Show", year: 1998, genre: "Dramma", budget: 60000000, revenue: 264118201, vote: 8.1 },
  { title: "C'era una volta a Hollywood", year: 2019, genre: "Commedia", budget: 90000000, revenue: 377593079, vote: 7.4 },
  { title: "1917", year: 2019, genre: "Dramma", budget: 95000000, revenue: 384623577, vote: 8.0 },
  { title: "Dunkirk", year: 2017, genre: "Dramma", budget: 100000000, revenue: 526940665, vote: 7.5 },
  { title: "Tenet", year: 2020, genre: "Azione", budget: 205000000, revenue: 365304105, vote: 7.2 },
  { title: "The Batman", year: 2022, genre: "Crime", budget: 185000000, revenue: 772245583, vote: 7.7 },
  { title: "Deadpool", year: 2016, genre: "Azione", budget: 58000000, revenue: 782612155, vote: 7.6 },
  { title: "Logan", year: 2017, genre: "Azione", budget: 97000000, revenue: 619180476, vote: 7.8 },
  { title: "Coco", year: 2017, genre: "Animazione", budget: 175000000, revenue: 807817888, vote: 8.2 },
  { title: "Up", year: 2009, genre: "Animazione", budget: 175000000, revenue: 735099082, vote: 8.0 },
  { title: "WALL-E", year: 2008, genre: "Animazione", budget: 180000000, revenue: 521311860, vote: 8.1 },
  { title: "Ratatouille", year: 2007, genre: "Animazione", budget: 150000000, revenue: 623722818, vote: 8.2 },
  { title: "Spider-Man: Un nuovo universo", year: 2018, genre: "Animazione", budget: 90000000, revenue: 384279207, vote: 8.4 },
  { title: "Spider-Man: Across the Spider-Verse", year: 2023, genre: "Animazione", budget: 100000000, revenue: 690897910, vote: 8.4 },
  { title: "La città incantata", year: 2001, genre: "Animazione", budget: 19000000, revenue: 395580000, vote: 8.5 },
  { title: "John Carter", year: 2012, genre: "Sci-Fi", budget: 250000000, revenue: 284139100, vote: 6.6 },
  { title: "The Flash", year: 2023, genre: "Azione", budget: 200000000, revenue: 271333313, vote: 6.7 },
  { title: "Indiana Jones e il quadrante del destino", year: 2023, genre: "Avventura", budget: 295000000, revenue: 383963057, vote: 6.6 },
  { title: "47 Ronin", year: 2013, genre: "Fantasy", budget: 175000000, revenue: 151716815, vote: 6.2 },
  { title: "Mars Needs Moms", year: 2011, genre: "Animazione", budget: 150000000, revenue: 39233878, vote: 5.8 },
  { title: "The Lone Ranger", year: 2013, genre: "Avventura", budget: 215000000, revenue: 260502115, vote: 6.0 },
  { title: "Pluto Nash", year: 2002, genre: "Commedia", budget: 100000000, revenue: 7103973, vote: 5.2 },
  { title: "Waterworld", year: 1995, genre: "Avventura", budget: 175000000, revenue: 264218220, vote: 6.2 },
  { title: "King Arthur: Il potere della spada", year: 2017, genre: "Avventura", budget: 175000000, revenue: 148775111, vote: 6.7 },
  { title: "Mortal Engines", year: 2018, genre: "Sci-Fi", budget: 100000000, revenue: 83676410, vote: 6.1 },
  { title: "Cats", year: 2019, genre: "Commedia", budget: 95000000, revenue: 73831797, vote: 4.3 },
  { title: "Morbius", year: 2022, genre: "Horror", budget: 75000000, revenue: 167460890, vote: 6.1 },
  { title: "Green Lantern", year: 2011, genre: "Azione", budget: 200000000, revenue: 219851172, vote: 5.5 },
  { title: "Battlefield Earth", year: 2000, genre: "Sci-Fi", budget: 44000000, revenue: 29725663, vote: 3.3 },
  { title: "The Room", year: 2003, genre: "Dramma", budget: 6000000, revenue: 1800000, vote: 3.7 },
  { title: "Heaven's Gate", year: 1980, genre: "Dramma", budget: 44000000, revenue: 3484331, vote: 6.7 },
  { title: "Ishtar", year: 1987, genre: "Commedia", budget: 51000000, revenue: 14375181, vote: 5.5 },
  { title: "Alexander", year: 2004, genre: "Dramma", budget: 155000000, revenue: 167298192, vote: 5.9 },
  { title: "Sinbad: La leggenda dei sette mari", year: 2003, genre: "Animazione", budget: 60000000, revenue: 80769533, vote: 6.8 },
  { title: "Treasure Planet", year: 2002, genre: "Animazione", budget: 140000000, revenue: 109578115, vote: 7.5 },
  { title: "The Iron Giant", year: 1999, genre: "Animazione", budget: 50000000, revenue: 31333757, vote: 8.0 }
];

// ==========================================
// 2. ACQUISIZIONE DATI VIA API TMDB (+ FALLBACK)
// ==========================================
async function loadMoviesData() {
  const statusEl = document.getElementById("data-status");

  if (!TMDB_API_KEY || TMDB_API_KEY === "INSERISCI_TUA_TMDB_API_KEY") {
    statusEl.textContent = `Reperti locali: ${FALLBACK_MOVIES.length} film`;
    return enrichMovies(FALLBACK_MOVIES);
  }

  try {
    const collected = [];
    const seenIds = new Set();

    for (let page = 1; page <= 12 && collected.length < MIN_MOVIES_TARGET; page++) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=it-IT&sort_by=revenue.desc&vote_count.gte=150&page=${page}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      for (const m of data.results || []) {
        if (seenIds.has(m.id)) continue;
        seenIds.add(m.id);

        let budget = m.budget || 0;
        let revenue = m.revenue || 0;

        if (!budget || !revenue) {
          const detailRes = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${TMDB_API_KEY}&language=it-IT`);
          if (detailRes.ok) {
            const detail = await detailRes.json();
            budget = detail.budget || 0;
            revenue = detail.revenue || 0;
          }
        }

        if (budget >= 10000 && revenue > 0 && m.vote_average > 0) {
          const primaryGenreId = (m.genre_ids && m.genre_ids[0]) || null;
          const genreName = GENRE_MAP[primaryGenreId] || "Altro";
          const year = m.release_date ? parseInt(m.release_date.slice(0, 4), 10) : 2000;

          collected.push({
            title: m.title,
            year,
            genre: genreName,
            budget,
            revenue,
            vote: Number(m.vote_average.toFixed(1))
          });
        }

        if (collected.length >= MIN_MOVIES_TARGET) break;
      }
    }

    if (collected.length >= 100) {
      statusEl.textContent = `Live TMDB API: ${collected.length} film`;
      return enrichMovies(collected);
    }

    throw new Error("Record insufficienti");
  } catch (err) {
    console.warn("Fallback attivo:", err.message);
    statusEl.textContent = `Reperti locali: ${FALLBACK_MOVIES.length} film`;
    return enrichMovies(FALLBACK_MOVIES);
  }
}

function enrichMovies(rawList) {
  return rawList.map(d => {
    const budgetM = d.budget / 1e6;
    const revenueM = d.revenue / 1e6;
    const roi = d.revenue / d.budget;
    const profitM = revenueM - budgetM;

    let budgetTier = "Low (<$15M)";
    if (budgetM >= 15 && budgetM < 60) budgetTier = "Medio ($15M–$60M)";
    else if (budgetM >= 60 && budgetM < 150) budgetTier = "Alto ($60M–$150M)";
    else if (budgetM >= 150) budgetTier = "Blockbuster (>$150M)";

    return { ...d, budgetM, revenueM, roi, profitM, budgetTier };
  });
}

// ==========================================
// 3. COLORI TEMA, LEGENDE & TOOLTIP
// ==========================================
function getThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    gold: styles.getPropertyValue("--color-gold").trim(),
    profit: styles.getPropertyValue("--color-profit").trim(),
    loss: styles.getPropertyValue("--color-loss").trim(),
    neutral: styles.getPropertyValue("--color-neutral").trim(),
    textMain: styles.getPropertyValue("--text-main").trim(),
    textMuted: styles.getPropertyValue("--text-muted").trim()
  };
}

function formatMoneyM(val) {
  if (val < 1) return `$${Math.round(val * 1000)}k`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1).replace(".0", "")}B`;
  return `$${Math.round(val)}M`;
}

const tooltip = d3.select("#tooltip");

function showTooltip(event, htmlContent) {
  tooltip.html(htmlContent).style("opacity", 1);
  const x = Math.min(event.clientX + 14, window.innerWidth - 270);
  const y = Math.min(event.clientY + 14, window.innerHeight - 125);
  tooltip.style("left", `${Math.max(8, x)}px`).style("top", `${Math.max(8, y)}px`);
}

function hideTooltip() {
  tooltip.style("opacity", 0);
}

function renderLegends(colors) {
  d3.select("#legend-scatter").html(`
    <span class="legend-item"><span class="legend-line" style="background:${colors.profit};"></span>Pareggio (1:1)</span>
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.gold};"></span>Voto alto (~8+)</span>
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.neutral};"></span>Voto medio (~6.8)</span>
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.loss};"></span>Voto basso (&lt;5)</span>
  `);

  d3.select("#legend-distribution").html(`
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.profit};"></span>Film in attivo</span>
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.loss};"></span>Film in perdita</span>
    <span class="legend-item"><span class="legend-line" style="background:${colors.gold};"></span>Media voto fascia</span>
  `);

  d3.select("#legend-roi").html(`
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.profit};"></span>Miglior ROI (moltiplicatore)</span>
    <span class="legend-item"><span class="legend-swatch" style="background:${colors.loss};"></span>Maggior perdita netta ($M)</span>
  `);
}

// ==========================================
// 4. REPERTO 01: SCATTER PLOT
// ==========================================
function renderGenreFilters(movies) {
  const controls = d3.select("#controls-scatter");
  controls.html("");

  const genres = ["Tutti", ...Array.from(new Set(movies.map(d => d.genre))).sort()];

  genres.forEach(genre => {
    controls.append("button")
      .attr("type", "button")
      .attr("class", `filter-btn ${genre === selectedGenre ? "active" : ""}`)
      .text(genre)
      .on("click", () => {
        selectedGenre = genre;
        renderGenreFilters(movies);
        renderScatterChart(movies);
      });
  });
}

function renderScatterChart(movies) {
  const container = d3.select("#chart-scatter");
  container.html("");

  const colors = getThemeColors();
  const filtered = selectedGenre === "Tutti"
    ? movies
    : movies.filter(d => d.genre === selectedGenre);

  const containerWidth = container.node().getBoundingClientRect().width || 800;
  const isCompact = containerWidth < 580;

  const margin = {
    top: 26,
    right: isCompact ? 14 : 18,
    bottom: isCompact ? 54 : 50,
    left: isCompact ? 54 : 68
  };
  const width = Math.max(220, containerWidth - margin.left - margin.right);
  const height = (isCompact ? 300 : 390) - margin.top - margin.bottom;

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLog()
    .domain([0.1, 400])
    .range([0, width]);

  const y = d3.scaleLog()
    .domain([1, 3500])
    .range([height, 0]);

  const xTicks = isCompact ? [0.1, 1, 10, 100] : [0.1, 1, 10, 100, 400];
  const yTicks = isCompact ? [1, 10, 100, 1000] : [1, 10, 100, 1000, 3000];

  const colorScale = d3.scaleLinear()
    .domain([4.5, 6.8, 8.5])
    .range([colors.loss, colors.neutral, colors.gold])
    .clamp(true);

  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickValues(yTicks).tickSize(-width).tickFormat(""));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickValues(xTicks).tickFormat(d => formatMoneyM(d)));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(d => formatMoneyM(d)));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + (isCompact ? 42 : 40))
    .attr("text-anchor", "middle")
    .style("font-weight", "500")
    .text("Budget di produzione (scala logaritmica)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", isCompact ? -42 : -52)
    .attr("text-anchor", "middle")
    .style("font-weight", "500")
    .text("Incassi mondiali");

  const lineStart = 1;
  const lineEnd = 400;

  svg.append("line")
    .attr("x1", x(lineStart))
    .attr("y1", y(lineStart))
    .attr("x2", x(lineEnd))
    .attr("y2", y(lineEnd))
    .attr("stroke", colors.profit)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5");

  svg.append("text")
    .attr("x", Math.min(x(lineEnd) - 4, width - 4))
    .attr("y", Math.max(10, y(lineEnd) - (isCompact ? 16 : 8)))
    .attr("text-anchor", "end")
    .style("fill", colors.profit)
    .style("font-weight", "600")
    .text("Pareggio (1:1)");

  svg.selectAll("circle")
    .data(filtered)
    .join("circle")
    .attr("cx", d => x(Math.max(0.1, Math.min(400, d.budgetM))))
    .attr("cy", d => y(Math.max(1, Math.min(3500, d.revenueM))))
    .attr("r", isCompact ? 4.2 : 5.2)
    .attr("fill", d => colorScale(d.vote))
    .attr("fill-opacity", 0.85)
    .attr("stroke", colors.textMain)
    .attr("stroke-width", 0.5)
    .style("cursor", "pointer")
    .on("mousemove", (event, d) => {
      showTooltip(event, `
        <strong>${d.title} (${d.year})</strong>
        Genere: ${d.genre}<br>
        Budget: $${d.budgetM.toFixed(1)}M<br>
        Incassi: $${d.revenueM.toFixed(1)}M<br>
        Voto: ⭐ ${d.vote}/10
      `);
    })
    .on("mouseleave", hideTooltip);
}

// ==========================================
// 5. REPERTO 02: DISTRIBUZIONE VOTI PER FASCIA
// ==========================================
function renderDistributionChart(movies) {
  const container = d3.select("#chart-distribution");
  container.html("");

  const colors = getThemeColors();
  const tiers = ["Low (<$15M)", "Medio ($15M–$60M)", "Alto ($60M–$150M)", "Blockbuster (>$150M)"];

  const containerWidth = container.node().getBoundingClientRect().width || 800;
  const isCompact = containerWidth < 580;

  const margin = {
    top: 24,
    right: 18,
    bottom: 42,
    left: isCompact ? 126 : 155
  };
  const width = Math.max(190, containerWidth - margin.left - margin.right);
  const height = (isCompact ? 290 : 330) - margin.top - margin.bottom;

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([3, 9])
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(tiers)
    .range([0, height])
    .padding(0.32);

  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisBottom(x).ticks(6).tickSize(height).tickFormat(""));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y));

  const tierStats = tiers.map(tier => {
    const group = movies.filter(d => d.budgetTier === tier);
    const avg = group.length ? d3.mean(group, d => d.vote) : 0;
    return { tier, avg };
  });

  svg.selectAll(".vote-dot")
    .data(movies)
    .join("circle")
    .attr("class", "vote-dot")
    .attr("cx", d => x(Math.max(3, Math.min(9, d.vote))))
    .attr("cy", d => {
      const center = y(d.budgetTier) + y.bandwidth() / 2;
      const offset = ((d.title.charCodeAt(0) % 7) - 3) * (y.bandwidth() * 0.075);
      return center + offset;
    })
    .attr("r", isCompact ? 3.6 : 4.5)
    .attr("fill", d => d.profitM >= 0 ? colors.profit : colors.loss)
    .attr("fill-opacity", 0.72)
    .style("cursor", "pointer")
    .on("mousemove", (event, d) => {
      showTooltip(event, `
        <strong>${d.title} (${d.year})</strong>
        Fascia: ${d.budgetTier}<br>
        Voto: ⭐ ${d.vote}/10<br>
        Bilancio: ${d.profitM >= 0 ? "+" : ""}$${d.profitM.toFixed(1)}M
      `);
    })
    .on("mouseleave", hideTooltip);

  svg.selectAll(".mean-marker")
    .data(tierStats)
    .join("line")
    .attr("x1", d => x(d.avg))
    .attr("x2", d => x(d.avg))
    .attr("y1", d => y(d.tier) - 2)
    .attr("y2", d => y(d.tier) + y.bandwidth() + 2)
    .attr("stroke", colors.gold)
    .attr("stroke-width", 3);

  svg.selectAll(".mean-label")
    .data(tierStats)
    .join("text")
    .attr("x", d => Math.min(width - 24, Math.max(24, x(d.avg))))
    .attr("y", d => y(d.tier) - 6)
    .attr("text-anchor", "middle")
    .style("fill", colors.gold)
    .style("font-weight", "700")
    .style("font-size", "10.5px")
    .text(d => `Media ${d.avg.toFixed(1)}`);
}

// ==========================================
// 6. REPERTO 03: BAR CHART DIVERGENTE ROI VS FLOP
// ==========================================
function renderRoiChart(movies) {
  const container = d3.select("#chart-roi");
  container.html("");

  const colors = getThemeColors();

  const topRoi = [...movies]
    .sort((a, b) => d3.descending(a.roi, b.roi))
    .slice(0, 7)
    .map(d => ({
      label: d.title,
      valText: `${d.roi.toFixed(0)}x`,
      isPositive: true,
      score: d.roi,
      detail: `Budget $${d.budgetM.toFixed(2)}M · Incassi $${d.revenueM.toFixed(1)}M`
    }));

  const worstLosses = [...movies]
    .filter(d => d.profitM < 0)
    .sort((a, b) => d3.ascending(a.profitM, b.profitM))
    .slice(0, 7)
    .map(d => ({
      label: d.title,
      valText: `-$${Math.abs(d.profitM).toFixed(0)}M`,
      isPositive: false,
      score: Math.abs(d.profitM),
      detail: `Budget $${d.budgetM.toFixed(1)}M · Incassi $${d.revenueM.toFixed(1)}M`
    }));

  const combined = [...topRoi, ...worstLosses.reverse()];
  const maxRoi = d3.max(topRoi, d => d.score) || 1;
  const maxLoss = d3.max(worstLosses, d => d.score) || 1;

  combined.forEach(item => {
    item.norm = item.isPositive
      ? (item.score / maxRoi) * 85
      : -((item.score / maxLoss) * 85);
  });

  const containerWidth = container.node().getBoundingClientRect().width || 800;
  const isCompact = containerWidth < 580;

  const margin = {
    top: 14,
    right: isCompact ? 54 : 68,
    bottom: 24,
    left: isCompact ? 134 : 195
  };
  const width = Math.max(175, containerWidth - margin.left - margin.right);
  const height = combined.length * (isCompact ? 26 : 28);

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([-100, 100])
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(combined.map(d => d.label))
    .range([0, height])
    .padding(0.24);

  svg.append("g")
    .attr("class", "axis")
    .call(
      d3.axisLeft(y).tickFormat(name => {
        const limit = isCompact ? 19 : 26;
        return name.length > limit ? name.slice(0, limit - 1) + "…" : name;
      })
    );

  svg.append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", -6)
    .attr("y2", height + 4)
    .attr("stroke", colors.textMuted)
    .attr("stroke-width", 1.2);

  svg.selectAll("rect")
    .data(combined)
    .join("rect")
    .attr("x", d => d.norm >= 0 ? x(0) : x(d.norm))
    .attr("y", d => y(d.label))
    .attr("width", d => Math.max(2, Math.abs(x(d.norm) - x(0))))
    .attr("height", y.bandwidth())
    .attr("rx", 3)
    .attr("fill", d => d.isPositive ? colors.profit : colors.loss)
    .attr("fill-opacity", 0.88)
    .style("cursor", "pointer")
    .on("mousemove", (event, d) => {
      showTooltip(event, `
        <strong>${d.label}</strong>
        ${d.isPositive ? `ROI: <strong>${d.valText}</strong>` : `Bilancio: <strong>${d.valText}</strong>`}<br>
        ${d.detail}
      `);
    })
    .on("mouseleave", hideTooltip);

  svg.selectAll(".bar-val")
    .data(combined)
    .join("text")
    .attr("x", d => {
      if (d.isPositive) return x(d.norm) + 6;
      const barLeft = x(d.norm);
      return barLeft < 42 ? x(0) + 6 : barLeft - 6;
    })
    .attr("y", d => y(d.label) + y.bandwidth() / 2 + 4)
    .attr("text-anchor", d => {
      if (d.isPositive) return "start";
      const barLeft = x(d.norm);
      return barLeft < 42 ? "start" : "end";
    })
    .style("fill", d => d.isPositive ? colors.profit : colors.loss)
    .style("font-weight", "700")
    .style("font-size", "10.5px")
    .text(d => d.valText);
}

// ==========================================
// 7. INIT, SWITCH TEMA & RESIZE
// ==========================================
function renderAllCharts() {
  if (!allMovies.length) return;
  renderLegends(getThemeColors());
  renderScatterChart(allMovies);
  renderDistributionChart(allMovies);
  renderRoiChart(allMovies);
}

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);

    if (next === "dark") {
      icon.textContent = "☀️";
      label.textContent = "Light Mode";
    } else {
      icon.textContent = "🌙";
      label.textContent = "Dark Mode";
    }

    renderAllCharts();
  });
}

window.addEventListener("resize", () => {
  clearTimeout(window.__resizeTimer);
  window.__resizeTimer = setTimeout(renderAllCharts, 180);
});

(async function init() {
  setupThemeToggle();
  allMovies = await loadMoviesData();
  renderGenreFilters(allMovies);
  renderAllCharts();
})();
