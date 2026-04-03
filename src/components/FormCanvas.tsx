import type { FormNodeView } from '../types'

interface FormCanvasProps {
  forms: FormNodeView[]
  selectedFormId: string
  onSelectForm: (formId: string) => void
}

export function FormCanvas({
  forms,
  selectedFormId,
  onSelectForm,
}: FormCanvasProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Forms</h2>
        </div>
        <span className="chip">{forms.length} forms</span>
      </div>

      <div className="panel__body">
        <div className="form-list">
          {forms.map((form) => {
            const selected = form.id === selectedFormId

            return (
              <button
                key={form.id}
                className="form-card"
                data-selected={selected}
                onClick={() => onSelectForm(form.id)}
                type="button"
              >
                <div className="icon-badge">F</div>
                <div className="form-card__content">
                  <strong>{form.name}</strong>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
