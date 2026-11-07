# Re-review checklist

All entries were batch-signed on 2026-11-05. This queue lets Jason re-review them by risk without resetting `lastReviewed`.

- Tick a box when the item is reviewed. `npm run rereview` regenerates this file from the data and keeps ticked boxes.
- Printable sheets in the same order: `npm run review-sheets -- --order risk` → `generated/review/risk-*.html`.
- Anything that needs a content change goes through `docs/VERSIONING.md` (edit → validate → review-sheets → signoff → release).

## 1. Calculators (0/17)

- [ ] `calc:levetiracetam-load` — Levetiracetam load
- [ ] `calc:valproate-load` — Valproate load
- [ ] `calc:fosphenytoin-load` — Fosphenytoin load
- [ ] `calc:lacosamide-load` — Lacosamide load
- [ ] `calc:phenytoin-correction` — Phenytoin level: albumin correction and reload estimate
- [ ] `calc:hypertonic-saline-bolus` — Hypertonic saline (ICP)
- [ ] `calc:mannitol-dose` — Mannitol 20%
- [ ] `calc:ledd` — Levodopa equivalent daily dose
- [ ] `calc:cockcroft-gault` — Creatinine clearance (Cockcroft-Gault)
- [ ] `calc:ich-score` — ICH score
- [ ] `calc:abcd2` — ABCD2
- [ ] `calc:cha2ds2-vasc` — CHA₂DS₂-VASc
- [ ] `calc:has-bled` — HAS-BLED
- [ ] `calc:tnk-dose` — Tenecteplase (stroke)
- [ ] `calc:alteplase-dose` — Alteplase (stroke)
- [ ] `calc:ivig-dose` — IVIG
- [ ] `calc:sodium-correction` — Hyponatremia: 3% bolus and correction limits

## 2. Acute protocols with doses (doseText / structured dose) (0/22)

- [ ] `acute-neuro:convulsive-status-epilepticus` — Convulsive status epilepticus (adult)
- [ ] `acute-neuro:refractory-super-refractory-se` — Refractory & super-refractory status epilepticus (incl. NORSE)
- [ ] `acute-neuro:nonconvulsive-status-epilepticus` — Nonconvulsive status epilepticus & ictal-interictal continuum
- [ ] `acute-neuro:myasthenic-crisis` — Myasthenic crisis (impending and manifest)
- [ ] `acute-neuro:guillain-barre-syndrome` — Guillain-Barré syndrome
- [ ] `acute-neuro:neuromuscular-respiratory-failure` — Acute neuromuscular respiratory failure (undifferentiated)
- [ ] `acute-neuro:autoimmune-encephalitis` — Autoimmune encephalitis (incl. paraneoplastic)
- [ ] `acute-neuro:bacterial-meningitis` — Bacterial meningitis (community-acquired & post-neurosurgical, adult)
- [ ] `acute-neuro:viral-encephalitis` — Viral encephalitis (HSV, VZV, arboviral incl. West Nile)
- [ ] `acute-neuro:cns-infection-immunocompromised` — CNS infection in the immunocompromised (HIV, transplant, biologics)
- [ ] `acute-neuro:nmosd-mogad-attack` — NMOSD / MOGAD acute attack
- [ ] `acute-neuro:ms-relapse` — Multiple sclerosis relapse
- [ ] `acute-neuro:spinal-cord-compression` — Acute spinal cord compression (malignant, epidural abscess)
- [ ] `acute-neuro:elevated-icp-herniation` — Elevated ICP / cerebral herniation
- [ ] `acute-neuro:pres` — Posterior reversible encephalopathy syndrome (PRES)
- [ ] `acute-neuro:serotonin-syndrome` — Serotonin syndrome (serotonin toxicity)
- [ ] `acute-neuro:nms-parkinsonism-hyperpyrexia` — Neuroleptic malignant syndrome & parkinsonism-hyperpyrexia
- [ ] `acute-neuro:wernicke-encephalopathy` — Wernicke encephalopathy
- [ ] `acute-neuro:hyponatremia-ods` — Severe hyponatremia & osmotic demyelination syndrome
- [ ] `acute-neuro:icans-car-t-neurotoxicity` — ICANS (immune effector cell–associated neurotoxicity)
- [ ] `acute-neuro:status-migrainosus` — Status migrainosus / refractory migraine (inpatient)
- [ ] `acute-neuro:post-dural-puncture-headache` — Post-dural puncture headache (post-LP) and epidural blood patch

## 3. Antithrombotic reversal and thrombolysis rules (0/19)

- [ ] `vascular-antithrombotics:tenecteplase` — Tenecteplase (TNK)
- [ ] `vascular-antithrombotics:alteplase` — Alteplase (tPA)
- [ ] `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` — Thrombolysis in patients on antithrombotics or with coagulopathy
- [ ] `vascular-antithrombotics:sich-after-thrombolysis` — Symptomatic ICH within 24 h of thrombolysis
- [ ] `vascular-antithrombotics:apixaban` — Apixaban (Eliquis)
- [ ] `vascular-antithrombotics:rivaroxaban` — Rivaroxaban (Xarelto)
- [ ] `vascular-antithrombotics:edoxaban` — Edoxaban (Savaysa)
- [ ] `vascular-antithrombotics:dabigatran` — Dabigatran (Pradaxa)
- [ ] `vascular-antithrombotics:warfarin` — Warfarin (Coumadin, Jantoven)
- [ ] `vascular-antithrombotics:heparin-ufh` — Unfractionated heparin (UFH)
- [ ] `vascular-antithrombotics:enoxaparin` — Enoxaparin (Lovenox)
- [ ] `vascular-antithrombotics:aspirin` — Aspirin
- [ ] `vascular-antithrombotics:clopidogrel` — Clopidogrel (Plavix)
- [ ] `vascular-antithrombotics:ticagrelor` — Ticagrelor (Brilinta)
- [ ] `vascular-antithrombotics:cilostazol` — Cilostazol (Pletal)
- [ ] `vascular-antithrombotics:aspirin-dipyridamole` — Aspirin / extended-release dipyridamole (Aggrenox)
- [ ] `vascular-antithrombotics:gp-iib-iiia-inhibitors` — GP IIb/IIIa inhibitors (eptifibatide, tirofiban, abciximab)
- [ ] `vascular-antithrombotics:anticoag-reversal-ich` — Anticoagulant-associated ICH: reversal by agent
- [ ] `vascular-antithrombotics:antiplatelet-ich` — Antiplatelet-associated ICH: platelets and desmopressin

## 4. Other decision rules (0/40)

- [ ] `consult-workups:young-stroke-workup` — Young adult stroke (<50): extended workup
- [ ] `consult-workups:ich-etiology-workup` — Intracerebral hemorrhage: cause and early course
- [ ] `consult-workups:sah-workup` — Suspected subarachnoid hemorrhage
- [ ] `consult-workups:caa-related-inflammation` — CAA-related inflammation (CAA-ri)
- [ ] `consult-workups:first-unprovoked-seizure` — First unprovoked seizure in an adult
- [ ] `consult-workups:rapidly-progressive-dementia` — Rapidly progressive dementia (incl. CJD)
- [ ] `consult-workups:valproate-hyperammonemic-encephalopathy` — Valproate hyperammonemic encephalopathy
- [ ] `consult-workups:acute-generalized-weakness` — Acute generalized weakness: localize first
- [ ] `consult-workups:icu-acquired-weakness` — ICU-acquired weakness (CIP/CIM)
- [ ] `consult-workups:inpatient-neuropathy` — Acute or subacute neuropathy on the wards
- [ ] `consult-workups:elevated-ck-myopathy` — Elevated CK / suspected myopathy
- [ ] `consult-workups:acute-hepatic-porphyria` — Suspected acute hepatic porphyria (AIP)
- [ ] `consult-workups:myelopathy-workup` — Myelopathy / transverse myelitis workup
- [ ] `consult-workups:acute-vertigo-hints` — Acute dizziness / vertigo: stroke or inner ear?
- [ ] `consult-workups:acute-vision-loss` — Acute monocular vision loss
- [ ] `consult-workups:diplopia-ptosis` — Diplopia and ptosis
- [ ] `consult-workups:thunderclap-headache` — Thunderclap headache
- [ ] `consult-workups:new-demyelinating-lesion` — New demyelinating event or lesions: is it MS?
- [ ] `consult-workups:cns-vasculitis-workup` — Suspected primary CNS vasculitis
- [ ] `consult-workups:paraneoplastic-workup` — Suspected paraneoplastic neurologic syndrome
- [ ] `consult-workups:susac-syndrome` — Suspected Susac syndrome
- [ ] `consult-workups:intravascular-lymphoma` — Suspected intravascular large B-cell lymphoma (IVLBCL)
- [ ] `consult-workups:post-cardiac-arrest-prognostication` — Neuroprognostication after cardiac arrest
- [ ] `consult-workups:brain-death-determination` — Brain death / death by neurologic criteria (adult)
- [ ] `vascular-antithrombotics:four-factor-pcc` — Four-factor prothrombin complex concentrate (4F-PCC)
- [ ] `vascular-antithrombotics:vitamin-k` — Vitamin K (phytonadione)
- [ ] `vascular-antithrombotics:protamine` — Protamine sulfate
- [ ] `vascular-antithrombotics:dapt-minor-stroke-tia` — DAPT for minor stroke and high-risk TIA
- [ ] `vascular-antithrombotics:icad-symptomatic` — Symptomatic intracranial atherosclerotic stenosis (ICAD)
- [ ] `vascular-antithrombotics:af-stroke-anticoag-timing` — When to start anticoagulation after stroke with AF
- [ ] `vascular-antithrombotics:esus-antithrombotic` — ESUS / cryptogenic stroke: antithrombotic and PFO
- [ ] `vascular-antithrombotics:cervical-artery-dissection` — Cervical artery dissection: antithrombotic choice
- [ ] `vascular-antithrombotics:antithrombotic-after-reperfusion` — Antithrombotics after IVT or thrombectomy
- [ ] `vascular-antithrombotics:restart-antithrombotic-after-ich` — Restarting antithrombotics after ICH
- [ ] `vascular-antithrombotics:vte-prophylaxis-stroke-ich` — VTE prophylaxis in ischemic stroke and ICH
- [ ] `vascular-antithrombotics:cvt-anticoagulation` — Cerebral venous thrombosis: anticoagulation
- [ ] `vascular-antithrombotics:periprocedural-holds-lp-evd` — Holds before LP, lumbar drain or EVD
- [ ] `vascular-antithrombotics:mechanical-valve-stroke` — Stroke with a prosthetic heart valve
- [ ] `vascular-antithrombotics:cancer-associated-stroke` — Ischemic stroke with active cancer
- [ ] `vascular-antithrombotics:pregnancy-antithrombotics` — Stroke and antithrombotics in pregnancy and postpartum

## 5. Caution and interaction lists (0/40)

- [ ] `mg-contraindications:botulinum-toxin` — Botulinum toxins
- [ ] `mg-contraindications:d-penicillamine` — D-penicillamine
- [ ] `mg-contraindications:fluoroquinolones` — Fluoroquinolones
- [ ] `mg-contraindications:macrolides` — Macrolides
- [ ] `mg-contraindications:aminoglycosides` — Aminoglycosides
- [ ] `mg-contraindications:magnesium` — Magnesium (IV and repletion)
- [ ] `mg-contraindications:immune-checkpoint-inhibitors` — Immune checkpoint inhibitors
- [ ] `mg-contraindications:class-ia-antiarrhythmics` — Class Ia antiarrhythmics
- [ ] `mg-contraindications:quinine-antimalarials` — Quinine, chloroquine, hydroxychloroquine
- [ ] `mg-contraindications:beta-blockers` — Beta-blockers
- [ ] `mg-contraindications:calcium-channel-blockers` — Calcium channel blockers
- [ ] `mg-contraindications:statins` — Statins
- [ ] `mg-contraindications:iodinated-contrast` — Iodinated contrast
- [ ] `mg-contraindications:corticosteroids` — Corticosteroids (initiation)
- [ ] `mg-contraindications:lithium` — Lithium
- [ ] `mg-contraindications:desferrioxamine` — Deferoxamine
- [ ] `mg-contraindications:telithromycin` — Telithromycin
- [ ] `seizure-threshold:bupropion` — Bupropion
- [ ] `seizure-threshold:flumazenil` — Flumazenil
- [ ] `seizure-threshold:cefepime` — Cefepime
- [ ] `seizure-threshold:beta-lactams-carbapenems` — Other beta-lactams and carbapenems
- [ ] `seizure-threshold:fluoroquinolones` — Fluoroquinolones
- [ ] `seizure-threshold:theophylline` — Theophylline
- [ ] `seizure-threshold:clozapine` — Clozapine
- [ ] `seizure-threshold:tramadol` — Tramadol
- [ ] `seizure-threshold:meperidine` — Meperidine
- [ ] `rcvs-triggers:sympathomimetics` — Sympathomimetics and decongestants
- [ ] `rcvs-triggers:ergots-dopamine-agonists` — Ergots and dopamine agonists
- [ ] `rcvs-triggers:triptans` — Triptans
- [ ] `rcvs-triggers:illicit-recreational` — Illicit and recreational substances
- [ ] `rcvs-triggers:serotonergic-antidepressants` — Serotonergic antidepressants
- [ ] `rcvs-triggers:immunomodulators` — Immunosuppressants and biologics
- [ ] `rcvs-triggers:hormonal-agents` — Hormonal agents
- [ ] `rcvs-triggers:other-reported-triggers` — Other reported triggers
- [ ] `asm-interactions:inducing-asm-apixaban-rivaroxaban` — Carbamazepine or phenytoin with apixaban or rivaroxaban
- [ ] `asm-interactions:inducing-asm-warfarin` — Enzyme-inducing antiseizure medications with warfarin
- [ ] `asm-interactions:carbapenems-valproate` — Carbapenems with valproate
- [ ] `asm-interactions:tmp-smx-phenytoin` — Trimethoprim-sulfamethoxazole with phenytoin
- [ ] `asm-interactions:gabapentinoids-opioids` — Gabapentin or pregabalin with opioids
- [ ] `asm-interactions:cns-polypharmacy-falls` — Three or more CNS-active drugs including antiseizure medications

## 6. Neural antibodies (0/36)

- [ ] `neural-antibodies:nmdar` — NMDA receptor (GluN1 subunit)
- [ ] `neural-antibodies:lgi1` — LGI1 (leucine-rich glioma-inactivated 1)
- [ ] `neural-antibodies:caspr2` — CASPR2 (contactin-associated protein-like 2)
- [ ] `neural-antibodies:gabab-r` — GABA-B receptor
- [ ] `neural-antibodies:ampar` — AMPA receptor (GluA1/GluA2)
- [ ] `neural-antibodies:gabaa-r` — GABA-A receptor (α1/β3 ± γ2 subunits)
- [ ] `neural-antibodies:dppx` — DPPX (dipeptidyl-peptidase-like protein 6)
- [ ] `neural-antibodies:glyr` — Glycine receptor (α1 subunit)
- [ ] `neural-antibodies:mglur5` — Metabotropic glutamate receptor 5 (mGluR5)
- [ ] `neural-antibodies:mglur1` — Metabotropic glutamate receptor 1 (mGluR1)
- [ ] `neural-antibodies:iglon5` — IgLON5
- [ ] `neural-antibodies:p-q-vgcc` — P/Q-type voltage-gated calcium channel (VGCC)
- [ ] `neural-antibodies:gad65` — Glutamic acid decarboxylase 65 (GAD65)
- [ ] `neural-antibodies:amphiphysin` — Amphiphysin
- [ ] `neural-antibodies:anti-hu` — Hu (ANNA-1)
- [ ] `neural-antibodies:cv2-crmp5` — CV2 / CRMP5 (collapsin response-mediator protein 5)
- [ ] `neural-antibodies:anti-ri` — Ri (ANNA-2; NOVA1/NOVA2)
- [ ] `neural-antibodies:anti-yo` — Yo (PCA-1; CDR2/CDR2L)
- [ ] `neural-antibodies:ma2` — Ma2 (± Ma1)
- [ ] `neural-antibodies:tr-dner` — Tr (DNER, delta/notch-like EGF-related receptor)
- [ ] `neural-antibodies:sox1` — SOX1 (anti-glial nuclear antibody, AGNA)
- [ ] `neural-antibodies:klhl11` — Kelch-like protein 11 (KLHL11)
- [ ] `neural-antibodies:pca2-map1b` — PCA-2 (MAP1B, microtubule-associated protein 1B)
- [ ] `neural-antibodies:aqp4` — Aquaporin-4 (AQP4)
- [ ] `neural-antibodies:mog` — Myelin oligodendrocyte glycoprotein (MOG)
- [ ] `neural-antibodies:gfap` — Glial fibrillary acidic protein (GFAPα)
- [ ] `neural-antibodies:itpr1` — Inositol 1,4,5-trisphosphate receptor type 1 (ITPR1; endoplasmic reticulum Ca2+ channel)
- [ ] `neural-antibodies:ap3b2` — Adaptor protein-3 complex subunit beta-2 (AP3B2; beta-neuronal adaptin-like protein, synaptic vesicle coat)
- [ ] `neural-antibodies:septin-5` — Septin-5 (CDCrel-1; presynaptic GTP-binding protein regulating neurotransmitter exocytosis)
- [ ] `neural-antibodies:neurochondrin` — Neurochondrin (NCDN, norbin; intracellular somatodendritic protein interacting with mGluR1/mGluR5)
- [ ] `neural-antibodies:trim46` — Tripartite motif-containing protein 46 (TRIM46; axon initial segment microtubule-binding protein)
- [ ] `neural-antibodies:arhgap26` — GTPase regulator associated with focal adhesion kinase 1 (GRAF1; Rho GTPase-activating protein 26, ARHGAP26; cytosolic)
- [ ] `neural-antibodies:ak5` — Adenylate kinase 5 (AK5; cytosolic neuronal enzyme)
- [ ] `neural-antibodies:pde10a` — Phosphodiesterase 10A (PDE10A; striatum-enriched cyclic nucleotide phosphodiesterase, membrane-bound and cytosolic isoforms)
- [ ] `neural-antibodies:anna3-dach1` — Dachshund homolog 1 (DACH1; nuclear transcription factor), the ANNA-3 antigen
- [ ] `neural-antibodies:septin-7` — Septin-7 (cytoskeletal GTP-binding protein; regulates dendritic branching; pre- and postsynaptic localization)

## 7. Not in the task 2.1 order — placement to confirm (0/10)

- [ ] `antiseizure-medications:levetiracetam` — Levetiracetam (Keppra) — maintenance dosing
- [ ] `antiseizure-medications:lacosamide` — Lacosamide (Vimpat) — maintenance dosing
- [ ] `antiseizure-medications:brivaracetam` — Brivaracetam (Briviact) — maintenance dosing
- [ ] `antiseizure-medications:valproate` — Valproate (Depacon IV / Depakote) — maintenance dosing
- [ ] `antiseizure-medications:phenytoin-fosphenytoin` — Phenytoin / fosphenytoin — maintenance dosing and levels
- [ ] `antiseizure-medications:lamotrigine` — Lamotrigine (Lamictal) — titration
- [ ] `reference-cards:neuro-icu-targets` — Neuro-ICU targets (rounds lookup)
- [ ] `reference-cards:asah-numbers` — aSAH numbers
- [ ] `reference-cards:thrombophilia-test-validity` — Thrombophilia tests: validity by timing and anticoagulant
- [ ] `reference-cards:inpatient-parkinson-disease` — Inpatient Parkinson disease: NPO, tube, antiemetics, psychosis
