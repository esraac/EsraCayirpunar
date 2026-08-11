/* ==========================================================================
   Esra Çayırpunar - Bilgisayar Mühendisi Interactive Portfolio Script
   ========================================================================== */

// --- AUTHENTIC CV USER DATA ---
const USER_DATA = {
    name: "Esra Çayırpunar",
    roleTitles: [
        "Bilgisayar Mühendisi",
    ],
    email: "ecayirpunar@gmail.com",
    phone: "0 546 763 44 66",
    github: "https://github.com/esraac",
    linkedin: "https://www.linkedin.com/in/esra-%C3%A7ay%C4%B1rpunar/",
    university: "Karadeniz Teknik Üniversitesi - Bilgisayar Mühendisliği (2021-2026)",
    gpa: "3.14",
    bio: "Karadeniz Teknik Üniversitesi Bilgisayar Mühendisliği bölümünden mezun oldum. Benim için mühendislik, sadece kod yazmaktan ibaret değil; topluma fayda sağlayan, kaliteli ve çözüm odaklı sistemler inşa etmektir. Ölçeklenebilir projelerde etkin roller oynamayı ve geniş kitlelerin hayatına dokunan teknolojilere değer katmayı hedefliyorum.",
    experience: [
        {
            company: "GİB Teknoloji",
            role: "Stajyer Bilgisayar Mühendisi",
            period: "Temmuz 2026 – Devam Ediyor",
            tech: ["Manuel Test Etme", "Test Otomasyonu", "Test Çalışması", "Yazılım Kalite & Mühendislik"]
        },
        {
            company: "Promec Mekanik Arge Mühendislik A.Ş.",
            role: "Stajyer Yazılım Mühendisi",
            period: "Ağustos 2025 – Eylül 2025",
            tech: ["Kotlin", "Android BLE", "Modbus", "Unity 3D", "C#", "XAML", "JSON"]
        },
        {
            company: "KTÜ Sağlık Kültür Spor Daire Bşk.",
            role: "Part Time Yazılım Kursiyeri",
            period: "Mart 2025 – Mayıs 2026",
            tech: [".NET Core", "C#", "Web API", "SQL Server"]
        }
    ],
    projects: [
        {
            name: "MEDSES / Ses Tabanlı Yapay Zeka Destekli Mobil Sağlık Asistanı (Bitirme Projesi)",
            desc: "Kullanıcıların sesli komutlar aracılığıyla etkileşim kurabildiği, semptomdan poliklinik tahmini yapan ve randevu oluşturan mikroservis mimarili yapay zeka sağlık platformu.",
            category: "mobile ai backend",
            tech: ["Kotlin (Jetpack Compose, MVVM, Clean Arch, Retrofit)", "Java Spring Boot", "Python"],
            github: "https://github.com/esraac"
        },
        {
            name: "Federatif Oltalama (Phishing) Tespit Sistemi",
            desc: "Veri gizliliğini koruyarak yerel cihazda e-posta analizi yapan ve label-flipping veri zehirleme saldırılarını engelleyen federatif yapay zeka sistemi.",
            category: "ai backend",
            tech: ["Python", "TensorFlow", "Keras", "Flower (flwr)", "GloVe", "BiLSTM", "NLTK"],
            github: "https://github.com/esraac"
        },
        {
            name: "Yapay Sinir Ağları Projesi",
            desc: "Dinamik veri setleri üzerinde Perceptron, MLP ve Lineer Regresyon modellerini sıfırdan eğitip karar sınırlarını gerçek zamanlı görselleştiren interaktif 2B masaüstü uygulaması.",
            category: "ai backend",
            tech: ["C++ (C++/CLI)", ".NET Windows Forms"],
            github: "https://github.com/esraac"
        }
    ]
};

// --- DOM Content Loaded Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initTypingEffect();
    initIdeTabs();
    initInteractiveTerminal();
    initProjectFilters();
    initTimelineFilters();
    initMatrixRain();
    initMouseCursorEffect();
    initCopyEmail();
    initContactForm();
    initMobileNav();
    initScrollHeader();
});

function initScrollHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 1. Typing Effect for Roles                                                 */
/* -------------------------------------------------------------------------- */
function initTypingEffect() {
    const roleElem = document.getElementById("typing-role");
    if (!roleElem) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = USER_DATA.roleTitles[roleIndex];

        if (isDeleting && USER_DATA.roleTitles.length > 1) {
            roleElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            roleElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            if (USER_DATA.roleTitles.length === 1) {
                return;
            }
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % USER_DATA.roleTitles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* -------------------------------------------------------------------------- */
/* 2. IDE Mockup Tab Switcher                                                 */
/* -------------------------------------------------------------------------- */
function initIdeTabs() {
    const tabs = document.querySelectorAll(".ide-tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            const targetTab = tab.getAttribute("data-tab");
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 3. Interactive CLI Terminal                                                */
/* -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
    const terminalInput = document.getElementById("terminal-input");
    const terminalBody = document.getElementById("terminal-body");

    if (!terminalInput || !terminalBody) return;

    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = terminalInput.value.trim().toLowerCase();
            if (command === "") return;

            appendTerminalLine(`esra@dev:~$ ${command}`, "output-cmd");
            processCommand(command);

            terminalInput.value = "";
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    function appendTerminalLine(text, className = "") {
        const line = document.createElement("div");
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
    }

    function processCommand(cmd) {
        switch (cmd) {
            case "help":
                appendTerminalLine(`
                    <span style="color: var(--accent-cyan); font-weight: bold;">[Mevcut Komutlar]:</span><br>
                    • <code class="cmd-highlight">whoami</code> veya <code class="cmd-highlight">about</code>: Biyografi & KTÜ Bilgileri<br>
                    • <code class="cmd-highlight">experience</code>: İş tecrübeleri (Promec, KTÜ SKS)<br>
                    • <code class="cmd-highlight">skills</code>: Teknik yetenekler (Kotlin, .NET, Python, Unity)<br>
                    • <code class="cmd-highlight">projects</code>: MEDSES Bitirme Projesi, Phishing Tespit & YSA<br>
                    • <code class="cmd-highlight">gpa</code>: Mezuniyet ortalaması (3.14)<br>
                    • <code class="cmd-highlight">contact</code>: İletişim bilgileri<br>
                    • <code class="cmd-highlight">matrix</code>: Matrix efekti aç/kapat<br>
                    • <code class="cmd-highlight">clear</code>: Ekranı temizle
                `, "output-info");
                break;

            case "whoami":
            case "about":
                appendTerminalLine(`
                    <span style="color: var(--accent-green); font-weight: bold;">${USER_DATA.name}</span> - Bilgisayar Mühendisi<br>
                    Eğitim: ${USER_DATA.university}<br>
                    GPA: ${USER_DATA.gpa}<br>
                    Özet: ${USER_DATA.bio}
                `, "output-info");
                break;

            case "experience":
                let expHTML = `<span style="color: var(--accent-green); font-weight: bold;">İş & Staj Geçmişi:</span><br>`;
                USER_DATA.experience.forEach(e => {
                    expHTML += `• <strong>${e.company}</strong> (${e.period}) - ${e.role} [${e.tech.join(", ")}]<br>`;
                });
                appendTerminalLine(expHTML, "output-info");
                break;

            case "gpa":
                appendTerminalLine(`
                    🎓 <strong>KTÜ Bilgisayar Mühendisliği</strong><br>
                    GPA: <span style="color: var(--accent-green); font-weight: bold;">3.14</span> (Lisans Derecesi)
                `, "output-info");
                break;

            case "skills":
                appendTerminalLine(`
                    <span style="color: var(--accent-cyan);">Mobil:</span> Kotlin, Java, Dart, Jetpack Compose, MVVM/MVI, Clean Architecture, Android BLE<br>
                    <span style="color: var(--accent-cyan);">Backend & Web:</span> C#, Python, Java Spring Boot, ASP.NET (Core/MVC/API), .NET Core, SQL Server<br>
                    <span style="color: var(--accent-cyan);">Yazılım Testi & QA:</span> Manuel Test Etme, Test Otomasyonu, Test Çalışması, Hata Raporlama<br>
                    <span style="color: var(--accent-cyan);">Yapay Zeka & Simülasyon:</span> BERTurk NLP, TensorFlow, Flower (flwr), Unity 3D, C++
                `, "output-info");
                break;

            case "projects":
                let projHTML = `<span style="color: var(--accent-green); font-weight: bold;">Öne Çıkan Projeler:</span><br>`;
                USER_DATA.projects.forEach((p, idx) => {
                    projHTML += `${idx + 1}. <strong>${p.name}</strong> - ${p.desc} [<em>${p.tech.join(", ")}</em>]<br>`;
                });
                appendTerminalLine(projHTML, "output-info");
                break;

            case "contact":
                appendTerminalLine(`
                    E-Posta: <a href="mailto:${USER_DATA.email}" style="color: var(--accent-cyan);">${USER_DATA.email}</a><br>
                    Telefon: ${USER_DATA.phone}<br>
                    GitHub: <a href="${USER_DATA.github}" target="_blank" style="color: var(--accent-cyan);">${USER_DATA.github}</a><br>
                    LinkedIn: <a href="${USER_DATA.linkedin}" target="_blank" style="color: var(--accent-cyan);">${USER_DATA.linkedin}</a>
                `, "output-info");
                break;

            case "matrix":
                toggleMatrixRainState();
                appendTerminalLine("Matrix rain effect state toggled.", "output-success");
                break;

            case "clear":
                terminalBody.innerHTML = "";
                appendTerminalLine(`<span class="welcome-text">Ekran temizlendi. Komutlar için 'help' yazın.</span>`, "output-info");
                break;

            default:
                appendTerminalLine(`Komut bulunamadı: '${cmd}'. Komut listesi için <code class="cmd-highlight">help</code> yazabilirsiniz.`, "output-error");
                break;
        }
    }
}

/* -------------------------------------------------------------------------- */
/* 4. Projects Category Filter                                                */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const categories = card.getAttribute("data-category");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 5. Matrix Rain Canvas Effect                                               */
/* -------------------------------------------------------------------------- */
let matrixInterval = null;
let matrixActive = true;

function initMatrixRain() {
    const canvas = document.getElementById("bg-canvas");
    const toggleBtn = document.getElementById("toggle-matrix-btn");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fontSize = 17;
    const spacingX = 52;
    const lineGap = 30;
    const columns = Math.floor(canvas.width / spacingX);
    const rainDrops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(3, 7, 18, 0.14)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < rainDrops.length; i++) {
            const binaryChar = Math.random() > 0.5 ? "1" : "0";

            ctx.fillStyle = (i % 2 === 0)
                ? "rgba(0, 240, 255, 0.48)"
                : "rgba(0, 255, 157, 0.48)";

            const yPos = rainDrops[i] * lineGap;
            ctx.fillText(binaryChar, i * spacingX, yPos);

            if (yPos > canvas.height && Math.random() > 0.982) {
                rainDrops[i] = 0;
            }
            rainDrops[i] += 1.2;
        }
    }

    matrixInterval = setInterval(draw, 45);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            toggleMatrixRainState();
        });
    }
}

function toggleMatrixRainState() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    if (matrixActive) {
        canvas.style.opacity = "0";
        matrixActive = false;
    } else {
        canvas.style.opacity = "0.48";
        matrixActive = true;
    }
}

/* -------------------------------------------------------------------------- */
/* Interactive Mouse Cursor Glow & Code Particle Trail                        */
/* -------------------------------------------------------------------------- */
function initMouseCursorEffect() {
    const cursor = document.getElementById("cyber-cursor");
    const trailSymbols = ["{ }", "</>", "01", "=>", "fun", "val", "class", "*", "#"];
    let lastTime = 0;

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        if (cursor) {
            cursor.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
        }

        const now = Date.now();
        if (now - lastTime > 45) {
            lastTime = now;
            createCodeParticle(x, y);
        }
    });

    function createCodeParticle(x, y) {
        const particle = document.createElement("span");
        particle.className = "cursor-code-particle";
        particle.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];

        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 700);
    }
}

/* -------------------------------------------------------------------------- */
/* 6. Copy Email to Clipboard                                                 */
/* -------------------------------------------------------------------------- */
function initCopyEmail() {
    const copyBtn = document.getElementById("copy-email-btn");
    const emailText = document.getElementById("email-text");

    if (!copyBtn || !emailText) return;

    copyBtn.addEventListener("click", () => {
        const textToCopy = emailText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `<span>Kopyalandı! ✓</span> <i class="fa-solid fa-check" style="color: var(--accent-green);"></i>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 7. Contact Form Visualizer                                                 */
/* -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");

    if (!form || !statusDiv) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("form-name");
        const emailInput = document.getElementById("form-email");
        const subjectInput = document.getElementById("form-subject");
        const messageInput = document.getElementById("form-message");

        const name = nameInput ? nameInput.value : "";
        const email = emailInput ? emailInput.value : "";
        const subject = subjectInput ? subjectInput.value : "Portfolyo İletişim Mesajı";
        const message = messageInput ? messageInput.value : "";

        statusDiv.style.color = "var(--accent-cyan)";
        statusDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Mesaj hazırlanıyor...`;

        const mailtoUrl = `mailto:${USER_DATA.email}?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent("Gönderen: " + name + "\nE-Posta: " + email + "\n\nMesaj:\n" + message)}`;

        setTimeout(() => {
            window.location.href = mailtoUrl;
            statusDiv.style.color = "var(--accent-green)";
            statusDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> Teşekkürler ${name}! E-posta istemciniz açıldı, direkt iletildi.`;
            form.reset();
        }, 800);
    });
}

/* -------------------------------------------------------------------------- */
/* 8. Mobile Navigation Toggle                                                */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileBtn = document.getElementById("mobile-toggle");
    const mainNav = document.getElementById("main-nav");

    if (!mobileBtn || !mainNav) return;

    mobileBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 9. Timeline Roadmap Filter                                                 */
/* -------------------------------------------------------------------------- */
function initTimelineFilters() {
    const tfilterBtns = document.querySelectorAll(".timeline-filter-btn");
    const roadmapCards = document.querySelectorAll(".roadmap-card");

    tfilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tfilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-tfilter");

            roadmapCards.forEach(card => {
                const category = card.getAttribute("data-tcat");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}
