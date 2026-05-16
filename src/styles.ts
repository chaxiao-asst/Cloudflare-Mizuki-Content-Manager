export const SHARED_CSS = `
:root {
  --hue: 260;
  --primary: oklch(0.62 0.18 var(--hue));
  --primary-light: oklch(0.72 0.16 var(--hue));
  --primary-dark: oklch(0.52 0.18 var(--hue));
  --primary-bg: oklch(0.62 0.18 var(--hue) / 0.08);
  --primary-bg-hover: oklch(0.62 0.18 var(--hue) / 0.14);
  --primary-border: oklch(0.62 0.18 var(--hue) / 0.25);
  --page-bg: oklch(0.96 0.005 var(--hue));
  --card-bg: #fff;
  --card-bg-hover: oklch(0.98 0.005 var(--hue));
  --card-border: oklch(0.88 0.01 var(--hue));
  --text-primary: oklch(0.18 0.01 var(--hue));
  --text-secondary: oklch(0.38 0.01 var(--hue));
  --text-muted: oklch(0.58 0.01 var(--hue));
  --text-inverse: #fff;
  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04),0 1px 2px rgba(0,0,0,0.06);
  --shadow: 0 2px 8px rgba(0,0,0,0.05),0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.07),0 2px 6px rgba(0,0,0,0.05);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.09),0 4px 12px rgba(0,0,0,0.06);
  --gradient-primary: linear-gradient(135deg,oklch(0.62 0.18 var(--hue)),oklch(0.52 0.18 calc(var(--hue) + 20)));
  --gradient-card-icon: linear-gradient(135deg,oklch(0.62 0.18 var(--hue)),oklch(0.52 0.18 calc(var(--hue) + 15)));
  --font-mono: 'JetBrains Mono','Cascadia Code','Fira Code',ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
}

*{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans SC',sans-serif;background:var(--page-bg);color:var(--text-primary);line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;min-height:100vh}
body::before{content:'';position:fixed;top:0;left:0;width:100%;height:180px;background:linear-gradient(180deg,oklch(0.62 0.18 var(--hue) / 0.04) 0%,transparent 100%);pointer-events:none;z-index:0}

.container{max-width:1480px;margin:0 auto;padding:24px 28px;position:relative;z-index:1}

.header{background:var(--gradient-primary);color:var(--text-inverse);padding:28px 32px;border-radius:var(--radius-xl);margin-bottom:20px;box-shadow:0 6px 28px oklch(0.62 0.18 var(--hue) / 0.25);position:relative;overflow:hidden}
.header::before{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.06)}
.header::after{content:'';position:absolute;bottom:-30px;left:30%;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.04)}
.header h1{font-size:1.75rem;font-weight:700;margin-bottom:6px;letter-spacing:-0.02em;position:relative;z-index:1}
.header p{opacity:0.85;font-size:0.9rem;position:relative;z-index:1}

.nav{background:var(--card-bg);padding:6px;border-radius:var(--radius-lg);box-shadow:var(--shadow);margin-bottom:20px;position:sticky;top:12px;z-index:100;backdrop-filter:blur(12px);border:1px solid var(--card-border)}
.nav ul{list-style:none;display:flex;flex-wrap:wrap;gap:4px}
.nav a{padding:9px 18px;border-radius:var(--radius);text-decoration:none;color:var(--text-secondary);font-size:0.9rem;font-weight:500;transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94);display:block;position:relative}
.nav a:hover{color:var(--primary);background:var(--primary-bg)}
.nav a.active{background:var(--gradient-primary);color:var(--text-inverse);box-shadow:0 2px 8px oklch(0.62 0.18 var(--hue) / 0.3)}

.content{background:var(--card-bg);border-radius:var(--radius-xl);padding:28px 32px;box-shadow:var(--shadow);border:1px solid var(--card-border);min-height:400px}
.content h2{font-size:1.35rem;font-weight:700;color:var(--text-primary);margin-bottom:20px;display:flex;align-items:center;gap:10px}
.content h2::before{content:'';display:inline-block;width:4px;height:24px;border-radius:3px;background:var(--primary);flex-shrink:0}

.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:16px}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-weight:600;margin-bottom:5px;color:var(--text-secondary);font-size:0.85rem}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 14px;border:1.5px solid var(--card-border);border-radius:var(--radius);font-size:0.9rem;font-family:inherit;transition:all 0.2s;background:var(--card-bg);color:var(--text-primary)}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}
.form-group textarea{resize:vertical;min-height:80px;font-family:inherit}
.form-group input[type="color"]{width:48px;height:36px;padding:3px 4px;cursor:pointer}
.form-group input[type="checkbox"]{width:auto;margin-right:6px;accent-color:var(--primary)}

.btn{padding:10px 20px;border:none;border-radius:var(--radius);font-size:0.9rem;cursor:pointer;font-weight:600;transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94);display:inline-flex;align-items:center;gap:6px;letter-spacing:-0.01em}
.btn:hover{transform:translateY(-1px)}
.btn:active{transform:translateY(0)}
.btn-primary{background:var(--gradient-primary);color:var(--text-inverse);box-shadow:0 3px 12px oklch(0.62 0.18 var(--hue) / 0.3)}
.btn-primary:hover{box-shadow:0 5px 18px oklch(0.62 0.18 var(--hue) / 0.4);transform:translateY(-2px)}
.btn-danger{background:oklch(0.55 0.18 20);color:#fff;box-shadow:0 3px 10px oklch(0.55 0.18 20 / 0.3)}
.btn-danger:hover{background:oklch(0.48 0.18 20);box-shadow:0 5px 14px oklch(0.55 0.18 20 / 0.4);transform:translateY(-2px)}
.btn-success{background:oklch(0.58 0.14 160);color:#fff;box-shadow:0 3px 10px oklch(0.58 0.14 160 / 0.3)}
.btn-success:hover{background:oklch(0.5 0.14 160);box-shadow:0 5px 14px oklch(0.58 0.14 160 / 0.4);transform:translateY(-2px)}
.btn-secondary{background:oklch(0.94 0.005 var(--hue));color:var(--text-secondary);border:1px solid var(--card-border)}
.btn-secondary:hover{background:oklch(0.9 0.005 var(--hue));color:var(--text-primary)}
.btn-info{background:oklch(0.62 0.08 230);color:#fff;box-shadow:0 3px 10px oklch(0.62 0.08 230 / 0.25)}
.btn-info:hover{background:oklch(0.54 0.08 230);transform:translateY(-2px)}
.btn-sm{padding:5px 12px;font-size:0.8rem;border-radius:var(--radius-sm)}
.btn-xs{padding:3px 8px;font-size:0.72rem;border-radius:4px}

.table-wrapper{overflow-x:auto;margin-top:20px;border-radius:var(--radius-lg);border:1px solid var(--card-border)}
table{width:100%;border-collapse:collapse;min-width:600px}
th,td{padding:12px 16px;text-align:left;border-bottom:1px solid var(--card-border)}
th{background:oklch(0.96 0.005 var(--hue));font-weight:700;color:var(--text-secondary);font-size:0.82rem;text-transform:uppercase;letter-spacing:0.04em;position:sticky;top:0}
tr:last-child td{border-bottom:none}
tr:hover td{background:oklch(0.97 0.005 var(--hue))}
.actions{display:flex;gap:6px;flex-wrap:wrap}

.badge{padding:4px 10px;border-radius:20px;font-size:0.78rem;font-weight:600;display:inline-flex;align-items:center;gap:3px;letter-spacing:-0.01em}
.badge-success{background:oklch(0.92 0.06 155);color:oklch(0.4 0.08 155)}
.badge-warning{background:oklch(0.93 0.08 80);color:oklch(0.45 0.1 75)}
.badge-info{background:oklch(0.92 0.05 240);color:oklch(0.4 0.06 240)}
.badge-secondary{background:oklch(0.9 0.005 var(--hue));color:var(--text-secondary)}
.badge-primary{background:var(--primary-bg);color:var(--primary)}

.loading{text-align:center;padding:48px;color:var(--text-muted)}
.loading::after{content:'';display:inline-block;width:24px;height:24px;border:3px solid var(--card-border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;margin-left:8px;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}

.error-msg{background:oklch(0.92 0.06 20);color:oklch(0.4 0.1 20);padding:14px 18px;border-radius:var(--radius);margin-bottom:16px;border-left:4px solid oklch(0.55 0.18 20);font-weight:500;animation:fadeIn 0.3s ease}
.success-msg{background:oklch(0.92 0.06 155);color:oklch(0.4 0.08 155);padding:14px 18px;border-radius:var(--radius);margin-bottom:16px;border-left:4px solid oklch(0.58 0.14 160);font-weight:500;animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

.empty-state{text-align:center;padding:64px 20px;color:var(--text-muted);font-size:0.95rem}
.empty-state::before{content:'📭';display:block;font-size:2.5rem;margin-bottom:12px;opacity:0.5}

.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;margin-top:12px}
.card{background:var(--card-bg);border-radius:var(--radius-lg);padding:20px;border:1px solid var(--card-border);transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94);position:relative}
.card:hover{border-color:var(--primary-border);box-shadow:var(--shadow-md);transform:translateY(-2px)}
.card h3{color:var(--text-primary);font-size:1.05rem;font-weight:700;margin-bottom:8px}
.card p{color:var(--text-secondary);font-size:0.9rem;line-height:1.55;margin-bottom:6px}
.card .meta{font-size:0.82rem;color:var(--text-muted);margin-top:8px;padding-top:8px;border-top:1px solid var(--card-border)}
.card-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.card-actions{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}

.skill-card{padding:18px}
.skill-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.skill-header h4{margin:0;font-size:1rem;font-weight:700;color:var(--text-primary)}
.skill-desc{color:var(--text-secondary);font-size:0.88rem;margin:8px 0;line-height:1.5}
.skill-progress{height:8px;background:oklch(0.9 0.005 var(--hue));border-radius:4px;overflow:hidden;margin:10px 0}
.skill-progress-bar{height:100%;border-radius:4px;transition:width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);background:var(--gradient-primary)}
.skill-meta{font-size:0.82rem;color:var(--text-muted);display:flex;gap:12px;flex-wrap:wrap}

.filter-bar{display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap;align-items:center}
.filter-bar select,.filter-bar input{padding:9px 14px;border:1.5px solid var(--card-border);border-radius:var(--radius);font-size:0.88rem;background:var(--card-bg);color:var(--text-primary);transition:all 0.2s}
.filter-bar select:focus,.filter-bar input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}
.filter-bar input{flex:1;min-width:160px}

.stats-bar{text-align:center;color:var(--text-muted);font-size:0.85rem;margin-top:16px;padding-top:14px;border-top:1px solid var(--card-border)}

.timeline{padding:0}
.timeline-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px}
.timeline-card{padding:18px}
.timeline-content{background:oklch(0.97 0.005 var(--hue));padding:16px;border-radius:var(--radius);border:1px solid var(--card-border)}

.friend-card{padding:20px}
.friend-header{display:flex;align-items:center;gap:14px;margin-bottom:12px}
.friend-avatar{width:48px;height:48px;border-radius:var(--radius);object-fit:cover;border:2px solid var(--card-border);transition:transform 0.2s}
.friend-card:hover .friend-avatar{transform:scale(1.06)}
.friend-header h3{margin:0;font-size:1.05rem;font-weight:700}
.friend-desc{color:var(--text-secondary);font-size:0.88rem;margin:8px 0;line-height:1.55}

.device-section{margin-bottom:28px}
.device-category-title{color:var(--text-primary);font-size:1.1rem;font-weight:700;margin-bottom:14px;padding-bottom:8px;border-bottom:2.5px solid var(--primary);display:flex;align-items:center;gap:8px}
.device-card{padding:16px}
.device-card h4{margin:0 0 8px;font-size:1rem;font-weight:700;color:var(--text-primary)}

.page-layout{display:flex;flex-direction:column;max-height:calc(100vh - 180px);overflow:hidden}
.page-toolbar{flex-shrink:0;padding-bottom:12px;border-bottom:1px solid var(--card-border);margin-bottom:0;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.page-toolbar h2{margin:0!important;flex-shrink:0;white-space:nowrap;font-size:1.15rem}
.page-toolbar h2::before{display:none}
.page-toolbar .btn{flex-shrink:0}
.page-toolbar input{flex:1;min-width:140px;max-width:300px;padding:8px 12px;border:1.5px solid var(--card-border);border-radius:var(--radius);font-size:0.86rem;background:var(--card-bg);color:var(--text-primary);transition:all 0.2s}
.page-toolbar input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}
.page-toolbar select{padding:8px 12px;border:1.5px solid var(--card-border);border-radius:var(--radius);font-size:0.86rem;background:var(--card-bg);color:var(--text-primary);transition:all 0.2s;flex-shrink:0}
.page-toolbar select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}
.page-cards-area{flex:1;overflow-y:auto;min-height:0;padding:14px 0;scrollbar-width:thin;scrollbar-color:oklch(0.8 0.01 var(--hue)) transparent}
.page-cards-area::-webkit-scrollbar{width:5px}
.page-cards-area::-webkit-scrollbar-track{background:transparent}
.page-cards-area::-webkit-scrollbar-thumb{background:oklch(0.8 0.01 var(--hue));border-radius:3px}
.page-cards-area::-webkit-scrollbar-thumb:hover{background:oklch(0.7 0.01 var(--hue))}
.page-stats{flex-shrink:0;text-align:center;color:var(--text-muted);font-size:0.85rem;padding-top:12px;border-top:1px solid var(--card-border)}

.page-cards-area .card-grid{margin-top:0}
.page-cards-area .empty-state{padding:40px 20px}

@media(max-width:768px){
  .page-layout{max-height:calc(100vh - 150px)}
  .container{padding:14px 16px}
  .header{padding:22px 20px}
  .content{padding:20px 16px}
  .nav a{padding:7px 12px;font-size:0.82rem}
  .card-grid{grid-template-columns:1fr}
  .form-grid{grid-template-columns:1fr}
  .modal-content{min-width:auto!important}
}
@media(max-width:480px){
  .page-layout{max-height:calc(100vh - 140px)}
  .header h1{font-size:1.35rem}
  .page-toolbar{flex-direction:column;align-items:flex-start;gap:10px}
}

/* ===== Modal System ===== */
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);justify-content:center;align-items:center;z-index:1000;padding:20px;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.modal.active{display:flex;animation:modalFadeIn 0.2s ease}
@keyframes modalFadeIn{from{opacity:0}to{opacity:1}}
.modal-content{background:var(--card-bg);border-radius:var(--radius-xl);padding:28px 32px;max-width:620px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:var(--shadow-lg);animation:modalSlideIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94)}
@keyframes modalSlideIn{from{opacity:0;transform:translateY(16px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--card-border)}
.modal-header h2{font-size:1.2rem;font-weight:700;color:var(--text-primary);margin:0;display:flex;align-items:center;gap:10px}
.modal-header h2::before{content:'';display:inline-block;width:4px;height:20px;border-radius:2px;background:var(--primary)}
.close-btn{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted);padding:6px 10px;border-radius:var(--radius-sm);transition:all 0.2s;line-height:1}
.close-btn:hover{background:oklch(0.94 0.005 var(--hue));color:var(--text-primary)}
.modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);justify-content:center;align-items:center;z-index:1010;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.modal-overlay.active{display:flex;animation:modalFadeIn 0.2s ease}
.confirm-modal .modal-content{text-align:center;max-width:420px;width:90%;padding:32px 28px}
.confirm-modal .modal-content h3{margin-bottom:12px;color:var(--text-primary);font-size:1.15rem}
.confirm-modal .modal-content p{margin-bottom:24px;font-size:0.95rem;color:var(--text-secondary)}
.confirm-modal .btn-group{display:flex;gap:12px;justify-content:center}

/* ===== Tab Navigation ===== */
.tab-nav{display:flex;gap:4px;border-bottom:2px solid var(--card-border);margin-bottom:20px}
.tab-btn{padding:10px 20px;background:none;border:none;border-bottom:2.5px solid transparent;cursor:pointer;font-size:0.9rem;font-weight:600;color:var(--text-muted);transition:all 0.2s;margin-bottom:-2px}
.tab-btn:hover{color:var(--primary)}
.tab-btn.active{color:var(--primary);border-bottom-color:var(--primary)}
.tab-panel{display:none}
.tab-panel.active{display:block;animation:fadeIn 0.25s ease}

/* ===== Config Cards (Home page) ===== */
.config-card{background:var(--card-bg);border-radius:var(--radius-lg);padding:20px 22px;cursor:pointer;transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94);border:1px solid var(--card-border);position:relative;overflow:hidden}
.config-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:var(--gradient-primary);opacity:0;transition:opacity 0.25s}
.config-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--primary-border)}
.config-card:hover::before{opacity:1}
.card-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.card-icon{width:42px;height:42px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:20px;background:var(--gradient-card-icon);box-shadow:0 3px 10px oklch(0.62 0.18 var(--hue) / 0.25)}
.card-title{font-weight:700;font-size:1rem;color:var(--text-primary);margin:0}
.card-summary{color:var(--text-muted);font-size:0.85rem;line-height:1.6;margin:0}
.card-summary-item{display:flex;align-items:center;gap:6px;margin-bottom:5px}
.card-summary-item:last-child{margin-bottom:0}
.summary-label{font-weight:600;color:var(--text-secondary);font-size:0.82rem}
.summary-value{color:var(--text-primary);font-weight:500;font-size:0.84rem}
.summary-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:0.78rem;font-weight:600;background:oklch(0.94 0.005 var(--hue));color:var(--text-secondary)}

/* ===== Config Overlay (Home page) ===== */
.cfg-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);justify-content:center;align-items:center;z-index:1000;padding:20px;overflow-y:auto;backdrop-filter:blur(4px)}
.cfg-overlay.active{display:flex;animation:modalFadeIn 0.2s ease}
.cfg-dialog{background:var(--card-bg);border-radius:var(--radius-xl);width:100%;max-width:740px;max-height:90vh;display:flex;flex-direction:column;position:relative;box-shadow:var(--shadow-lg);animation:modalSlideIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94)}
.cfg-dialog-header{display:flex;align-items:center;justify-content:space-between;padding:22px 28px;border-bottom:1px solid var(--card-border);flex-shrink:0;background:var(--card-bg);border-radius:var(--radius-xl) var(--radius-xl) 0 0}
.cfg-dialog-header h2{margin:0;font-size:1.1rem;color:var(--text-primary);font-weight:700;display:flex;align-items:center;gap:10px}
.cfg-dialog-header h2::before{content:'';display:inline-block;width:4px;height:20px;border-radius:2px;background:var(--primary)}
.cfg-close-btn{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted);padding:6px 10px;border-radius:6px;transition:all 0.2s}
.cfg-close-btn:hover{background:oklch(0.94 0.005 var(--hue))}
.cfg-dialog-body{padding:24px 28px;overflow-y:auto;flex:1}
.config-section{margin-bottom:20px}
.config-section:last-child{margin-bottom:0}
.config-section h4{margin:0 0 12px 0;font-size:0.85rem;color:var(--text-secondary);font-weight:700;display:flex;align-items:center;gap:6px}
.config-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.config-item{background:oklch(0.97 0.005 var(--hue));padding:14px 16px;border-radius:var(--radius);border:1px solid var(--card-border)}
.config-item label{display:block;font-size:0.78rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.03em}
.config-item input,.config-item select,.config-item textarea{width:100%;padding:9px 13px;border:1.5px solid var(--card-border);border-radius:var(--radius-sm);font-size:0.88rem;background:var(--card-bg);color:var(--text-primary);transition:all 0.2s;font-family:inherit}
.config-item input:focus,.config-item select:focus,.config-item textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}
.config-item .boolean-switch{display:flex;align-items:center;gap:10px}
.config-item .boolean-switch input[type="checkbox"]{width:18px;height:18px;accent-color:var(--primary)}

.feature-pages-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}
.feature-page-item{display:flex;align-items:center;gap:8px;padding:10px 12px;background:oklch(0.97 0.005 var(--hue));border-radius:var(--radius-sm);border:1px solid var(--card-border);transition:all 0.15s}
.feature-page-item:hover{background:var(--primary-bg);border-color:var(--primary-border)}
.feature-page-item label{font-size:0.84rem;color:var(--text-primary);font-weight:500;cursor:pointer}

.nav-link-item{background:oklch(0.98 0.005 var(--hue));border:1px solid var(--card-border);border-radius:var(--radius);margin-bottom:8px;overflow:hidden;transition:all 0.2s}
.nav-link-item:hover{border-color:var(--primary-border);box-shadow:var(--shadow-sm)}
.nav-link-item.dragging{opacity:0.5}
.nav-link-item.drag-over{border-top:3px solid var(--primary)}
.nav-link-header{display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer}
.nav-link-header:hover{background:oklch(0.96 0.005 var(--hue))}
.nav-link-header .drag-handle{cursor:grab;color:var(--text-muted);font-size:16px;padding:2px;user-select:none;transition:color 0.2s}
.nav-link-header:hover .drag-handle{color:var(--text-secondary)}
.nav-link-header .link-type{font-size:0.72rem;padding:3px 10px;border-radius:12px;font-weight:700;letter-spacing:0.02em;text-transform:uppercase}
.nav-link-header .link-type.preset{background:oklch(0.92 0.03 250);color:oklch(0.4 0.06 250)}
.nav-link-header .link-type.leaf{background:oklch(0.92 0.04 155);color:oklch(0.4 0.06 155)}
.nav-link-header .link-type.parent{background:oklch(0.93 0.06 80);color:oklch(0.45 0.1 75)}
.nav-link-header .link-name{font-weight:700;flex:1;color:var(--text-primary);font-size:0.9rem}
.nav-link-header .link-actions{display:flex;gap:6px}
.nav-link-body{padding:0 16px 16px;display:none}
.nav-link-item.expanded .nav-link-body{display:block;animation:fadeIn 0.2s ease}
.nav-child-item{background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius-sm);padding:14px;margin-bottom:10px;transition:all 0.2s}
.nav-child-item:hover{border-color:var(--primary-border)}
.nav-child-item:last-child{margin-bottom:0}
.nav-child-item .form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:12px}
.nav-child-item .form-grid .form-group{margin:0}
.nav-child-item .form-grid .form-group label{font-size:0.78rem;color:var(--text-muted);margin-bottom:5px;font-weight:600}
.nav-child-item .form-grid .form-group input,.nav-child-item .form-grid .form-group select{width:100%;padding:8px 12px;border:1.5px solid var(--card-border);border-radius:var(--radius-sm);font-size:0.84rem;transition:all 0.2s}
.nav-child-item .form-grid .form-group input:focus,.nav-child-item .form-grid .form-group select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}

.cfg-dialog-footer{display:flex;justify-content:flex-end;gap:10px;padding:14px 28px;border-top:1px solid var(--card-border);background:oklch(0.97 0.005 var(--hue));border-radius:0 0 var(--radius-xl) var(--radius-xl);flex-shrink:0}
.btn-save{background:var(--gradient-primary);color:var(--text-inverse);border:none;padding:10px 24px;border-radius:var(--radius);cursor:pointer;font-size:0.9rem;font-weight:700;transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94);box-shadow:0 4px 14px oklch(0.62 0.18 var(--hue) / 0.3)}
.btn-save:hover{transform:translateY(-2px);box-shadow:0 6px 20px oklch(0.62 0.18 var(--hue) / 0.4)}
.btn-save:active{transform:translateY(0)}
.btn-cancel{background:oklch(0.94 0.005 var(--hue));color:var(--text-secondary);border:1px solid var(--card-border);padding:10px 24px;border-radius:var(--radius);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s}
.btn-cancel:hover{background:oklch(0.89 0.005 var(--hue));border-color:oklch(0.78 0.01 var(--hue))}

/* ===== Home page sidebar components ===== */
.sidebar-component-item{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);margin-bottom:8px;transition:all 0.15s;cursor:move}
.sidebar-component-item:hover{border-color:var(--primary-border);background:oklch(0.97 0.005 var(--hue))}
.sidebar-component-item span{font-size:0.9rem;color:var(--text-primary);font-weight:600}
.sidebar-component-item .drag-handle{margin-right:12px;color:var(--text-muted);font-size:18px;cursor:grab;user-select:none}
.sidebar-component-item .drag-handle:hover{color:var(--text-secondary)}
.sidebar-component-item.dragging{opacity:0.5;transform:scale(0.98)}
.sidebar-component-item.drag-over{border-color:var(--primary);border-style:dashed;background:var(--primary-bg)}
.sidebar-components-container{min-height:60px;padding:8px;background:var(--card-bg);border:1px dashed var(--card-border);border-radius:var(--radius)}

/* ===== Save bar (Home page) ===== */
.save-bar{display:flex;gap:12px;margin-top:24px;padding-top:16px;border-top:1px solid var(--card-border)}

/* ===== Iconify float button ===== */
.iconify-float-btn{position:absolute;width:40px;height:40px;border-radius:50%;background:var(--gradient-primary);color:var(--text-inverse);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px oklch(0.62 0.18 var(--hue) / 0.3);transition:all 0.2s;z-index:100}
.iconify-float-btn:hover{transform:scale(1.06);box-shadow:0 6px 18px oklch(0.62 0.18 var(--hue) / 0.45)}
.iconify-float-btn.dragging{cursor:grabbing;opacity:0.9}
.iconify-float-btn .float-icon{transition:transform 0.2s}
.iconify-float-btn.active .float-icon{transform:rotate(45deg)}
.iconify-dropdown{position:absolute;bottom:100%;right:0;margin-bottom:8px;background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow-lg);padding:6px;min-width:180px;display:none;z-index:99;border:1px solid var(--card-border)}
.iconify-dropdown.active{display:block;animation:fadeIn 0.15s ease}
.iconify-dropdown a{display:block;padding:9px 14px;color:var(--text-secondary);text-decoration:none;font-size:0.84rem;border-radius:var(--radius-sm);transition:all 0.15s;font-weight:500}
.iconify-dropdown a:hover{background:var(--primary-bg);color:var(--primary)}

/* ===== Icon sets overlay ===== */
.icon-sets-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:2000;backdrop-filter:blur(4px)}
.icon-sets-modal{background:var(--card-bg);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);width:90%;max-width:420px;overflow:hidden;animation:modalSlideIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94)}
.icon-sets-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--card-border)}
.icon-sets-header h3{margin:0;font-size:1rem;color:var(--text-primary);font-weight:700}
.icon-sets-header button{background:none;border:none;font-size:1.2rem;color:var(--text-muted);cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.2s}
.icon-sets-header button:hover{background:oklch(0.94 0.005 var(--hue));color:var(--text-primary)}
.icon-sets-body{padding:16px;max-height:60vh;overflow-y:auto}
.icon-set-item{display:block;padding:12px 16px;color:var(--text-secondary);text-decoration:none;font-size:0.9rem;border-radius:var(--radius-sm);transition:all 0.15s;font-weight:500}
.icon-set-item:hover{background:var(--primary-bg);color:var(--primary)}

/* ===== Anime card ===== */
.anime-card{display:flex;flex-direction:column;overflow:hidden}
.anime-cover{width:calc(100% + 40px);height:180px;object-fit:cover;border-radius:var(--radius-lg) var(--radius-lg) 0 0;margin:-20px -20px 14px -20px}
.anime-cover-placeholder{width:calc(100% + 40px);height:180px;background:var(--gradient-primary);border-radius:var(--radius-lg) var(--radius-lg) 0 0;margin:-20px -20px 14px -20px;display:flex;align-items:center;justify-content:center;color:var(--text-inverse);font-size:48px}
.progress-bar{width:100%;height:7px;background:oklch(0.9 0.005 var(--hue));border-radius:4px;overflow:hidden;margin:8px 0}
.progress-bar-fill{height:100%;border-radius:4px;transition:width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);background:linear-gradient(90deg,oklch(0.65 0.14 160),oklch(0.55 0.14 170))}
.anime-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.anime-genre-tag{background:oklch(0.92 0.005 var(--hue));padding:3px 10px;border-radius:14px;font-size:0.78rem;color:var(--text-muted);font-weight:500}
.anime-card-actions{margin-top:auto;padding-top:12px;display:flex;gap:8px;flex-wrap:wrap}

/* ===== Album card ===== */
.album-card{display:flex;flex-direction:column;overflow:hidden}
.album-cover{width:calc(100% + 40px);height:180px;border-radius:var(--radius-lg) var(--radius-lg) 0 0;overflow:hidden;display:flex;align-items:center;justify-content:center;background:oklch(0.96 0.005 var(--hue));margin:-20px -20px 0 -20px}
.album-cover img{width:100%;height:100%;object-fit:cover}
.album-cover-placeholder{width:calc(100% + 40px);height:180px;background:var(--gradient-primary);border-radius:var(--radius-lg) var(--radius-lg) 0 0;margin:-20px -20px 0 -20px;display:flex;align-items:center;justify-content:center;color:var(--text-inverse);font-size:48px}
.album-card .card-content{padding:16px 0 0;flex:1;display:flex;flex-direction:column}
.album-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.album-tag{background:oklch(0.92 0.005 var(--hue));padding:3px 10px;border-radius:14px;font-size:0.78rem;color:var(--text-muted);font-weight:500}
.album-card-actions{margin-top:auto;padding-top:12px;display:flex;gap:8px;flex-wrap:wrap}

/* ===== Photo row ===== */
.photo-row{display:flex;gap:8px;align-items:center;margin-bottom:8px;padding:10px 12px;background:oklch(0.97 0.005 var(--hue));border-radius:var(--radius-sm);border:1px solid var(--card-border)}
.photo-row input{flex:1;padding:7px 11px;border:1.5px solid var(--card-border);border-radius:var(--radius-sm);font-size:0.86rem;transition:all 0.2s;background:var(--card-bg);color:var(--text-primary)}
.photo-row input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg)}

/* ===== Detail view ===== */
.detail-cover{width:100%;max-height:300px;object-fit:cover;border-radius:var(--radius);margin-bottom:18px}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
@media(max-width:600px){.detail-grid{grid-template-columns:1fr}}
.detail-item label{font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.03em}
.detail-item span{font-weight:600;color:var(--text-primary)}

/* ===== Photo grid ===== */
.photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-top:14px}
.photo-thumb{width:100%;height:120px;object-fit:cover;border-radius:var(--radius-sm);cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;border:2px solid transparent}
.photo-thumb:hover{transform:scale(1.06);box-shadow:var(--shadow-md);border-color:var(--primary)}

/* ===== Lightbox ===== */
.lightbox{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:2000;justify-content:center;align-items:center;flex-direction:column;backdrop-filter:blur(8px)}
.lightbox.active{display:flex;animation:fadeIn 0.2s ease}
.lightbox img{max-width:90%;max-height:80%;object-fit:contain;border-radius:4px;box-shadow:0 20px 60px rgba(0,0,0,0.5)}
.lightbox-close{position:absolute;top:20px;right:30px;color:rgba(255,255,255,0.8);font-size:40px;cursor:pointer;z-index:2001;transition:color 0.2s}
.lightbox-close:hover{color:#fff}
.lightbox-prev,.lightbox-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.12);color:#fff;border:none;font-size:26px;padding:14px 18px;cursor:pointer;border-radius:50%;transition:all 0.2s}
.lightbox-prev:hover,.lightbox-next:hover{background:rgba(255,255,255,0.25)}
.lightbox-prev{left:24px}
.lightbox-next{right:24px}
.lightbox-info{color:rgba(255,255,255,0.75);font-size:0.88rem;margin-top:14px;text-align:center;font-weight:500}

/* ===== Tag stats (diary) ===== */
.tag-stats{margin-bottom:14px;display:flex;flex-wrap:wrap;gap:6px}

/* ===== Help section (posts) ===== */
.help-section h3{color:var(--text-primary);margin:16px 0 10px;font-size:1.05rem}
.help-section h4{color:var(--text-secondary);margin:12px 0 8px;font-size:0.95rem}
.help-section table{font-size:0.85rem}
.help-section ul,.help-section ol{margin:8px 0;padding-left:20px}
.help-section li{margin:4px 0;color:var(--text-secondary)}
.help-section code{background:oklch(0.94 0.005 var(--hue));padding:2px 8px;border-radius:4px;font-size:0.86rem;font-family:var(--font-mono);color:var(--primary)}
.help-section pre{background:oklch(0.94 0.005 var(--hue));padding:14px;border-radius:var(--radius-sm);font-size:0.85rem;overflow-x:auto;font-family:var(--font-mono);color:var(--text-primary);border:1px solid var(--card-border)}

/* ===== Markdown Help Modal ===== */
.help-nav .btn-sm{padding:6px 14px;font-size:0.82rem}

/* ===== Post scheme row ===== */
#postSchemeRow{margin:10px 0 16px;padding:12px 16px;background:oklch(0.97 0.005 var(--hue));border-radius:var(--radius);border:1px solid var(--card-border)}
#postSchemeRow label{font-weight:500;color:var(--text-secondary);font-size:0.86rem;cursor:pointer}

/* ===== Filter checkbox ===== */
.filter-checkbox{display:flex;align-items:center;gap:6px;font-size:0.86rem;color:var(--text-secondary);cursor:pointer;white-space:nowrap;font-weight:500}
.filter-checkbox input{margin:0;accent-color:var(--primary)}

/* ===== Modal large ===== */
.modal-large{max-width:850px!important}

/* ===== Selection ===== */
::selection{background:oklch(0.62 0.18 var(--hue) / 0.2);color:var(--text-primary)}
`;