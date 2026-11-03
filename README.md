# Palliative Care Guide
### คู่มือการดูแลผู้ป่วยประคับประคอง

A bilingual (Thai / English) bedside reference for palliative care, by Warodom Phaenthong, M.D. It is one
self-contained HTML page (`palliative-care-guide.html`, opened by `index.html`) that runs in the browser, works
offline, and sends no data anywhere.

It is decision support for healthcare professionals, not a substitute for the source guidelines, your hospital's
protocols, product labels or clinical judgement.

**Open it:** https://sirmarkthemighty-ctrl.github.io/Palliative_Care_Guide/

## What it contains

- When to start: SPICT, surprise question, PPS vs ECOG.
- ACP and law: advance care planning, living will (National Health Act B.E. 2550 Section 12), SPIKES.
- Opioid calculator: equianalgesic conversion, cross-tolerance reduction, breakthrough dose, sample prescription.
- Symptom protocols: pain, dyspnea, nausea and vomiting, delirium, secretions, bowel obstruction, constipation.
- Dying stage: Palliative Prognostic Index, signs of the dying phase.
- End-of-life care: comfort care, deprescribing, sedation, terminal order set.
- Bedside emergencies: opioid toxicity, bleeding, cord compression, SVC syndrome, hypercalcemia, bowel obstruction.

Tap the version badge for the changelog. Content follows the Thai Ministry of Public Health palliative care CPG 2563.
On 2026-11-03 doses and calculator logic were reviewed against standard practice; the CPG tables themselves were not
available to check against, so verify before relying on them.

## Building

The Vite and React source is in `source/`. `npm install`, then `npx vite build` produces one HTML file
(`vite-plugin-singlefile`, system fonts, no CDN).

## Licence

Copyright (c) 2026 Warodom Phaenthong, M.D. The app's code and text are licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): share and adapt for non-commercial use,
with credit, under the same licence. The source guidelines belong to their publishers; see `NOTICE`.
