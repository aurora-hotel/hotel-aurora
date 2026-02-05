// Mobile nav toggle (werkt op alle schermen but visible only on mobile via CSS)
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if(!navToggle || !nav) return;

  function openNav(open){
    if(open){
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded','true');
      document.body.classList.add('nav-open');
      // Keep documentElement overflow visible on desktop only; on mobile CSS sets overflow:hidden
      document.documentElement.style.overflow = ''; 
    } else {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      document.body.classList.remove('nav-open');
      document.documentElement.style.overflow = '';
    }
  }

  navToggle.addEventListener('click', (e)=>{
    const isOpen = nav.classList.contains('open');
    openNav(!isOpen);
  });

  // close when clicking a nav link (mobile)
  nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', () => {
      openNav(false);
    });
  });

  // close when clicking outside nav (mobile)
  document.addEventListener('click', (e)=>{
    if(!nav.classList.contains('open')) return;
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    if(path.includes(nav) || path.includes(navToggle)) return;
    openNav(false);
  });

  // close on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') openNav(false);
  });

  // set header height CSS var (used by mobile CSS)
  const header = document.getElementById('site-header');
  function setHeaderHeight(){
    if(!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);
  setHeaderHeight();
})();
