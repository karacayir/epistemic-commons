# Epistemic Commons

**Live site: <https://karacayir.github.io/epistemic-commons/>**

**A version-controlled state.** Every constitution, law, act and policy of a country, held in
the open — with a full record of who changed what, when, and who assented. Governance as a
public repository; the citizenry as reviewers.

This repository contains:

| Path | What it is |
| --- | --- |
| [`manifesto/rationalist-manifesto.md`](manifesto/rationalist-manifesto.md) | The Rationalist Manifesto — the founding argument for version-controlled government |
| [`codices/uk/`](codices/uk/) | The United Kingdom's codices: constitutional instruments, rights, governance, devolution and treaty law, each as verified Markdown with full change history |
| [`site/`](site/) | The Epistemic Commons web platform — codex browser, motions, petitions, and the Observatory (national metrics dashboard) |
| [`tools/build-data.mjs`](tools/build-data.mjs) | Compiles the codices into the site's data layer |

## The jargon

Epistemic Commons deliberately does not borrow software vocabulary. Law is not code; it
deserves its own words.

| Software concept | Epistemic Commons term | Meaning |
| --- | --- | --- |
| Organisation | **Polity** | A country or jurisdiction (e.g. `uk`) |
| Repository | **Codex** | A governed body of related law |
| Commit | **Inscription** | An immutable, attributed record of change |
| Branch | **Chamber** | A stage of scrutiny (`commons`, `lords`, `assent`); `statute` is the official branch |
| Pull request | **Motion** | A proposed change moving through the chambers |
| Merge | **Enactment** | A motion entering the statute branch |
| Diff | **Amendment** | The line-level change a motion carries |
| Issue | **Petition** | A citizen-raised request (10,000 signatures → response; 100,000 → debate) |
| Review / approval | **Assent** | Votes of **Aye** and **Nay** |
| Contributor | **Sponsor** | A person who authored or carried a change |
| Maintainer | **Custodian** | The body responsible for a codex |
| Fork | **Devolution** | A polity derived from another |
| README | **Preamble** | The founding statement of a codex |
| Dashboard | **The Observatory** | Live national metrics, comparable across polities |

## Running the site

The site is fully static — no build step, no dependencies.

```sh
cd site
python3 -m http.server 8000     # or: npx serve
# open http://localhost:8000
```

To regenerate the site's document data after editing any codex file:

```sh
node tools/build-data.mjs
```

## Data provenance

Every document records its authoritative source (legislation.gov.uk, parliament.uk).
Observatory figures are drawn from the ONS, DESNZ, UNDP and the House of Commons Library;
each panel cites its source and reference period. See the provenance note inside the
Observatory for details.
