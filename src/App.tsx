import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const initialModel = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  interface Param {
    id: number;
    name: string;
    type: 'string';
  }

  interface ParamValue {
    paramId: number;
    value: string;
  }

  interface Model {
    paramValues: ParamValue[];
  }

  interface Props {
    params: Param[];
    model: Model | undefined;
  }

  const ParamEditor: React.FC<Props> = ({ params, model }) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>([]);

    useEffect(() => {
      if (model) {
        setParamValues(model.paramValues);
      }
    }, [model]);

    const handleParamChange = (paramId: number, value: string) => {
      const updatedParamValues = paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      );

      setParamValues(updatedParamValues);
    };

    const getModel = (): Model => {
      return {
        paramValues: paramValues.slice(),
      };
    };

    return (
      <div className="param-editor"> 
        {params.map((param) => (
          <div className="param" key={param.id}> 
            <label className="label">{param.name}:</label> 
            <input 
              className="input" 
              type="text"
              value={
                paramValues.find((p) => p.paramId === param.id)?.value || ''
              }
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button className="button" onClick={() => console.log(getModel())}>
          Получить полную структуру
        </button>
      </div>
    );
  };

  return (
    <>
    <div className="container">
      <ParamEditor
        params={[
          { id: 1, name: 'Назначение', type: 'string' },
          { id: 2, name: 'Длина', type: 'string' },
        ]}
        model={initialModel}
      />
      </div>
    </>
  );
}

export default App;
