function resolvePath(obj, path) {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}

export async function loadPageContent(page) {
  try {
    const res = await fetch(`/content/${page}.json`);
    if (!res.ok) return;
    const content = await res.json();

    document.querySelectorAll('[data-content]').forEach(el => {
      const path = el.getAttribute('data-content');
      const value = resolvePath(content, path);
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll('[data-content-html]').forEach(el => {
      const path = el.getAttribute('data-content-html');
      const value = resolvePath(content, path);
      if (value != null) el.innerHTML = value;
    });
  } catch (e) {
    // Fallback: hardcoded HTML text remains visible
  }
}

export async function loadGlobalContent() {
  try {
    const res = await fetch('/content/global.json');
    if (!res.ok) return;
    const content = await res.json();

    document.querySelectorAll('[data-global]').forEach(el => {
      const path = el.getAttribute('data-global');
      const value = resolvePath(content, path);
      if (value != null) el.textContent = value;
    });
  } catch (e) {}
}
