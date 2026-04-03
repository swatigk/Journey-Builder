import type { ActionBlueprintGraphResponse } from '../types'

interface FetchGraphParams {
  baseUrl: string
  organizationId: string
  blueprintId: string
}

export async function fetchActionBlueprintGraph({
  baseUrl,
  blueprintId,
  organizationId,
}: FetchGraphParams): Promise<ActionBlueprintGraphResponse> {
  const response = await fetch(
    `${baseUrl}/api/v1/${organizationId}/actions/blueprints/${blueprintId}/graph`,
  )

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  return (await response.json()) as ActionBlueprintGraphResponse
}
