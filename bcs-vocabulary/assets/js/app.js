// =====================================================
// CONFIGURATION
// =====================================================

const DATA_FILES = [
    "./data/a/set-01.json",
    // Add more files here
];

const state = {
    words: [],
    filteredWords: [],
    currentPage: 1,
    itemsPerPage: 10,

    selectedLetter: "all",
    selectedSet: "all",

    practice: {
        questions: [],
        currentPage: 1,
        itemsPerPage: 10,
        answered: {},
        score: 0,
        total: 0,
        type: 'mixed',
        completed: false,
        questionData: {},
    },

    exam: {
        questions: [],
        currentPage: 1,
        itemsPerPage: 10,
        answered: {},
        score: 0,
        total: 0,
        type: 'mixed',
        timeLimit: 10,
        timeRemaining: 0,
        timerInterval: null,
        started: false,
        completed: false,
        questionData: {},
    }
};


// =====================================================
// DOM
// =====================================================

const totalWords = document.getElementById("totalWords");

const vocabularyTab = document.getElementById("vocabularyTab");
const practiceTab = document.getElementById("practiceTab");
const examTab = document.getElementById("examTab");

const vocabularyView = document.getElementById("vocabularyView");
const practiceView = document.getElementById("practiceView");
const examView = document.getElementById("examView");

const searchInput = document.getElementById("searchInput");
const setSelect = document.getElementById("setSelect");
const letterFilters = document.getElementById("letterFilters");
const vocabularyList = document.getElementById("vocabularyList");
const paginationContainer = document.getElementById("paginationContainer");

// Theme
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Practice
const practiceType = document.getElementById("practiceType");
const practiceCount = document.getElementById("practiceCount");
const startPractice = document.getElementById("startPractice");
const practiceQuizContainer = document.getElementById("practiceQuizContainer");
const practiceQuestions = document.getElementById("practiceQuestions");
const practicePagination = document.getElementById("practicePagination");
const practiceCounter = document.getElementById("practiceCounter");
const practiceScore = document.getElementById("practiceScore");
const exitPractice = document.getElementById("exitPractice");

// Exam
const examCount = document.getElementById("examCount");
const examType = document.getElementById("examType");
const examTime = document.getElementById("examTime");
const startExam = document.getElementById("startExam");
const examContainer = document.getElementById("examContainer");
const examQuestions = document.getElementById("examQuestions");
const examPagination = document.getElementById("examPagination");
const examCounter = document.getElementById("examCounter");
const examScore = document.getElementById("examScore");
const examTimer = document.getElementById("examTimer");
const exitExam = document.getElementById("exitExam");


// =====================================================
// THEME
// =====================================================

function initTheme() {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('bcs-theme');
    const isDark = savedTheme === 'dark' || (savedTheme === null && true); // Default dark

    if (isDark) {
        document.documentElement.classList.add('dark');
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        `;
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        `;
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('bcs-theme', isDark ? 'dark' : 'light');

    if (isDark) {
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        `;
    } else {
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        `;
    }
}


// =====================================================
// INIT
// =====================================================

document.addEventListener("DOMContentLoaded", init);

async function init() {
    initTheme();
    themeToggle.addEventListener("click", toggleTheme);

    await loadVocabulary();
    setupTabs();
    setupSearch();
    setupPractice();
    setupExam();
    renderLetters();
    renderSets();
    applyFilters();
}


// =====================================================
// LOAD JSON
// =====================================================

async function loadVocabulary() {
    try {
        const responses = await Promise.all(
            DATA_FILES.map((file) => fetch(file))
        );

        const datasets = await Promise.all(
            responses.map((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${response.url}`);
                }
                return response.json();
            })
        );

        state.words = datasets.flatMap((dataset) =>
            dataset.words.map((word) => ({
                ...word,
                letter: dataset.letter,
                set: dataset.set,
                createdAt: dataset.createdAt,
            }))
        );

        state.filteredWords = [...state.words];
        totalWords.textContent = state.words.length;

    } catch (error) {
        console.error(error);
        vocabularyList.innerHTML = `
            <div class="col-span-full rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-red-700 dark:text-red-400">
                <p class="font-semibold">Failed to load vocabulary.</p>
                <p class="mt-1 text-sm">Run this project through a local server.</p>
            </div>
        `;
    }
}


// =====================================================
// TABS
// =====================================================

function setupTabs() {
    vocabularyTab.addEventListener("click", () => showTab('vocabulary'));
    practiceTab.addEventListener("click", () => showTab('practice'));
    examTab.addEventListener("click", () => showTab('exam'));
}

function showTab(tab) {
    if (tab !== 'exam' && state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
        state.exam.timerInterval = null;
    }

    vocabularyView.classList.add("hidden");
    practiceView.classList.add("hidden");
    examView.classList.add("hidden");

    vocabularyTab.className = "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700";
    practiceTab.className = "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700";
    examTab.className = "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700";

    if (tab === 'vocabulary') {
        vocabularyView.classList.remove("hidden");
        vocabularyTab.className = "flex-1 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg";
    } else if (tab === 'practice') {
        practiceView.classList.remove("hidden");
        practiceTab.className = "flex-1 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg";
    } else if (tab === 'exam') {
        examView.classList.remove("hidden");
        examTab.className = "flex-1 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg";
    }
}


// =====================================================
// SEARCH & FILTERS
// =====================================================

function setupSearch() {
    searchInput.addEventListener("input", () => {
        state.currentPage = 1;
        applyFilters();
    });

    setSelect.addEventListener("change", () => {
        state.selectedSet = setSelect.value;
        state.currentPage = 1;
        applyFilters();
    });
}

function applyFilters() {
    const search = searchInput.value.trim().toLowerCase();

    state.filteredWords = state.words.filter((word) => {
        const letterMatch = state.selectedLetter === "all" || word.letter.toLowerCase() === state.selectedLetter;
        const setMatch = state.selectedSet === "all" || String(word.set) === state.selectedSet;
        const searchMatch = !search ||
            word.word.toLowerCase().includes(search) ||
            word.meaning.toLowerCase().includes(search);

        return letterMatch && setMatch && searchMatch;
    });

    renderVocabulary();
    renderPagination();
}


// =====================================================
// LETTERS
// =====================================================

function renderLetters() {
    const letters = [
        "all",
        ...new Set(state.words.map((word) => word.letter.toLowerCase()).sort()),
    ];

    letterFilters.innerHTML = letters
        .map(
            (letter) => `
                <button
                    data-letter="${letter}"
                    class="rounded-lg px-4 py-2 text-xs font-bold transition-all ${state.selectedLetter === letter
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md"
                    : "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                }"
                >
                    ${letter === "all" ? "All" : letter.toUpperCase()}
                </button>
            `
        )
        .join("");

    letterFilters.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            state.selectedLetter = button.dataset.letter;
            state.currentPage = 1;
            renderLetters();
            applyFilters();
        });
    });
}


// =====================================================
// SETS
// =====================================================

function renderSets() {
    const sets = [...new Set(state.words.map((word) => word.set))].sort((a, b) => a - b);

    setSelect.innerHTML = `
        <option value="all">All Sets</option>
        ${sets
            .map(
                (set) => `
                    <option value="${set}">Set ${String(set).padStart(2, "0")}</option>
                `
            )
            .join("")}
    `;
}


// =====================================================
// PAGINATION
// =====================================================

function renderPagination() {
    const totalItems = state.filteredWords.length;
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = `
            <div class="text-sm text-slate-500 dark:text-slate-400">${totalItems} words found</div>
        `;
        return;
    }

    const startItem = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endItem = Math.min(state.currentPage * state.itemsPerPage, totalItems);

    let paginationHTML = `
        <div class="flex items-center gap-2 text-sm flex-wrap">
            <span class="text-slate-500 dark:text-slate-400">${startItem}-${endItem} of ${totalItems}</span>
            <div class="flex gap-1">
                <button data-page="prev" class="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-700 ${state.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }">←</button>
    `;

    const maxVisible = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        paginationHTML += `<button data-page="1" class="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-700">1</button>`;
        if (startPage > 2) paginationHTML += `<span class="px-1">…</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button data-page="${i}" class="rounded-lg px-3 py-1 transition ${i === state.currentPage
                ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md"
                : "hover:bg-slate-100 dark:hover:bg-slate-700"
            }">${i}</button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) paginationHTML += `<span class="px-1">…</span>`;
        paginationHTML += `<button data-page="${totalPages}" class="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-700">${totalPages}</button>`;
    }

    paginationHTML += `
                <button data-page="next" class="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-700 ${state.currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }">→</button>
            </div>
            <select id="itemsPerPageSelect" class="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-400">
                <option value="5">5</option>
                <option value="10" ${state.itemsPerPage === 10 ? "selected" : ""}>10</option>
                <option value="20" ${state.itemsPerPage === 20 ? "selected" : ""}>20</option>
                <option value="50" ${state.itemsPerPage === 50 ? "selected" : ""}>50</option>
                <option value="100" ${state.itemsPerPage === 100 ? "selected" : ""}>100</option>
            </select>
        </div>
    `;

    paginationContainer.innerHTML = paginationHTML;

    paginationContainer.querySelectorAll("[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = btn.dataset.page;
            if (page === "prev" && state.currentPage > 1) {
                state.currentPage--;
            } else if (page === "next" && state.currentPage < totalPages) {
                state.currentPage++;
            } else if (page !== "prev" && page !== "next") {
                state.currentPage = parseInt(page);
            }
            renderVocabulary();
            renderPagination();
        });
    });

    const itemsPerPageSelect = document.getElementById("itemsPerPageSelect");
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener("change", (e) => {
            state.itemsPerPage = parseInt(e.target.value);
            state.currentPage = 1;
            renderVocabulary();
            renderPagination();
        });
    }
}


// =====================================================
// VOCABULARY - No truncation, full content visible
// =====================================================

function renderVocabulary() {
    if (!state.filteredWords.length) {
        vocabularyList.innerHTML = `
            <div class="col-span-full rounded-2xl bg-white/80 dark:bg-slate-800/80 p-10 text-center shadow-sm backdrop-blur-sm">
                <p class="font-semibold text-slate-700 dark:text-slate-300">No vocabulary found.</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try another search or filter.</p>
            </div>
        `;
        return;
    }

    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = Math.min(start + state.itemsPerPage, state.filteredWords.length);
    const pageItems = state.filteredWords.slice(start, end);

    vocabularyList.innerHTML = pageItems
        .map(
            (word) => `
                <article class="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 p-4 shadow-sm transition-all hover:shadow-lg backdrop-blur-sm">
                    <!-- Word Header with Serial Index -->
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                ${word.serialIndex ? `
                                    <span class="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm whitespace-nowrap">
                                        #${word.serialIndex}
                                    </span>
                                ` : ''}
                                <span class="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                                    ${word.letter}
                                </span>
                                <span class="text-xs text-slate-400 dark:text-slate-500">·</span>
                                <span class="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Set ${String(word.set).padStart(2, "0")}</span>
                            </div>
                            <h2 class="mt-1 text-lg font-black text-slate-800 dark:text-slate-100">
                                ${word.word}
                            </h2>
                        </div>
                    </div>

                    <!-- Meaning -->
                    <div class="mt-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-2.5 border border-indigo-100/50 dark:border-indigo-800/50">
                        <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 break-words">${word.meaning}</p>
                    </div>

                    <!-- Synonyms & Antonyms in Table Layout -->
                    <div class="mt-3 border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden">
                        <!-- Synonyms Row -->
                        <div class="grid grid-cols-12 gap-0 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div class="col-span-3 bg-indigo-50/50 dark:bg-indigo-900/20 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                                Synonyms
                            </div>
                            <div class="col-span-9 px-3 py-2 divide-y divide-slate-100 dark:divide-slate-700">
                                ${word.synonyms.map((item, idx) => `
                                    <div class="flex items-center gap-2 ${idx > 0 ? 'pt-1.5' : ''} ${idx < word.synonyms.length - 1 ? 'pb-1.5' : ''}">
                                        <span class="font-semibold text-slate-800 dark:text-slate-200 text-sm whitespace-nowrap">${item.word}</span>
                                        <span class="text-slate-300 dark:text-slate-600">·</span>
                                        <span class="text-slate-500 dark:text-slate-400 text-xs">${item.meaning}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Antonyms Row -->
                        <div class="grid grid-cols-12 gap-0">
                            <div class="col-span-3 bg-purple-50/50 dark:bg-purple-900/20 px-3 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center">
                                Antonyms
                            </div>
                            <div class="col-span-9 px-3 py-2 divide-y divide-slate-100 dark:divide-slate-700">
                                ${word.antonyms.map((item, idx) => `
                                    <div class="flex items-center gap-2 ${idx > 0 ? 'pt-1.5' : ''} ${idx < word.antonyms.length - 1 ? 'pb-1.5' : ''}">
                                        <span class="font-semibold text-slate-800 dark:text-slate-200 text-sm whitespace-nowrap">${item.word}</span>
                                        <span class="text-slate-300 dark:text-slate-600">·</span>
                                        <span class="text-slate-500 dark:text-slate-400 text-xs">${item.meaning}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </article>
            `
        )
        .join("");
}

// =====================================================
// GENERATE QUESTION DATA
// =====================================================

// =====================================================
// GENERATE QUESTION DATA - Enhanced with confusing words
// =====================================================

function generateQuestionData(word, type) {
    const isSynonym = type === 'synonym' || (type === 'mixed' && Math.random() >= 0.5);
    const actualType = isSynonym ? 'synonym' : 'antonym';
    const answerList = isSynonym ? word.synonyms : word.antonyms;

    if (!answerList || answerList.length === 0) {
        return null;
    }

    // Get all items with their meanings
    const allItems = answerList.map(item => ({
        word: item.word,
        meaning: item.meaning
    }));

    // Select random correct answer
    const correctIndex = Math.floor(Math.random() * allItems.length);
    const correct = allItems[correctIndex];

    // Build options with confusing words for BCS level
    let options = [];
    const usedWords = new Set([correct.word]);

    // 1. First, try to get confusing words if available
    if (word.confusing_words && word.confusing_words.length > 0) {
        // Shuffle confusing words and pick up to 2
        const shuffledConfusing = shuffle([...word.confusing_words]);
        let confusingCount = 0;

        for (const conf of shuffledConfusing) {
            if (!usedWords.has(conf.word) && confusingCount < 2) {
                options.push({
                    word: conf.word,
                    meaning: conf.meaning,
                    source: 'confusing'
                });
                usedWords.add(conf.word);
                confusingCount++;
            }
        }
    }

    // 2. Get similar words from other words with same letter
    const sameLetterWords = state.words.filter(w =>
        w.letter === word.letter &&
        w.id !== word.id
    );

    // Shuffle and get random words
    const shuffledSameLetter = shuffle(sameLetterWords);
    for (const w of shuffledSameLetter) {
        if (options.length >= 3) break;

        // Try to get a relevant synonym/antonym from this word
        const candidates = isSynonym ? w.synonyms : w.antonyms;
        if (candidates && candidates.length > 0) {
            const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
            if (!usedWords.has(randomCandidate.word)) {
                options.push({
                    word: randomCandidate.word,
                    meaning: randomCandidate.meaning,
                    source: 'related'
                });
                usedWords.add(randomCandidate.word);
            }
        }
    }

    // 3. If still need more options, get random words from entire vocabulary
    if (options.length < 3) {
        const allCandidates = state.words
            .filter(w => w.id !== word.id)
            .flatMap(w => isSynonym ? w.synonyms : w.antonyms)
            .filter(item => !usedWords.has(item.word));

        const shuffled = shuffle(allCandidates);
        for (const cand of shuffled) {
            if (options.length >= 3) break;
            if (!usedWords.has(cand.word)) {
                options.push({
                    word: cand.word,
                    meaning: cand.meaning,
                    source: 'general'
                });
                usedWords.add(cand.word);
            }
        }
    }

    // Add the correct answer
    options.push({
        word: correct.word,
        meaning: correct.meaning,
        source: 'correct',
        isCorrect: true
    });

    // Shuffle final options
    options = shuffle(options);

    // Prepare explanation with all confusing words if available
    let confusingWordsHTML = '';
    if (word.confusing_words && word.confusing_words.length > 0) {
        confusingWordsHTML = `
            <div class="rounded-lg bg-amber-50/70 dark:bg-amber-900/20 p-3 border border-amber-200 dark:border-amber-800 mt-3">
                <p class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">⚠️ Confusing Words (Similar Sound/Spelling)</p>
                <div class="flex flex-wrap gap-1.5">
                    ${word.confusing_words.map(cw => `
                        <span class="inline-flex items-center gap-1 rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs border border-amber-200 dark:border-amber-700">
                            <span class="font-medium text-amber-700 dark:text-amber-300">${cw.word}</span>
                            <span class="text-slate-300 dark:text-slate-600">·</span>
                            <span class="text-slate-500 dark:text-slate-400">${cw.meaning}</span>
                        </span>
                    `).join(' ')}
                </div>
            </div>
        `;
    }

    return {
        word: word,
        type: actualType,
        typeDisplay: isSynonym ? 'Synonym' : 'Antonym',
        correct: correct,
        options: options,
        allSynonyms: word.synonyms || [],
        allAntonyms: word.antonyms || [],
        confusingWords: word.confusing_words || [],
        examLevel: word.exam_level || 'intermediate',
        commonUsage: word.common_usage || '',
        tips: word.tips || '',
        confusingWordsHTML: confusingWordsHTML,
    };
}


// =====================================================
// RENDER QUESTION
// =====================================================

function renderQuestionHTML(questionData, globalIdx, isAnswered, answer, mode) {
    const {
        word,
        type,
        typeDisplay,
        correct,
        options,
        allSynonyms,
        allAntonyms,
        confusingWords,
    } = questionData;

    const isCorrect = isAnswered && answer?.isCorrect;

    return `
        <div class="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 p-5 shadow-sm transition-all hover:shadow-md backdrop-blur-sm">
            <!-- Question Header - With Serial Index -->
            <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-3 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                            ${typeDisplay}
                        </span>
                        ${word.serialIndex ? `
                            <span class="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">#${word.serialIndex}</span>
                            <span class="text-xs text-slate-400 dark:text-slate-500">·</span>
                        ` : ''}
                        <span class="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">Q${globalIdx + 1}</span>
                        <span class="text-xs text-slate-400 dark:text-slate-500">·</span>
                        <span class="text-xs text-slate-500 dark:text-slate-400 truncate">${word.word}</span>
                    </div>
                    
                    <p class="mt-2 text-base font-semibold text-slate-600 dark:text-slate-400">
                        Which is the ${type} of?
                    </p>
                    
                    <p class="mt-1 text-2xl font-black text-slate-800 dark:text-slate-100">${word.word}</p>
                </div>
                ${isAnswered ? `
                    <div class="flex-shrink-0">
                        <span class="inline-flex items-center rounded-full ${isCorrect ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'} px-3 py-1 text-sm font-bold">
                            ${isCorrect ? '✓' : '✗'}
                        </span>
                    </div>
                ` : ''}
            </div>

            <!-- Options -->
            <div class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                ${options.map(opt => `
                    <button
                        class="option-btn rounded-xl border-2 p-3 text-left text-sm font-medium transition-all ${isAnswered
            ? opt.word === correct.word
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default'
                : opt.word === answer?.selected
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 cursor-default'
                    : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-default'
            : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:shadow-md'
        }"
                        data-word-id="${word.id}"
                        data-question-index="${globalIdx}"
                        data-answer="${opt.word}"
                        data-mode="${mode}"
                        ${isAnswered ? 'disabled' : ''}
                    >
                        <span class="font-semibold">${opt.word}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Explanation Box -->
            ${isAnswered ? `
                <div class="mt-4 rounded-xl ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'} p-4">
                    <!-- Result header -->
                    <div class="flex items-center gap-3 flex-wrap">
                        <span class="text-lg font-bold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                            ${isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                        </span>
                        ${!isCorrect ? `
                            <span class="text-sm text-slate-600 dark:text-slate-400">
                                Correct answer: <span class="font-bold text-green-600 dark:text-green-400">${correct.word}</span>
                            </span>
                        ` : ''}
                    </div>

                    <!-- Word details -->
                    <div class="mt-3 space-y-3">
                        <!-- Main word with Serial Index and Bangla meaning -->
                        <div class="rounded-lg bg-white/70 dark:bg-slate-700/70 p-3 border border-slate-200 dark:border-slate-600">
                            <div class="flex items-center gap-2 flex-wrap">
                                ${word.serialIndex ? `
                                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500">#${word.serialIndex}</span>
                                    <span class="text-slate-300 dark:text-slate-600">·</span>
                                ` : ''}
                                <span class="font-bold text-slate-800 dark:text-slate-200">📖 ${word.word}</span>
                                <span class="text-slate-300 dark:text-slate-600">—</span>
                                <span class="text-slate-600 dark:text-slate-400">${word.meaning}</span>
                            </div>
                        </div>

                        <!-- Correct answer -->
                        <div class="rounded-lg bg-green-50/70 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-green-600 dark:text-green-400">✅ ${correct.word}</span>
                                <span class="text-slate-300 dark:text-slate-600">—</span>
                                <span class="text-slate-600 dark:text-slate-400">${correct.meaning}</span>
                                <span class="text-xs text-green-600 dark:text-green-400 font-semibold">(Correct ${type})</span>
                            </div>
                        </div>

                        <!-- All Synonyms -->
                        ${allSynonyms.length > 0 ? `
                            <div class="rounded-lg bg-indigo-50/70 dark:bg-indigo-900/20 p-3 border border-indigo-200 dark:border-indigo-800">
                                <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">📝 All Synonyms</p>
                                <div class="flex flex-wrap gap-1.5">
                                    ${allSynonyms.map(s => `
                                        <span class="inline-flex items-center gap-1 rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs border border-indigo-200 dark:border-indigo-700">
                                            <span class="font-medium text-indigo-700 dark:text-indigo-300">${s.word}</span>
                                            <span class="text-slate-300 dark:text-slate-600">·</span>
                                            <span class="text-slate-500 dark:text-slate-400">${s.meaning}</span>
                                        </span>
                                    `).join(' ')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- All Antonyms -->
                        ${allAntonyms.length > 0 ? `
                            <div class="rounded-lg bg-purple-50/70 dark:bg-purple-900/20 p-3 border border-purple-200 dark:border-purple-800">
                                <p class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">📝 All Antonyms</p>
                                <div class="flex flex-wrap gap-1.5">
                                    ${allAntonyms.map(a => `
                                        <span class="inline-flex items-center gap-1 rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs border border-purple-200 dark:border-purple-700">
                                            <span class="font-medium text-purple-700 dark:text-purple-300">${a.word}</span>
                                            <span class="text-slate-300 dark:text-slate-600">·</span>
                                            <span class="text-slate-500 dark:text-slate-400">${a.meaning}</span>
                                        </span>
                                    `).join(' ')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Confusing Words -->
                        ${confusingWords && confusingWords.length > 0 ? `
                            <div class="rounded-lg bg-amber-50/70 dark:bg-amber-900/20 p-3 border border-amber-200 dark:border-amber-800">
                                <p class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">⚠️ Similar Sounding / Confusing Words</p>
                                <div class="flex flex-wrap gap-1.5">
                                    ${confusingWords.map(cw => `
                                        <span class="inline-flex items-center gap-1 rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs border border-amber-200 dark:border-amber-700">
                                            <span class="font-medium text-amber-700 dark:text-amber-300">${cw.word}</span>
                                            <span class="text-slate-300 dark:text-slate-600">·</span>
                                            <span class="text-slate-500 dark:text-slate-400">${cw.meaning}</span>
                                        </span>
                                    `).join(' ')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// =====================================================
// PRACTICE FUNCTIONS (Same as before but with dark mode classes)
// =====================================================

function setupPractice() {
    startPractice.addEventListener("click", startPracticeQuiz);
    exitPractice.addEventListener("click", exitPracticeQuiz);
}

function startPracticeQuiz() {
    const count = practiceCount.value;
    const type = practiceType.value;

    let questions = [...state.words];

    if (type === 'synonym') {
        questions = questions.filter(w => w.synonyms && w.synonyms.length > 0);
    } else if (type === 'antonym') {
        questions = questions.filter(w => w.antonyms && w.antonyms.length > 0);
    }

    questions = shuffle(questions);

    if (count !== 'all') {
        questions = questions.slice(0, parseInt(count));
    }

    if (!questions.length) {
        alert("No questions available for the selected type!");
        return;
    }

    const questionData = {};
    questions.forEach((word, idx) => {
        const data = generateQuestionData(word, type);
        if (data) {
            questionData[idx] = data;
        }
    });

    const validQuestions = Object.keys(questionData).length;
    if (validQuestions === 0) {
        alert("No valid questions could be generated!");
        return;
    }

    state.practice = {
        questions: questions.filter((_, idx) => questionData[idx] !== undefined),
        currentPage: 1,
        itemsPerPage: Math.min(10, validQuestions),
        answered: {},
        score: 0,
        total: validQuestions,
        type: type,
        completed: false,
        questionData: questionData,
    };

    practiceQuizContainer.classList.remove("hidden");
    practiceQuestions.classList.remove("hidden");
    startPractice.textContent = "🔄 Restart Practice";

    renderPracticeQuestions();
    renderPracticePagination();
    updatePracticeStats();
}

function renderPracticeQuestions() {
    const { questions, currentPage, itemsPerPage, answered, questionData } = state.practice;
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, questions.length);
    const pageItems = questions.slice(start, end);

    if (!pageItems.length) {
        practiceQuestions.innerHTML = `
            <div class="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-8 text-center shadow-sm">
                <p class="text-slate-500 dark:text-slate-400">No questions on this page.</p>
            </div>
        `;
        return;
    }

    practiceQuestions.innerHTML = pageItems
        .map((word, idx) => {
            const globalIdx = start + idx;
            const qData = questionData[globalIdx];
            if (!qData) return '';

            const isAnswered = answered[globalIdx] !== undefined;
            const answer = answered[globalIdx];

            return renderQuestionHTML(qData, globalIdx, isAnswered, answer, 'practice');
        })
        .filter(html => html)
        .join('');

    document.querySelectorAll('.option-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', handlePracticeAnswer);
    });

    // REMOVED: practiceQuestions.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handlePracticeAnswer(e) {
    const btn = e.currentTarget;
    const questionIndex = parseInt(btn.dataset.questionIndex);
    const selectedAnswer = btn.dataset.answer;

    if (state.practice.answered[questionIndex] !== undefined) return;

    const qData = state.practice.questionData[questionIndex];
    if (!qData) return;

    const isCorrect = selectedAnswer === qData.correct.word;

    state.practice.answered[questionIndex] = {
        selected: selectedAnswer,
        correct: qData.correct.word,
        isCorrect: isCorrect,
    };

    if (isCorrect) {
        state.practice.score++;
        removeWrongAnswer(qData.word.id);
    } else {
        saveWrongAnswer(qData.word.id);
    }

    updatePracticeStats();
    renderPracticeQuestions();
    renderPracticePagination();

    if (Object.keys(state.practice.answered).length === state.practice.total) {
        state.practice.completed = true;
        setTimeout(() => {
            alert(`🎉 Practice Complete!\nScore: ${state.practice.score}/${state.practice.total}`);
        }, 300);
    }
}

function renderPracticePagination() {
    const { questions, currentPage, itemsPerPage, total, answered } = state.practice;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (totalPages <= 1) {
        practicePagination.innerHTML = '';
        return;
    }

    let html = '<div class="flex gap-1 flex-wrap">';
    for (let i = 1; i <= totalPages; i++) {
        const pageStart = (i - 1) * itemsPerPage;
        const pageEnd = Math.min(i * itemsPerPage, total);
        const answeredCount = Object.keys(answered)
            .filter(idx => parseInt(idx) >= pageStart && parseInt(idx) < pageEnd).length;

        html += `
            <button data-page="${i}" 
                class="rounded-lg px-3 py-1 text-sm transition ${i === currentPage
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
            } ${answeredCount === (pageEnd - pageStart) && answeredCount > 0 ? 'border-green-400 dark:border-green-600' : ''}"
            >
                ${i}
                ${answeredCount === (pageEnd - pageStart) && answeredCount > 0 ? '✓' : ''}
            </button>
        `;
    }
    html += '</div>';
    practicePagination.innerHTML = html;

    practicePagination.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.practice.currentPage = parseInt(btn.dataset.page);
            renderPracticeQuestions();
            renderPracticePagination();
        });
    });
}

function updatePracticeStats() {
    const total = state.practice.total;
    const answered = Object.keys(state.practice.answered).length;
    practiceCounter.textContent = `${answered}/${total} answered`;
    practiceScore.textContent = `Score: ${state.practice.score}`;
}

function exitPracticeQuiz() {
    practiceQuizContainer.classList.add("hidden");
    practiceQuestions.classList.add("hidden");
    startPractice.textContent = "Start Practice →";
    state.practice = {
        questions: [],
        currentPage: 1,
        itemsPerPage: 10,
        answered: {},
        score: 0,
        total: 0,
        type: 'mixed',
        completed: false,
        questionData: {},
    };
}


// =====================================================
// EXAM FUNCTIONS (Same as before but with dark mode classes)
// =====================================================

function setupExam() {
    startExam.addEventListener("click", startExamMode);
    exitExam.addEventListener("click", exitExamMode);
}

function startExamMode() {
    const count = examCount.value;
    const type = examType.value;
    const timeLimit = parseInt(examTime.value);

    let questions = [...state.words];

    if (type === 'synonym') {
        questions = questions.filter(w => w.synonyms && w.synonyms.length > 0);
    } else if (type === 'antonym') {
        questions = questions.filter(w => w.antonyms && w.antonyms.length > 0);
    }

    questions = shuffle(questions);

    if (count !== 'all') {
        questions = questions.slice(0, parseInt(count));
    }

    if (!questions.length) {
        alert("No questions available for the selected type!");
        return;
    }

    const questionData = {};
    questions.forEach((word, idx) => {
        const data = generateQuestionData(word, type);
        if (data) {
            questionData[idx] = data;
        }
    });

    const validQuestions = Object.keys(questionData).length;
    if (validQuestions === 0) {
        alert("No valid questions could be generated!");
        return;
    }

    state.exam = {
        questions: questions.filter((_, idx) => questionData[idx] !== undefined),
        currentPage: 1,
        itemsPerPage: 10,
        answered: {},
        score: 0,
        total: validQuestions,
        type: type,
        timeLimit: timeLimit,
        timeRemaining: timeLimit * 60,
        timerInterval: null,
        started: true,
        completed: false,
        questionData: questionData,
    };

    examContainer.classList.remove("hidden");
    startExam.textContent = "🔄 Restart Exam";

    renderExamQuestions();
    renderExamPagination();
    updateExamStats();

    if (timeLimit > 0) {
        startExamTimer();
    }
}

function startExamTimer() {
    if (state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
    }

    state.exam.timerInterval = setInterval(() => {
        state.exam.timeRemaining--;
        updateExamTimer();

        if (state.exam.timeRemaining <= 0) {
            clearInterval(state.exam.timerInterval);
            state.exam.timerInterval = null;
            alert("⏰ Time's up! Submitting your exam...");
            submitExam();
        }
    }, 1000);
}

function updateExamTimer() {
    const minutes = Math.floor(state.exam.timeRemaining / 60);
    const seconds = state.exam.timeRemaining % 60;
    examTimer.textContent = `⏱️ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (state.exam.timeRemaining < 60) {
        examTimer.className = "rounded-full bg-red-100 dark:bg-red-900/50 px-3 py-1 text-sm font-bold text-red-700 dark:text-red-300 animate-pulse";
    } else if (state.exam.timeRemaining < 300) {
        examTimer.className = "rounded-full bg-amber-100 dark:bg-amber-900/50 px-3 py-1 text-sm font-bold text-amber-700 dark:text-amber-300";
    } else {
        examTimer.className = "rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 text-sm font-bold text-indigo-700 dark:text-indigo-300";
    }
}

function renderExamQuestions() {
    const { questions, currentPage, itemsPerPage, answered, questionData } = state.exam;
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, questions.length);
    const pageItems = questions.slice(start, end);

    if (!pageItems.length) {
        examQuestions.innerHTML = `
            <div class="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-8 text-center shadow-sm">
                <p class="text-slate-500 dark:text-slate-400">No questions on this page.</p>
            </div>
        `;
        return;
    }

    examQuestions.innerHTML = pageItems
        .map((word, idx) => {
            const globalIdx = start + idx;
            const qData = questionData[globalIdx];
            if (!qData) return '';

            const isAnswered = answered[globalIdx] !== undefined;
            const answer = answered[globalIdx];

            return renderQuestionHTML(qData, globalIdx, isAnswered, answer, 'exam');
        })
        .filter(html => html)
        .join('');

    document.querySelectorAll('.option-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', handleExamAnswer);
    });

    // REMOVED: examQuestions.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleExamAnswer(e) {
    const btn = e.currentTarget;
    const questionIndex = parseInt(btn.dataset.questionIndex);
    const selectedAnswer = btn.dataset.answer;

    if (state.exam.answered[questionIndex] !== undefined) return;

    const qData = state.exam.questionData[questionIndex];
    if (!qData) return;

    const isCorrect = selectedAnswer === qData.correct.word;

    state.exam.answered[questionIndex] = {
        selected: selectedAnswer,
        correct: qData.correct.word,
        isCorrect: isCorrect,
    };

    if (isCorrect) {
        state.exam.score++;
        removeWrongAnswer(qData.word.id);
    } else {
        saveWrongAnswer(qData.word.id);
    }

    updateExamStats();
    renderExamQuestions();
    renderExamPagination();

    if (Object.keys(state.exam.answered).length === state.exam.total) {
        setTimeout(submitExam, 500);
    }
}

function renderExamPagination() {
    const { questions, currentPage, itemsPerPage, total, answered } = state.exam;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (totalPages <= 1) {
        examPagination.innerHTML = '';
        return;
    }

    let html = '<div class="flex gap-1 flex-wrap">';
    for (let i = 1; i <= totalPages; i++) {
        const pageStart = (i - 1) * itemsPerPage;
        const pageEnd = Math.min(i * itemsPerPage, total);
        const answeredCount = Object.keys(answered)
            .filter(idx => parseInt(idx) >= pageStart && parseInt(idx) < pageEnd).length;

        html += `
            <button data-page="${i}" 
                class="rounded-lg px-3 py-1 text-sm transition ${i === currentPage
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
            } ${answeredCount === (pageEnd - pageStart) && answeredCount > 0 ? 'border-green-400 dark:border-green-600' : ''}"
            >
                ${i}
                ${answeredCount === (pageEnd - pageStart) && answeredCount > 0 ? '✓' : ''}
            </button>
        `;
    }
    html += '</div>';
    examPagination.innerHTML = html;

    examPagination.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.exam.currentPage = parseInt(btn.dataset.page);
            renderExamQuestions();
            renderExamPagination();
        });
    });
}

function updateExamStats() {
    const total = state.exam.total;
    const answered = Object.keys(state.exam.answered).length;
    examCounter.textContent = `${answered}/${total} answered`;
    examScore.textContent = `Score: ${state.exam.score}`;
}

function submitExam() {
    if (state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
        state.exam.timerInterval = null;
    }

    state.exam.completed = true;
    const total = state.exam.total;
    const score = state.exam.score;
    const percentage = Math.round((score / total) * 100);

    let grade, emoji, message;
    if (percentage >= 90) { grade = 'A+'; emoji = '🏆'; message = 'Excellent! You\'re a vocabulary master!'; }
    else if (percentage >= 80) { grade = 'A'; emoji = '🌟'; message = 'Great job! Keep up the good work!'; }
    else if (percentage >= 70) { grade = 'B'; emoji = '💪'; message = 'Good effort! Review the ones you missed.'; }
    else if (percentage >= 60) { grade = 'C'; emoji = '📚'; message = 'Keep practicing! You\'re improving!'; }
    else { grade = 'D'; emoji = '🔄'; message = 'Keep learning! Practice makes perfect.'; }

    const resultHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div class="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                <div class="text-center">
                    <div class="text-6xl mb-4">${emoji}</div>
                    <h2 class="text-3xl font-black text-slate-800 dark:text-slate-100">Exam Complete!</h2>
                    <p class="mt-2 text-slate-500 dark:text-slate-400">${message}</p>
                    
                    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p class="text-xs text-slate-500 dark:text-slate-400">Score</p>
                            <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${score}/${total}</p>
                        </div>
                        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p class="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
                            <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${percentage}%</p>
                        </div>
                        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p class="text-xs text-slate-500 dark:text-slate-400">Grade</p>
                            <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${grade}</p>
                        </div>
                        <div class="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p class="text-xs text-slate-500 dark:text-slate-400">Wrong</p>
                            <p class="text-2xl font-bold text-red-600 dark:text-red-400">${total - score}</p>
                        </div>
                    </div>

                    <div class="mt-6 flex flex-wrap justify-center gap-3">
                        <button onclick="location.reload()" class="rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-md">
                            🔄 Retry Exam
                        </button>
                        <button onclick="exitExamMode()" class="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-600">
                            📋 Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', resultHTML);
}

function exitExamMode() {
    if (state.exam.timerInterval) {
        clearInterval(state.exam.timerInterval);
        state.exam.timerInterval = null;
    }

    document.querySelectorAll('.fixed.inset-0.z-50').forEach(el => el.remove());

    examContainer.classList.add("hidden");
    startExam.textContent = "Start Exam →";
    state.exam = {
        questions: [],
        currentPage: 1,
        itemsPerPage: 10,
        answered: {},
        score: 0,
        total: 0,
        type: 'mixed',
        timeLimit: 0,
        timeRemaining: 0,
        timerInterval: null,
        started: false,
        completed: false,
        questionData: {},
    };
    examTimer.textContent = '⏱️ 10:00';
}


// =====================================================
// WRONG ANSWERS
// =====================================================

function getWrongAnswers() {
    return JSON.parse(localStorage.getItem("bcs_wrong_answers") || "[]");
}

function saveWrongAnswer(id) {
    const wrong = getWrongAnswers();
    if (!wrong.includes(id)) {
        wrong.push(id);
        localStorage.setItem("bcs_wrong_answers", JSON.stringify(wrong));
    }
}

function removeWrongAnswer(id) {
    const wrong = getWrongAnswers().filter((item) => item !== id);
    localStorage.setItem("bcs_wrong_answers", JSON.stringify(wrong));
}


// =====================================================
// SHUFFLE
// =====================================================

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}