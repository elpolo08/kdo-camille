var IDS = ['manteau','head-spa','maquillage','creme','sac-main','projecteur','pinces','livre','sac-sport','aquarelle'];
function doGet() { return out_(bought_()); }
function doPost(e) {
  var id = String((e && e.parameter && e.parameter.id) || '');
  if (IDS.indexOf(id) < 0) return out_({ error: 'id inconnu' });
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var b = bought_();
    if (b.indexOf(id) < 0) { b.push(id); PropertiesService.getScriptProperties().setProperty('bought', JSON.stringify(b)); }
    return out_(b);
  } finally { lock.releaseLock(); }
}
function bought_() { return JSON.parse(PropertiesService.getScriptProperties().getProperty('bought') || '[]'); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
// Pour remettre une liste à zéro : exécuter reset() depuis l'éditeur.
function reset() { PropertiesService.getScriptProperties().deleteProperty('bought'); }
