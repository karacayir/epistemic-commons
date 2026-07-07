/* Epistemic Commons — Motions for polity/uk.
   Motions marked kind:"record" are transcriptions of real parliamentary
   passages (sources cited). kind:"demo" items are platform demonstrations. */
window.EC = window.EC || {};

EC.motions = [
  {
    id: "motion-hereditary-peers-2026",
    kind: "record",
    title: "End the hereditary exception in the House of Lords",
    target: "governance-and-elections",
    targetDoc: "house-of-lords-act-1999",
    status: "enacted",
    statusLabel: "Enacted — 2026 c. 12",
    opened: "2024-09-05",
    closed: "2026-03-18",
    sponsors: [
      { name: "Nick Thomas-Symonds MP", role: "Paymaster General and Minister for the Constitution" },
      { name: "Baroness Smith of Basildon", role: "Leader of the House of Lords" },
    ],
    chambers: [
      { name: "commons", state: "passed" },
      { name: "lords", state: "passed" },
      { name: "assent", state: "passed" },
      { name: "statute", state: "merged" },
    ],
    summary:
      "Removes the exception, created by the House of Lords Act 1999, under which 92 hereditary peers retained seats. From the end of the 2024–26 session (29 April 2026) no one sits in the Lords by virtue of a hereditary peerage. Closes the reform promised in the Parliament Act 1911's preamble.",
    amendment: {
      file: "codices/uk/governance-and-elections/house-of-lords-act-1999.md",
      hunk: "Section 2 — exception for 92 excepted hereditary peers",
      lines: [
        ["del", "s.2(1) At any one time 90 people shall be excepted from section 1; and"],
        ["del", "     one person shall be excepted as holder of the office of Earl Marshal,"],
        ["del", "     and one as performing the office of Lord Great Chamberlain."],
        ["del", "s.2(4) [Hereditary by-elections to fill vacancies among excepted peers.]"],
        ["add", "s.1  No-one shall be a member of the House of Lords by virtue of a"],
        ["add", "     hereditary peerage. [Exception repealed; rights cease at the end"],
        ["add", "     of the 2024–26 session.]"],
      ],
    },
    timeline: [
      { date: "2024-09-05", note: "Introduced in the House of Commons (first reading)." },
      { date: "2026-03-10", note: "Final stages completed after extended ping-pong; 85 excepted hereditary peers sitting." },
      { date: "2026-03-18", note: "Royal Assent — House of Lords (Hereditary Peers) Act 2026." },
      { date: "2026-04-29", note: "Merged to statute: hereditary membership ends at close of session." },
    ],
    source: "https://bills.parliament.uk/bills/3755",
  },
  {
    id: "motion-assisted-dying-2024",
    kind: "record",
    title: "Terminally Ill Adults (End of Life) — permit assisted dying",
    target: "rights-and-liberties",
    targetDoc: null,
    status: "lapsed",
    statusLabel: "Lapsed at prorogation",
    opened: "2024-10-16",
    closed: "2026-04-29",
    sponsors: [
      { name: "Kim Leadbeater MP", role: "Private member's bill — Spen Valley (Lab)" },
      { name: "Lord Falconer of Thoroton", role: "Sponsor in the House of Lords" },
    ],
    chambers: [
      { name: "commons", state: "passed" },
      { name: "lords", state: "stalled" },
      { name: "assent", state: "none" },
      { name: "statute", state: "none" },
    ],
    votes: { label: "Commons third reading, 20 June 2025", aye: 314, nay: 291 },
    summary:
      "Would allow terminally ill adults in England and Wales with a prognosis of six months or less, subject to safeguards and approvals, to be provided with assistance to end their own life. Passed the Commons; consideration in the Lords concluded committee stage on 24 April 2026, but the bill made no further progress before the 2024–26 session was prorogued on 29 April 2026.",
    timeline: [
      { date: "2024-10-16", note: "Introduced in the Commons by Kim Leadbeater MP." },
      { date: "2024-11-29", note: "Second reading passed 330–275 — first Commons vote on assisted dying since 2015." },
      { date: "2025-06-20", note: "Third reading passed 314–291; bill leaves the Commons." },
      { date: "2026-04-24", note: "Lords committee stage concludes without completion of remaining stages." },
      { date: "2026-04-29", note: "Session prorogued; motion lapses. Under this platform's rules the full record — every vote, every amendment — remains open to be picked up by a successor motion." },
    ],
    source: "https://bills.parliament.uk/bills/3774",
  },
  {
    id: "motion-employment-rights-2024",
    kind: "record",
    title: "Employment Rights — day-one protections and zero-hours reform",
    target: "rights-and-liberties",
    targetDoc: null,
    status: "enacted",
    statusLabel: "Enacted — 2025 c. 36",
    opened: "2024-10-10",
    closed: "2025-12-18",
    sponsors: [
      { name: "Angela Rayner MP", role: "Deputy Prime Minister — introduced the Bill" },
      { name: "Jonathan Reynolds MP", role: "Secretary of State for Business and Trade" },
    ],
    chambers: [
      { name: "commons", state: "passed" },
      { name: "lords", state: "passed" },
      { name: "assent", state: "passed" },
      { name: "statute", state: "merged" },
    ],
    summary:
      "Reforms employment law: protection from unfair dismissal from day one of employment, restrictions on fire-and-rehire, guaranteed-hours provisions for zero-hours workers, and expanded statutory sick pay. Royal Assent 18 December 2025; provisions commence in phases.",
    timeline: [
      { date: "2024-10-10", note: "Introduced in the Commons within the government's first hundred days." },
      { date: "2025-12-18", note: "Royal Assent — Employment Rights Act 2025." },
    ],
    source: "https://bills.parliament.uk/bills/3737",
  },
  {
    id: "motion-renters-rights-2024",
    kind: "record",
    title: "Renters' Rights — abolish section 21 'no-fault' evictions",
    target: "rights-and-liberties",
    targetDoc: null,
    status: "enacted",
    statusLabel: "Enacted — 2025 c. 26",
    opened: "2024-09-11",
    closed: "2025-10-27",
    sponsors: [
      { name: "Angela Rayner MP", role: "Secretary of State for Housing, Communities and Local Government — introduced the Bill" },
    ],
    chambers: [
      { name: "commons", state: "passed" },
      { name: "lords", state: "passed" },
      { name: "assent", state: "passed" },
      { name: "statute", state: "merged" },
    ],
    summary:
      "Abolishes section 21 'no-fault' evictions and fixed-term assured shorthold tenancies: tenancies become periodic, with possession only on defined grounds. Also introduces a landlord ombudsman, a private-sector database, and limits on in-tenancy rent rises.",
    amendment: {
      file: "Housing Act 1988 (as amended)",
      hunk: "Section 21 — recovery of possession on termination of shorthold tenancy",
      lines: [
        ["del", "s.21(1) A court shall make an order for possession of a dwelling-house"],
        ["del", "     let on an assured shorthold tenancy... without any ground being"],
        ["del", "     established, on not less than two months' notice."],
        ["add", "All assured tenancies are periodic. A landlord may seek possession"],
        ["add", "only on grounds set out in Schedule 2 (sale, occupation by landlord"],
        ["add", "or family, redevelopment, rent arrears, antisocial behaviour...)."],
      ],
    },
    timeline: [
      { date: "2024-09-11", note: "Introduced in the Commons." },
      { date: "2025-10-27", note: "Royal Assent — Renters' Rights Act 2025." },
    ],
    source: "https://bills.parliament.uk/bills/3764",
  },
  {
    id: "motion-demo-petition-thresholds",
    kind: "demo",
    title: "Codify petition thresholds: a statutory right to a legislative answer",
    target: "governance-and-elections",
    targetDoc: null,
    status: "open",
    statusLabel: "Open — in commons chamber",
    opened: "2026-06-04",
    closed: null,
    sponsors: [
      { name: "Citizens' Assembly for Open Legislation", role: "Citizen-initiated via petition EC-0001 (312,406 signatures)" },
    ],
    chambers: [
      { name: "commons", state: "active" },
      { name: "lords", state: "none" },
      { name: "assent", state: "none" },
      { name: "statute", state: "none" },
    ],
    votes: { label: "Citizen assent (advisory, rolling)", aye: 48210, nay: 9412 },
    summary:
      "DEMONSTRATION MOTION — illustrates the platform's citizen-initiated pathway. Would place the petition system on a statutory footing: 10,000 verified signatures oblige a published government response within 21 days; 100,000 oblige a parliamentary debate and a reasoned decision to open, or decline to open, a motion. Opened automatically when petition EC-0001 crossed its second threshold.",
    amendment: {
      file: "codices/uk/governance-and-elections/ (new document)",
      hunk: "Petitions (Legislative Answer) Bill — clause 1",
      lines: [
        ["add", "1(1) Where a petition to Parliament attains 10,000 verified"],
        ["add", "     signatures, the responsible Minister must publish a response"],
        ["add", "     within 21 sitting days."],
        ["add", "1(2) Where such a petition attains 100,000 verified signatures,"],
        ["add", "     the House shall debate it and resolve either to open a motion"],
        ["add", "     or to publish reasons for declining."],
      ],
    },
    timeline: [
      { date: "2026-05-18", note: "Petition EC-0001 crosses 100,000 signatures." },
      { date: "2026-06-04", note: "Motion opened in the commons chamber; drafting in public." },
    ],
    source: null,
  },
];
