import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from '/workspaces/dashboard/src/assets/components/HeaderUI.tsx';
import AlertUI from '/workspaces/dashboard/src/assets/components/AlertUI.tsx';
import SelectorUI from '/workspaces/dashboard/src/assets/components/SelectorUI.tsx'; // Importa SelectorUI

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
        <SelectorUI /> {/* Usa SelectorUI aquí */}
      </Grid>
      
      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>
      
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