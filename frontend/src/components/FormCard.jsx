import './FormCard.css';

/** Cream card with a heading that holds a form (used by Register and Login). Sits on the cloud wall. */
function FormCard({title, onSubmit, children}){
  return (
    <main className="form-page">
      {/* noValidate: we show our own friendly messages instead of the browser's pop-ups */}
      <form className="form-card" onSubmit={onSubmit} noValidate>
        {/* The card's title is the page's main heading (the navbar already shows "The Descent") */}
        <h1>{title}</h1>
        {children}
      </form>
    </main>
  );
}

export default FormCard;
