import React, { useMemo } from 'react';
import baseStyles from '../style.css?raw';
import dashboardStyles from '../dashboard.css?raw';
import dashboardBody from '../../_temp_body.txt?raw';
import drawerMarkup from '../../_temp_interhtml.txt?raw';
import dashboardScriptOne from '../../_temp_script1.txt?raw';
import dashboardScriptTwo from '../../_temp_script2.txt?raw';

function cleanScript(source) {
  return source.replace(/<\/script>\s*$/i, '').replace(/<\/script/gi, '<\\/script');
}

function Dashboard() {
  const srcDoc = useMemo(() => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base target="_parent" />
    <style>${baseStyles}</style>
    <style>${dashboardStyles}</style>
  </head>
  <body class="dashboard-body">
    ${dashboardBody}
    ${drawerMarkup}
    <script>${cleanScript(dashboardScriptOne)}</script>
    <script>${cleanScript(dashboardScriptTwo)}</script>
  </body>
</html>`;
  }, []);

  return (
    <iframe
      title="Vericode AI Dashboard"
      srcDoc={srcDoc}
      style={{ width: '100vw', height: '100vh', border: 0, display: 'block', background: '#0a0a0a' }}
    />
  );
}

export default Dashboard;
