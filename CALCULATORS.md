# Deterministic Clinical Calculators Specification (`src/lib/calculators.ts`)

## 1. Weight-Based Anticonvulsant Loading
- **Levetiracetam (Keppra):** $60 \text{ mg/kg}$ IV (Max single load: $4500 \text{ mg}$).
- **Valproic Acid / Depacon:** $40 \text{ mg/kg}$ IV (Max single load: $3000 \text{ mg}$).
- **Fosphenytoin (Cerebyx):** $20 \text{ mg PE/kg}$ IV (Max single load: $1500 \text{ mg PE}$).
- **Lacosamide (Vimpat):** $400 \text{ mg}$ fixed load (or $5 \text{ mg/kg}$ in extremes of weight).

## 2. Cerebral Edema & ICP Dosing
- **3% Hypertonic Saline:** $2 \text{ mL/kg}$ IV over 20 minutes (Emergency bolus for acute herniation).
- **Mannitol (20%):** $0.5 - 1.0 \text{ g/kg}$ IV over 20-30 minutes. Contraindicated if serum osmolality $> 320 \text{ mOsm/kg}$ or severe acute kidney injury.

## 3. CSF Traumatic Tap Protein Correction
$$\text{Corrected Protein} = \text{Measured Protein} - \left( \frac{\text{CSF RBC}}{\text{Blood RBC}} \times \text{Blood Protein} \right)$$

Approximation rule: Subtract $1.1 \text{ mg/dL}$ of protein for every $1000 \text{ CSF RBC/}\mu\text{L}$.

## 4. Inpatient Parkinson's LEDD Converter
- **Carbidopa/Levodopa IR:** 1:1 mg ratio ($\times 1.0$).
- **Carbidopa/Levodopa CR/ER:** Multiply by $0.75$.
- **Ropinirole:** $\times 20$.
- **Pramipexole:** $\times 100$.
- **Rotigotine Patch:** $\times 30$.
- **Selegiline / Rasagiline:** $\times 100$.
