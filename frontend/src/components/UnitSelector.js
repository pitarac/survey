// src/components/UnitSelector.js
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function UnitSelector({ selectedUnit, handleUnitChange }) {
  const units = ["CEU Itapoã", "CEU Recanto", "CEU QNR 02", "CEU QMN 28", "CEU QNN 13",];

  // Encontrar o texto correspondente para o valor selecionado
  const selectedUnitText = units.find(unit => unit === selectedUnit) || "CEU QNR 02";

  return (
    <div>
      <label htmlFor="unit-select" style={{ marginRight: '10px' }}>Selecione a Unidade:</label>
      <DropdownButton id="dropdown-basic-button" title={selectedUnitText} variant="secondary">
        {units.map((unit) => (
          <Dropdown.Item
            key={unit}
            as="button"
            active={unit === selectedUnit}
            onClick={() => handleUnitChange({ target: { value: unit } })}
          >
            {unit}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default UnitSelector;
