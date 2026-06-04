// 3LINK Networks - Demo Navigator
// Injects a floating menu helper to switch between all pages easily.

document.addEventListener('DOMContentLoaded', () => {
  // Create container
  const navContainer = document.createElement('div');
  navContainer.id = 'demo-navigator-container';
  navContainer.className = 'fixed bottom-4 right-4 z-[9999] font-sans';
  
  // Floating trigger button
  const triggerBtn = document.createElement('button');
  triggerBtn.className = 'w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white focus:outline-none';
  triggerBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  `;
  
  // Drawer Panel (hidden by default)
  const drawer = document.createElement('div');
  drawer.className = 'fixed inset-y-0 right-0 w-80 bg-slate-900 text-slate-100 shadow-2xl p-6 overflow-y-auto transform translate-x-full transition-transform duration-300 ease-in-out border-l border-slate-800 flex flex-col z-[10000]';
  
  // Drawer Header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center pb-4 border-b border-slate-800 mb-6';
  header.innerHTML = `
    <div>
      <h3 class="font-bold text-lg text-white flex items-center gap-2">
        <span class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
        3LINK Demo Panel
      </h3>
      <p class="text-xs text-slate-400 mt-1">Select a screen to view design</p>
    </div>
    <button id="close-demo-drawer" class="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `;
  
  // Navigation categories
  const menuData = [
    {
      title: 'Portal & Common',
      items: [
        { name: '1. Splash & Role Selector', url: 'index.html' },
        { name: '2. Login / Register', url: 'login.html' }
      ]
    },
    {
      title: 'Customer App',
      items: [
        { name: '3. Dashboard (Home)', url: 'dashboard.html' },
        { name: '4. Recharge Screen', url: 'recharge.html' },
        { name: '5. Packages Screen', url: 'packages.html' },
        { name: '6. Internet Usage', url: 'usage.html' },
        { name: '7. Speed Test (Dark)', url: 'speedtest.html' },
        { name: '8. Payment / Usage History', url: 'history.html' },
        { name: '8b. Support Center', url: 'support.html' },
        { name: '10. Streaming Screen', url: 'streaming.html' },
        { name: '11. Shop Screen', url: 'shop.html' },
        { name: '12. Notifications', url: 'notifications.html' },
        { name: '12b. Profile & Settings', url: 'profile.html' }
      ]
    },
    {
      title: 'Reseller App',
      items: [
        { name: '14. Reseller Dashboard', url: 'reseller-dashboard.html' },
        { name: '15. User Management', url: 'reseller-users.html' }
      ]
    },
    {
      title: 'Employee / Tech App',
      items: [
        { name: '7b. Employee Attendance', url: 'employee-attendance.html' },
        { name: '16. My Tasks Queue', url: 'employee-tasks.html' },
        { name: '16b. Field Support (Map)', url: 'employee-support.html' },
        { name: '20. Complaint Details', url: 'employee-ticket.html' }
      ]
    },
    {
      title: 'Admin Web',
      items: [
        { name: '19. Admin Web Dashboard', url: 'admin-dashboard.html' }
      ]
    }
  ];
  
  // Build Menu Items
  const menuContainer = document.createElement('div');
  menuContainer.className = 'space-y-6 flex-grow';
  
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  menuData.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.innerHTML = `<h4 class="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">${group.title}</h4>`;
    
    const list = document.createElement('ul');
    list.className = 'space-y-1.5';
    
    group.items.forEach(item => {
      const itemEl = document.createElement('li');
      const isCurrent = currentPath === item.url;
      itemEl.innerHTML = `
        <a href="${item.url}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
          isCurrent 
            ? 'bg-blue-600/20 text-blue-400 font-medium border border-blue-500/30' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
        }">
          <span>${item.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500 group-hover:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      `;
      list.appendChild(itemEl);
    });
    
    groupEl.appendChild(list);
    menuContainer.appendChild(groupEl);
  });
  
  // Add elements
  drawer.appendChild(header);
  drawer.appendChild(menuContainer);
  
  // Add toggle mechanics
  let isOpen = false;
  
  const toggleDrawer = () => {
    isOpen = !isOpen;
    if (isOpen) {
      drawer.style.transform = 'translateX(0)';
      triggerBtn.classList.add('rotate-90');
    } else {
      drawer.style.transform = 'translateX(100%)';
      triggerBtn.classList.remove('rotate-90');
    }
  };
  
  triggerBtn.addEventListener('click', toggleDrawer);
  
  // Append to body
  document.body.appendChild(triggerBtn);
  document.body.appendChild(drawer);
  
  // Close button inside drawer
  document.getElementById('close-demo-drawer').addEventListener('click', toggleDrawer);

  // Inject hamburger button next to any notification/bell icons dynamically
  const bellIcons = document.querySelectorAll('[data-lucide="bell"]');
  if (bellIcons.length > 0) {
    // Hide the default floating trigger button on pages that have header bells
    triggerBtn.style.display = 'none';

    bellIcons.forEach(bell => {
      // Find the closest anchor link or button wrapper
      const bellLink = bell.closest('a') || bell.closest('button') || bell.parentElement;
      if (!bellLink) return;

      // Avoid double injection if script runs multiple times
      if (bellLink.nextElementSibling && bellLink.nextElementSibling.classList.contains('demo-nav-trigger-injected')) {
        return;
      }

      // Create hamburger button next to notification icon
      const hamburgerBtn = document.createElement('button');
      // Copy classes from bell link to look identical, adding margin
      hamburgerBtn.className = bellLink.className + ' demo-nav-trigger-injected focus:outline-none ml-2 md:ml-3';
      
      // Ensure positioning doesn't clip
      hamburgerBtn.style.position = 'relative';
      hamburgerBtn.style.display = 'inline-flex';
      hamburgerBtn.style.alignItems = 'center';
      hamburgerBtn.style.justifyContent = 'center';

      // Use a Lucide menu icon (three lines)
      const iconClass = bell.getAttribute('class') || 'w-5 h-5';
      hamburgerBtn.innerHTML = `<i data-lucide="menu" class="${iconClass}"></i>`;

      // Assign toggle click handler
      hamburgerBtn.onclick = (e) => {
        e.preventDefault();
        toggleDrawer();
      };

      // Insert it directly after the bell link
      bellLink.parentNode.insertBefore(hamburgerBtn, bellLink.nextSibling);
    });

    // Reinitialize Lucide to render newly added icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // Style overlay/backdrop click close if needed
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    #demo-navigator-container { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif; }
  `;
  document.head.appendChild(styleEl);
});
