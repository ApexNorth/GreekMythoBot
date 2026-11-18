/** One labelled input box. Pass a unique id; type defaults to 'text'. */
function SingleInput({id, label, type = 'text', placeholder, value, onChange}){
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
      />
    </div>
  );
}

export default SingleInput;
