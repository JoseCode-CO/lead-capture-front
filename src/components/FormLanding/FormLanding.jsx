import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./FormLanding.module.scss";
//import * as Api from "../../api/Api";
//import GetIP from "../../hooks/GetIP/GetIP";

function FormLanding({ callbackApi = () => {} }) {
  const dt = new Date(),
    options = { timeZone: "America/Bogota" },
    date = dt.toISOString("es-CO", options).slice(0, 10),
    hour = dt.toLocaleString("es-CO", options).split(",")[1].trimStart();
   

  const [inputValOne, setInputValOne] = useState("");
  const [inputValTwo, setInputValTwo] = useState("");
  const [inputValThree, setInputValThree] = useState({
    pointName: "",
    teamName: "",
    capitanUser: "",
  });
  const [inputEmpty, setInputEmpty] = useState({
    clientName: !1,
    nit: !1,
    pointName: !1,
    teamName: !1,
    rtc: !1,
    capitanUser: !1,
    city: !1,
    terms: !1,
  });

  const handleChange = (e) => {};

  const handleInputChange = (e) => {
    var el = e.target.name;
    if (el === "clientName") {
      setInputValOne(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/gi, ""));
    } else if (el === "rtc") {
      setInputValTwo(e.target.value.replace(/[^0-9]/gi, ""));
    } else if (["pointName", "teamName", "capitanUser"].indexOf(el) !== -1) {
      var val = e.target.value.replace(/[#¿?,]+/gi, "");
      if (el === "capitanUser") {
        val = val.toLowerCase();
      }
      setInputValThree((prevInputValThree) => ({
        ...prevInputValThree,
        [el]: val,
      }));
    }
  };

  const handleSubmit = (e) => {
    var form = e.target,
      els = form.querySelectorAll("input, select"),
      pass = !0,
      data = {};
    els.forEach((el) => {
      data = { ...data, [el.id]: el.value };
      if (el.value === "" || el.value === "default") {
        setInputEmpty((prevInputEmpty) => ({
          ...prevInputEmpty,
          [el.name]: !0,
        }));
        pass = !1;
        data = {};
        return !1;
      } else {
        setInputEmpty((prevInputEmpty) => ({
          ...prevInputEmpty,
          [el.name]: !1,
        }));
      }
    });
    if (pass) {
      Api.post("lead", data, callbackApi(pass));
    }
    e.preventDefault();
  };

  return (
    <form className={`${s.flex} ${s.formLanding}`} onSubmit={handleSubmit}>
      {/* Requerido - Es un campo alfabetico incluidos: los acentos y la letra Ñ - No debe permitir el ingreso de numero o caracteres especiales */}
      <div className={s.inputContent}>
        <input
          className={inputEmpty.clientName ? s.isEmpty : ""}
          id="clientName"
          data-testid="clientName"
          name="clientName"
          type="text"
          placeholder="Nombre del cliente"
          onChange={handleInputChange}
          value={inputValOne}
          required
        />
        {inputEmpty.clientName && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* Requerido  */}
      <div className={s.inputContent}>
        <input
          id="nit"
          data-testid="nit"
          className={inputEmpty.nit ? s.isEmpty : ""}
          name="nit"
          type="text"
          placeholder="NIT"
          onChange={handleInputChange}
          required
        />
        {inputEmpty.nit && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* No debe permitir el ingreso de: numeral (#), interrogantes (¿?) y coma (,) */}
      <div className={s.inputContent}>
        <input
          id="pointName"
          data-testid="general"
          className={inputEmpty.pointName ? s.isEmpty : ""}
          name="pointName"
          type="text"
          placeholder="Nombre del punto"
          onChange={handleInputChange}
          value={inputValThree.pointName}
        />
        {inputEmpty.pointName && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* No debe permitir el ingreso de: numeral (#), interrogantes (¿?) y coma (,) */}
      <div className={s.inputContent}>
        <input
          id="teamName"
          data-testid="general"
          className={inputEmpty.teamName ? s.isEmpty : ""}
          name="teamName"
          type="text"
          placeholder="Nombre del equipo"
          onChange={handleInputChange}
          value={inputValThree.teamName}
        />
        {inputEmpty.teamName && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* Es un campo de texto que solo debe recibir digitos (0-9)  */}
      <div className={s.inputContent}>
        <input
          id="rtc"
          data-testid="rtc"
          className={inputEmpty.rtc ? s.isEmpty : ""}
          name="rtc"
          type="text"
          placeholder="RTC"
          onChange={handleInputChange}
          value={inputValTwo}
        />
        {inputEmpty.rtc && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* No debe permitir el ingreso de: numeral (#), interrogantes (¿?) y coma (,) */}
      <div className={s.inputContent}>
        <input
          id="capitanUser"
          data-testid="general"
          className={inputEmpty.capitanUser ? s.isEmpty : ""}
          name="capitanUser"
          type="text"
          placeholder="Capitan y/o Usuario (Solo minúsculas)"
          onChange={handleInputChange}
          value={inputValThree.capitanUser}
        />
        {inputEmpty.capitanUser && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      <div className={s.inputContent}>
        <select
          id="city"
          data-testid="city"
          className={inputEmpty.city ? s.isEmpty : ""}
          name="city"
          onChange={handleChange}
          defaultValue={"default"}
        >
          <option value="default" disabled>
            Ciudad
          </option>
          <option data-testid="city-option" value="cali">
            Cali
          </option>
          <option data-testid="city-option" value="medellin">
            Medellín
          </option>
          <option data-testid="city-option" value="bogota">
            Bogotá
          </option>
        </select>
        {inputEmpty.city && (
          <div className={s.inputEmpty}>* Este campo esta vacio</div>
        )}
      </div>

      {/* Requerido  */}
      <label className={`${s.flex} ${s.termsLanding}`}>
        <input
          id="terms"
          data-testid="terms"
          name="terms"
          type="checkbox"
          onChange={handleInputChange}
          required
        />
        <span>
          He leido y acepto las politicas de Tratamiento de Datos Personales.
          Conoce los <Link to="/terms">terminos y condiciones</Link>.
        </span>
      </label>

      
      <input
        id="hour"
        data-testid="hour"
        type="hidden"
        name="hour"
        value={hour}
      />
      <input
        id="date"
        data-testid="date"
        type="hidden"
        name="date"
        value={date}
      />
      <button className={s.btnLanding} type="submit">
        Siguiente
      </button>
    </form>
  );
}

export default FormLanding;
