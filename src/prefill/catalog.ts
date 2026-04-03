import type {
  PrefillCatalogContext,
  PrefillCatalogGroup,
  PrefillSourceDefinition,
} from '../types'

function createFormGroups(
  context: PrefillCatalogContext,
  dependencyIds: string[],
  description: string,
): PrefillCatalogGroup[] {
  return dependencyIds
    .map((formId) => context.forms.find((form) => form.id === formId))
    .filter((form): form is NonNullable<typeof form> => Boolean(form))
    .map((form) => ({
      id: `${form.id}-group`,
      label: form.name,
      description,
      items: form.fields.map((field) => ({
        id: `${form.id}-${field.fieldPath}`,
        label: field.label,
        path: `${form.name}.${field.fieldPath}`,
        valueType: field.type,
        sourceKind: 'form',
        sourceLabel: form.name,
      })),
    }))
}

const directDependencySource: PrefillSourceDefinition = {
  id: 'direct-dependencies',
  getGroups: (context) =>
    createFormGroups(
      context,
      context.currentForm.directDependencies,
      'Fields on forms this form directly depends on.',
    ),
}

const transitiveDependencySource: PrefillSourceDefinition = {
  id: 'transitive-dependencies',
  getGroups: (context) => {
    const directIds = new Set(context.currentForm.directDependencies)
    const transitiveIds = context.currentForm.allDependencies.filter(
      (formId) => !directIds.has(formId),
    )

    return createFormGroups(
      context,
      transitiveIds,
      'Fields inherited through upstream dependencies.',
    )
  },
}

const globalDataSource: PrefillSourceDefinition = {
  id: 'global-data',
  getGroups: (context) => {
    const groups = new Map<string, PrefillCatalogGroup>()

    for (const item of context.globalData) {
      const groupId = `global-${item.sourceLabel}`
      const existing = groups.get(groupId)

      if (existing) {
        existing.items.push(item)
      } else {
        groups.set(groupId, {
          id: groupId,
          label: item.sourceLabel,
          description: 'Global values that are not tied to a form node.',
          items: [item],
        })
      }
    }

    return Array.from(groups.values())
  },
}

const registry: PrefillSourceDefinition[] = [
  directDependencySource,
  transitiveDependencySource,
  globalDataSource,
]

export function buildPrefillCatalog(
  context: PrefillCatalogContext,
): PrefillCatalogGroup[] {
  return registry.flatMap((source) => source.getGroups(context))
}
