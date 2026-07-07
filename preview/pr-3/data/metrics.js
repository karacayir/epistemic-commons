/* Epistemic Commons — Observatory metrics for polity/uk.
   Every figure is sourced; see `sources` and the provenance panel.
   Compiled 2 July 2026. */
window.EC = window.EC || {};

EC.metrics = {
  compiled: "2026-07-02",
  polity: "United Kingdom",

  headline: {
    gdpLevel: { value: "£3,037bn", label: "Gross domestic product", period: "2025, current prices", source: "ONS" },
    gdpGrowth: { value: "+1.3%", label: "Real GDP growth", period: "2025", delta: "up from +1.0% in 2024", dir: "good", source: "ONS quarterly national accounts" },
    inflation: { value: "2.8%", label: "CPI inflation", period: "12 months to May 2026", delta: "unchanged on April", dir: "flat", source: "ONS consumer price inflation" },
    unemployment: { value: "4.9%", label: "Unemployment rate", period: "Feb–Apr 2026", delta: "+0.3 pts on the year", dir: "bad", source: "ONS labour market overview" },
    population: { value: "69.3m", label: "Population", period: "mid-2024 estimate", source: "ONS" },
    netMigration: { value: "204,000", label: "Net migration", period: "year ending June 2025, provisional", delta: "−69% on YE June 2024", dir: "flat", source: "ONS long-term international migration" },
    lifeExpectancy: { value: "79.1 / 83.0", label: "Life expectancy M / F (years)", period: "2022–24", delta: "females back at pre-pandemic level", dir: "good", source: "ONS national life tables" },
    hdi: { value: "0.946", label: "Human Development Index — rank 13 of 193", period: "2023 (HDR 2025)", source: "UNDP" },
    gini: { value: "32.9%", label: "Income inequality (Gini, disposable)", period: "FYE 2024", delta: "below pre-pandemic 35.4%", dir: "good", source: "ONS household income inequality" },
    emissions: { value: "371 Mt", label: "Greenhouse gas emissions (CO₂e)", period: "2024, territorial", delta: "−54% since 1990", dir: "good", source: "DESNZ final figures" },
    homicides: { value: "503", label: "Homicides (England & Wales)", period: "YE Dec 2025", delta: "−6% on previous year", dir: "good", source: "ONS crime statistics" },
    turnout: { value: "59.7%", label: "General election turnout", period: "July 2024", source: "House of Commons Library" },
  },

  gdpGrowthSeries: {
    years: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    values: [1.6, -10.3, 8.6, 4.8, 0.4, 1.0, 1.3],
    note: "Annual real GDP growth, %, as revised in ONS quarterly national accounts (June 2026).",
  },

  netMigrationSeries: {
    labels: ["YE Jun 2023", "YE Jun 2024", "YE Jun 2025"],
    values: [906, 649, 204],
    unit: "thousand",
    note: "Long-term international net migration, year ending June. 2025 is provisional. YE Dec 2024: 431,000.",
  },

  trade: {
    period: "12 months to April 2026",
    exports: 941.0,
    imports: 988.8,
    exportsGrowth: "+3.0%",
    importsGrowth: "+5.4%",
    balance2024: -25.1,
    note: "Goods and services, £bn, current prices.",
  },

  hdiTrend: {
    years: ["1990", "1995", "2000", "2005", "2010", "2015", "2019", "2020", "2021", "2022", "2023"],
    uk: [0.812, 0.835, 0.870, 0.903, 0.921, 0.931, 0.941, 0.930, 0.941, 0.946, 0.946],
    peers: {
      Germany: [0.834, 0.870, 0.897, 0.923, 0.936, 0.948, 0.957, 0.955, 0.958, 0.955, 0.959],
      France: [0.798, 0.837, 0.852, 0.877, 0.888, 0.901, 0.914, 0.909, 0.915, 0.916, 0.920],
      "United States": [0.878, 0.888, 0.895, 0.907, 0.919, 0.928, 0.936, 0.925, 0.921, 0.930, 0.938],
      Japan: [0.853, 0.874, 0.889, 0.900, 0.907, 0.917, 0.922, 0.922, 0.922, 0.921, 0.925],
    },
  },

  hdiRank2023: [
    { label: "Iceland", value: 0.972, rank: 1 },
    { label: "Norway", value: 0.970, rank: 2 },
    { label: "Switzerland", value: 0.970, rank: 2 },
    { label: "Denmark", value: 0.962, rank: 4 },
    { label: "Germany", value: 0.959, rank: 5 },
    { label: "Sweden", value: 0.959, rank: 5 },
    { label: "Netherlands", value: 0.955, rank: 8 },
    { label: "Ireland", value: 0.949, rank: 11 },
    { label: "United Kingdom", value: 0.946, rank: 13, emphasis: true },
    { label: "Canada", value: 0.939, rank: 16 },
    { label: "United States", value: 0.938, rank: 17 },
    { label: "Japan", value: 0.925, rank: 23 },
    { label: "France", value: 0.920, rank: 26 },
  ],

  lifeExpectancy: {
    periods: ["2020–22", "2021–23", "2022–24"],
    male: [78.6, 78.8, 79.1],
    female: [82.6, 82.8, 83.0],
    note: "Period life expectancy at birth, UK national life tables.",
  },

  gini: {
    labels: ["FYE 2015", "FYE 2020", "FYE 2023", "FYE 2024"],
    values: [34.7, 35.4, 33.1, 32.9],
    note: "Gini coefficient of equivalised disposable household income, %.",
  },

  pisa: {
    subjects: ["Mathematics", "Reading", "Science"],
    uk: [489, 494, 500],
    oecd: [472, 476, 485],
    note: "PISA 2022 mean scores (latest cycle; PISA 2025 results due December 2026).",
  },

  emissions: {
    labels: ["1990", "2024"],
    index: [100, 46],
    absolute2024: "371 MtCO₂e",
    note: "UK territorial greenhouse gas emissions, indexed to 1990 = 100. 2024: 371 MtCO₂e, 54% below 1990.",
  },

  safety: {
    homicidesPrev: 534,
    homicides: 503,
    rate: "8.6 per million (YE Mar 2025) — lowest since 1977",
    csew: "≈9.6m incidents (CSEW headline crime, YE Dec 2025, incl. fraud & computer misuse)",
    recorded: "5.2m police-recorded crimes excl. fraud (−2% on year)",
  },

  sources: [
    { name: "ONS — GDP quarterly national accounts (Jan–Mar 2026)", url: "https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/quarterlynationalaccounts/januarytomarch2026" },
    { name: "ONS — Long-term international migration, provisional: YE June 2025", url: "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/bulletins/longterminternationalmigrationprovisional/yearendingjune2025" },
    { name: "ONS — Consumer price inflation: May 2026", url: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/may2026" },
    { name: "ONS — Labour market overview: June 2026", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/june2026" },
    { name: "ONS — National life tables, UK: 2022 to 2024", url: "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/bulletins/nationallifetablesunitedkingdom/2022to2024" },
    { name: "ONS — Household income inequality, UK: FYE 2024", url: "https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/householdincomeinequalityfinancial/financialyearending2024" },
    { name: "ONS — Crime in England and Wales: YE December 2025", url: "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales/yearendingdecember2025" },
    { name: "ONS / GOV.UK — UK trade in numbers", url: "https://www.gov.uk/government/statistics/uk-trade-in-numbers/uk-trade-in-numbers-web-version" },
    { name: "DESNZ — Final UK greenhouse gas emissions statistics 1990–2024", url: "https://www.gov.uk/government/statistics/final-uk-greenhouse-gas-emissions-statistics-1990-to-2024" },
    { name: "UNDP — Human Development Report 2025, composite indices time series", url: "https://hdr.undp.org/data-center/human-development-index" },
    { name: "OECD — PISA 2022 results", url: "https://www.oecd.org/en/about/programmes/pisa.html" },
    { name: "House of Commons Library — General election 2024 results", url: "https://commonslibrary.parliament.uk/research-briefings/cbp-10009/" },
  ],
};
