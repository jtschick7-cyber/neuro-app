import { describe, expect, it } from 'vitest';
import antibodies from '../data/neural-antibodies.json';
import { SyndromeVocabulary, checkSyndromeIntegrity, type SyndromeVocabularyData } from '../schema/syndrome-vocabulary';
import { SYNDROMES, groupBySyndrome, sortedTerms } from '../src/lib/syndromes';

const ids = new Set(antibodies.entries.map((e) => e.id));

const base = (): SyndromeVocabularyData => ({
  vocabulary: [
    { id: 'ataxia', label: 'Ataxia', definition: 'Cerebellar syndrome' },
    { id: 'seizures', label: 'Seizures', definition: 'Epilepsy' },
  ],
  mapping: [
    { antibodyId: 'a', syndromeTerm: 'ataxia', typical: true },
    { antibodyId: 'a', syndromeTerm: 'seizures', typical: false },
    { antibodyId: 'b', syndromeTerm: 'seizures', typical: true },
  ],
});
const AB = new Set(['a', 'b']);

describe('syndrome data integrity rules', () => {
  it('accepts consistent data', () => expect(checkSyndromeIntegrity(base(), AB)).toEqual([]));

  it('rejects a mapping to an antibody that does not exist', () => {
    const d = base();
    d.mapping.push({ antibodyId: 'ghost', syndromeTerm: 'ataxia', typical: false });
    expect(checkSyndromeIntegrity(d, AB)).toEqual(['mapping antibodyId "ghost" does not exist in neural-antibodies']);
  });

  it('rejects a syndromeTerm that is not in the vocabulary', () => {
    const d = base();
    d.mapping.push({ antibodyId: 'b', syndromeTerm: 'nope', typical: false });
    expect(checkSyndromeIntegrity(d, AB).join('\n')).toContain('"nope"');
  });

  it('rejects an antibody with no typical=true mapping', () => {
    const d = base();
    d.mapping[2].typical = false;
    expect(checkSyndromeIntegrity(d, AB)).toEqual(['antibody "b" has no typical=true syndrome mapping']);
  });

  it('rejects an antibody with no mapping at all', () => {
    expect(checkSyndromeIntegrity(base(), new Set(['a', 'b', 'c']))).toEqual(['antibody "c" has no typical=true syndrome mapping']);
  });

  it('rejects a duplicate (antibodyId, syndromeTerm) pair, even with a different typical flag', () => {
    const d = base();
    d.mapping.push({ antibodyId: 'a', syndromeTerm: 'ataxia', typical: false });
    expect(checkSyndromeIntegrity(d, AB)).toEqual(['duplicate mapping (a, ataxia)']);
  });

  it('rejects an unused vocabulary term', () => {
    const d = base();
    d.vocabulary.push({ id: 'orphan', label: 'Orphan', definition: 'Unused' });
    expect(checkSyndromeIntegrity(d, AB)).toEqual(['vocabulary term "orphan" is not used by any mapping']);
  });

  it('rejects a duplicate vocabulary id', () => {
    const d = base();
    d.vocabulary.push({ id: 'ataxia', label: 'Again', definition: 'Dup' });
    expect(checkSyndromeIntegrity(d, AB)).toEqual(['duplicate vocabulary term "ataxia"']);
  });

  it('schema rejects unknown keys and bad ids', () => {
    expect(SyndromeVocabulary.safeParse({ ...base(), extra: 1 }).success).toBe(false);
    const d = base();
    d.vocabulary[0].id = 'Not Kebab';
    expect(SyndromeVocabulary.safeParse(d).success).toBe(false);
  });
});

describe('bundled syndrome vocabulary', () => {
  it('matches the schema and the neural-antibodies registry', () => {
    expect(SyndromeVocabulary.safeParse(SYNDROMES).success).toBe(true);
    expect(checkSyndromeIntegrity(SYNDROMES, ids)).toEqual([]);
  });
});

describe('groupBySyndrome', () => {
  const entries = [
    { id: 'b', title: 'Beta' },
    { id: 'a', title: 'Alpha' },
    { id: 'c', title: 'Gamma' },
  ];
  const data: SyndromeVocabularyData = {
    vocabulary: [{ id: 'x', label: 'X', definition: 'Def of X' }],
    mapping: [
      { antibodyId: 'c', syndromeTerm: 'x', typical: false },
      { antibodyId: 'b', syndromeTerm: 'x', typical: true },
      { antibodyId: 'a', syndromeTerm: 'x', typical: true },
    ],
  };

  it('puts typical first group and less-common second, each sorted by title', () => {
    const g = groupBySyndrome(data, 'x', entries)!;
    expect(g.typical.map((e) => e.id)).toEqual(['a', 'b']);
    expect(g.lessCommon.map((e) => e.id)).toEqual(['c']);
    expect(g.term.definition).toBe('Def of X');
  });

  it('only returns entries passed in (search narrowing) and null for an unknown term', () => {
    const g = groupBySyndrome(data, 'x', [entries[0]])!;
    expect(g.typical.map((e) => e.id)).toEqual(['b']);
    expect(g.lessCommon).toEqual([]);
    expect(groupBySyndrome(data, 'missing', entries)).toBeNull();
  });

  it('every real term lists every mapped antibody with a title', () => {
    const real = antibodies.entries.map((e) => ({ id: e.id, title: e.antigen }));
    for (const t of SYNDROMES.vocabulary) {
      const g = groupBySyndrome(SYNDROMES, t.id, real)!;
      const expected = SYNDROMES.mapping.filter((m) => m.syndromeTerm === t.id).length;
      expect(g.typical.length + g.lessCommon.length).toBe(expected);
    }
  });

  it('sorts selector labels alphabetically', () => {
    const labels = sortedTerms(SYNDROMES).map((t) => t.label);
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
  });
});
