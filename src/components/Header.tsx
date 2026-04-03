interface HeaderProps {
  title?: string
}

export function Header({ title = 'Form Prefill Editor' }: HeaderProps) {
  return (
    <header className="panel" style={{ marginBottom: 24 }}>
      <div className="panel__header">
        <div>
          <h1 className="panel__title">{title}</h1>
          <p style={{ marginTop: 6, color: 'var(--color-muted)' }}>
            Select a form, then map its fields from upstream or global data.
          </p>
        </div>
      </div>
    </header>
  )
}
