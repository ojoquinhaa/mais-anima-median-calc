import React from "react";
import logo from "./images/maisanima.png";

function App(): React.ReactElement {
  const btn = React.useRef<HTMLInputElement>(null);
  const aval = React.useRef<HTMLInputElement>(null);
  const comp = React.useRef<HTMLInputElement>(null);
  const test = React.useRef<HTMLInputElement>(null);
  const sim = React.useRef<HTMLInputElement>(null);
  const atv = React.useRef<HTMLInputElement>(null);
  const result = React.useRef<HTMLDivElement>(null);

  const disableButton: Function = (bool: boolean): void => {
    if (btn.current !== null) {
      btn.current.disabled = bool;
    }
  };

  const getMsg: Function = (median: number): Array<string | boolean> => {
    if (median < 6) {
      return [`Ainda falta ${6 - median} ponto(s). Você consegue!!`, false];
    }
    if (median === 10) {
      return [
        "Caramba! Não é todo dia que se vê notas assim. Meus Parabéns!",
        true,
      ];
    }
    if (median >= 6) {
      return [`Ihuul! Você já passou por ${(6 - median) * -1} ponto(s).`, true];
    }

    return ["Como isso aconteceu?", false];
  };

  const getMedian = () => {
    let p: number = parseFloat(aval.current!.value);
    let c: number = parseFloat(comp.current!.value);
    let t: number = parseFloat(test.current!.value);
    let s: number = parseFloat(sim.current!.value);
    let a: number = parseFloat(atv.current!.value);

    if (isNaN(p)) p = 0;
    if (isNaN(c)) c = 0;
    if (isNaN(t)) t = 0;
    if (isNaN(s)) s = 0;
    if (isNaN(a)) a = 0;

    const sum: number = p + c + t + s + a;
    const median: number = sum / 2;

    const msg: Array<string | boolean> = getMsg(median);
    const res: string = `
      m = (p + c + t + s + a) / 2
      m = (${p} + ${c} + ${t} + ${s} + ${a}) / 2
      m = ${sum} / 2
      m = ${median} pontos

      ${msg[0]}
    `;

    result.current!.innerText = res;
    result.current!.className =
      "border-danger bg-danger p-2 container col-md-8 col-12 text-center text-white";
    if (msg[1])
      result.current!.className =
        "border-success bg-success p-2 container col-md-8 col-12 text-center text-white";

    window.location.href = "#result";
  };

  return (
    <div className="App h-100 container-fluid">
      <div className="row h-100">
        <div className="col-md-6 col-12 h-100 container d-md-flex mt-md-0 mt-3 align-items-center">
          <div className="col-12">
            <div className="text-center col-md-5 col-12 container mb-3">
              <a href="https://colegiomaisanima.com.br/">
                <img src={logo} alt="logo" className="col-12" />
              </a>
            </div>
            <div className="shadow-lg col-12 p-2 overflow-auto">
              <h3 className="text-primary text-center">CALCULADORA DE NOTAS</h3>
              <div className="bg-info border border-info col-md-8 col-12 overflow-auto container text-center h-auto p-2">
                <p className="text-white" style={{ fontSize: "1.14em" }}>
                  Média = (Prova+Teste+Competência+Simulado+Atividades) / 2
                </p>
              </div>
              <hr />
              <form className="col-md-8 col-12 container mb-3">
                <div className="col-12 mb-3">
                  <label className="h5">Prova (P) - Máximo 10,00 pontos</label>
                  <div className="input-group">
                    <input
                      type="Number"
                      placeholder="0"
                      className="form-control form-control-lg"
                      ref={aval}
                      onBlur={(e) => {
                        if (
                          parseFloat(e.target.value) < 0 ||
                          parseFloat(e.target.value) > 10
                        ) {
                          e.target.classList.add("is-invalid");
                          disableButton(true);
                          return;
                        }
                        e.target.classList.remove("is-invalid");
                        disableButton(false);
                      }}
                    />
                    <span className="invalid-feedback">
                      O valor da prova deve ser entre 0 e 10
                    </span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label className="h5">Teste (T) - Máximo 4,00 pontos</label>
                  <div className="input-group">
                    <input
                      type="Number"
                      placeholder="0"
                      className="form-control form-control-lg"
                      id="test"
                      ref={test}
                      onBlur={(e) => {
                        if (
                          parseFloat(e.target.value) < 0 ||
                          parseFloat(e.target.value) > 4
                        ) {
                          e.target.classList.add("is-invalid");
                          disableButton(true);
                          return;
                        }
                        e.target.classList.remove("is-invalid");
                        disableButton(false);
                      }}
                    />
                    <span className="invalid-feedback">
                      O valor do teste deve ser entre 0 e 4
                    </span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label className="h5">
                    Teste de Competência (C) - Máximo 4,00 pontos
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control form-control-lg"
                      id="comp"
                      ref={comp}
                      onBlur={(e) => {
                        if (
                          parseFloat(e.target.value) < 0 ||
                          parseFloat(e.target.value) > 4
                        ) {
                          e.target.classList.add("is-invalid");
                          disableButton(true);
                          return;
                        }
                        e.target.classList.remove("is-invalid");
                        disableButton(false);
                      }}
                    />
                    <span className="invalid-feedback">
                      O valor do teste de competência deve ser entre 0 e 4
                    </span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label className="h5">
                    Simulado (S) - Máximo 1,00 pontos
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control form-control-lg"
                      id="sim"
                      ref={sim}
                      onBlur={(e) => {
                        if (
                          parseFloat(e.target.value) < 0 ||
                          parseFloat(e.target.value) > 1
                        ) {
                          e.target.classList.add("is-invalid");
                          disableButton(true);
                          return;
                        }
                        e.target.classList.remove("is-invalid");
                        disableButton(false);
                      }}
                    />
                    <span className="invalid-feedback">
                      O valor do simulado deve ser entre 0 e 1
                    </span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label className="h5">
                    Atividades (A) - Máximo 1,00 pontos
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control form-control-lg"
                      id="atv"
                      ref={atv}
                      onBlur={(e) => {
                        if (
                          parseFloat(e.target.value) < 0 ||
                          parseFloat(e.target.value) > 1
                        ) {
                          e.target.classList.add("is-invalid");
                          disableButton(true);
                          return;
                        }
                        e.target.classList.remove("is-invalid");
                        disableButton(false);
                      }}
                    />
                    <span className="invalid-feedback">
                      O valor das Atividades deve ser entre 0 e 1
                    </span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <input
                    type="button"
                    id="button"
                    value="Calcular"
                    ref={btn}
                    onClick={getMedian}
                    className="btn btn-block btn-lg btn-primary col-12"
                  />
                </div>
              </form>
              <div className="d-none" ref={result} id="result"></div>
            </div>
            <div className="col-12 text-center bg-info p-2 text-white mb-3">
              <strong>PROJETO NÃO OFICIAL.</strong> Projeto criado por
              OJoquinhaa!{" "}
              <a
                className="text-primary"
                href="https://github.com/ojoquinhaa/mais-anima-median-calc"
              >
                Veja no Github!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
