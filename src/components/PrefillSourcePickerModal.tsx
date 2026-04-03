import { useMemo, useState } from 'react'
import type {
  PrefillCandidate,
  PrefillCatalogGroup,
  PrefillMapping,
  PrefillTargetField,
} from '../types'

interface PrefillSourcePickerModalProps {
  field: PrefillTargetField
  groups: PrefillCatalogGroup[]
  selectedMapping: PrefillMapping | null
  onClose: () => void
  onSelectCandidate: (candidate: PrefillCandidate) => void
}

export function PrefillSourcePickerModal({
  field,
  groups,
  selectedMapping,
  onClose,
  onSelectCandidate,
}: PrefillSourcePickerModalProps) {
  const [query, setQuery] = useState('')
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    selectedMapping?.id ?? null,
  )

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!normalizedQuery) {
            return true
          }

          return (
            item.label.toLowerCase().includes(normalizedQuery) ||
            item.path.toLowerCase().includes(normalizedQuery) ||
            item.sourceLabel.toLowerCase().includes(normalizedQuery)
          )
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [groups, query])

  const selectedCandidate =
    filteredGroups
      .flatMap((group) => group.items)
      .find((item) => item.id === selectedCandidateId) ?? null

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        aria-labelledby="prefill-modal-title"
        aria-modal="true"
        className="modal"
        role="dialog"
      >
        <div className="modal__header">
          <p className="panel__eyebrow">Select data element to map</p>
          <h2 id="prefill-modal-title" style={{ margin: 0 }}>
            {field.label}
          </h2>
          <p style={{ marginTop: 8, color: 'var(--color-muted)' }}>
            Choose a field from a registered data source.
          </p>
        </div>

        <div className="modal__content">
          <div className="picker-sidebar">
            <label className="picker-search">
              <span className="sr-only">Search available data</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                type="search"
                value={query}
              />
            </label>

            <div className="picker-groups">
              {filteredGroups.map((group) => (
                <details className="picker-group" key={group.id} open>
                  <summary>
                    <span>{group.label}</span>
                    <small>{group.items.length}</small>
                  </summary>
                  <div className="picker-items">
                    {group.items.map((item) => (
                      <button
                        aria-label={`Map ${item.path}`}
                        key={item.id}
                        className="picker-item"
                        data-selected={item.id === selectedCandidateId}
                        onClick={() => setSelectedCandidateId(item.id)}
                        type="button"
                      >
                        <strong>{item.label}</strong>
                        <span>{item.path}</span>
                      </button>
                    ))}
                  </div>
                </details>
              ))}

              {filteredGroups.length === 0 ? (
                <div className="empty-state">
                  No matching data sources were found for this search.
                </div>
              ) : null}
            </div>
          </div>

          <div className="picker-detail">
            {selectedCandidate ? (
              <>
                <div className="picker-detail__header">
                  <div className="icon-badge">MAP</div>
                  <div>
                    <h3 style={{ margin: 0 }}>{selectedCandidate.label}</h3>
                    <p style={{ margin: '6px 0 0', color: 'var(--color-muted)' }}>
                      {selectedCandidate.path}
                    </p>
                  </div>
                </div>

                <dl className="picker-meta">
                  <div>
                    <dt>Source</dt>
                    <dd>{selectedCandidate.sourceLabel}</dd>
                  </div>
                  <div>
                    <dt>Value type</dt>
                    <dd>{selectedCandidate.valueType}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="empty-state">
                Select a candidate to preview its source and confirm the mapping.
              </div>
            )}
          </div>
        </div>

        <div className="modal__footer">
          <button className="button button--ghost" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="button button--primary"
            disabled={!selectedCandidate}
            onClick={() => selectedCandidate && onSelectCandidate(selectedCandidate)}
            type="button"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  )
}
