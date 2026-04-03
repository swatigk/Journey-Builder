import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { fetchActionBlueprintGraph } from './api/actionBlueprintGraph'
import { FormCanvas } from './components/FormCanvas'
import { Header } from './components/Header'
import { PrefillEditor } from './components/PrefillEditor'
import { PrefillSourcePickerModal } from './components/PrefillSourcePickerModal'
import { DEFAULT_PREFILL_MAPPINGS, DEFAULT_PREFILL_STATE } from './data/prefillDefaults'
import { buildPrefillCatalog } from './prefill/catalog'
import type { FormNodeView, PrefillMappingState, PrefillTargetField } from './types'
import { buildFormViews, getFormFieldTargets } from './utils/graph'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
const ORG_ID = import.meta.env.VITE_ORG_ID ?? 'org1'
const BLUEPRINT_ID = import.meta.env.VITE_BLUEPRINT_ID ?? 'blueprint1'

function App() {
  const [forms, setForms] = useState<FormNodeView[]>([])
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [mappings, setMappings] = useState<PrefillMappingState>(DEFAULT_PREFILL_MAPPINGS)
  const [prefillEnabled, setPrefillEnabled] =
    useState<Record<string, boolean>>(DEFAULT_PREFILL_STATE)
  const [activeField, setActiveField] = useState<PrefillTargetField | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadGraph() {
      setStatus('loading')
      setErrorMessage(null)

      try {
        const graph = await fetchActionBlueprintGraph({
          baseUrl: API_BASE_URL,
          blueprintId: BLUEPRINT_ID,
          organizationId: ORG_ID,
        })

        if (cancelled) {
          return
        }

        const nextForms = buildFormViews(graph)
        setForms(nextForms)
        setSelectedFormId((current) => current ?? nextForms[0]?.id ?? null)
        setStatus('idle')
      } catch (error) {
        if (cancelled) {
          return
        }

        setStatus('error')
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load the blueprint graph.',
        )
      }
    }

    void loadGraph()

    return () => {
      cancelled = true
    }
  }, [])

  const selectedForm = useMemo(
    () => forms.find((form) => form.id === selectedFormId) ?? null,
    [forms, selectedFormId],
  )

  const catalog = useMemo(() => {
    if (!selectedForm) {
      return []
    }

    return buildPrefillCatalog({
      currentForm: selectedForm,
      forms,
      globalData: [
        {
          id: 'global-action-priority',
          label: 'Action priority',
          path: 'action.priority',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Action Properties',
        },
        {
          id: 'global-action-name',
          label: 'Action name',
          path: 'action.name',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Action Properties',
        },
        {
          id: 'global-action-category',
          label: 'Action category',
          path: 'action.category',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Action Properties',
        },
        {
          id: 'global-action-owner',
          label: 'Action owner',
          path: 'action.owner',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Action Properties',
        },
        {
          id: 'global-client-tier',
          label: 'Client tier',
          path: 'client.organization.tier',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Client Organization Properties',
        },
        {
          id: 'global-client-name',
          label: 'Client name',
          path: 'client.organization.name',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Client Organization Properties',
        },
        {
          id: 'global-client-region',
          label: 'Client region',
          path: 'client.organization.region',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Client Organization Properties',
        },
        {
          id: 'global-client-account-id',
          label: 'Client account ID',
          path: 'client.organization.accountId',
          valueType: 'string',
          sourceKind: 'global',
          sourceLabel: 'Client Organization Properties',
        },
      ],
    })
  }, [forms, selectedForm])

  const formFields = useMemo(
    () => (selectedForm ? getFormFieldTargets(selectedForm) : []),
    [selectedForm],
  )

  function handleMappingSelect(field: PrefillTargetField) {
    setActiveField(field)
  }

  function handleMappingClear(fieldPath: string) {
    if (!selectedForm) {
      return
    }

    setMappings((current) => {
      const formMappings = { ...(current[selectedForm.id] ?? {}) }
      delete formMappings[fieldPath]

      return {
        ...current,
        [selectedForm.id]: formMappings,
      }
    })
  }

  return (
    <div className="app-shell">
      <Header />

      {status === 'loading' ? (
        <section className="state-panel">
          <h2>Loading graph</h2>
          <p>Fetching forms from the mock server endpoint.</p>
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="state-panel state-panel--error">
          <h2>Graph request failed</h2>
          <p>{errorMessage}</p>
          <p>
            Start the mock server from the challenge repo and make sure it is
            available at <code>{API_BASE_URL}</code>.
          </p>
        </section>
      ) : null}

      {status === 'idle' && selectedForm ? (
        <main className="workspace">
          <FormCanvas
            forms={forms}
            selectedFormId={selectedForm.id}
            onSelectForm={setSelectedFormId}
          />

          <PrefillEditor
            fields={formFields}
            form={selectedForm}
            mappings={mappings[selectedForm.id] ?? {}}
            enabled={prefillEnabled[selectedForm.id] ?? true}
            onToggleEnabled={(enabled) =>
              setPrefillEnabled((current) => ({
                ...current,
                [selectedForm.id]: enabled,
              }))
            }
            onClearMapping={handleMappingClear}
            onSelectField={handleMappingSelect}
          />
        </main>
      ) : null}

      {selectedForm && activeField ? (
        <PrefillSourcePickerModal
          groups={catalog}
          field={activeField}
          selectedMapping={mappings[selectedForm.id]?.[activeField.fieldPath] ?? null}
          onClose={() => setActiveField(null)}
          onSelectCandidate={(candidate) => {
            setMappings((current) => ({
              ...current,
              [selectedForm.id]: {
                ...(current[selectedForm.id] ?? {}),
                [activeField.fieldPath]: candidate,
              },
            }))
            setActiveField(null)
          }}
        />
      ) : null}
    </div>
  )
}

export default App
