# Re-review checklist

All entries were batch-signed on 2026-11-05. This queue lets Jason re-review them by risk without resetting `lastReviewed`.

- Tick a box when the item is reviewed. `npm run rereview` regenerates this file from the data and keeps ticked boxes.
- Printable sheets in the same order: `npm run review-sheets -- --order risk` → `generated/review/risk-*.html`.
- Anything that needs a content change goes through `docs/VERSIONING.md` (edit → validate → review-sheets → signoff → release).

## 1. Calculators (17/17)

- [x] `calc:levetiracetam-load` — Levetiracetam load
- [x] `calc:valproate-load` — Valproate load
- [x] `calc:fosphenytoin-load` — Fosphenytoin load
- [x] `calc:lacosamide-load` — Lacosamide load
- [x] `calc:phenytoin-correction` — Phenytoin level: albumin correction and reload estimate
- [x] `calc:hypertonic-saline-bolus` — Hypertonic saline (ICP)
- [x] `calc:mannitol-dose` — Mannitol 20%
- [x] `calc:ledd` — Levodopa equivalent daily dose
- [x] `calc:cockcroft-gault` — Creatinine clearance (Cockcroft-Gault)
- [x] `calc:ich-score` — ICH score
- [x] `calc:abcd2` — ABCD2
- [x] `calc:cha2ds2-vasc` — CHA₂DS₂-VASc
- [x] `calc:has-bled` — HAS-BLED
- [x] `calc:tnk-dose` — Tenecteplase (stroke)
- [x] `calc:alteplase-dose` — Alteplase (stroke)
- [x] `calc:ivig-dose` — IVIG
- [x] `calc:sodium-correction` — Hyponatremia: 3% bolus and correction limits

## 2. Acute protocols with doses, then ASM dosing cards (26/26)

- [x] `acute-neuro:convulsive-status-epilepticus` — Convulsive status epilepticus (adult)
- [x] `acute-neuro:refractory-super-refractory-se` — Refractory & super-refractory status epilepticus (incl. NORSE)
- [x] `acute-neuro:nonconvulsive-status-epilepticus` — Nonconvulsive status epilepticus & ictal-interictal continuum
- [x] `acute-neuro:myasthenic-crisis` — Myasthenic crisis (impending and manifest)
- [x] `acute-neuro:guillain-barre-syndrome` — Guillain-Barré syndrome
- [x] `acute-neuro:neuromuscular-respiratory-failure` — Acute neuromuscular respiratory failure (undifferentiated)
- [x] `acute-neuro:autoimmune-encephalitis` — Autoimmune encephalitis (incl. paraneoplastic)
- [x] `acute-neuro:bacterial-meningitis` — Bacterial meningitis (community-acquired & post-neurosurgical, adult)
- [x] `acute-neuro:viral-encephalitis` — Viral encephalitis (HSV, VZV, arboviral incl. West Nile)
- [x] `acute-neuro:cns-infection-immunocompromised` — CNS infection in the immunocompromised (HIV, transplant, biologics)
- [x] `acute-neuro:nmosd-mogad-attack` — NMOSD / MOGAD acute attack
- [x] `acute-neuro:spinal-cord-compression` — Acute spinal cord compression (malignant, epidural abscess)
- [x] `acute-neuro:elevated-icp-herniation` — Elevated ICP / cerebral herniation
- [x] `acute-neuro:pres` — Posterior reversible encephalopathy syndrome (PRES)
- [x] `acute-neuro:serotonin-syndrome` — Serotonin syndrome (serotonin toxicity)
- [x] `acute-neuro:nms-parkinsonism-hyperpyrexia` — Neuroleptic malignant syndrome & parkinsonism-hyperpyrexia
- [x] `acute-neuro:wernicke-encephalopathy` — Wernicke encephalopathy
- [x] `acute-neuro:hyponatremia-ods` — Severe hyponatremia & osmotic demyelination syndrome
- [x] `acute-neuro:icans-car-t-neurotoxicity` — ICANS (immune effector cell–associated neurotoxicity)
- [x] `acute-neuro:status-migrainosus` — Status migrainosus / refractory migraine (inpatient)
- [x] `antiseizure-medications:levetiracetam` — Levetiracetam (Keppra) — maintenance dosing
- [x] `antiseizure-medications:lacosamide` — Lacosamide (Vimpat) — maintenance dosing
- [x] `antiseizure-medications:brivaracetam` — Brivaracetam (Briviact) — maintenance dosing
- [x] `antiseizure-medications:valproate` — Valproate (Depacon IV / Depakote) — maintenance dosing
- [x] `antiseizure-medications:phenytoin-fosphenytoin` — Phenytoin / fosphenytoin — maintenance dosing and levels
- [x] `antiseizure-medications:lamotrigine` — Lamotrigine (Lamictal) — titration

## 3. Antithrombotic reversal and thrombolysis rules (16/16)

- [x] `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` — Thrombolysis in patients on antithrombotics or with coagulopathy
- [x] `vascular-antithrombotics:apixaban` — Apixaban (Eliquis)
- [x] `vascular-antithrombotics:rivaroxaban` — Rivaroxaban (Xarelto)
- [x] `vascular-antithrombotics:edoxaban` — Edoxaban (Savaysa)
- [x] `vascular-antithrombotics:dabigatran` — Dabigatran (Pradaxa)
- [x] `vascular-antithrombotics:warfarin` — Warfarin (Coumadin, Jantoven)
- [x] `vascular-antithrombotics:heparin-ufh` — Unfractionated heparin (UFH)
- [x] `vascular-antithrombotics:enoxaparin` — Enoxaparin (Lovenox)
- [x] `vascular-antithrombotics:aspirin` — Aspirin
- [x] `vascular-antithrombotics:clopidogrel` — Clopidogrel (Plavix)
- [x] `vascular-antithrombotics:ticagrelor` — Ticagrelor (Brilinta)
- [x] `vascular-antithrombotics:cilostazol` — Cilostazol (Pletal)
- [x] `vascular-antithrombotics:aspirin-dipyridamole` — Aspirin / extended-release dipyridamole (Aggrenox)
- [x] `vascular-antithrombotics:gp-iib-iiia-inhibitors` — GP IIb/IIIa inhibitors (eptifibatide, tirofiban, abciximab)
- [x] `vascular-antithrombotics:anticoag-reversal-ich` — Anticoagulant-associated ICH: reversal by agent
- [x] `vascular-antithrombotics:antiplatelet-ich` — Antiplatelet-associated ICH: platelets and desmopressin

## 4. Other decision rules and reference cards (38/38)

- [x] `consult-workups:young-stroke-workup` — Young adult stroke (<50): extended workup
- [x] `consult-workups:ich-etiology-workup` — Intracerebral hemorrhage: cause and early course
- [x] `consult-workups:caa-related-inflammation` — CAA-related inflammation (CAA-ri)
- [x] `consult-workups:rapidly-progressive-dementia` — Rapidly progressive dementia (incl. CJD)
- [x] `consult-workups:valproate-hyperammonemic-encephalopathy` — Valproate hyperammonemic encephalopathy
- [x] `consult-workups:inpatient-neuropathy` — Acute or subacute neuropathy on the wards
- [x] `consult-workups:elevated-ck-myopathy` — Elevated CK / suspected myopathy
- [x] `consult-workups:acute-hepatic-porphyria` — Suspected acute hepatic porphyria (AIP)
- [x] `consult-workups:myelopathy-workup` — Myelopathy / transverse myelitis workup
- [x] `consult-workups:acute-vision-loss` — Acute monocular vision loss
- [x] `consult-workups:thunderclap-headache` — Thunderclap headache
- [x] `consult-workups:new-demyelinating-lesion` — New demyelinating event or lesions: is it MS?
- [x] `consult-workups:cns-vasculitis-workup` — Suspected primary CNS vasculitis
- [x] `consult-workups:paraneoplastic-workup` — Suspected paraneoplastic neurologic syndrome
- [x] `consult-workups:susac-syndrome` — Suspected Susac syndrome
- [x] `consult-workups:intravascular-lymphoma` — Suspected intravascular large B-cell lymphoma (IVLBCL)
- [x] `consult-workups:post-cardiac-arrest-prognostication` — Neuroprognostication after cardiac arrest
- [x] `consult-workups:brain-death-determination` — Brain death / death by neurologic criteria (adult)
- [x] `reference-cards:neuro-icu-targets` — Neuro-ICU targets (rounds lookup)
- [x] `reference-cards:asah-numbers` — aSAH numbers
- [x] `reference-cards:thrombophilia-test-validity` — Thrombophilia tests: validity by timing and anticoagulant
- [x] `reference-cards:inpatient-parkinson-disease` — Inpatient Parkinson disease: NPO, tube, antiemetics, psychosis
- [x] `vascular-antithrombotics:four-factor-pcc` — Four-factor prothrombin complex concentrate (4F-PCC)
- [x] `vascular-antithrombotics:vitamin-k` — Vitamin K (phytonadione)
- [x] `vascular-antithrombotics:protamine` — Protamine sulfate
- [x] `vascular-antithrombotics:dapt-minor-stroke-tia` — DAPT for minor stroke and high-risk TIA
- [x] `vascular-antithrombotics:icad-symptomatic` — Symptomatic intracranial atherosclerotic stenosis (ICAD)
- [x] `vascular-antithrombotics:af-stroke-anticoag-timing` — When to start anticoagulation after stroke with AF
- [x] `vascular-antithrombotics:esus-antithrombotic` — ESUS / cryptogenic stroke: antithrombotic and PFO
- [x] `vascular-antithrombotics:cervical-artery-dissection` — Cervical artery dissection: antithrombotic choice
- [x] `vascular-antithrombotics:antithrombotic-after-reperfusion` — Antithrombotics after IVT or thrombectomy
- [x] `vascular-antithrombotics:restart-antithrombotic-after-ich` — Restarting antithrombotics after ICH
- [x] `vascular-antithrombotics:vte-prophylaxis-stroke-ich` — VTE prophylaxis in ischemic stroke and ICH
- [x] `vascular-antithrombotics:cvt-anticoagulation` — Cerebral venous thrombosis: anticoagulation
- [x] `vascular-antithrombotics:periprocedural-holds-lp-evd` — Holds before LP, lumbar drain or EVD
- [x] `vascular-antithrombotics:mechanical-valve-stroke` — Stroke with a prosthetic heart valve
- [x] `vascular-antithrombotics:cancer-associated-stroke` — Ischemic stroke with active cancer
- [x] `vascular-antithrombotics:pregnancy-antithrombotics` — Stroke and antithrombotics in pregnancy and postpartum

## 5. Caution and interaction lists (40/40)

- [x] `mg-contraindications:botulinum-toxin` — Botulinum toxins
- [x] `mg-contraindications:d-penicillamine` — D-penicillamine
- [x] `mg-contraindications:fluoroquinolones` — Fluoroquinolones
- [x] `mg-contraindications:macrolides` — Macrolides
- [x] `mg-contraindications:aminoglycosides` — Aminoglycosides
- [x] `mg-contraindications:magnesium` — Magnesium (IV and repletion)
- [x] `mg-contraindications:immune-checkpoint-inhibitors` — Immune checkpoint inhibitors
- [x] `mg-contraindications:class-ia-antiarrhythmics` — Class Ia antiarrhythmics
- [x] `mg-contraindications:quinine-antimalarials` — Quinine, chloroquine, hydroxychloroquine
- [x] `mg-contraindications:beta-blockers` — Beta-blockers
- [x] `mg-contraindications:calcium-channel-blockers` — Calcium channel blockers
- [x] `mg-contraindications:statins` — Statins
- [x] `mg-contraindications:iodinated-contrast` — Iodinated contrast
- [x] `mg-contraindications:corticosteroids` — Corticosteroids (initiation)
- [x] `mg-contraindications:lithium` — Lithium
- [x] `mg-contraindications:desferrioxamine` — Deferoxamine
- [x] `mg-contraindications:telithromycin` — Telithromycin
- [x] `seizure-threshold:bupropion` — Bupropion
- [x] `seizure-threshold:flumazenil` — Flumazenil
- [x] `seizure-threshold:cefepime` — Cefepime
- [x] `seizure-threshold:beta-lactams-carbapenems` — Other beta-lactams and carbapenems
- [x] `seizure-threshold:fluoroquinolones` — Fluoroquinolones
- [x] `seizure-threshold:theophylline` — Theophylline
- [x] `seizure-threshold:clozapine` — Clozapine
- [x] `seizure-threshold:tramadol` — Tramadol
- [x] `seizure-threshold:meperidine` — Meperidine
- [x] `rcvs-triggers:sympathomimetics` — Sympathomimetics and decongestants
- [x] `rcvs-triggers:ergots-dopamine-agonists` — Ergots and dopamine agonists
- [x] `rcvs-triggers:triptans` — Triptans
- [x] `rcvs-triggers:illicit-recreational` — Illicit and recreational substances
- [x] `rcvs-triggers:serotonergic-antidepressants` — Serotonergic antidepressants
- [x] `rcvs-triggers:immunomodulators` — Immunosuppressants and biologics
- [x] `rcvs-triggers:hormonal-agents` — Hormonal agents
- [x] `rcvs-triggers:other-reported-triggers` — Other reported triggers
- [x] `asm-interactions:inducing-asm-apixaban-rivaroxaban` — Carbamazepine or phenytoin with apixaban or rivaroxaban
- [x] `asm-interactions:inducing-asm-warfarin` — Enzyme-inducing antiseizure medications with warfarin
- [x] `asm-interactions:carbapenems-valproate` — Carbapenems with valproate
- [x] `asm-interactions:tmp-smx-phenytoin` — Trimethoprim-sulfamethoxazole with phenytoin
- [x] `asm-interactions:gabapentinoids-opioids` — Gabapentin or pregabalin with opioids
- [x] `asm-interactions:cns-polypharmacy-falls` — Three or more CNS-active drugs including antiseizure medications

## 6. Neural antibodies (36/36)

- [x] `neural-antibodies:nmdar` — NMDA receptor (GluN1 subunit)
- [x] `neural-antibodies:lgi1` — LGI1 (leucine-rich glioma-inactivated 1)
- [x] `neural-antibodies:caspr2` — CASPR2 (contactin-associated protein-like 2)
- [x] `neural-antibodies:gabab-r` — GABA-B receptor
- [x] `neural-antibodies:ampar` — AMPA receptor (GluA1/GluA2)
- [x] `neural-antibodies:gabaa-r` — GABA-A receptor (α1/β3 ± γ2 subunits)
- [x] `neural-antibodies:dppx` — DPPX (dipeptidyl-peptidase-like protein 6)
- [x] `neural-antibodies:glyr` — Glycine receptor (α1 subunit)
- [x] `neural-antibodies:mglur5` — Metabotropic glutamate receptor 5 (mGluR5)
- [x] `neural-antibodies:mglur1` — Metabotropic glutamate receptor 1 (mGluR1)
- [x] `neural-antibodies:iglon5` — IgLON5
- [x] `neural-antibodies:p-q-vgcc` — P/Q-type voltage-gated calcium channel (VGCC)
- [x] `neural-antibodies:gad65` — Glutamic acid decarboxylase 65 (GAD65)
- [x] `neural-antibodies:amphiphysin` — Amphiphysin
- [x] `neural-antibodies:anti-hu` — Hu (ANNA-1)
- [x] `neural-antibodies:cv2-crmp5` — CV2 / CRMP5 (collapsin response-mediator protein 5)
- [x] `neural-antibodies:anti-ri` — Ri (ANNA-2; NOVA1/NOVA2)
- [x] `neural-antibodies:anti-yo` — Yo (PCA-1; CDR2/CDR2L)
- [x] `neural-antibodies:ma2` — Ma2 (± Ma1)
- [x] `neural-antibodies:tr-dner` — Tr (DNER, delta/notch-like EGF-related receptor)
- [x] `neural-antibodies:sox1` — SOX1 (anti-glial nuclear antibody, AGNA)
- [x] `neural-antibodies:klhl11` — Kelch-like protein 11 (KLHL11)
- [x] `neural-antibodies:pca2-map1b` — PCA-2 (MAP1B, microtubule-associated protein 1B)
- [x] `neural-antibodies:aqp4` — Aquaporin-4 (AQP4)
- [x] `neural-antibodies:mog` — Myelin oligodendrocyte glycoprotein (MOG)
- [x] `neural-antibodies:gfap` — Glial fibrillary acidic protein (GFAPα)
- [x] `neural-antibodies:itpr1` — Inositol 1,4,5-trisphosphate receptor type 1 (ITPR1; endoplasmic reticulum Ca2+ channel)
- [x] `neural-antibodies:ap3b2` — Adaptor protein-3 complex subunit beta-2 (AP3B2; beta-neuronal adaptin-like protein, synaptic vesicle coat)
- [x] `neural-antibodies:septin-5` — Septin-5 (CDCrel-1; presynaptic GTP-binding protein regulating neurotransmitter exocytosis)
- [x] `neural-antibodies:neurochondrin` — Neurochondrin (NCDN, norbin; intracellular somatodendritic protein interacting with mGluR1/mGluR5)
- [x] `neural-antibodies:trim46` — Tripartite motif-containing protein 46 (TRIM46; axon initial segment microtubule-binding protein)
- [x] `neural-antibodies:arhgap26` — GTPase regulator associated with focal adhesion kinase 1 (GRAF1; Rho GTPase-activating protein 26, ARHGAP26; cytosolic)
- [x] `neural-antibodies:ak5` — Adenylate kinase 5 (AK5; cytosolic neuronal enzyme)
- [x] `neural-antibodies:pde10a` — Phosphodiesterase 10A (PDE10A; striatum-enriched cyclic nucleotide phosphodiesterase, membrane-bound and cytosolic isoforms)
- [x] `neural-antibodies:anna3-dach1` — Dachshund homolog 1 (DACH1; nuclear transcription factor), the ANNA-3 antigen
- [x] `neural-antibodies:septin-7` — Septin-7 (cytoskeletal GTP-binding protein; regulates dendritic branching; pre- and postsynaptic localization)
