// ============================================================
// THEME TOGGLE (broadcast to iframes)
// ============================================================
(function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    function toggleTheme() {
        htmlEl.classList.toggle('dark');
        const isDark = htmlEl.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                iframe.contentWindow.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
            } catch (_) { }
        });
    }

    const initialDark = htmlEl.classList.contains('dark');
    themeIcon.textContent = initialDark ? '☀️' : '🌙';
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
})();

// ============================================================
// MOBILE MENU
// ============================================================
(function () {
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileMenu() {
        if (mobileSidebar) mobileSidebar.classList.remove('-translate-x-full');
        if (mobileOverlay) mobileOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (mobileSidebar) mobileSidebar.classList.add('-translate-x-full');
        if (mobileOverlay) mobileOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });
    window.closeMobileMenu = closeMobileMenu;
})();

// ============================================================
// TOPIC LOADER with PERSISTENCE (hash + localStorage)
// ============================================================
(function () {
    const BASE_PATH = './assets/subject-topics/';
    const topicsList = document.getElementById('topicsList');
    const mobileTopicsList = document.getElementById('mobileTopicsList');
    const topicCount = document.getElementById('topicCount');
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const emptyState = document.getElementById('emptyState');
    const contentView = document.getElementById('contentView');
    const contentTitle = document.getElementById('contentTitle');
    const contentBadge = document.getElementById('contentBadge');
    const contentBody = document.getElementById('contentBody');
    const backBtn = document.getElementById('backBtn');
    const sidebarLoading = document.getElementById('sidebarLoading');

    let allTopics = [];
    let filteredTopics = [];
    let currentTopic = null;
    let jsonData = null;

    const LS_KEY = 'bcs_topic_last';
    const LS_START_DATE = 'bcs_50_start_date';
    const htmlEl = document.documentElement;

    // ── category helpers ──
    function detectCategory(filename) {
        const n = filename.toLowerCase();
        if (n.includes('bangla') || n.includes('বাংলা')) return 'bangla';
        if (n.includes('english') || n.includes('ইংরেজি') || n.includes('literature')) return 'english';
        if (n.includes('science') || n.includes('বিজ্ঞান')) return 'science';
        if (n.includes('math') || n.includes('গণিত')) return 'math';
        if (n.includes('ict') || n.includes('computer')) return 'ict';
        if (n.includes('gepgraphy') || n.includes('ভূগোল')) return 'geography';
        if (n.includes('ethics') || n.includes('নৈতিকতা')) return 'ethics';
        if (n.includes('routine')) return 'routine';
        return 'general';
    }

    function getCategoryLabel(c) {
        const map = {
            bangla: 'বাংলা',
            english: 'English',
            science: 'বিজ্ঞান',
            math: 'গণিত',
            ict: 'ICT',
            geography: 'ভূগোল',
            ethics: 'নৈতিকতা',
            routine: 'রুটিন',
            general: 'সাধারণ'
        };
        return map[c] || c;
    }

    function getCategoryBadge(c) { return 'badge-' + c; }

    // ── file discovery ──
    async function discoverFiles() {
        const known = [
            '01-bangla-grammer-topic.md', '01-bangla-letature-topic.md',
            '02-english-grammer-topic.md', '02-english-literature-topic.md',
            '03-bangladesh-affairs-topic.md',
            '04-international-topic.md',
            '05-gepgraphy-topic.md',
            '06-science-topic.md',
            '07-ict-topic.md',
            '08-math-topic.md',
            '09-mental-ability-topic.md',
            '10-ethics-topic.md',
            '11-routine.html',
            '11-routine.md',
            '12-02-eng-literature-daily-learn.json'
        ];
        const files = [];
        for (const f of known) {
            try {
                const r = await fetch(BASE_PATH + f);
                if (r.ok) files.push(f);
            } catch (_) { }
        }
        return files;
    }

    async function loadFile(filename) {
        try {
            const res = await fetch(BASE_PATH + filename);
            if (res.ok) {
                const content = await res.text();
                return { filename, content, success: true };
            }
        } catch (_) { }
        return { filename, success: false };
    }

    // ── load topics ──
    async function loadTopics() {
        try {
            const files = await discoverFiles();
            if (!files.length) {
                if (sidebarLoading) {
                    sidebarLoading.innerHTML =
                        `<div class="text-center py-4 text-slate-400 text-sm">No topics found</div>`;
                }
                return;
            }
            const results = [];
            for (const f of files) {
                const r = await loadFile(f);
                if (r.success) results.push(r);
            }
            allTopics = results;
            filteredTopics = [...allTopics];
            if (topicCount) topicCount.textContent = allTopics.length;
            if (allTopics.length > 0) {
                if (sidebarLoading) sidebarLoading.classList.add('hidden');
                renderTopics(allTopics);
            }
        } catch (e) {
            if (sidebarLoading) {
                sidebarLoading.innerHTML = `<div class="text-center py-4 text-red-400 text-sm">Failed to load topics</div>`;
            }
            console.error(e);
        }
    }

    // ── render topics ──
    function renderTopics(topics) {
        if (!topics.length) {
            const empty = `<div class="text-center py-4 text-slate-400 text-sm">No topics match</div>`;
            if (topicsList) topicsList.innerHTML = empty;
            if (mobileTopicsList) mobileTopicsList.innerHTML = empty;
            return;
        }
        let html = '';
        for (const topic of topics) {
            const name = topic.filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
            const cat = detectCategory(topic.filename);
            const label = getCategoryLabel(cat);
            const badge = getCategoryBadge(cat);
            const active = currentTopic === topic.filename;
            html += `
                <div class="topic-item ${active ? 'active' : ''} px-3 py-2.5 rounded-xl transition-all"
                     onclick="window.selectTopic('${topic.filename}')">
                    <div class="flex items-center justify-between">
                        <span class="topic-name text-sm font-medium text-slate-700 dark:text-slate-300 truncate">${name}</span>
                        <span class="badge ${badge} flex-shrink-0 ml-2">${label}</span>
                    </div>
                </div>
            `;
        }
        if (topicsList) topicsList.innerHTML = html;
        if (mobileTopicsList) mobileTopicsList.innerHTML = html;

        if (mobileTopicsList) {
            mobileTopicsList.querySelectorAll('.topic-item').forEach((el, i) => {
                el.onclick = () => {
                    const t = filteredTopics[i];
                    if (t) {
                        selectTopic(t.filename);
                        if (window.closeMobileMenu) window.closeMobileMenu();
                    }
                };
            });
        }
    }

    // ── interactive JSON view ──
    function renderJsonView(data) {
        jsonData = data;

        const dataLength = jsonData?.length || 50;
        // Fixed start date: set once on first visit, never change
        let startDateStr = localStorage.getItem(LS_START_DATE);
        if (!startDateStr) {
            startDateStr = new Date().toISOString().split('T')[0];
            localStorage.setItem(LS_START_DATE, startDateStr);
        }
        const startDate = new Date(startDateStr);
        const today = new Date();
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        let currentDay = diffDays + 1;
        if (currentDay < 1) currentDay = 1;
        if (currentDay > dataLength) currentDay = dataLength;

        const total = dataLength;
        const done = Math.min(currentDay, total);
        const progress = Math.round((done / total) * 100);

        // Today's date string
        const todayStr = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let currentTab = 'today';

        function renderView(tab) {
            currentTab = tab;
            const container = contentBody;
            container.innerHTML = '';

            // Header with date, progress bar, start date
            const headerDiv = document.createElement('div');
            headerDiv.className = 'mb-4 flex flex-wrap items-center justify-between gap-2';
            headerDiv.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium">📅 ${todayStr}</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium">Progress</span>
                    <div class="w-32 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style="width:${progress}%"></div>
                    </div>
                    <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${done}/${total}</span>
                </div>
                <div class="text-xs text-slate-400">Started: ${startDateStr}</div>
            `;
            container.appendChild(headerDiv);

            // Tab buttons with active bg color - ensure active class works
            const tabDiv = document.createElement('div');
            tabDiv.className = 'flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2';
            tabDiv.innerHTML = `
                <button class="tab-btn ${tab === 'today' ? 'active' : ''} px-4 py-1.5 rounded-lg text-sm font-medium transition" data-tab="today">📅 Today</button>
                <button class="tab-btn ${tab === 'all' ? 'active' : ''} px-4 py-1.5 rounded-lg text-sm font-medium transition" data-tab="all">📚 All Topics</button>
            `;
            container.appendChild(tabDiv);

            // Add a style block to ensure active tab has background
            const style = document.createElement('style');
            style.textContent = `
                .tab-btn.active {
                    background: #4f46e5 !important;
                    color: white !important;
                }
                .dark .tab-btn.active {
                    background: #4f46e5 !important;
                    color: white !important;
                }
            `;
            container.appendChild(style);

            const contentDiv = document.createElement('div');
            contentDiv.id = 'tabContent';
            container.appendChild(contentDiv);

            tabDiv.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const newTab = this.dataset.tab;
                    renderView(newTab);
                });
            });

            function renderTabContent(tab) {
                const tabContent = document.getElementById('tabContent');
                tabContent.innerHTML = '';

                if (tab === 'today') {
                    const dayData = data.find(d => d.day === currentDay);
                    if (!dayData) {
                        tabContent.innerHTML = `<p class="text-center text-slate-500">No data for day ${currentDay}</p>`;
                        return;
                    }
                    const card = document.createElement('div');
                    card.className = 'p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50';
                    card.innerHTML = `
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <span class="badge-cat">${dayData.category}</span>
                                <span class="text-xs text-slate-400">Day ${dayData.day}</span>
                            </div>
                            <h3 class="text-xl font-bold">${dayData.topic}</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-300 mt-2">${dayData.summary}</p>
                            <div class="mt-3 text-sm">
                                <h4 class="font-semibold">Key Details</h4>
                                <ul class="list-disc pl-5 mt-1 space-y-1">
                                    ${Object.entries(dayData.key_details).map(([key, val]) => `<li><strong>${key.replace(/_/g, ' ')}</strong>: ${val}</li>`).join('')}
                                </ul>
                            </div>
                            ${dayData.bcs_past_mcqs ? `
                                <div class="mt-3 text-sm">
                                    <h4 class="font-semibold">BCS Past MCQs</h4>
                                    <ul class="list-disc pl-5 mt-1 space-y-1">
                                        ${dayData.bcs_past_mcqs.map(q => `<li>${q}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${dayData['15min_task'] ? `
                                <div class="mt-3 text-sm bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                                    <strong>🎯 15‑min Task:</strong> ${dayData['15min_task']}
                                </div>
                            ` : ''}
                        </div>
                    `;
                    tabContent.appendChild(card);

                } else {
                    // All topics – paginated with full details always visible
                    const pageSize = 10;
                    let currentPage = parseInt(localStorage.getItem('bcs_50_page') || '1');
                    const totalPages = Math.ceil(data.length / pageSize);
                    if (currentPage < 1) currentPage = 1;
                    if (currentPage > totalPages) currentPage = totalPages;

                    const start = (currentPage - 1) * pageSize;
                    const end = Math.min(start + pageSize, data.length);
                    const pageItems = data.slice(start, end);

                    const grid = document.createElement('div');
                    grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-3';

                    pageItems.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50';
                        card.innerHTML = `
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="badge-cat">${item.category}</span>
                                    <span class="text-xs text-slate-400">Day ${item.day}</span>
                                </div>
                                <h4 class="font-semibold">${item.topic}</h4>
                                <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">${item.summary}</p>
                                <div class="mt-2 text-xs">
                                    <div class="mt-1">
                                        <h5 class="font-semibold text-sm">Key Details</h5>
                                        <ul class="list-disc pl-5 mt-1 space-y-1">
                                            ${Object.entries(item.key_details).map(([key, val]) => `<li><strong>${key.replace(/_/g, ' ')}</strong>: ${val}</li>`).join('')}
                                        </ul>
                                    </div>
                                    ${item.bcs_past_mcqs ? `
                                        <div class="mt-2">
                                            <h5 class="font-semibold text-sm">BCS Past MCQs</h5>
                                            <ul class="list-disc pl-5 mt-1 space-y-1">
                                                ${item.bcs_past_mcqs.map(q => `<li>${q}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                    ${item['15min_task'] ? `
                                        <div class="mt-2 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg">
                                            <strong>🎯 15‑min Task:</strong> ${item['15min_task']}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                        grid.appendChild(card);
                    });

                    tabContent.appendChild(grid);

                    const pagination = document.createElement('div');
                    pagination.className = 'flex justify-center items-center gap-4 mt-4 text-sm';
                    pagination.innerHTML = `
                        <button class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" id="prevPage">← Prev</button>
                        <span>Page ${currentPage} of ${totalPages}</span>
                        <button class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}" id="nextPage">Next →</button>
                    `;
                    tabContent.appendChild(pagination);

                    pagination.querySelector('#prevPage').addEventListener('click', function () {
                        if (currentPage > 1) {
                            currentPage--;
                            localStorage.setItem('bcs_50_page', currentPage);
                            renderView('all');
                        }
                    });
                    pagination.querySelector('#nextPage').addEventListener('click', function () {
                        if (currentPage < totalPages) {
                            currentPage++;
                            localStorage.setItem('bcs_50_page', currentPage);
                            renderView('all');
                        }
                    });
                }
            }

            renderTabContent(tab);
        }

        renderView('today');
    }

    // ── select topic ──
    function selectTopic(filename) {
        if (currentTopic === filename) {
            return;
        }
        const topic = allTopics.find(t => t.filename === filename);
        if (!topic) return;
        currentTopic = filename;
        const name = topic.filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        const cat = detectCategory(topic.filename);
        const label = getCategoryLabel(cat);
        const badge = getCategoryBadge(cat);

        if (contentTitle) contentTitle.textContent = name;
        if (contentBadge) contentBadge.innerHTML = `<span class="badge ${badge}">${label}</span>`;
        if (contentBody) contentBody.innerHTML = '';

        if (topic.filename.endsWith('.json')) {
            try {
                const data = JSON.parse(topic.content);
                renderJsonView(data);
                if (emptyState) emptyState.classList.add('hidden');
                if (contentView) contentView.classList.remove('hidden');
                const hash = filename.replace(/\.[^.]+$/, '');
                if (window.location.hash !== '#' + hash) {
                    window.history.pushState({}, '', '#' + hash);
                }
                localStorage.setItem(LS_KEY, filename);
                document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
                document.querySelectorAll(`.topic-item[onclick="window.selectTopic('${filename}')"]`)
                    .forEach(el => el.classList.add('active'));
                if (contentView) contentView.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            } catch (e) {
                console.error('Invalid JSON', e);
                contentBody.innerHTML = `<div class="text-red-500">Error loading JSON data</div>`;
                return;
            }
        }

        if (topic.filename.endsWith('.html')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'iframe-wrapper';
            const iframe = document.createElement('iframe');
            iframe.srcdoc = topic.content;
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-modals');
            iframe.style.width = '100%';
            iframe.style.height = 'auto';
            iframe.style.border = 'none';
            iframe.style.background = '#fff';

            iframe.onload = function () {
                try {
                    const body = this.contentWindow.document.body;
                    const html = this.contentWindow.document.documentElement;
                    const height = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight);
                    this.style.height = height + 'px';
                } catch (_) { }
            };

            setTimeout(() => {
                try {
                    iframe.contentWindow.postMessage({
                        theme: htmlEl.classList.contains('dark') ? 'dark' : 'light'
                    }, '*');
                } catch (_) { }
            }, 300);

            wrapper.appendChild(iframe);
            if (contentBody) contentBody.appendChild(wrapper);
        } else {
            if (contentBody && typeof marked !== 'undefined') {
                contentBody.innerHTML = marked.parse(topic.content);
                contentBody.classList.add('markdown-content');
            }
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (contentView) contentView.classList.remove('hidden');

        document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll(`.topic-item[onclick="window.selectTopic('${filename}')"]`)
            .forEach(el => el.classList.add('active'));

        const hash = filename.replace(/\.[^.]+$/, '');
        if (window.location.hash !== '#' + hash) {
            window.history.pushState({}, '', '#' + hash);
        }
        localStorage.setItem(LS_KEY, filename);

        if (contentView) contentView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.selectTopic = selectTopic;

    // ── filter ──
    function filterTopics(query) {
        const q = query.toLowerCase().trim();
        filteredTopics = q ? allTopics.filter(t => t.filename.toLowerCase().includes(q)) : [...allTopics];
        renderTopics(filteredTopics);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterTopics(e.target.value));
    }
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            filterTopics(e.target.value);
            if (searchInput) searchInput.value = e.target.value;
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (mobileSearchInput) mobileSearchInput.value = e.target.value;
        });
    }

    // ── hash handler ──
    function handleHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const topic = allTopics.find(t => t.filename.replace(/\.[^.]+$/, '') === hash);
            if (topic) {
                selectTopic(topic.filename);
                return true;
            }
        }
        return false;
    }

    // ── back button ──
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (contentView) contentView.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            window.history.pushState({}, '', '#');
            document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
            localStorage.removeItem(LS_KEY);
            currentTopic = null;
            jsonData = null;
        });
    }

    // ── hash change ──
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const topic = allTopics.find(t => t.filename.replace(/\.[^.]+$/, '') === hash);
            if (topic && topic.filename !== currentTopic) {
                selectTopic(topic.filename);
            }
        } else {
            if (contentView) contentView.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
            localStorage.removeItem(LS_KEY);
            currentTopic = null;
            jsonData = null;
        }
    });

    // ============================================================
    // BOOT – load topics then restore from hash or localStorage
    // ============================================================
    document.addEventListener('DOMContentLoaded', async () => {
        await loadTopics();

        const hashOk = handleHash();

        if (!hashOk && allTopics.length > 0) {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                const topic = allTopics.find(t => t.filename === saved);
                if (topic) {
                    selectTopic(topic.filename);
                    return;
                }
            }
            selectTopic(allTopics[0].filename);
        }
    });
})();