import { describe, expect, it } from 'vitest'
import { graphFixture } from '../test/fixtures/graphFixture'
import { buildFormViews } from './graph'

describe('buildFormViews', () => {
  it('collects transitive dependencies for downstream forms', () => {
    const forms = buildFormViews(graphFixture)
    const formD = forms.find((form) => form.name === 'Form D')
    const formF = forms.find((form) => form.name === 'Form F')

    expect(formD?.directDependencies).toEqual([
      'form-a4750667-d774-40fb-9b0a-44f8539ff6c4',
    ])
    expect(formD?.allDependencies).toEqual([
      'form-a4750667-d774-40fb-9b0a-44f8539ff6c4',
      'form-47c61d17-62b0-4c42-8ca2-0eff641c9d88',
    ])
    expect(formF?.allDependencies).toEqual([
      'form-0f58384c-4966-4ce6-9ec2-40b96d61f745',
      'form-e15d42df-c7c0-4819-9391-53730e6d47b3',
      'form-a4750667-d774-40fb-9b0a-44f8539ff6c4',
      'form-47c61d17-62b0-4c42-8ca2-0eff641c9d88',
      'form-7c26f280-7bff-40e3-b9a5-0533136f52c3',
    ])
  })
})
