## Características

```
- Iniciar / Cerrar Sesión

- Permisos de Autenticación
  - Página de Permisos
  - Directivas de permisos
  - Página de configuración de permisos
  - Autenticación por dos pasos

- Construcción Multi-entorno
  - Desarrollo (dev)
  - sit
  - Escenario de pruebas (stage),
  - Producción (prod)

- Características Globales
  - I18n
  - Temas dinámicos
  - Menu lateral dinámico (soporte a rutas multi-nivel)
  - Barra de rutas dinámica
  - Tags-view (Pestañas de página, Soporta operación de clic derecho)
  - Svg Sprite
  - Datos de simulación con Mock
  - Pantalla completa
  - Menu lateral responsivo

- Editor
  - Editor de Texto Enriquecido
  - Editor Markdown
  - Editor JSON

- Excel
  - Exportación a Excel
  - Carga de Excel
  - Visualización de Excel
  - Exportación como ZIP

- Tabla
  - Tabla Dinámica
  - Tabla con Arrastrar y Soltar
  - Tabla de edición en línea

- Páginas de Error
  - 401
  - 404

- Componentes
  - Carga de Avatar
  - Botón para subir al inicio
  - Arrastrar y Soltar (Diaglogo)
  - Arrastrar y Soltar (Seleccionar)
  - Arrastrar y Soltar (Kanban)
  - Arrastrar y Soltar (Lista)
  - Panel de división
  - Componente para soltar archivos
  - Adhesión de objetos
  - Contador hasta

- Ejemplo Avanzado
- Registro de Errores
- Tablero de indicadores
- Página de Guías
- ECharts (Gráficos)
- Portapapeles
- Convertidor de Markdown a HTML
```

## Iniciando

```bash
# clone el proyecto
git clone https://github.com/PanJiaChen/vue-element-admin.git

# vaya al directorio clonado
cd vue-element-admin

# instale las dependencias
npm install

# corra el proyecto como desarrollador
npm run dev
```

Automáticamente se abrirá el siguiente enlace en su navegador http://localhost:9527

## Construcción

```bash
# Construcción para entornos de prueba
npm run build:stage

# Construcción para entornos de producción
npm run build:prod
```

## Avanzado

```bash
# Vista previa con efectos de entorno
npm run preview

# Vista previa  con efectos + análisis de recursos estáticos
npm run preview -- --report

# Chequeo de formato de código
npm run lint

# Chequeo de formato de código y auto-corrección
npm run lint -- --fix
```

## Navegadores Soportados

Navegadores modernos e Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | últimas 2 versiones | últimas 2 versiones | últimas 2 versiones |