import React, { useEffect } from 'react';
import dashboardBody from '../../_temp_body.txt?raw';
import drawerMarkup from '../../_temp_interhtml.txt?raw';
import dashboardScriptOne from '../../_temp_script1.txt?raw';
import dashboardScriptTwo from '../../_temp_script2.txt?raw';
import '../dashboard.css';

function cleanScript(source) {
  return source.replace(/<\/?script[^>]*>/gi, '');
}

// The dashboard scripts were written as classic top-of-page scripts: inline
// onclick handlers in the markup resolve their functions through the global
// scope. Running both scripts inside one IIFE keeps their shared state intact
// across re-mounts (no duplicate let/const declarations), so every top-level
// function has to be re-exported onto window for the inline handlers to find.
function buildRunnableScript() {
  const combined = cleanScript(dashboardScriptOne) + '\n' + cleanScript(dashboardScriptTwo);
  const names = new Set();
  for (const match of combined.matchAll(/^\s*(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:\(|function|async))/gm)) {
    names.add(match[1] || match[2]);
  }
  const exports = [...names]
    .map((n) => `try { if (typeof ${n} !== 'undefined') window.${n} = ${n}; } catch (e) {}`)
    .join('\n');
  return `(function () {\n${combined}\n${exports}\n})();`;
}

function Dashboard() {
  useEffect(() => {
    document.body.classList.add('dashboard-body');
    const script = document.createElement('script');
    script.textContent = buildRunnableScript();
    document.body.appendChild(script);
    return () => {
      script.remove();
      document.body.classList.remove('dashboard-body', 'light-theme');
    };
  }, []);

  return (
    <div
      className="dashboard-root"
      style={{ width: '100%', minHeight: '100vh', background: 'var(--color-gray-950)' }}
      dangerouslySetInnerHTML={{ __html: dashboardBody + drawerMarkup }}
    />
  );
}

export default Dashboard;
