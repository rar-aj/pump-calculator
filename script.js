document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Input fields
    const flowRateInput = document.getElementById('flow-rate');
    const rpmInput = document.getElementById('rpm');
    const headInput = document.getElementById('head');
    const efficiencyInput = document.getElementById('efficiency');
    const stressInput = document.getElementById('stress');
    const torqueFactorInput = document.getElementById('torque-factor');
    
    // Result fields
    const hydPowerResult = document.getElementById('hyd-power');
    const shaftPowerResult = document.getElementById('shaft-power');
    const avgTorqueResult = document.getElementById('avg-torque');
    const maxTorqueResult = document.getElementById('max-torque');
    const shaftDiameterResult = document.getElementById('shaft-diameter');
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        // Get input values
        const Q = parseFloat(flowRateInput.value) / 60; // Convert m³/min to m³/s
        const N = parseFloat(rpmInput.value);
        const H = parseFloat(headInput.value);
        const η_pump = parseFloat(efficiencyInput.value) / 100; // Convert % to decimal
        const τ_max = parseFloat(stressInput.value) * 1e6; // Convert MPa to Pa
        const torqueFactor = parseFloat(torqueFactorInput.value) / 100; // Convert % to decimal
        
        // Constants
        const ρ = 1000; // kg/m³ (water density)
        const g = 9.81; // m/s² (gravity)
        
        // 1. Calculate Hydraulic Power
        const P_hyd = ρ * g * Q * H; // in Watts
        const P_hyd_kW = P_hyd / 1000; // in kW
        
        // 2. Calculate Shaft Power
        const P_shaft = P_hyd / η_pump; // in Watts
        const P_shaft_kW = P_shaft / 1000; // in kW
        
        // 3. Calculate Average Torque
        const ω = (2 * Math.PI * N) / 60; // angular velocity in rad/s
        const T_avg = P_shaft / ω; // in N·m
        
        // 4. Calculate Maximum Torque
        const T_max = T_avg * (1 + torqueFactor); // in N·m
        
        // 5. Calculate Shaft Diameter
        const d = Math.pow((16 * T_max) / (Math.PI * τ_max), 1/3); // in meters
        const d_mm = d * 1000; // in mm
        
        // Display results
        hydPowerResult.textContent = P_hyd_kW.toFixed(2);
        shaftPowerResult.textContent = P_shaft_kW.toFixed(2);
        avgTorqueResult.textContent = T_avg.toFixed(2);
        maxTorqueResult.textContent = T_max.toFixed(2);
        shaftDiameterResult.textContent = d_mm.toFixed(2);
    });
    
    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        // Reset input fields to default values
        flowRateInput.value = '20';
        rpmInput.value = '750';
        headInput.value = '8';
        efficiencyInput.value = '90';
        stressInput.value = '50';
        torqueFactorInput.value = '30';
        
        // Reset result fields
        hydPowerResult.textContent = '0';
        shaftPowerResult.textContent = '0';
        avgTorqueResult.textContent = '0';
        maxTorqueResult.textContent = '0';
        shaftDiameterResult.textContent = '0';
    });
    
    // Calculate on initial load
    calculateBtn.click();
});
