// admin.jsx — Owner-side editor for menu items + compose-ton-kebab options.
// Renders a slide-in panel with CRUD on:
//   - menu categories (kebabs, burgers, tacos, sides)
//   - per-item: name, desc, price, tag
//   - compose steps (label, options, multi-select count)
// State is held in the parent (App) and persisted via setTweak('menu', ...) / setTweak('compose', ...).

const ADMIN_CSS = `
  .ad-overlay { position: fixed; inset: 0; z-index: 2147483645; display: flex; justify-content: flex-end;
    background: rgba(10,10,15,0.55); backdrop-filter: blur(4px); animation: ad-fade .15s ease-out; }
  @keyframes ad-fade { from { opacity: 0; } to { opacity: 1; } }
  .ad-panel { width: 560px; max-width: 100vw; background: #fafaf7; color: #1a1a1a;
    display: flex; flex-direction: column; box-shadow: -20px 0 80px rgba(0,0,0,.4);
    font: 13px/1.5 ui-sans-serif, system-ui, -apple-system, sans-serif; animation: ad-slide .2s ease-out; }
  @keyframes ad-slide { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .ad-hd { padding: 18px 22px; border-bottom: 1px solid rgba(0,0,0,.08); display: flex; justify-content: space-between; align-items: center; }
  .ad-hd h2 { margin: 0; font-size: 18px; font-weight: 700; }
  .ad-hd p { margin: 2px 0 0; font-size: 12px; color: rgba(0,0,0,.55); }
  .ad-tabs { display: flex; gap: 4px; padding: 12px 22px 0; border-bottom: 1px solid rgba(0,0,0,.08); }
  .ad-tab { padding: 10px 14px; border: 0; background: transparent; cursor: pointer; font: inherit;
    border-bottom: 2px solid transparent; color: rgba(0,0,0,.55); margin-bottom: -1px; }
  .ad-tab[data-active="true"] { color: #1a1a1a; border-bottom-color: #E63946; font-weight: 600; }
  .ad-body { flex: 1; overflow-y: auto; padding: 22px; }
  .ad-x { width: 32px; height: 32px; border-radius: 8px; border: 0; background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center; color: rgba(0,0,0,.55); }
  .ad-x:hover { background: rgba(0,0,0,.06); color: #1a1a1a; }
  .ad-cats { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
  .ad-cat { padding: 7px 12px; border: 1px solid rgba(0,0,0,.12); border-radius: 999px; background: #fff;
    cursor: pointer; font: inherit; font-size: 12px; }
  .ad-cat[data-active="true"] { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  .ad-item { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 12px; padding: 14px;
    margin-bottom: 10px; display: grid; grid-template-columns: 1fr 90px 110px 32px; gap: 8px; align-items: center; }
  .ad-item input, .ad-item textarea, .ad-input { width: 100%; padding: 8px 10px; border: 1px solid rgba(0,0,0,.1);
    border-radius: 7px; font: inherit; background: #fff; outline: none; }
  .ad-item input:focus, .ad-item textarea:focus, .ad-input:focus { border-color: #E63946; }
  .ad-item-grid { grid-column: 1 / -1; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; }
  .ad-fld { display: flex; flex-direction: column; gap: 4px; }
  .ad-fld label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: rgba(0,0,0,.5); }
  .ad-del { width: 32px; height: 32px; border-radius: 7px; border: 0; cursor: pointer; background: transparent;
    color: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; }
  .ad-del:hover { background: #fee; color: #c00; }
  .ad-add { width: 100%; padding: 12px; border: 1.5px dashed rgba(0,0,0,.2); background: transparent;
    border-radius: 10px; cursor: pointer; font: inherit; color: rgba(0,0,0,.55); margin-top: 6px; }
  .ad-add:hover { border-color: #E63946; color: #E63946; background: #fff; }
  .ad-step { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  .ad-step-hd { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 12px; }
  .ad-step-hd .ad-fld { flex: 1; }
  .ad-step-opts { display: flex; flex-wrap: wrap; gap: 6px; }
  .ad-opt { display: inline-flex; align-items: center; gap: 4px; padding: 6px 8px 6px 12px; background: #f0eee9;
    border-radius: 999px; font-size: 12px; }
  .ad-opt button { width: 18px; height: 18px; border: 0; background: rgba(0,0,0,.08); border-radius: 999px;
    cursor: pointer; font-size: 12px; line-height: 1; padding: 0; color: rgba(0,0,0,.5); }
  .ad-opt button:hover { background: #c00; color: #fff; }
  .ad-foot { padding: 14px 22px; border-top: 1px solid rgba(0,0,0,.08); display: flex; justify-content: space-between;
    align-items: center; gap: 10px; background: #fff; }
  .ad-btn { padding: 9px 16px; border-radius: 8px; border: 0; cursor: pointer; font: inherit; font-weight: 600; font-size: 13px; }
  .ad-btn-primary { background: #1a1a1a; color: #fff; }
  .ad-btn-ghost { background: transparent; color: rgba(0,0,0,.65); }
  .ad-help { font-size: 11px; color: rgba(0,0,0,.5); }
`;

const CAT_LABELS = { kebabs: 'Kebabs', burgers: 'Burgers', tacos: 'Tacos', sides: 'Sides' };

function AdminEditor({ open, onClose, menu, compose, onMenuChange, onComposeChange }) {
  const [tab, setTab] = React.useState('menu');
  const [activeCat, setActiveCat] = React.useState('kebabs');

  if (!open) return null;

  const updateItem = (cat, idx, patch) => {
    const next = { ...menu, [cat]: menu[cat].map((it, i) => i === idx ? { ...it, ...patch } : it) };
    onMenuChange(next);
  };
  const deleteItem = (cat, idx) => {
    const next = { ...menu, [cat]: menu[cat].filter((_, i) => i !== idx) };
    onMenuChange(next);
  };
  const addItem = (cat) => {
    const id = cat[0] + Date.now().toString(36).slice(-4);
    const next = { ...menu, [cat]: [...menu[cat], { id, name: 'Nouveau plat', desc: 'Description…', price: 8, tag: '' }] };
    onMenuChange(next);
  };

  const updateStep = (idx, patch) => {
    const next = compose.map((s, i) => i === idx ? { ...s, ...patch } : s);
    onComposeChange(next);
  };
  const deleteStep = (idx) => onComposeChange(compose.filter((_, i) => i !== idx));
  const addStep = () => onComposeChange([...compose, { key: 'etape' + (compose.length + 1), label: 'Nouvelle étape', options: ['Option 1', 'Option 2'] }]);
  const addOpt = (idx, val) => {
    if (!val.trim()) return;
    updateStep(idx, { options: [...compose[idx].options, val.trim()] });
  };
  const removeOpt = (idx, optIdx) => updateStep(idx, { options: compose[idx].options.filter((_, i) => i !== optIdx) });

  return (
    <div className="ad-overlay" onClick={onClose}>
      <style>{ADMIN_CSS}</style>
      <div className="ad-panel" onClick={e => e.stopPropagation()}>
        <div className="ad-hd">
          <div>
            <h2>Espace gérant</h2>
            <p>Modifie le menu et le kebab à composer. Tout est sauvegardé automatiquement.</p>
          </div>
          <button className="ad-x" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <div className="ad-tabs">
          <button className="ad-tab" data-active={tab === 'menu'} onClick={() => setTab('menu')}>Menu</button>
          <button className="ad-tab" data-active={tab === 'compose'} onClick={() => setTab('compose')}>Composer le kebab</button>
        </div>

        <div className="ad-body">
          {tab === 'menu' && (
            <>
              <div className="ad-cats">
                {Object.keys(CAT_LABELS).map(c => (
                  <button key={c} className="ad-cat" data-active={activeCat === c} onClick={() => setActiveCat(c)}>
                    {CAT_LABELS[c]} <span style={{ opacity: 0.5 }}>· {(menu[c] || []).length}</span>
                  </button>
                ))}
              </div>
              {(menu[activeCat] || []).map((it, idx) => (
                <div key={it.id || idx} className="ad-item">
                  <div className="ad-item-grid">
                    <div className="ad-fld">
                      <label>Nom</label>
                      <input value={it.name} onChange={e => updateItem(activeCat, idx, { name: e.target.value })} />
                    </div>
                    <div className="ad-fld">
                      <label>Prix (€)</label>
                      <input type="number" step="0.5" value={it.price} onChange={e => updateItem(activeCat, idx, { price: parseFloat(e.target.value) || 0 })} />
                    </div>
                    <div className="ad-fld">
                      <label>Étiquette</label>
                      <input value={it.tag || ''} placeholder="ex. Épicé, Végé…" onChange={e => updateItem(activeCat, idx, { tag: e.target.value })} />
                    </div>
                  </div>
                  <div className="ad-fld" style={{ gridColumn: '1 / 4' }}>
                    <label>Description</label>
                    <textarea rows={2} value={it.desc} onChange={e => updateItem(activeCat, idx, { desc: e.target.value })} />
                  </div>
                  <button className="ad-del" onClick={() => deleteItem(activeCat, idx)} title="Supprimer">🗑</button>
                </div>
              ))}
              <button className="ad-add" onClick={() => addItem(activeCat)}>+ Ajouter un plat dans {CAT_LABELS[activeCat]}</button>
            </>
          )}

          {tab === 'compose' && (
            <>
              <p className="ad-help" style={{ marginTop: 0, marginBottom: 14 }}>
                Définis les étapes que le client suit pour composer son kebab : pain, viande, crudités, sauces, suppléments…
              </p>
              {compose.map((step, idx) => (
                <div key={idx} className="ad-step">
                  <div className="ad-step-hd">
                    <div className="ad-fld">
                      <label>Étape {idx + 1} · titre</label>
                      <input className="ad-input" value={step.label} onChange={e => updateStep(idx, { label: e.target.value })} />
                    </div>
                    <div className="ad-fld" style={{ width: 110 }}>
                      <label>Choix multiple</label>
                      <input className="ad-input" type="number" min="0" max="10" value={step.multi || 0}
                        onChange={e => updateStep(idx, { multi: parseInt(e.target.value) || 0 })}
                        title="0 = un seul choix, sinon nombre max" />
                    </div>
                    <button className="ad-del" onClick={() => deleteStep(idx)} title="Supprimer l'étape">🗑</button>
                  </div>
                  <div className="ad-fld">
                    <label>Options proposées</label>
                    <div className="ad-step-opts">
                      {step.options.map((opt, oi) => (
                        <span key={oi} className="ad-opt">
                          {opt}
                          <button onClick={() => removeOpt(idx, oi)} aria-label="Retirer">×</button>
                        </span>
                      ))}
                      <input className="ad-input" style={{ width: 160 }} placeholder="+ ajouter une option (Entrée)"
                        onKeyDown={e => {
                          if (e.key === 'Enter') { addOpt(idx, e.target.value); e.target.value = ''; e.preventDefault(); }
                        }} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="ad-add" onClick={addStep}>+ Ajouter une étape</button>
            </>
          )}
        </div>

        <div className="ad-foot">
          <span className="ad-help">💾 Modifications sauvegardées automatiquement</span>
          <button className="ad-btn ad-btn-primary" onClick={onClose}>Terminé</button>
        </div>
      </div>
    </div>
  );
}

window.AdminEditor = AdminEditor;

