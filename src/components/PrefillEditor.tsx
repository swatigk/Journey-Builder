import type { FormNodeView, PrefillMapping, PrefillTargetField } from '../types'

interface PrefillEditorProps {
  form: FormNodeView
  fields: PrefillTargetField[]
  mappings: Record<string, PrefillMapping>
  enabled: boolean
  onToggleEnabled: (enabled: boolean) => void
  onSelectField: (field: PrefillTargetField) => void
  onClearMapping: (fieldPath: string) => void
}

export function PrefillEditor({
  enabled,
  fields,
  form,
  mappings,
  onClearMapping,
  onSelectField,
  onToggleEnabled,
}: PrefillEditorProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Prefill</p>
          <h2 className="panel__title">{form.name}</h2>
          <p style={{ color: 'var(--color-muted)', marginTop: 8 }}>
            View and edit field mappings for this form.
          </p>
        </div>

        <label className="toggle">
          <span>{enabled ? 'Enabled' : 'Disabled'}</span>
          <input
            checked={enabled}
            onChange={(event) => onToggleEnabled(event.target.checked)}
            type="checkbox"
          />
        </label>
      </div>

      <div className="panel__body">
        <div className="field-list">
          {fields.map((field) => {
            const mapping = mappings[field.fieldPath]

            return (
              <div
                key={field.fieldPath}
                className="field-row"
                data-mapped={Boolean(mapping)}
              >
                <button
                  className="field-row__button"
                  onClick={() => onSelectField(field)}
                  type="button"
                >
                  <span className="icon-badge field-row__icon">DB</span>
                  <span className="field-row__copy">
                    <strong>{field.label}</strong>
                    <span>
                      {mapping ? mapping.path : 'No prefill mapping selected'}
                    </span>
                  </span>
                </button>

                {mapping ? (
                  <button
                    aria-label={`Clear mapping for ${field.label}`}
                    className="button button--danger field-row__clear"
                    onClick={() => onClearMapping(field.fieldPath)}
                    type="button"
                  >
                    X
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
