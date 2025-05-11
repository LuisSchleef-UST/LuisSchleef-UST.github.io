// Definición de factores de conversión para diferentes categorías de unidades
const unitConversions = {
    length: {
        metros: 1,
        kilómetros: 0.001,
        centímetros: 100,
        milímetros: 1000,
        pulgadas: 39.3701,
        pies: 3.28084,
        yardas: 1.09361,
        millas: 0.000621371
    },
    weight: {
        kilogramos: 1,
        gramos: 1000,
        miligramos: 1000000,
        toneladas: 0.001,
        libras: 2.20462,
        onzas: 35.274
    },
    volume: {
        litros: 1,
        mililitros: 1000,
        metros_cúbicos: 0.001,
        galones: 0.264172,
        pintas: 2.11338,
        tazas: 4.22675
    },
    area: {
        metros_cuadrados: 1,
        kilómetros_cuadrados: 0.000001,
        centímetros_cuadrados: 10000,
        hectáreas: 0.0001,
        acres: 0.000247105,
        pies_cuadrados: 10.7639
    },
    temperature: {
        celsius: 'celsius',
        fahrenheit: 'fahrenheit',
        kelvin: 'kelvin'
    }
};

// Nombres de unidades para mostrar en los selectores
const unitNames = {
    length: {
        metros: "Metros (m)",
        kilómetros: "Kilómetros (km)",
        centímetros: "Centímetros (cm)",
        milímetros: "Milímetros (mm)",
        pulgadas: "Pulgadas (in)",
        pies: "Pies (ft)",
        yardas: "Yardas (yd)",
        millas: "Millas (mi)"
    },
    weight: {
        kilogramos: "Kilogramos (kg)",
        gramos: "Gramos (g)",
        miligramos: "Miligramos (mg)",
        toneladas: "Toneladas (t)",
        libras: "Libras (lb)",
        onzas: "Onzas (oz)"
    },
    volume: {
        litros: "Litros (L)",
        mililitros: "Mililitros (mL)",
        metros_cúbicos: "Metros cúbicos (m³)",
        galones: "Galones (gal)",
        pintas: "Pintas (pt)",
        tazas: "Tazas (cup)"
    },
    area: {
        metros_cuadrados: "Metros cuadrados (m²)",
        kilómetros_cuadrados: "Kilómetros cuadrados (km²)",
        centímetros_cuadrados: "Centímetros cuadrados (cm²)",
        hectáreas: "Hectáreas (ha)",
        acres: "Acres (ac)",
        pies_cuadrados: "Pies cuadrados (ft²)"
    },
    temperature: {
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)"
    }
};

// Función para actualizar las opciones de unidades según la categoría seleccionada
function updateUnitOptions() {
    const category = document.getElementById('category').value;
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    
    // Limpiar opciones actuales
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // Agregar nuevas opciones según la categoría
    const units = unitNames[category];
    
    for (const unit in units) {
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = units[unit];
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = units[unit];
        toUnitSelect.appendChild(toOption);
    }
    
    // Seleccionar opciones diferentes por defecto si hay más de una opción
    if (toUnitSelect.options.length > 1) {
        toUnitSelect.selectedIndex = 1;
    }
}

// Función para convertir entre unidades
function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const category = document.getElementById('category').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('result');
    
    // Validar entrada
    if (isNaN(inputValue)) {
        resultElement.textContent = 'Por favor, ingrese un valor numérico';
        return;
    }
    
    let result;
    
    // Caso especial para temperatura
    if (category === 'temperature') {
        result = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
        // Para otras categorías, usar factores de conversión
        const fromFactor = unitConversions[category][fromUnit];
        const toFactor = unitConversions[category][toUnit];
        result = (inputValue / fromFactor) * toFactor;
    }
    
    // Mostrar resultado con formato
    resultElement.textContent = `${inputValue} ${unitNames[category][fromUnit].split(' ')[0]} = ${result.toFixed(6)} ${unitNames[category][toUnit].split(' ')[0]}`;
}

// Función para convertir temperaturas
function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    let celsius;
    
    // Convertir a Celsius primero
    switch (fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convertir de Celsius a la unidad de destino
    switch (toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Inicializar las opciones de unidades al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateUnitOptions();
});