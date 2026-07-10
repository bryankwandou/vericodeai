import fs from 'fs';

const markupFile = './src/extracted-markup.jsx';
const templateFile = './src/dashboard-template.txt';
const targetFile = './src/components/Dashboard.jsx';

const markupContent = fs.readFileSync(markupFile, 'utf-8');
const templateContent = fs.readFileSync(templateFile, 'utf-8');

// Separate Part 1 and Part 2 from the extracted markup file
const p1Start = markupContent.indexOf('// === JSX Part 1 ===') + '// === JSX Part 1 ==='.length;
const p1End = markupContent.indexOf('// === JSX Part 2 ===');
const p2Start = p1End + '// === JSX Part 2 ==='.length;

let part1JSX = markupContent.substring(p1Start, p1End).trim();
let part2JSX = markupContent.substring(p2Start).trim();

// Self-close HTML void elements so the markup is valid JSX
function selfCloseVoids(jsx) {
  return jsx.replace(/(<(?:img|input|br|hr|source|track|wbr|area|col|embed)\b[^>]*?)\s*\/?>/g, '$1 />');
}
// Wrap raw CSS inside <style> tags in a template-literal expression so JSX can parse it
function wrapStyleTags(jsx) {
  return jsx.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => '<style>{`' + css + '`}</style>');
}
part1JSX = wrapStyleTags(selfCloseVoids(part1JSX));
part2JSX = wrapStyleTags(selfCloseVoids(part2JSX));

// Rewire static HTML event attributes to the React handlers defined in the template
part1JSX = part1JSX
  .replace(/onClick="switchView\(event,\s*'([^']*)'(?:,\s*'([^']*)')?\)"/g, 'onClick={(e) => handleSwitchView(e, "$1", $2)}')
  .replace(/onClick="toggleTodo\((\w+)\)"/g, 'onClick={() => handleToggleTodo($1)}')
  .replace(/onClick="deleteTodo\((\w+)\)"/g, 'onClick={() => handleDeleteTodo($1)}')
  .replace(/onChange="toggleTodo\((\w+)\)"/g, 'onChange={() => handleToggleTodo($1)}')
  .replace(/onClick="changeWorkspaceLanguage\(\)"/g, 'onChange={handleChangeWorkspaceLanguage}')
  .replace(/onChange="changeWorkspaceLanguage\(\)"/g, 'onChange={handleChangeWorkspaceLanguage}')
  .replace(/onClick="toggleWorkspaceConsole\(\)"/g, 'onClick={handleToggleWorkspaceConsole}')
  .replace(/onClick="switchConsoleTab\('([^']*)'\)"/g, 'onClick={() => handleSwitchConsoleTab("$1")}')
  .replace(/onClick="switchWorkspaceTab\('([^']*)'\)"/g, 'onClick={() => handleSwitchWorkspaceTab("$1")}')
  .replace(/onClick="runWorkspaceCode\(\)"/g, 'onClick={handleRunWorkspaceCode}')
  .replace(/onClick="submitWorkspaceCode\(\)"/g, 'onClick={handleSubmitWorkspaceCode}')
  .replace(/onClick="sendWorkspaceCodeToAI\('([^']*)'\)"/g, 'onClick={() => handleSendWorkspaceCodeToAI("$1")}')
  .replace(/onClick="MarkAllLecturesRead\(\)"/g, 'onClick={handleMarkAllLecturesRead}')
  .replace(/onClick="toggleSoundwaves\(\)"/g, 'onClick={handleToggleSoundwaves}')
  .replace(/onSubmit="event\.preventDefault\(\);\s*window\.location\.href\s*=\s*'\/dashboard\.html';"/g, 'onSubmit={(e) => e.preventDefault()}')
  .replace(/href="\/login\.html"/g, 'href="/login"')
  .replace(/href="\/signup\.html"/g, 'href="/signup"');

part2JSX = part2JSX
  .replace(/onClick="drawer-close"/g, 'onClick={handleCloseDrawer}')
  .replace(/id="drawer-close"/g, 'id="drawer-close" onClick={handleCloseDrawer}');

const componentContent = templateContent
  .replace('${part1JSX}', part1JSX)
  .replace('${part2JSX}', part2JSX);

fs.writeFileSync(targetFile, componentContent);
console.log(`Wrote ${targetFile} (${componentContent.length} chars)`);
