import type {
  ActionBlueprintGraphResponse,
  FormFieldView,
  FormNodeView,
  PrefillTargetField,
} from '../types'

function getAllDependencies(
  formId: string,
  dependenciesByNodeId: Map<string, string[]>,
  visiting = new Set<string>(),
): string[] {
  if (visiting.has(formId)) {
    return []
  }

  visiting.add(formId)
  const direct = dependenciesByNodeId.get(formId) ?? []
  const all = new Set(direct)

  for (const dependencyId of direct) {
    for (const ancestorId of getAllDependencies(
      dependencyId,
      dependenciesByNodeId,
      new Set(visiting),
    )) {
      all.add(ancestorId)
    }
  }

  return [...all]
}

function mapFields(
  properties: ActionBlueprintGraphResponse['forms'][number]['field_schema']['properties'],
  required: string[] = [],
): FormFieldView[] {
  const requiredFields = new Set(required)

  return Object.entries(properties).map(([fieldPath, definition]) => ({
    fieldPath,
    label: definition.title ?? fieldPath,
    type: definition.type,
    required: requiredFields.has(fieldPath),
  }))
}

export function buildFormViews(
  graph: ActionBlueprintGraphResponse,
): FormNodeView[] {
  const definitionsById = new Map(graph.forms.map((form) => [form.id, form]))
  const dependenciesByNodeId = new Map(
    graph.nodes
      .filter((node) => node.type === 'form')
      .map((node) => [node.id, node.data.prerequisites]),
  )

  return graph.nodes
    .filter((node) => node.type === 'form')
    .map((node) => {
      const definition = definitionsById.get(node.data.component_id)

      if (!definition) {
        throw new Error(`Missing form definition for component ${node.data.component_id}.`)
      }

      return {
        id: node.id,
        componentId: node.data.component_id,
        name: node.data.name,
        directDependencies: node.data.prerequisites,
        allDependencies: getAllDependencies(node.id, dependenciesByNodeId),
        fields: mapFields(
          definition.field_schema.properties,
          definition.field_schema.required,
        ),
      }
    })
}

export function getFormFieldTargets(form: FormNodeView): PrefillTargetField[] {
  return form.fields.map((field) => ({
    fieldPath: field.fieldPath,
    label: field.label,
    type: field.type,
  }))
}
