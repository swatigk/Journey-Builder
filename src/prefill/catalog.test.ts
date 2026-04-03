import { describe, expect, it } from 'vitest'
import { graphFixture } from '../test/fixtures/graphFixture'
import { buildFormViews } from '../utils/graph'
import { buildPrefillCatalog } from './catalog'

describe('buildPrefillCatalog', () => {
  it('returns direct, transitive, and global groups without changing the caller', () => {
    const forms = buildFormViews(graphFixture)
    const currentForm = forms.find((form) => form.name === 'Form D')

    expect(currentForm).toBeTruthy()

    const groups = buildPrefillCatalog({
      currentForm: currentForm!,
      forms,
      globalData: [
        {
          id: 'global-client-tier',
          label: 'Client tier',
          path: 'client.organization.tier',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Client Organization Properties',
        },
      ],
    })

    expect(groups.map((group) => group.label)).toEqual([
      'Form B',
      'Form A',
      'Client Organization Properties',
    ])
    expect(groups[0]?.items.some((item) => item.path === 'Form B.email')).toBe(true)
    expect(groups[1]?.items.some((item) => item.path === 'Form A.email')).toBe(true)
  })
})
