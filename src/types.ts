export interface ActionBlueprintGraphResponse {
  id: string
  name: string
  description: string
  nodes: ActionBlueprintGraphNode[]
  edges: ActionBlueprintGraphEdge[]
  forms: FormDefinition[]
}

export interface ActionBlueprintGraphNode {
  id: string
  type: string
  data: {
    component_id: string
    component_key: string
    name: string
    prerequisites: string[]
    input_mapping: Record<string, unknown>
  }
}

export interface ActionBlueprintGraphEdge {
  source: string
  target: string
}

export interface FormDefinition {
  id: string
  name: string
  description: string
  field_schema: FormFieldSchema
}

export interface FormFieldSchema {
  type: string
  required?: string[]
  properties: Record<string, FormFieldDefinition>
}

export interface FormFieldDefinition {
  avantos_type?: string
  title?: string
  type: string
  format?: string
}

export interface FormFieldView {
  fieldPath: string
  label: string
  type: string
  required: boolean
}

export interface FormNodeView {
  id: string
  componentId: string
  name: string
  directDependencies: string[]
  allDependencies: string[]
  fields: FormFieldView[]
}

export interface PrefillTargetField {
  fieldPath: string
  label: string
  type: string
}

export interface PrefillCandidate {
  id: string
  label: string
  path: string
  valueType: string
  sourceKind: string
  sourceLabel: string
}

export interface PrefillCatalogGroup {
  id: string
  label: string
  description: string
  items: PrefillCandidate[]
}

export type PrefillMapping = PrefillCandidate

export type PrefillMappingState = Record<string, Record<string, PrefillMapping>>

export interface PrefillCatalogContext {
  currentForm: FormNodeView
  forms: FormNodeView[]
  globalData: PrefillCandidate[]
}

export interface PrefillSourceDefinition {
  id: string
  getGroups: (context: PrefillCatalogContext) => PrefillCatalogGroup[]
}
