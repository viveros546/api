  
    document.getElementById('sensorForm').addEventListener('submit', async function(event) {
      event.preventDefault();

      
      const sensor_id = document.getElementById('sensor_id').value.trim();
      const temperature = parseFloat(document.getElementById('temperature').value);
      const humidityInput = document.getElementById('humidity').value;
      const pressureInput = document.getElementById('pressure').value;
      const vibration = parseFloat(document.getElementById('vibration').value);
      const status = document.getElementById('status').value;
      

      
      const data = {
        sensor_id: sensor_id,
        temperature: temperature,
        humidity: humidityInput ? parseFloat(humidityInput) : null,
        pressure: pressureInput ? parseFloat(pressureInput) : null,
        vibration: vibration,
        status: status,
       
      };

      try {
        const response = await fetch('https://data-processor-v27b.onrender.com/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const mensaje = document.getElementById('respuesta');
        if (response.ok) {
          mensaje.textContent = 'Datos enviados correctamente.';
          mensaje.className = 'callout success';
        } else {
          mensaje.textContent = '❌ Error al enviar los datos.';
          mensaje.className = 'callout alert';
        }
        mensaje.style.display = 'block';

        document.getElementById('sensorForm').reset();

      } catch (error) {
        const mensaje = document.getElementById('respuesta');
        mensaje.textContent = ' Error de conexión o del servidor.';
        mensaje.className = 'callout alert';
        mensaje.style.display = 'block';
        console.error('Error:', error);
      }
    });
