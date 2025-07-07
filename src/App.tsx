import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from '/workspaces/dashboard/src/assets/components/HeaderUI.tsx';
import AlertUI from '/workspaces/dashboard/src/assets/components/AlertUI.tsx';
import SelectorUI from '/workspaces/dashboard/src/assets/components/SelectorUI.tsx';
import IndicatorUI from '/workspaces/dashboard/src/assets/components/IndicatorUI.tsx'; // Importa IndicatorUI

function App() {
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
        <SelectorUI />
      </Grid>
      
      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Temperatura (2m)" description="XX°C" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Temperatura aparente" description="YY°C" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Velocidad del viento" description="ZZkm/h" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title="Humedad relativa" description="NN%" />
        </Grid>
      </Grid>
      
      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }}>
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }}>
        Elemento: Tabla
      </Grid>
      
      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
    </Grid>
  );
}

export default App;