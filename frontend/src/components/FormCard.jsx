import './FormCard.css';

/** Cream card with a heading that holds a form (used by Register and Login). Sits on the cloud wall. */
function FormCard({title, onSubmit, children}){
  return (
    <main className="form-page">
      <h1>The Descent</h1>

      {/* noValidate: we show our own friendly messages instead of the browser's pop-ups */}
      <form className="form-card" onSubmit={onSubmit} noValidate>
        <h2>{title}</h2>
        {children}
      </form>
    </main>
  );
}

export default FormCard;
