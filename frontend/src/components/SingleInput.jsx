import './SingleInput.css';

/** One labelled input box. Pass a unique id; type defaults to 'text'. Shows `error` under the box if given. `max` limits number/date boxes. */
function SingleInput({id, label, type = 'text', placeholder, value, onChange, error, max}){
  const errorId = id + '-error';

  return (
    <div className="single-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        max={max}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId} className="input-error">{error}</p>}
    </div>
  );
}

export default SingleInput;
