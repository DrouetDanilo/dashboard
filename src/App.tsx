import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from '/workspaces/dashboard/src/assets/components/HeaderUI.tsx';
import AlertUI from '/workspaces/dashboard/src/assets/components/AlertUI.tsx';
import SelectorUI from '/workspaces/dashboard/src/assets/components/SelectorUI.tsx';
import IndicatorUI from '/workspaces/dashboard/src/assets/components/IndicatorUI.tsx'; // Importa IndicatorUI
import DataFetcher from './functions/DataFetcher';
import TableUI from '/workspaces/dashboard/src/assets/components/TableUI.tsx';
import ChartUI from '/workspaces/dashboard/src/assets/components/ChartUI.tsx';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('guayaquil'); // Valor por defecto

  const dataFetcherOutput = DataFetcher(city);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>
      
      {/* Alertas */}
      <Grid size={{ xs: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI 
          description="No se preveen lluvias"
          variant="filled"
          severity="info"
        />
      </Grid>
      
      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI city={city} onCityChange={setCity} />
      </Grid>
      
      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && (
          <Grid size={{ xs: 12 }}>
            <p>Cargando datos...</p>
          </Grid>
        )}
        {dataFetcherOutput.error && (
          <Grid size={{ xs: 12 }}>
            <p>Error: {dataFetcherOutput.error}</p>
          </Grid>
        )}
        {dataFetcherOutput.data && (
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Temperatura"
                description={
                  dataFetcherOutput.data.current_weather.temperature + " °C"
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Velocidad del viento"
                description={
                  dataFetcherOutput.data.current_weather.windspeed + " km/h"
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Dirección del viento"
                description={
                  dataFetcherOutput.data.current_weather.winddirection + "°"
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Código de clima"
                description={
                  dataFetcherOutput.data.current_weather.weathercode.toString()
                }
              />
            </Grid>
          </>
        )}
      </Grid>
      
      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
          hourly={dataFetcherOutput.data?.hourly}
        />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
          hourly={dataFetcherOutput.data?.hourly}
        />
      </Grid>
      
      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;