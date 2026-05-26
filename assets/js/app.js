/**
 * assets/js/app.js
 * Logique principale du jeu de piste liégeois
 */

/* ---- État global ---- */
let solved  = new Set();
let score   = 0;
let current = null;   // id de l'étape ouverte
let activeTab = 'map';

const EQ = STEPS.filter(s => s.enigme); // étapes avec énigme

/* ---- Utilitaires ---- */
function gpsUrl(s) {
  return `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`;
}

function iconClass(s) {
  if (s.type === 'bar' || s.type === 'food') return 'bar';
  if (s.type === 'boat')  return 'boat';
  if (s.type === 'group') return 'group';
  if (s.type === 'alley') return 'alley';
  return '';
}

function tagHtml(s) {
  if (s.tag === 'e') return `<span class="stag tag-e"><i class="ti ti-help-circle"></i> Énigme · ${s.pts} pts</span>`;
  if (s.tag === 'g') return `<span class="stag tag-g"><i class="ti ti-arrows-join"></i> Défi groupé · ${s.pts} pts</span>`;
  if (s.tag === 'p') return `<span class="stag tag-p"><i class="ti ti-coffee"></i> Pause</span>`;
  return `<span class="stag tag-i"><i class="ti ti-info-circle"></i> Info</span>`;
}

/* ---- Progression ---- */
function updateProgress() {
  const n   = EQ.filter(s => solved.has(s.id)).length;
  const pct = Math.max(4, Math.round(n / EQ.length * 100));
  document.getElementById('pb').style.width  = pct + '%';
  document.getElementById('pbl').textContent = n + ' / ' + EQ.length;
  document.getElementById('sc').textContent  = score + ' pts';
}

/* ---- Rendu carte Google Maps ---- */
let gmap = null;
let gMarkers = {};   // id -> marker
let gPath = null;

function markerColors(s, done) {
  const isBar  = s.type === 'bar' || s.type === 'food';
  const isBoat = s.type === 'boat';
  const isGrp  = s.type === 'group';
  const isAl   = s.type === 'alley';
  return {
    fill:   done ? '#1D9E75' : isBar ? '#FAEEDA' : isBoat ? '#EEEDFE' : isGrp ? '#E6F1FB' : isAl ? '#F1EFE8' : '#fff',
    stroke: done ? '#0F6E56' : isBar ? '#EF9F27' : isBoat ? '#534AB7' : isGrp ? '#185FA5' : isAl ? '#888780' : '#1D9E75',
    text:   done ? '#fff'    : isBar ? '#854F0B' : isBoat ? '#3C3489' : isGrp ? '#0C447C' : isAl ? '#444441' : '#0F6E56'
  };
}

function markerSvgIcon(s, done) {
  const c = markerColors(s, done);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="13" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2.5"/>
    <text x="16" y="20" text-anchor="middle" font-family="-apple-system,Segoe UI,sans-serif"
          font-size="12" font-weight="700" fill="${c.text}">${s.id}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Appelée par le callback Google Maps une fois le script chargé
function initMap() {
  gmap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 50.6465, lng: 5.5785 },
    zoom: 15,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy'
  });

  // Tracé de l'itinéraire
  gPath = new google.maps.Polyline({
    path: STEPS.map(s => ({ lat: s.lat, lng: s.lng })),
    geodesic: true,
    strokeColor: '#1D9E75',
    strokeOpacity: 0.7,
    strokeWeight: 3,
    map: gmap
  });

  // Marqueurs
  STEPS.forEach(s => {
    const done = solved.has(s.id);
    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map: gmap,
      title: s.name,
      icon: {
        url: markerSvgIcon(s, done),
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }
    });
    marker.addListener('click', () => openStep(s.id));
    gMarkers[s.id] = marker;
  });
}

// Rafraîchit l'apparence des marqueurs (après résolution d'une énigme)
function renderMap() {
  if (!gmap) return;   // Google Maps pas encore chargé
  STEPS.forEach(s => {
    const marker = gMarkers[s.id];
    if (!marker) return;
    const done = solved.has(s.id);
    marker.setIcon({
      url: markerSvgIcon(s, done),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    });
  });
}

/* ---- Rendu liste ---- */
function renderList() {
  const panel = document.getElementById('vl');
  panel.innerHTML = '';

  STEPS.forEach(s => {
    const done = solved.has(s.id);
    const ic   = done ? '' : iconClass(s);
    const icon = done ? '<i class="ti ti-check"></i>' : `<i class="ti ti-${s.icon}"></i>`;

    const div = document.createElement('div');
    div.className = 'sitem' + (done ? ' done' : '');
    div.innerHTML = `
      <div class="sicon ${ic}">${icon}</div>
      <div style="flex:1;min-width:0">
        <div class="sname">${s.name}</div>
        <div class="stime"><i class="ti ti-clock" style="font-size:11px;margin-right:2px"></i>${s.time} · ${s.addr}</div>
        ${tagHtml(s)}
      </div>`;
    div.addEventListener('click', () => openStep(s.id));
    panel.appendChild(div);
  });
}

/* ---- Popup ---- */
function openStep(id) {
  const s = STEPS.find(x => x.id === id);
  if (!s) return;
  current = id;
  const done  = solved.has(id);
  const isGrp = s.type === 'group';

  let html = `
    <span class="pop-handle"></span>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
      <div style="flex:1;min-width:0">
        <div class="pop-num">Étape ${s.id} sur ${STEPS.length}</div>
        <div class="pop-title">${s.name}</div>
        <div class="pop-addr"><i class="ti ti-map-pin"></i> ${s.addr}</div>
        <div class="pop-time"><i class="ti ti-clock"></i> ${s.time}</div>
      </div>
      <button class="close-btn" onclick="closeStep()"><i class="ti ti-x"></i></button>
    </div>
    <div class="anec"><i class="ti ti-info-circle"></i>${s.anec}</div>
    <a class="gps-btn" href="${gpsUrl(s)}" target="_blank">
      <i class="ti ti-navigation"></i> Ouvrir dans Google Maps
    </a>`;

  if (s.enigme) {
    if (done) {
      html += `<div class="fb fbok" style="display:block;margin-bottom:10px">
        <i class="ti ti-circle-check"></i> Résolue — +${s.pts} pts</div>`;
    } else {
      const boxClass = isGrp ? 'ebox grp' : 'ebox enigme';
      const label    = isGrp
        ? '<i class="ti ti-arrows-join"></i> Défi groupé'
        : '<i class="ti ti-help-circle"></i> Énigme';
      html += `
        <div class="${boxClass}"><div class="elbl">${label}</div>${s.enigme}</div>
        <input class="ainput" id="ai" placeholder="Votre réponse…"
               onkeydown="if(event.key==='Enter') checkAnswer()"
               autocomplete="off" autocorrect="off" spellcheck="false"/>
        <div class="btn-row">
          <button class="bv" onclick="checkAnswer()">Valider</button>
          <button class="bh" onclick="showHint()"><i class="ti ti-bulb"></i> Indice</button>
        </div>
        <div class="fb" id="fb"></div>`;
    }
  } else {
    html += `<div class="pause-box">
      <i class="ti ti-armchair" style="font-size:24px;display:block;margin-bottom:5px;color:#EF9F27"></i>
      Pause — profitez du moment !
    </div>`;
  }

  document.getElementById('pop').innerHTML = html;
  document.getElementById('ov').style.display = 'flex';

  if (s.enigme && !done) {
    setTimeout(() => { const i = document.getElementById('ai'); if (i) i.focus(); }, 80);
  }
}

function closeStep() {
  document.getElementById('ov').style.display = 'none';
  current = null;
}

/* ---- Validation réponse ---- */
function checkAnswer() {
  const s = STEPS.find(x => x.id === current);
  if (!s) return;
  const val = (document.getElementById('ai').value || '').trim().toLowerCase();
  const fb  = document.getElementById('fb');
  fb.style.display = 'block';

  const ok = s.answer.some(a =>
    val.includes(a.toLowerCase()) || (a.toLowerCase().includes(val) && val.length > 2)
  );

  if (ok) {
    fb.className = 'fb fbok';
    fb.innerHTML = `<i class="ti ti-circle-check"></i> Correct ! +${s.pts} pts ✓`;
    solved.add(s.id);
    score += s.pts;
    updateProgress();
    renderMap();
    if (activeTab === 'list') renderList();
    setTimeout(() => {
      closeStep();
      if (solved.size === EQ.length) showFinal();
    }, 1200);
  } else {
    fb.className = 'fb fbko';
    fb.innerHTML = '<i class="ti ti-x"></i> Pas tout à fait… réessayez ou demandez un indice.';
  }
}

/* ---- Indice ---- */
function showHint() {
  const s = STEPS.find(x => x.id === current);
  if (!s) return;
  const fb = document.getElementById('fb');
  fb.style.display = 'block';
  fb.className = 'fb fbhi';
  fb.innerHTML = `<i class="ti ti-bulb"></i> ${s.hint}`;
}

/* ---- Écran de fin ---- */
function showFinal() {
  const total = EQ.reduce((a, s) => a + s.pts, 0);
  document.getElementById('ov').style.display = 'flex';
  document.getElementById('pop').innerHTML = `
    <span class="pop-handle"></span>
    <div class="final-pop">
      <div class="trophy">🏆</div>
      <h2>Piste terminée !</h2>
      <p>Toutes les énigmes résolues.</p>
      <p>Liège n'a plus de secrets pour vous.</p>
      <div class="pts">${score} pts</div>
      <p style="font-size:13px;color:var(--txt2)">Maximum possible : ${total} pts</p>
    </div>`;
}

/* ---- Changement d'onglet ---- */
function sw(tab) {
  activeTab = tab;
  document.getElementById('tbm').classList.toggle('active', tab === 'map');
  document.getElementById('tbl').classList.toggle('active', tab === 'list');
  document.getElementById('vm').style.display     = tab === 'map'  ? 'flex'  : 'none';
  document.getElementById('vl').style.display     = tab === 'list' ? 'block' : 'none';
  document.getElementById('legend').style.display = tab === 'list' ? 'flex'  : 'none';
  if (tab === 'list') renderList();
  if (tab === 'map' && gmap) {
    google.maps.event.trigger(gmap, 'resize');
    gmap.setCenter({ lat: 50.6465, lng: 5.5785 });
  }
}

/* ---- Fermer overlay en cliquant à l'extérieur ---- */
document.getElementById('ov').addEventListener('click', function(e) {
  if (e.target === this) closeStep();
});

/* ---- Init ---- */
document.getElementById('vm').style.display = 'flex';
updateProgress();
// initMap() est appelée automatiquement par le script Google Maps via &callback=initMap
