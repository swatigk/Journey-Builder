import type { PrefillMappingState } from '../types'

export const DEFAULT_PREFILL_MAPPINGS: PrefillMappingState = {
  'form-0f58384c-4966-4ce6-9ec2-40b96d61f745': {
    email: {
      id: 'seed-form-a-email',
      label: 'Email',
      path: 'Form A.email',
      valueType: 'string',
      sourceKind: 'transitive-form',
      sourceLabel: 'Form A',
    },
  },
}

export const DEFAULT_PREFILL_STATE: Record<string, boolean> = {
  'form-0f58384c-4966-4ce6-9ec2-40b96d61f745': true,
}
