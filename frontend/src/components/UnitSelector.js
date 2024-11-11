// src/components/UnitSelector.js
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function UnitSelector({ selectedUnit, handleUnitChange }) {
  const units = ["Todas", "CEU Itapuã", "CEU Recanto", "CEU QNR 02", "CEU QMN 28", "CEU QNN 13", "Outro"];

  // Encontrar o texto correspondente para o valor selecionado
  const selectedUnitText = units.find(unit => unit === selectedUnit) || "Todas";

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
