import { importdt } from "../data/data";

const Import = () => {
  const handleFileSelected = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        console.log(evt.target.result);
        importdt(evt.target.result);
        console.log("imprted");
      };
      reader.onerror = function (evt) {
        alert("Something went wrong");
      };
    }
  };
  return (
    <div>
      <h2 className="text-center">Import</h2> <br />
      <form className="form">
        <div id="fileContents"></div>
        <div className="form-group">
          <input
            type="file"
            name="title"
            placeholder="Add title"
            accept="application/json"
            onChange={handleFileSelected}
          />
          <p className="errorText" id="error"></p>
        </div>
        <div className="form-group">
          <input className="btn-primary" type="submit" value="Import" />
        </div>
      </form>
    </div>
  );
};

export default Import;
