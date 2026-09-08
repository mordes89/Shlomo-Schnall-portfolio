// Original video titles and descriptions intentionally remain in English.
document.addEventListener('DOMContentLoaded', () => {
  const translations = {
  "At the Piano": "ליד הפסנתר",
  "Photo gallery": "גלריית תמונות",
  "Previous photo": "התמונה הקודמת",
  "Next photo": "התמונה הבאה",
  "Choose a photo": "בחירת תמונה",
  "Shlomo Schnall beside the piano": "שלמה שנאל לצד הפסנתר",
  "Photo 1": "תמונה 1",
  "Photo 2": "תמונה 2",
  "Photo 3": "תמונה 3",
  "Photo 4": "תמונה 4",
  "Photo 5": "תמונה 5",
  "Photo 6": "תמונה 6",
  "Photo 7": "תמונה 7",
  "Photo 8": "תמונה 8",
  "Photo 9": "תמונה 9",
  "Photo 10": "תמונה 10",
  "Photo 11": "תמונה 11",
  "Photo 12": "תמונה 12",

  "Shlomo Schnall": "שלמה שנאל",
  "Shlomo Schnall – Piano & Music Theory Teacher": "שלמה שנאל | מורה לפסנתר ולתורת המוזיקה",
  "Piano and music theory lessons with Shlomo Schnall for all ages and skill levels. Explore performances, custom music arrangements, and videos.": "שיעורי פסנתר ותורת המוזיקה עם שלמה שנאל לכל גיל ולכל רמה. הופעות, עיבודים מוזיקליים בהתאמה אישית וסרטונים.",
  "About": "אודות",
  "Performances": "הופעות",
  "Videos": "סרטונים",
  "Contact": "יצירת קשר",
  "Toggle menu": "פתיחה וסגירה של התפריט",
  "Choose color theme": "בחירת ערכת צבעים",
  "Midnight": "חצות",
  "Classic Ivory": "שנהב קלאסי",
  "Jazz Amber": "ענבר ג׳אז",
  "Crimson": "ארגמן",
  "Emerald": "ברקת",
  "Piano & Music Theory Teacher": "מורה לפסנתר ולתורת המוזיקה",
  "Piano and music theory lessons for all ages and skill levels.": "שיעורי פסנתר ותורת המוזיקה לכל גיל ולכל רמה.",
  "Discover More": "למידע נוסף",
  "Ask About Lessons": "לפרטים על שיעורים",
  "About the Pianist": "על הפסנתרן",
  "A Voice Through the Keys": "קול אישי דרך הקלידים",
  "With over 35 years of experience, I specialize in writing custom music arrangements for soloists, bands, choirs, and ensembles, in any style or skill level. Need a fresh arrangement or help adapting a piece? I’ve got you covered.": "עם ניסיון של למעלה מ־35 שנה, אני מתמחה בכתיבת עיבודים מוזיקליים בהתאמה אישית לסולנים, ללהקות, למקהלות ולהרכבים, בכל סגנון ולכל רמה. מחפשים עיבוד חדש או עזרה בהתאמת יצירה? אשמח לעזור.",
  "I also offer music theory guidance and consulting to support your project or performance. Let’s bring your musical vision to life. Message me to get started!": "אני מציע גם הדרכה וייעוץ בתורת המוזיקה לקידום הפרויקט או ההופעה שלכם. בואו נהפוך את החזון המוזיקלי שלכם למציאות. שלחו לי הודעה ונתחיל!",
  "Years Performing": "שנות הופעה",
  "Concerts Worldwide": "קונצרטים ברחבי העולם",
  "Learn with Shlomo": "ללמוד עם שלמה",
  "Your Place in Music": "המקום שלכם במוזיקה",
  "Piano lessons, music theory, composition, and custom arrangements. A welcoming place to begin, return to music, or take your skills further.": "שיעורי פסנתר, תורת המוזיקה, הלחנה ועיבודים בהתאמה אישית. מקום מזמין להתחיל בו, לחזור למוזיקה או להתקדם לשלב הבא.",
  "Every age. Every level.": "כל גיל. כל רמה.",
  "Children, teenagers, adults, and older adults are all welcome. Whether you are touching the keys for the first time, returning after a break, or already an advanced musician, there is a place for you here.": "ילדים, בני נוער, מבוגרים ובני הגיל השלישי, כולם מוזמנים. בין שזו הפעם הראשונה שלכם ליד הקלידים, שאתם חוזרים לנגן אחרי הפסקה או שאתם כבר מוזיקאים מתקדמים, יש לכם מקום כאן.",
  "At the piano": "ליד הפסנתר",
  "Piano Lessons": "שיעורי פסנתר",
  "Start with the basics, build on what you already know, or develop your playing at an advanced level. Shlomo teaches piano across the full range of ages and abilities.": "אפשר להתחיל מהיסודות, להרחיב את הידע הקיים או לפתח את הנגינה ברמה מתקדמת. שלמה מלמד פסנתר בכל גיל ובכל רמה.",
  "For first-time learners, returning players, and experienced pianists.": "למתחילים, לחוזרים לנגן ולפסנתרנים מנוסים.",
  "Understand the music": "להבין את המוזיקה",
  "Music Theory & Guidance": "תורת המוזיקה והדרכה",
  "Explore music theory alongside your playing or as an area of study in its own right. Shlomo also offers theory guidance and consulting for a musical project or performance.": "לימודי תורת המוזיקה יכולים להשתלב בלימודי הנגינה או לעמוד בפני עצמם. שלמה מציע גם הדרכה וייעוץ בתורת המוזיקה לפרויקט מוזיקלי או להופעה.",
  "For learners at any stage and musicians looking for support.": "ללומדים בכל שלב ולמוזיקאים המחפשים הכוונה.",
  "Create something of your own": "ליצור משהו משלכם",
  "Composition & Creative Support": "הלחנה וליווי יצירתי",
  "Learn to compose, develop a musical idea, or get help with a piece you are already writing. Shlomo composes music himself and teaches others to create their own.": "למדו להלחין, פתחו רעיון מוזיקלי או קבלו עזרה ביצירה שכבר התחלתם לכתוב. שלמה מלחין בעצמו ומלמד אחרים ליצור מוזיקה משלהם.",
  "For new composers and musicians developing their next piece.": "למלחינים בתחילת דרכם ולמוזיקאים המפתחים את היצירה הבאה שלהם.",
  "Music that fits your performers": "מוזיקה שמתאימה למבצעים שלכם",
  "Custom Music Arrangements": "עיבודים מוזיקליים בהתאמה אישית",
  "Commission a fresh arrangement or get help adapting an existing piece. Shlomo writes custom arrangements for soloists, bands, choirs, and ensembles, in any style and for any skill level.": "הזמינו עיבוד חדש או קבלו עזרה בהתאמת יצירה קיימת. שלמה כותב עיבודים אישיים לסולנים, ללהקות, למקהלות ולהרכבים, בכל סגנון ולכל רמה.",
  "For one performer or a whole group, from beginners to advanced musicians.": "למבצע יחיד או להרכב שלם, ממתחילים ועד מוזיקאים מתקדמים.",
  "Learn to play together": "ללמוד לנגן יחד",
  "Children’s Groups & Ensembles": "קבוצות והרכבים לילדים",
  "Group teaching gives children a place to make music together. Shlomo works with young players in ensembles, including classical bands and groups learning to play in an orchestra.": "הלמידה בקבוצה מאפשרת לילדים ליצור מוזיקה יחד. שלמה מלמד נגנים צעירים בהרכבים, כולל הרכבים קלאסיים וקבוצות הלומדות נגינה תזמורתית.",
  "For children learning alongside other musicians.": "לילדים הלומדים לנגן יחד עם מוזיקאים נוספים.",
  "Let’s find the right starting point.": "בואו נמצא את נקודת ההתחלה המתאימה לכם.",
  "Tell Shlomo about your interests, experience, or musical project. Get in touch to discuss lessons, group learning, composition, or an arrangement.": "ספרו לשלמה על תחומי העניין, הניסיון או הפרויקט המוזיקלי שלכם. צרו קשר לשיחה על שיעורים, למידה בקבוצה, הלחנה או עיבוד.",
  "Contact Shlomo": "ליצירת קשר עם שלמה",
  "Gallery": "גלריה",
  "On Stage": "על הבמה",
  "Orchestral Concert": "קונצרט תזמורתי",
  "Evening Recital": "רסיטל ערב",
  "Watch": "לצפייה",
  "Performances on Video": "הופעות בווידאו",
  "Explore full recitals or enjoy a single performance.": "צפו ברסיטלים מלאים או בביצוע של יצירה אחת.",
  "Loading videos…": "הסרטונים נטענים…",
  "Individual Performances": "ביצועים בודדים",
  "Single pieces, Jewish jazz and vocal collaborations.": "יצירות בודדות, ג׳אז יהודי ושיתופי פעולה עם זמרים.",
  "Full Recitals": "רסיטלים מלאים",
  "Longer programs featuring a selection of classical works and more.": "תוכניות ארוכות עם מבחר יצירות קלאסיות ועוד.",
  "Watch on YouTube ↗": "לצפייה ב־YouTube ↗",
  "Check back later for new performance videos.": "כדאי לחזור בהמשך ולצפות בסרטוני הופעות חדשים.",
  "Unable to load videos at this time.": "לא ניתן לטעון את הסרטונים כרגע.",
  "Get in Touch": "נשמח לשמוע מכם",
  "Direct Contact": "פרטי קשר",
  "Interested in piano or music theory lessons? Students of all ages and skill levels are welcome. Contact Shlomo to discuss lessons, custom arrangements, or a performance.": "מתעניינים בשיעורי פסנתר או תורת המוזיקה? תלמידים בכל גיל ובכל רמה מוזמנים. צרו קשר עם שלמה בנוגע לשיעורים, לעיבודים בהתאמה אישית או להופעה.",
  "QR code to Shlomo’s portfolio website": "קוד QR לאתר של שלמה",
  "Share Shlomo’s portfolio": "שתפו את האתר של שלמה",
  "Scan to open this website, or save the QR code to share with others.": "סרקו כדי לפתוח את האתר, או שמרו את קוד ה־QR כדי לשתף עם אחרים.",
  "Share this website": "שתפו את האתר",
  "Website link copied — ready to share.": "הקישור לאתר הועתק ומוכן לשיתוף.",
  "Copy this link to share the website.": "העתיקו את הקישור כדי לשתף את האתר.",
  "Website link to copy": "קישור לאתר להעתקה",
  "© 2025 Shlomo Schnall – Concert Pianist. All rights reserved.": "© 2025 שלמה שנאל, פסנתרן קונצרטים. כל הזכויות שמורות.",
  "Pianist Info": "מידע על הפסנתרן",
  "About Shlomo Schnall": "על שלמה שנאל",
  "Pianist Quick Info": "פרטים על הפסנתרן",
  "Close": "סגירה",
  "Close image": "סגירת התמונה",
  "Based:": "מיקום:",
  "Jerusalem, Israel": "ירושלים, ישראל",
  "Shlomo Schnall performing": "שלמה שנאל בהופעה",
  "Portrait of Shlomo Schnall": "תמונת שלמה שנאל",
  "Live orchestral performance": "הופעה תזמורתית חיה",
  "Shlomo Schnall at the piano": "שלמה שנאל ליד הפסנתר",
  "Contact Shlomo on WhatsApp": "יצירת קשר עם שלמה בוואטסאפ",
  "Save Shlomo Schnall portfolio QR": "שמירת קוד QR לאתר של שלמה שנאל",
  "QR code to Shlomo Schnall’s portfolio": "קוד QR לאתר של שלמה שנאל"
};
  const originals = new WeakMap();
  const originalAttributes = new WeakMap();
  const toggle = document.getElementById('languageToggle');
  let language = 'en';
  const normalize = text => text.trim().replace(/\s+/g, ' ');
  const translate = text => {
    const key = normalize(text);
    if (language !== 'he') return text;
    if (translations[key]) return translations[key];
    if (/^Duration: [\d:]+$/.test(key)) return key.replace('Duration:', 'משך:');
    return text;
  };
  const excluded = element => element.closest('script, style, .video-title, .video-description, iframe, #languageToggle');
  function applyTranslations() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement || excluded(node.parentElement)) continue;
      if (!originals.has(node)) {
        const key = normalize(node.nodeValue);
        if (!translations[key] && !/^Duration: [\d:]+$/.test(key)) continue;
        originals.set(node, node.nodeValue);
      }
      const value = translate(originals.get(node));
      if (node.nodeValue !== value) node.nodeValue = value;
    }
    document.querySelectorAll('[title], [aria-label], img[alt]').forEach(element => {
      if (excluded(element)) return;
      let saved = originalAttributes.get(element);
      if (!saved) {
        saved = {};
        ['title', 'aria-label', 'alt'].forEach(name => {
          if (element.hasAttribute(name) && translations[normalize(element.getAttribute(name))]) saved[name] = element.getAttribute(name);
        });
        originalAttributes.set(element, saved);
      }
      Object.entries(saved).forEach(([name, value]) => element.setAttribute(name, translate(value)));
    });
    document.querySelectorAll('.video-card').forEach(card => { card.dir = 'ltr'; });
    document.querySelectorAll('.video-title, .video-description').forEach(element => { element.lang = 'en'; });
    document.title = translate('Shlomo Schnall – Piano & Music Theory Teacher');
    document.querySelector('meta[name="description"]').content = translate('Piano and music theory lessons with Shlomo Schnall for all ages and skill levels. Explore performances, custom music arrangements, and videos.');
  }
  function setLanguage(next, updateUrl = false) {
    language = next === 'he' ? 'he' : 'en';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    toggle.textContent = language === 'he' ? 'English' : 'עברית';
    toggle.lang = language === 'he' ? 'en' : 'he';
    toggle.setAttribute('aria-label', language === 'he' ? 'Switch to English' : 'Switch to Hebrew');
    try { localStorage.setItem('shlomo_language', language); } catch {}
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    }
    applyTranslations();
  }
  const requested = new URLSearchParams(location.search).get('lang');
  let saved;
  try { saved = localStorage.getItem('shlomo_language'); } catch {}
  setLanguage(requested === 'he' || requested === 'en' ? requested : saved);
  toggle.addEventListener('click', () => setLanguage(language === 'he' ? 'en' : 'he', true));
  new MutationObserver(() => applyTranslations()).observe(document.body, { childList: true, subtree: true });
  window.siteText = translate;
});
