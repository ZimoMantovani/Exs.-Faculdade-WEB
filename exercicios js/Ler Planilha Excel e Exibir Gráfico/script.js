document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const loadButton = document.getElementById('loadButton');
    const tableContainer = document.getElementById('tableContainer');
    const xAxisSelect = document.getElementById('xAxis');
    const yAxisSelect = document.getElementById('yAxis');
    const chartTypeSelect = document.getElementById('chartType');
    const updateChartButton = document.getElementById('updateChart');
    
    let workbook = null;
    let currentSheetData = [];
    let currentHeaders = [];
    let dataChart = null;
    
    // Carregar arquivo Excel
    loadButton.addEventListener('click', function() {
        if (!fileInput.files.length) {
            alert('Por favor, selecione um arquivo Excel.');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            workbook = XLSX.read(data, { type: 'array' });
            
            // Pegar a primeira planilha
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Converter para JSON
            currentSheetData = XLSX.utils.sheet_to_json(worksheet);
            
            if (currentSheetData.length === 0) {
                alert('A planilha está vazia ou não pôde ser lida.');
                return;
            }
            
            // Extrair cabeçalhos
            currentHeaders = Object.keys(currentSheetData[0]);
            
            // Exibir dados na tabela
            displayDataAsTable();
            
            // Preencher seletores de eixos
            populateAxisSelects();
            
            // Criar gráfico inicial
            createChart();
        };
        
        reader.readAsArrayBuffer(file);
    });
    
    // Exibir dados como tabela
    function displayDataAsTable() {
        let tableHTML = '<table><thead><tr>';
        
        // Cabeçalhos
        currentHeaders.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        // Dados
        currentSheetData.forEach(row => {
            tableHTML += '<tr>';
            currentHeaders.forEach(header => {
                tableHTML += `<td>${row[header] !== undefined ? row[header] : ''}</td>`;
            });
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
    }
    
    // Preencher seletores de eixos
    function populateAxisSelects() {
        xAxisSelect.innerHTML = '';
        yAxisSelect.innerHTML = '';
        
        currentHeaders.forEach(header => {
            xAxisSelect.innerHTML += `<option value="${header}">${header}</option>`;
            yAxisSelect.innerHTML += `<option value="${header}">${header}</option>`;
        });
        
        // Configurar seleções padrão (primeiro cabeçalho para X, segundo para Y)
        if (currentHeaders.length >= 1) {
            xAxisSelect.value = currentHeaders[0];
        }
        if (currentHeaders.length >= 2) {
            yAxisSelect.value = currentHeaders[1];
        }
    }
    
    // Criar/atualizar gráfico
    function createChart() {
        const ctx = document.getElementById('dataChart').getContext('2d');
        const xAxis = xAxisSelect.value;
        const yAxis = yAxisSelect.value;
        const chartType = chartTypeSelect.value;
        
        // Extrair dados para os eixos selecionados
        const labels = currentSheetData.map(row => row[xAxis]);
        const data = currentSheetData.map(row => {
            // Tentar converter para número, se possível
            const value = row[yAxis];
            return isNaN(value) ? value : Number(value);
        });
        
        // Destruir gráfico anterior se existir
        if (dataChart) {
            dataChart.destroy();
        }
        
        // Criar novo gráfico
        dataChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: yAxis,
                    data: data,
                    backgroundColor: getBackgroundColors(chartType, labels.length),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `${yAxis} por ${xAxis}`
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: chartType === 'bar' || chartType === 'line' ? {
                    y: {
                        beginAtZero: true
                    }
                } : {}
            }
        });
    }
    
    // Gerar cores para o gráfico
    function getBackgroundColors(chartType, count) {
        if (chartType === 'pie' || chartType === 'doughnut') {
            const colors = [];
            for (let i = 0; i < count; i++) {
                const hue = (i * 360 / count) % 360;
                colors.push(`hsl(${hue}, 70%, 50%)`);
            }
            return colors;
        } else {
            return 'rgba(54, 162, 235, 0.5)';
        }
    }
    
    // Atualizar gráfico quando os controles mudarem
    updateChartButton.addEventListener('click', createChart);
});
