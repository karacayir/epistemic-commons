/* Epistemic Commons — Petitions for polity/uk.
   DEMONSTRATION DATA: these petitions illustrate the platform's citizen
   pathway (10,000 signatures → response; 100,000 → debate). They are modelled
   on the UK Parliament e-petition thresholds but are not live petitions. */
window.EC = window.EC || {};

EC.petitions = [
  {
    id: "EC-0001",
    title: "Give every petition a legislative answer, in statute",
    body: "Petitions that cross the debate threshold too often end in a debate and nothing else. Require Parliament to answer qualifying petitions with a motion — an actual proposed change, or published reasons for declining to make one.",
    signatures: 312406,
    status: "answered-motion",
    statusLabel: "Answered with motion",
    opened: "2026-03-02",
    codex: "governance-and-elections",
    linkedMotion: "motion-demo-petition-thresholds",
    response: "Threshold crossed 18 May 2026. Motion opened in the commons chamber on 4 June 2026 — see 'Codify petition thresholds'.",
  },
  {
    id: "EC-0002",
    title: "Publish every ministerial direction with its reasoning, within 7 days",
    body: "When a minister overrules a permanent secretary's objection with a ministerial direction, publication is inconsistent and slow. All directions and their reasoning should be inscribed to the relevant codex within seven days.",
    signatures: 128933,
    status: "awaiting-debate",
    statusLabel: "Debate scheduled",
    opened: "2026-04-14",
    codex: "governance-and-elections",
    response: "Passed 100,000 signatures on 9 June 2026; scheduled for debate.",
  },
  {
    id: "EC-0003",
    title: "Consolidate the Representation of the People Acts into one document",
    body: "Electoral law is scattered across statutes from 1918 to 2022. Open a consolidation motion so that the law governing elections is readable in a single, current text with full history.",
    signatures: 64112,
    status: "responded",
    statusLabel: "Response published",
    opened: "2026-02-09",
    codex: "governance-and-elections",
    response: "Government response (2 Apr 2026): accepts the case in principle; asks the Law Commission to scope a consolidation motion for the next session.",
  },
  {
    id: "EC-0004",
    title: "Add source-linked footnotes to every Observatory metric",
    body: "Every number the state publishes about itself should carry its provenance: the exact release, the reference period, and the revision history.",
    signatures: 41877,
    status: "responded",
    statusLabel: "Response published",
    opened: "2026-05-01",
    codex: "observatory",
    response: "Response (28 May 2026): adopted. The Observatory now cites the source release and period on every panel.",
  },
  {
    id: "EC-0005",
    title: "Transcribe the devolved legislatures' statutes into their own codices",
    body: "Acts of the Scottish Parliament, the Senedd and the Northern Ireland Assembly deserve the same treatment as Westminster statutes: full codices under polity/uk with their own chambers.",
    signatures: 8459,
    status: "open",
    statusLabel: "Open",
    opened: "2026-06-20",
    codex: "devolution",
    response: null,
  },
];
