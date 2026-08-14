"use client";

import { useEffect, useMemo, useState } from "react";
import {
  auditGroups,
  benchmarkPatterns,
  contentCalendar,
  executionSteps,
  outreachTemplates,
  readyPosts,
} from "./report-data";

const headlineOptions = [
  {
    tag: "الخيار الموصى به",
    text: "Head of Accounting | IFRS Financial Reporting | Bank Reconciliation | Microfinance | Financial Analysis",
    note: "واضح، سهل القراءة، ويضع أهم الكلمات في مكانها الطبيعي.",
  },
  {
    tag: "قيادة وتشغيل",
    text: "Head of Accounting | Accounting Operations | IFRS Reporting | Reconciliation | Decision Support",
    note: "مناسب إذا كان الهدف إبراز قيادة العمل اليومي والعمليات.",
  },
  {
    tag: "نحو Accounting Manager",
    text: "Accounting Manager | Financial Reporting | IFRS | Bank Reconciliation | Microfinance",
    note: "اختاريه فقط إذا كان Accounting Manager هو الدور الذي تبحثين عنه الآن.",
  },
  {
    tag: "ثنائي اللغة",
    text: "Head of Accounting | IFRS Reporting | Bank Reconciliation | رئيسة قسم المحاسبة والتقارير المالية",
    note: "خيار عملي إذا كان أغلب زوار الملف يستخدمون العربية والإنجليزية.",
  },
  {
    tag: "عربي واضح",
    text: "رئيسة قسم المحاسبة | التقارير المالية وفق IFRS | التسويات البنكية | التحليل المالي | التمويل الأصغر",
    note: "مناسب للنسخة العربية من الملف.",
  },
];

const aboutArabic = `أعمل في المحاسبة منذ أكثر من 8 سنوات، معظمها في قطاع التمويل الأصغر. خلال هذه الفترة تعاملت مع العمليات المحاسبية اليومية، والتقارير المالية، والتسويات البنكية، وتحليل البيانات التي تعتمد عليها الإدارة في قراراتها.

في عملي الحالي لدى IRADA Microfinance، أتابع دقة المعلومات المالية، وأراجع الفروقات، وأشارك في إعداد تقارير تتوافق مع متطلبات IFRS. أكثر ما يهمني هو أن تكون الأرقام واضحة، قابلة للمراجعة، ومفيدة لمن يتخذ القرار.

خبرتي تتركز في:
• التقارير والبيانات المالية وفق IFRS
• التسويات البنكية والتحقق من الأرصدة
• التحليل المالي والتقارير الإدارية
• العمليات المحاسبية في قطاع التمويل الأصغر
• تقديم معلومات مالية واضحة للإدارة

أبحث عن خطوة مهنية قادمة في Head of Accounting أو Accounting Manager أو Chief Accountant في الرياض، ضمن جهة تقدّر الدقة، وضوح العمل، والمسؤولية.

للتواصل: [أضيفي بريدك المهني أو اتركي التواصل عبر LinkedIn]`;

const aboutEnglish = `I have spent more than eight years working in accounting, mainly within the microfinance sector. My experience covers day-to-day accounting operations, financial reporting, bank reconciliation, and the analysis behind management decisions.

At IRADA Microfinance, I work with financial information that needs to be accurate, traceable, and useful. This includes reviewing differences, supporting IFRS-aligned reporting, and preparing information that helps management understand what is happening behind the numbers.

My main areas of experience are:
• IFRS financial reporting and financial statements
• Bank reconciliation and balance validation
• Financial analysis and management reporting
• Accounting operations within microfinance
• Clear financial information for management decisions

I am now interested in Head of Accounting, Accounting Manager, and Chief Accountant opportunities in Riyadh, particularly with teams that value accuracy, clear processes, and accountability.`;

const headExperience = [
  "قيادة العمليات المحاسبية والإشراف على إعداد السجلات والتقارير المالية الدورية وفق السياسات المعتمدة ومتطلبات IFRS.",
  "متابعة التسويات البنكية والتحقق من دقة الأرصدة وتحليل الفروقات والتنسيق لإغلاق الملاحظات المفتوحة.",
  "إعداد وتحليل البيانات المالية وتقديم تقارير واضحة تساعد الإدارة على فهم الأداء واتخاذ القرار.",
  "مراجعة جودة البيانات المحاسبية واكتمال المستندات ورفع الملاحظات اللازمة لمعالجة الأخطاء وتحسين الرقابة.",
  "[أضيفي نتيجة مؤكدة] خفض مدة إعداد التقرير/الإقفال من [X] إلى [Y] من خلال [الإجراء].",
  "[أضيفي نطاقًا مؤكدًا] قيادة/تنسيق عمل [X] أشخاص ومتابعة [X] تسوية أو تقرير خلال [الفترة].",
];

const accountantExperience = [
  "تسجيل ومراجعة العمليات المحاسبية والتأكد من اكتمال المستندات المؤيدة وفق الإجراءات المعتمدة.",
  "إعداد التسويات ومتابعة الفروقات والملاحظات مع الأطراف المعنية حتى الإغلاق.",
  "المساهمة في إعداد البيانات والتقارير المالية الدورية ورفع الملاحظات غير الاعتيادية.",
  "[أضيفي إنجازًا مؤكدًا] تحسين [العملية] بما أدى إلى [النتيجة الفعلية].",
];

const beforeAfterItems = [
  { title: "الصورة", before: "الصورة ودودة، لكن القص قريب والدقة محدودة.", after: "صورة أصلية أوضح، بإضاءة طبيعية وخلفية هادئة.", impact: "انطباع أكثر مهنية من دون تغيير ملامحها.", priority: "مهم" },
  { title: "الغلاف", before: "مساحة فارغة لا تقول شيئًا عن خبرتها.", after: "غلاف بسيط يوضح التخصص: Head of Accounting · IFRS · Riyadh.", impact: "يفهم الزائر المجال من أول نظرة.", priority: "مهم" },
  { title: "الاسم", before: "Ghaidaa Emam, IFRS Holder.", after: "Ghaidaa Emam فقط، مع نقل المؤهل إلى مكانه الصحيح.", impact: "الاسم يبدو أنظف والمؤهل يصبح أسهل للتحقق.", priority: "حرج" },
  { title: "العنوان", before: "عربي وإنجليزي في جملة غير واضحة.", after: headlineOptions[0].text, impact: "عنوان يفهمه القارئ وتلتقطه نتائج البحث.", priority: "حرج" },
  { title: "About", before: "قائمة مسؤوليات لا تخبرنا كيف تعمل غيداء.", after: "نبذة قصيرة تشرح خبرتها، تخصصها، وما تبحث عنه.", impact: "صورة مهنية أقرب وأوضح.", priority: "حرج" },
  { title: "الخبرة", before: "تواريخ متداخلة ووصف محدود.", after: "تسلسل صحيح، ثم نقاط تشرح ما كانت مسؤولة عنه وما الذي تغير بعملها.", impact: "خبرة يمكن فهمها ومناقشتها في المقابلة.", priority: "حرج" },
  { title: "المهارات", before: "ست مهارات لا تمثل ثماني سنوات من العمل.", after: "قائمة دقيقة تبدأ بـ Financial Reporting وIFRS وBank Reconciliation.", impact: "تطابق أفضل مع الوظائف المناسبة.", priority: "حرج" },
  { title: "Featured", before: "لا توجد مادة واحدة تثبت ما كُتب.", after: "شهادة IFRS، ودراسة حالة، وعينة عمل بعد حذف البيانات الحساسة.", impact: "القارئ يرى الدليل بدل الاكتفاء بالوصف.", priority: "مهم" },
  { title: "التوصيات", before: "لا توجد توصيات ظاهرة.", after: "ثلاث توصيات من أشخاص عملوا معها فعلًا.", impact: "صوت مستقل يؤكد جودة العمل والتعامل.", priority: "مهم" },
  { title: "المحتوى", before: "لا يظهر نشاط مهني منتظم.", after: "منشور واحد جيد أسبوعيًا مع تعليقات حقيقية في المجال.", impact: "حضور هادئ ومستمر، من دون تصنع.", priority: "تحسيني" },
];

const screenshotFindings = [
  {
    image: "/audit/ghaidaa-profile.png",
    alt: "أعلى ملف غيداء وقسم النبذة",
    label: "الصورة 01 · أعلى الملف وAbout",
    title: "الزائر لا يعرف أين يركز أولًا",
    findings: [
      "الغلاف لا يشرح المجال أو الدور المستهدف.",
      "IFRS Holder مكتوبة مع الاسم بدل توثيقها في قسم الشهادات.",
      "العنوان العربي والإنجليزي متلاصقان، لذلك يصعب فهمه بسرعة.",
      "النبذة تبدأ بالمسؤوليات، لكنها لا تقدم نتيجة أو موقفًا يثبت الخبرة.",
    ],
  },
  {
    image: "/audit/experience.png",
    alt: "قسم الخبرة والتعليم في ملف غيداء",
    label: "الصورة 02 · الخبرة والتعليم",
    title: "التسلسل الزمني يفتح سؤالًا غير ضروري",
    findings: [
      "دور Head of Accounting ظاهر من يونيو 2018 حتى الآن.",
      "دور Accountant ظاهر في أكتوبر 2023 داخل الجهة نفسها؛ يجب توضيح هل هو ترقية أم إدخال مكرر.",
      "لا يظهر تحت الدورين وصف للإنجازات أو نطاق المسؤولية.",
      "التعليم صحيح وواضح، لكنه يحتاج إضافة الأنشطة أو المواد ذات الصلة إن وُجدت.",
    ],
  },
  {
    image: "/audit/skills.png",
    alt: "قسم المهارات في ملف غيداء",
    label: "الصورة 03 · المهارات",
    title: "ست مهارات لا تختصر ثماني سنوات",
    findings: [
      "المهارتان الأوضح هما IFRS والمحاسبة، وهما واسعتان جدًا.",
      "لا تظهر Financial Reporting أو Bank Reconciliation ضمن المهارات الأولى.",
      "ترتيب المهارات لا يوجّه مسؤول التوظيف نحو الدور المستهدف.",
      "لا يظهر في اللقطة عدد تأييدات يدعم أهم المهارات.",
    ],
  },
];

const verifiedSnapshot = [
  { label: "الاسم الظاهر", value: "Ghaidaa Emam, IFRS Holder", note: "يُنقل IFRS إلى الشهادات والعنوان، ويبقى الاسم نظيفًا." },
  { label: "الموقع", value: "Riyadh, Saudi Arabia", note: "ميزة مهمة ويجب ربطها بالمسميات المستهدفة في Open to Work." },
  { label: "الشبكة", value: "87 connection في اللقطة", note: "العدد ليس المشكلة وحده؛ الأهم بناء شبكة محاسبية سعودية مناسبة." },
  { label: "جهة العمل", value: "IRADA Microfinance", note: "يُكتب الاسم الرسمي كما يظهر في صفحة الشركة." },
  { label: "الدور القيادي", value: "Head of the Accounting Department", note: "المسمى قوي، لكنه يحتاج نطاق مسؤولية ونتائج موثقة." },
  { label: "الخبرة الظاهرة", value: "Jun 2018 – Present", note: "تاريخ البداية ظاهر، بينما تسلسل دور Accountant يحتاج تصحيحًا." },
  { label: "التعليم", value: "BSc, Accounting and Finance · 2011–2015", note: "المعلومة واضحة ويمكن دعمها بمواد أو أنشطة مرتبطة إن وُجدت." },
  { label: "المهارات", value: "6 مهارات ظاهرة", note: "عدد قليل لا يغطي خبرة طويلة في التقارير والتسويات والعمليات." },
];

const recruiterScan = [
  { time: "0–5 ث", sees: "صورة قريبة وغلاف فارغ", thinks: "هل هذا ملف محاسبي قيادي؟", fix: "صورة أصلية أوضح وغلاف يعرّف بالتخصص." },
  { time: "5–10 ث", sees: "اسم طويل وعنوان مختلط", thinks: "ما الدور الدقيق الذي تستهدفه؟", fix: "اسم نظيف وعنوان إنجليزي واضح من خمس كلمات أساسية." },
  { time: "10–15 ث", sees: "مسمى قوي وتواريخ متداخلة", thinks: "هل المسار ترقية أم إدخال مكرر؟", fix: "تسلسل زمني صحيح ووصف منفصل لكل مرحلة." },
  { time: "15–20 ث", sees: "مهارات قليلة ولا Featured ظاهر", thinks: "أين الدليل على IFRS والقيادة؟", fix: "شهادة موثقة، دراسة حالة، مهارات مرتبة، وتوصيات." },
];

const roleTracks = [
  {
    role: "Head of Accounting",
    fit: "الأقرب إلى المسمى الظاهر وخبرة قيادة العمليات المحاسبية.",
    market: ["Financial reporting", "IFRS compliance", "Reconciliations", "Team leadership", "Internal controls"],
    confirm: ["حجم الفريق", "نطاق الإقفال", "علاقة التدقيق", "النظام المحاسبي"],
    source: "https://sa.linkedin.com/jobs/view/head-of-accounting-at-airbus-helicopters-4311919965",
  },
  {
    role: "Chief Accountant",
    fit: "مسار عملي جيد إذا كانت غيداء تدير الدورة المحاسبية والمراجعات اليومية بنفسها.",
    market: ["General ledger", "Financial statements", "Audit support", "IFRS", "Excel / ERP"],
    confirm: ["AP وAR وGL", "الزكاة والضريبة", "التدقيق الخارجي", "إدارة النقد"],
    source: "https://sa.linkedin.com/jobs/view/chief-accountant-at-qawim-for-professional-consulting-4428945693",
  },
  {
    role: "Accounting Manager",
    fit: "مناسب عند إثبات إدارة الإقفال والعمليات والتقارير مع فرق وأطراف متعددة.",
    market: ["Period-end close", "Accounting operations", "Data integrity", "Management reporting", "Process improvement"],
    confirm: ["مدة الإقفال", "الميزانيات", "التدفقات النقدية", "أمثلة تحسين العمليات"],
    source: "https://sa.linkedin.com/jobs/view/senior-financial-accounting-manager-at-dirah-development-4410008837",
  },
];

const achievementPrompts = [
  ["حجم العمل", "كم حسابًا أو فرعًا أو تسوية أو تقريرًا كنتِ تتابعين؟"],
  ["سرعة الإقفال", "كم كان يستغرق الإقفال أو إعداد التقرير قبل التحسين وبعده؟"],
  ["دقة البيانات", "ما الخطأ أو الفرق الذي اكتشفته؟ وكيف منعتِ تكراره؟"],
  ["القيادة", "كم شخصًا كنتِ تنسقين أو تراجعين عمله؟ وما الذي تحسن؟"],
  ["التدقيق", "ما نوع الملاحظات التي أغلقتها أو الأدلة التي جهزتها؟"],
  ["الرقابة", "ما الإجراء أو قائمة الفحص أو المراجعة التي أضفتِها؟"],
  ["دعم القرار", "ما القرار الذي ساعد تقريرك الإدارة على اتخاذه؟"],
  ["الأدوات", "ما الأنظمة أو Excel أو أدوات التقارير التي استخدمتها فعليًا؟"],
];

const sourceLinks = [
  { title: "إنشاء ملف LinkedIn جيد", type: "إرشاد رسمي", url: "https://www.linkedin.com/help/linkedin/answer/a554351", note: "النبذة، الصورة، الخبرة، التعليم، والمهارات." },
  { title: "قسم Introduction", type: "إرشاد رسمي", url: "https://www.linkedin.com/help/linkedin/answer/a547248", note: "هذا هو الجزء الأول الذي يراه زائر الملف." },
  { title: "Featured على الملف الشخصي", type: "إرشاد رسمي", url: "https://www.linkedin.com/help/linkedin/answer/a552452/featured-section-on-your-profile-faqs", note: "لعرض المستندات والروابط والمنشورات كأدلة عمل." },
  { title: "Head of Accounting · Riyadh", type: "مثال سوقي حديث", url: roleTracks[0].source, note: "مرجع للمسمى والكلمات المطلوبة، وليس وعدًا بالتطابق." },
  { title: "Chief Accountant · Riyadh", type: "مثال سوقي حديث", url: roleTracks[1].source, note: "يظهر تكرار IFRS والتقارير والأنظمة والامتثال المحلي." },
  { title: "Financial Accounting Manager", type: "مثال سوقي حديث", url: roleTracks[2].source, note: "يبرز الإقفال والعمليات وسلامة السجلات والتقارير." },
];

const proofAssets = [
  { order: "01", title: "شهادة IFRS", format: "PDF أو رابط تحقق", rule: "ارفعي النسخة الرسمية، واكتبي الاسم والجهة والتاريخ كما هي." },
  { order: "02", title: "دراسة حالة", format: "صفحة واحدة / PDF", rule: "اشرحي المشكلة، دورك، ما فعلته، والنتيجة بعد حذف أي بيانات حساسة." },
  { order: "03", title: "عينة تقرير", format: "PDF بلا بيانات حساسة", rule: "أظهري طريقة ترتيب التقرير، لا أرقام الشركة أو أسماء العملاء." },
  { order: "04", title: "منشور تخصصي", format: "منشور أو Carousel", rule: "اختاري موضوعًا من واقع العمل، مثل التسويات أو جودة التقارير." },
  { order: "05", title: "توصيات", format: "3 توصيات", rule: "من مدير وزميل وشريك عمل، وكل شخص يذكر موقفًا رآه بنفسه." },
];

const services = [
  { number: "01", title: "مراجعة السيرة الذاتية", description: "أراجع السيرة كما يراها مسؤول التوظيف، ثم أوضح ما الذي يحتاج إلى تعديل ولماذا.", price: "يبدأ من 19 ريال" },
  { number: "02", title: "كتابة السيرة الذاتية", description: "أعيد كتابة الخبرة بلغة واضحة وموجهة للدور المطلوب، من دون تضخيم أو معلومات غير صحيحة.", price: "يبدأ من 113 ريال" },
  { number: "03", title: "الإلقاء والعروض", description: "أرتب الفكرة وأبني العرض بحيث يكون سهل المتابعة والتذكر.", price: "متاح حسب الطلب" },
  { number: "04", title: "تحسين LinkedIn", description: "أعيد ترتيب الملف وكتابة أقسامه حتى يصبح أوضح للزائر وأسهل في البحث.", price: "يبدأ من 113 ريال" },
  { number: "05", title: "بناء منتج أو موقع شخصي", description: "أصمم وأطوّر موقعًا شخصيًا أو نموذجًا أوليًا، ثم أنشره جاهزًا للاستخدام.", price: "يبدأ من 939 ريال" },
  { number: "06", title: "التقارير ولوحات المتابعة", description: "أحوّل الأرقام المتفرقة إلى تقرير أو لوحة يمكن قراءتها واتخاذ قرار منها.", price: "يبدأ من 376 ريال" },
  { number: "07", title: "الباقة المتكاملة", description: "لمن يريد معالجة السيرة وLinkedIn والحضور المهني ضمن مسار واحد.", price: "1,499 ريال" },
];

function CopyButton({ text, label = "نسخ" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return <button className="copy-button" type="button" onClick={copy}>{copied ? "تم النسخ ✓" : label}</button>;
}

function ProgressChecklist() {
  const allTasks = useMemo(() => executionSteps.flatMap((step) => step.tasks.map((task) => `${step.phase}::${task}`)), []);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ghaidaa-linkedin-progress");
      if (saved) window.setTimeout(() => setChecked(JSON.parse(saved)), 0);
    } catch { /* Device-local preference only. */ }
  }, []);

  function toggle(key: string) {
    setChecked((current) => {
      const next = { ...current, [key]: !current[key] };
      window.localStorage.setItem("ghaidaa-linkedin-progress", JSON.stringify(next));
      return next;
    });
  }

  const done = allTasks.filter((task) => checked[task]).length;
  const percent = Math.round((done / allTasks.length) * 100);

  return (
    <div className="roadmap-dashboard">
      <div className="roadmap-progress">
        <div className="roadmap-score"><strong>{percent}%</strong><span>{done} من {allTasks.length} خطوة</span></div>
        <div className="roadmap-bar"><span style={{ width: `${percent}%` }} /></div>
        <p>يُحفظ التقدم على هذا الجهاز فقط.</p>
      </div>
      <div className="roadmap-phases">
        {executionSteps.map((step, index) => (
          <article className="roadmap-phase reveal" key={step.phase}>
            <div className="phase-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="phase-head"><span>{step.phase}</span><h3>{step.title}</h3><p>{step.deliverable} · المسؤول: {step.owner}</p></div>
            <div className="phase-tasks">
              {step.tasks.map((task) => {
                const key = `${step.phase}::${task}`;
                return <label className={checked[key] ? "task-row done" : "task-row"} key={task}><input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)} /><span>{task}</span></label>;
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTracker() {
  const metrics = ["Search appearances", "Profile views", "Relevant messages", "New quality connections"];
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ghaidaa-linkedin-metrics");
      if (saved) window.setTimeout(() => setValues(JSON.parse(saved)), 0);
    } catch { /* Device-local preference only. */ }
  }, []);

  function update(key: string, value: string) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      window.localStorage.setItem("ghaidaa-linkedin-metrics", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="tracker-wrap">
      <div className="tracker-head"><span>متابعة أسبوعية</span><h3>سجّلي الأرقام مرة كل أسبوع</h3><p>لا تحكمي من أسبوع واحد. راقبي الاتجاه: هل الزيارات والرسائل المناسبة تتحسن مع الوقت؟</p></div>
      <div className="tracker-table">
        <div className="tracker-row tracker-labels"><b>المؤشر</b><span>الأساس</span><span>أسبوع 1</span><span>أسبوع 2</span><span>أسبوع 3</span><span>أسبوع 4</span></div>
        {metrics.map((metric) => <div className="tracker-row" key={metric}><b>{metric}</b>{["base", "w1", "w2", "w3", "w4"].map((week) => <input key={week} aria-label={`${metric} ${week}`} inputMode="numeric" value={values[`${metric}-${week}`] ?? ""} onChange={(event) => update(`${metric}-${week}`, event.target.value)} placeholder="—" />)}</div>)}
      </div>
    </div>
  );
}

function AchievementWorksheet() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ghaidaa-achievement-notes");
      if (saved) window.setTimeout(() => setAnswers(JSON.parse(saved)), 0);
    } catch { /* Device-local notes only. */ }
  }, []);

  function update(key: string, value: string) {
    setAnswers((current) => {
      const next = { ...current, [key]: value };
      window.localStorage.setItem("ghaidaa-achievement-notes", JSON.stringify(next));
      return next;
    });
  }

  const completed = achievementPrompts.filter(([key]) => answers[key]?.trim()).length;

  return (
    <div className="achievement-workbook reveal">
      <div className="workbook-intro">
        <span>ورقة استخراج الإنجازات</span>
        <h3>الأرقام لا تُخترع؛ تُستخرج من العمل.</h3>
        <p>أجيبي بكلمات بسيطة. بعد ذلك تتحول الإجابات المؤكدة إلى نقاط خبرة قوية. تُحفظ الملاحظات على هذا الجهاز فقط.</p>
        <div className="workbook-progress"><i style={{ width: `${(completed / achievementPrompts.length) * 100}%` }} /><b>{completed}/{achievementPrompts.length}</b></div>
      </div>
      <div className="workbook-fields">
        {achievementPrompts.map(([label, prompt], index) => (
          <label key={label}>
            <span>{String(index + 1).padStart(2, "0")} · {label}</span>
            <small>{prompt}</small>
            <textarea value={answers[label] ?? ""} onChange={(event) => update(label, event.target.value)} placeholder="اكتبي معلومة مؤكدة أو اتركي الحقل فارغًا..." />
          </label>
        ))}
      </div>
    </div>
  );
}

const keywordDictionary = [
  ["IFRS", ["ifrs", "international financial reporting standards"]],
  ["Financial Reporting", ["financial reporting", "financial reports"]],
  ["Financial Statements", ["financial statements", "balance sheet", "income statement"]],
  ["Bank Reconciliation", ["bank reconciliation", "reconciliations", "account reconciliation"]],
  ["Month-End Close", ["month-end close", "monthly close", "period-end close", "closing"]],
  ["General Ledger", ["general ledger", "gl accounting", "gl"]],
  ["Internal Controls", ["internal controls", "financial controls"]],
  ["Audit Support", ["external audit", "internal audit", "audit support"]],
  ["Management Reporting", ["management reporting", "management reports"]],
  ["Financial Analysis", ["financial analysis", "variance analysis"]],
  ["Accounts Payable", ["accounts payable", "ap"]],
  ["Accounts Receivable", ["accounts receivable", "ar"]],
  ["Cash Flow", ["cash flow", "cash management", "treasury"]],
  ["Budgeting", ["budgeting", "budget preparation", "forecasting"]],
  ["ERP", ["erp", "sap", "oracle", "dynamics 365"]],
  ["Advanced Excel", ["advanced excel", "pivot table", "power query"]],
  ["VAT / ZATCA", ["vat", "zatca", "zakat", "tax compliance"]],
  ["Team Leadership", ["team leadership", "people management", "supervisory"]],
] as const;

function keywordFound(text: string, aliases: readonly string[]) {
  return aliases.some((alias) => alias.length <= 3
    ? new RegExp(`\\b${alias}\\b`, "i").test(text)
    : text.includes(alias));
}

function KeywordChecker() {
  const [jobText, setJobText] = useState("");
  const normalized = jobText.toLowerCase();
  const matches = keywordDictionary.filter(([, aliases]) => keywordFound(normalized, aliases));
  const gaps = keywordDictionary.filter(([, aliases]) => !keywordFound(normalized, aliases));

  return (
    <div className="keyword-checker reveal">
      <div className="checker-copy">
        <span>مقارنة وصف وظيفي</span>
        <h3>ألصقي إعلان الوظيفة قبل تعديل الملف.</h3>
        <p>الأداة تلتقط الكلمات الظاهرة حرفيًا داخل الإعلان، ثم تساعدك على مراجعة ما تدعمه خبرة غيداء فعلًا. لا تحاكي نظام توظيف سريًا ولا تقيس فرصة القبول.</p>
        <textarea value={jobText} onChange={(event) => setJobText(event.target.value)} placeholder="Paste the English job description here…" dir="ltr" />
      </div>
      <div className="checker-results">
        <div className="match-meter"><strong>{jobText.trim() ? matches.length : 0}</strong><span>مصطلحًا موجودًا من {keywordDictionary.length}</span></div>
        {!jobText.trim() ? <p className="checker-empty">ألصقي الوصف الوظيفي لتظهر الكلمات المشتركة والفجوات المحتملة.</p> : <>
          <div><b>موجودة في الإعلان</b><div className="result-chips matched">{matches.length ? matches.map(([term]) => <span key={term}>{term}</span>) : <small>لم يظهر أي مصطلح من القائمة بعد.</small>}</div></div>
          <div><b>راجعيها فقط إذا كانت مطلوبة ومؤكدة</b><div className="result-chips gaps">{gaps.map(([term]) => <span key={term}>{term}</span>)}</div></div>
        </>}
      </div>
    </div>
  );
}

export default function Home() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const jumpToHash = () => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const first = window.setTimeout(jumpToHash, 160);
    const settled = window.setTimeout(jumpToHash, 1400);
    const finalSettle = window.setTimeout(jumpToHash, 3600);
    window.addEventListener("hashchange", jumpToHash);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(settled);
      window.clearTimeout(finalSettle);
      window.removeEventListener("hashchange", jumpToHash);
    };
  }, []);

  return (
    <main>
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />
      <header className={scrolled ? "topbar topbar--solid" : "topbar"}>
        <a className="brand" href="#top" aria-label="العودة إلى بداية التقرير"><span className="brand-mark">G</span><span><b>غيداء إمام</b><small>تقرير الحضور المهني</small></span></a>
        <nav aria-label="التنقل داخل التقرير"><a href="#before-after">التقييم</a><a href="#visual">الهوية</a><a href="#rewrite">إعادة الكتابة</a><a href="#plan">الخطة</a></nav>
        <button className="print-button" type="button" onClick={() => window.print()}>طباعة التقرير</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid-lines" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-copy ghaidaa-hero-copy">
          <p className="eyebrow"><span /> تدقيق ملف LinkedIn · المحاسبة والتمويل الأصغر</p>
          <h1>اجعلي خبرتك المالية<br /><em>تُرى قبل أن تُقرأ.</em></h1>
          <p className="hero-lead">
            لدى غيداء خبرة حقيقية في قيادة أعمال المحاسبة داخل قطاع التمويل الأصغر، لكن الملف الحالي لا يقدّمها بهذه الصورة. من يفتح الصفحة يرى معلومات متفرقة، بينما القيمة الأهم — القيادة، التقارير المالية، تسويات الحسابات وتطبيق IFRS — تحتاج أن تظهر من اللحظة الأولى.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#before-after">شاهدي التقييم</a>
            <a className="secondary-action" href="https://www.linkedin.com/in/ghaidaa-emam-ifrs-holder%E2%80%8F-788554295/" target="_blank" rel="noreferrer">فتح الملف الحالي ↗</a>
          </div>
          <div className="source-note"><span>●</span> اعتمدت القراءة على الملف والصور المرفقة. أي معلومة لم تظهر بوضوح ستجدينها في التقرير كسؤال يحتاج تأكيدًا، لا كحقيقة جاهزة.</div>
        </div>

        <div className="hero-visual ghaidaa-hero-visual" aria-label="معاينة الملف الحالي ونتيجة التدقيق">
          <div className="profile-window ghaidaa-profile-window">
            <div className="browser-row"><i /><i /><i /><span>linkedin.com/in/ghaidaa-emam</span></div>
            <img src="/audit/ghaidaa-profile.png" alt="لقطة من مقدمة ملف غيداء الحالي على لينكدإن" />
            <div className="profile-scan-line" aria-hidden="true" />
          </div>
          <div className="score-card ghaidaa-score-card">
            <div className="score-ring ghaidaa-score-ring"><strong>29</strong><small>/100</small></div>
            <div><span>النتيجة الحالية</span><b>خبرة واضحة، لكن حضورها ضعيف</b><small>الهدف بعد التنفيذ: 85–88</small></div>
          </div>
          <div className="float-tag float-tag--photo"><b>الصورة</b><span>واضحة، وتحتاج مظهرًا مهنيًا أقوى</span></div>
          <div className="float-tag float-tag--headline"><b>العنوان</b><span>معلومات مهمة، لكن ترتيبها مشتّت</span></div>
        </div>
      </section>

      <section className="trust-strip"><div className="shell trust-grid"><p><strong>اعتمدت المراجعة على</strong> الصور المرسلة، المعلومات الظاهرة، إرشادات LinkedIn، ومتطلبات أدوار محاسبية حديثة في الرياض.</p><span>لا صور بديلة</span><span>لا أرقام مفترضة</span><span>معيار سوقي حديث</span><span>خطة قابلة للتنفيذ</span></div></section>

      <section className="section before-after-section" id="before-after">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">01 — الانطباع الأول</span><h2>ما الذي سيتغير من أول نظرة؟</h2></div><p>هذه مقارنة بين الملف الحالي وشكل مقترح له بعد الترتيب. الهدف أن تظهر خبرة غيداء بوضوح، لا أن يشبه ملفها شخصًا آخر.</p></div>

          <div className="profile-stage reveal">
            <article className="profile-mock current-profile">
              <div className="mock-label"><span>قبل</span><b>الملف الحالي</b></div>
              <div className="current-shot"><img src="/audit/ghaidaa-profile.png" alt="الملف الحالي لغيداء إمام" /></div>
              <div className="profile-score-chip">29/100</div>
            </article>

            <div className="transformation-rail"><span>الصورة</span><i /><span>الغلاف</span><i /><span>العنوان</span><i /><span>الدليل</span></div>

            <article className="profile-mock optimized-profile" dir="ltr">
              <div className="mock-label"><span>بعد</span><b>النسخة المقترحة</b></div>
              <div className="optimized-banner"><div className="banner-copy"><small>ACCOUNTING LEADERSHIP</small><strong>Accurate reporting.<br />Clearer decisions.</strong><span>IFRS · Financial Reporting · Riyadh</span></div><div className="banner-mark">GE</div></div>
              <div className="optimized-intro">
                <div className="avatar-wrap"><img src="/audit/ghaidaa-avatar.png" alt="صورة غيداء الحالية بقصّ مقترح" /><span>استخدمي صورة أصلية أوضح</span></div>
                <div className="intro-copy"><h3>Ghaidaa Emam</h3><p>Head of Accounting | IFRS Financial Reporting | Bank Reconciliation | Microfinance | Financial Analysis</p><span>Riyadh, Saudi Arabia · Open to relevant accounting leadership opportunities</span><div><button type="button">Message</button><button type="button">More</button></div></div>
              </div>
              <div className="profile-score-chip target-chip">88/100</div>
            </article>
          </div>

          <div className="source-evidence reveal">
            <div className="source-evidence-heading">
              <span>قراءة مباشرة للصور المرفقة</span>
              <h3>المشكلة ليست في الخبرة؛ بل في طريقة ظهورها داخل كل قسم.</h3>
              <p>هذه الملاحظات مأخوذة من الصور نفسها. ما يحتاج تأكيدًا—خصوصًا تاريخ دور Accountant—لن يُعاد تفسيره أو تخمينه.</p>
            </div>
            <div className="source-evidence-grid">
              {screenshotFindings.map((item, index) => (
                <figure className="evidence-card" key={item.label}>
                  <div className="evidence-image-wrap"><img src={item.image} alt={item.alt} /><b>{String(index + 1).padStart(2, "0")}</b></div>
                  <figcaption><span>{item.label}</span><h4>{item.title}</h4><ul>{item.findings.map((finding) => <li key={finding}>{finding}</li>)}</ul></figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="snapshot-panel reveal">
            <div className="snapshot-heading"><span>بطاقة الملف كما ظهر في الصور</span><h3>ثماني معلومات مؤكدة، وأين يجب أن تنتقل داخل الملف.</h3><p>هذه ليست افتراضات. كل سطر مبني على ما ظهر في اللقطات، ثم يوضح طريقة استخدامه بشكل أفضل.</p></div>
            <div className="snapshot-grid">{verifiedSnapshot.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><small>{item.label}</small><h4>{item.value}</h4><p>{item.note}</p></article>)}</div>
          </div>

          <div className="recruiter-scan reveal">
            <div className="scan-heading"><span>اختبار العشرين ثانية</span><h3>ما الذي يفهمه مسؤول التوظيف قبل أن يقرأ التفاصيل؟</h3></div>
            <div className="scan-timeline">{recruiterScan.map((item) => <article key={item.time}><b>{item.time}</b><div><small>ما يراه</small><p>{item.sees}</p></div><div><small>السؤال الذي يتكوّن</small><p>{item.thinks}</p></div><div><small>التعديل</small><p>{item.fix}</p></div></article>)}</div>
          </div>

          <div className="before-after-grid">
            {beforeAfterItems.map((item, index) => <article className="transformation-card reveal" key={item.title}><div className="transformation-top"><span>{String(index + 1).padStart(2, "0")}</span><b className={`priority-tag p-${item.priority}`}>{item.priority}</b></div><h3>{item.title}</h3><div className="transformation-text"><p><small>الحالي</small>{item.before}</p><p><small>المحسّن</small>{item.after}</p></div><footer>{item.impact}</footer></article>)}
          </div>
        </div>
      </section>

      <section className="section market-section" id="benchmark">
        <div className="shell">
          <div className="section-heading light-heading reveal"><div><span className="section-kicker">02 — معيار سوقي من نفس المجال</span><h2>ما المسار الأقرب إلى خبرة غيداء؟</h2></div><p>بدل مقارنة غيداء بشخص بعينه، قارنت طريقة عرض الملف بما تتكرر المطالبة به في أدوار Head of Accounting وChief Accountant وAccounting Manager في الرياض.</p></div>
          <div className="role-track-grid">
            {roleTracks.map((track, index) => <article className="role-track-card reveal" key={track.role}><div className="role-track-top"><span>مسار {String(index + 1).padStart(2, "0")}</span><a href={track.source} target="_blank" rel="noreferrer">مثال وظيفي ↗</a></div><h3>{track.role}</h3><p>{track.fit}</p><div><small>كلمات تتكرر في السوق</small><ul>{track.market.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="confirm-box"><small>يجب تأكيده قبل استهداف المسار</small><p>{track.confirm.join(" · ")}</p></div></article>)}
          </div>
          <div className="benchmark-patterns">
            {benchmarkPatterns.map((pattern, index) => <article className="benchmark-pattern reveal" key={pattern.area}><span>{String(index + 1).padStart(2, "0")}</span><h3>{pattern.area}</h3><div><small>غيداء الآن</small><p>{pattern.current}</p></div><div><small>نمط السوق الأقوى</small><p>{pattern.benchmark}</p></div><b>{pattern.action}</b></article>)}
          </div>
          <div className="market-note reveal"><b>كيف تُستخدم هذه المقارنة؟</b><p>نختار مسارًا رئيسيًا واحدًا، ثم نطابق الكلمات مع العمل الحقيقي فقط. إذا كان الإعلان يطلب GL أو VAT أو ERP ولم تمارسها غيداء، فلا نضيفها لمجرد تحسين البحث.</p></div>
        </div>
      </section>

      <section className="section audit70-section" id="audit70">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">03 — المراجعة التفصيلية</span><h2>ما الذي يحتاج إلى تعديل فعلًا؟</h2></div><p>قسّمت الملف إلى 15 جزءًا وراجعت 70 نقطة. افتحي أي قسم لرؤية المشكلة والتعديل المقترح.</p></div>
          <div className="audit-summary reveal"><div><strong>29</strong><span>الدرجة الحالية الموزونة</span></div><div className="audit-summary-line"><span style={{ width: "29%" }} /></div><div><strong>88</strong><span>الدرجة المستهدفة</span></div></div>
          <div className="audit-groups">
            {auditGroups.map((group, index) => <details className="audit-group reveal" key={group.title} open={index < 2}><summary><span className="audit-group-index">{String(index + 1).padStart(2, "0")}</span><div><h3>{group.title}</h3><p>{group.impact}</p></div><div className="dual-score"><span><small>الآن</small>{group.current}</span><i>→</i><span><small>بعد</small>{group.target}</span></div><b className={`priority-tag p-${group.priority}`}>{group.priority}</b></summary><div className="audit-checks">{group.checks.map((check, checkIndex) => <article key={check.label}><span>{index + 1}.{checkIndex + 1}</span><div><h4>{check.label}</h4><p>{check.fix}</p></div><b className={`status-tag s-${check.status}`}>{check.status}</b></article>)}</div></details>)}
          </div>
          <div className="audit-count-note">15 محورًا · 70 نقطة مراجعة · أي معلومة غير مؤكدة ستجدينها بين [أقواس]</div>
        </div>
      </section>

      <section className="section rewrite-section" id="rewrite">
        <div className="shell">
          <div className="section-heading light-heading reveal"><div><span className="section-kicker">04 — الصياغة المقترحة</span><h2>نصوص يمكن استخدامها مباشرة</h2></div><p>انسخي ما يناسبك، ثم راجعي الحقول بين [أقواس]. هذه الحقول تحتاج معلومة من غيداء قبل النشر.</p></div>

          <div className="rewrite-block reveal">
            <div className="rewrite-heading"><span>أ</span><div><h3>5 خيارات للعنوان</h3><p>استخدمي خيارًا واحدًا فقط.</p></div></div>
            <div className="headline-options">{headlineOptions.map((option, index) => <article className={index === 0 ? "headline-option recommended" : "headline-option"} key={option.tag}><div><span>{option.tag}</span><CopyButton text={option.text} /></div><p dir="ltr">{option.text}</p><small>{option.note}</small></article>)}</div>
          </div>

          <div className="rewrite-block reveal">
            <div className="rewrite-heading"><span>ب</span><div><h3>النبذة بالعربية والإنجليزية</h3><p>صياغتان طبيعيّتان، كل واحدة مكتوبة لجمهورها.</p></div></div>
            <div className="copy-panels"><article className="copy-panel"><div className="copy-panel-head"><div><span>العربية</span><h4>نبذة جاهزة</h4></div><CopyButton text={aboutArabic} /></div><div className="long-copy">{aboutArabic}</div></article><article className="copy-panel english-copy" dir="ltr"><div className="copy-panel-head"><div><span>English</span><h4>Ready-to-paste About</h4></div><CopyButton text={aboutEnglish} /></div><div className="long-copy">{aboutEnglish}</div></article></div>
          </div>

          <div className="rewrite-block reveal">
            <div className="rewrite-heading"><span>ج</span><div><h3>صياغة الخبرة الحالية</h3><p>قبل استخدام النص، يجب أولًا توضيح تاريخ دور Accountant.</p></div></div>
            <div className="experience-cards">
              <article className="experience-rewrite"><div className="role-header"><div><span>IRADA MICROFINANCE</span><h4>Head of Accounting Department</h4><p>Jun 2018 – Present · التاريخ والموقع يحتاجان اعتمادًا نهائيًا</p></div><CopyButton text={headExperience.map((item) => `• ${item}`).join("\n")} /></div><ul>{headExperience.map((item, index) => <li className={index > 3 ? "placeholder-bullet" : ""} key={item}>{item}</li>)}</ul></article>
              <article className="experience-rewrite warning-role"><div className="role-header"><div><span>IRADA MICROFINANCE</span><h4>Accountant</h4><p>[تاريخ البداية] – [تاريخ الترقية/الانتهاء] · لا تستخدمي أكتوبر 2023 منفردًا قبل التحقق</p></div><CopyButton text={accountantExperience.map((item) => `• ${item}`).join("\n")} /></div><ul>{accountantExperience.map((item, index) => <li className={index > 2 ? "placeholder-bullet" : ""} key={item}>{item}</li>)}</ul><div className="role-warning"><b>تصحيح إلزامي:</b> لا يمكن اعتماد هذا السجل حتى تتضح التواريخ الفعلية وعلاقة Bank of Khartoum بالمسمى.</div></article>
            </div>
          </div>

          <div className="rewrite-block reveal">
            <div className="rewrite-heading"><span>د</span><div><h3>التعليم والشهادات والمشاريع</h3><p>نماذج مرتبة مع أماكن واضحة للمعلومات الناقصة.</p></div></div>
            <div className="support-copy-grid">
              <article><span>EDUCATION</span><h4>Sudan University of Science and Technology</h4><p>Bachelor of Science (BSc), Accounting and Finance<br />Oct 2011 – Nov 2015</p><small>حافظي على الاسم الرسمي كما في الشهادة.</small></article>
              <article><span>CERTIFICATION</span><h4>[الاسم الرسمي لشهادة IFRS]</h4><p>[الجهة المانحة] · [شهر/سنة الإصدار]<br />Credential ID: [إن وجد] · Verification: [الرابط]</p><small>لا تستخدمي DipIFR أو CertIFR ما لم يظهر حرفيًا في الشهادة.</small></article>
              <article><span>PROJECT TEMPLATE</span><h4>[اسم مشروع تحسين محاسبي حقيقي]</h4><p>التحدي: [ما المشكلة؟]<br />الدور: [ما الذي امتلكته؟]<br />الإجراء: [ماذا فعلت؟]<br />النتيجة: [رقم أو أثر معتمد]</p><small>أنشئي المشروع فقط من تجربة حقيقية.</small></article>
              <article><span>CONTACT & URL</span><h4>linkedin.com/in/ghaidaa-emam</h4><p>Riyadh, Saudi Arabia<br />[بريد مهني] · Open to [3 roles]</p><small>اختاري رابطًا قصيرًا إذا كان متاحًا.</small></article>
            </div>
          </div>

          <AchievementWorksheet />
        </div>
      </section>

      <section className="section visual-section" id="visuals">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">05 — الصورة والغلاف</span><h2>حضور مهني من دون مبالغة</h2></div><p>الصورة الحالية مناسبة كمرجع، لكن النسخة النهائية تحتاج الملف الأصلي بدقة أعلى. لا حاجة لوجه مولّد أو تعديل يغيّر الملامح.</p></div>
          <div className="photo-direction reveal"><div className="photo-sample"><img src="/audit/ghaidaa-avatar.png" alt="قص تجريبي للصورة الحالية" /><span>معاينة من الصورة الحالية</span></div><div><h3>توجيه جلسة التصوير</h3><ul><li>الكاميرا بمستوى العين، وتكوين رأس وكتفين.</li><li>ضوء طبيعي أمامي وخلفية رمادية أو بيج هادئة.</li><li>ملابس مهنية بلون سادة، وتعبير ودود وواثق.</li><li>دون فلتر قوي أو تنعيم مبالغ أو استبدال ملامح.</li><li>اتركي مساحة حول الرأس لأن LinkedIn يقص الصورة دائريًا.</li></ul></div><div className="photo-spec"><b>400×400+</b><span>JPG/PNG</span><small>استخدمي أعلى دقة متاحة</small></div></div>
          <div className="banner-concepts">
            <article className="banner-card reveal"><span>CONCEPT 01 · الموصى به</span><div className="banner-preview banner-one" dir="ltr"><small>HEAD OF ACCOUNTING</small><strong>Accurate reporting.<br />Clearer decisions.</strong><p>IFRS · Financial Reporting · Microfinance</p><i>GE</i></div><h3>Executive Minimal</h3><p>أخضر داكن وهوية قيادية هادئة. النص بعيد عن منطقة الصورة.</p></article>
            <article className="banner-card reveal"><span>CONCEPT 02</span><div className="banner-preview banner-two" dir="ltr"><small>ACCOUNTING OPERATIONS</small><strong>From reliable data<br />to confident decisions.</strong><p>Riyadh · Saudi Arabia</p><i>01</i></div><h3>Data & Decisions</h3><p>أرقام وخطوط شبكية خفيفة من دون شعارات أو صور وهمية.</p></article>
            <article className="banner-card reveal"><span>CONCEPT 03</span><div className="banner-preview banner-three" dir="ltr"><small>IFRS · REPORTING · RECONCILIATION</small><strong>Ghaidaa Emam</strong><p>Accounting Leadership</p><i>IFRS</i></div><h3>Credential Led</h3><p>مناسب بعد توثيق الاسم الرسمي لمؤهل IFRS.</p></article>
          </div>
          <div className="visual-spec-note"><b>المقاس الرسمي الموصى به:</b> 1584 × 396 بكسل، JPG أو PNG، وأقل من 8MB. اتركي الجهة التي تغطيها صورة الحساب خالية من النص.</div>
        </div>
      </section>

      <section className="section proof-section" id="proof">
        <div className="shell">
          <div className="section-heading light-heading reveal"><div><span className="section-kicker">06 — ما يثبت الخبرة</span><h2>ثلاث مواد جيدة أفضل من قسم ممتلئ</h2></div><p>ضعي في Featured ما يساعد القارئ على التحقق من الخبرة: شهادة، دراسة حالة قصيرة، وعينة عمل آمنة.</p></div>
          <div className="proof-assets">{proofAssets.map((asset) => <article className="proof-asset reveal" key={asset.order}><span>{asset.order}</span><div><small>{asset.format}</small><h3>{asset.title}</h3><p>{asset.rule}</p></div><b>Featured</b></article>)}</div>
          <div className="featured-mock reveal" dir="ltr"><div className="featured-title"><h3>Featured</h3><span>Recommended order</span></div><div className="featured-cards"><article><div className="doc-cover credential"><span>IFRS</span><b>Verified Credential</b></div><p>Official certificate</p></article><article><div className="doc-cover case-study"><span>CASE 01</span><b>Improving a reporting process</b></div><p>One-page case study</p></article><article><div className="doc-cover checklist"><span>CHECKLIST</span><b>Bank reconciliation review</b></div><p>Practical document</p></article></div></div>
        </div>
      </section>

      <section className="section keyword-section">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">07 — البحث والمهارات</span><h2>استخدمي الكلمات التي تصف عملها فعلًا</h2></div><p>وجود الكلمة مهم، لكن تكرارها بلا سياق يضعف النص. استخدمي كل مصطلح في المكان الذي يشرح خبرة حقيقية.</p></div>
          <div className="keyword-columns"><article className="reveal"><span className="keyword-label verified">مدعومة بما ظهر</span><div className="keyword-cloud">{["Head of Accounting", "Accounting Manager", "Chief Accountant", "IFRS", "Financial Reporting", "Bank Reconciliation", "Financial Statements", "Financial Analysis", "Management Reporting", "Microfinance"].map((word) => <span key={word}>{word}</span>)}</div><p>ضعي أعلى 3 مهارات: Financial Reporting، IFRS، Bank Reconciliation.</p></article><article className="reveal"><span className="keyword-label conditional">بعد التحقق فقط</span><div className="keyword-cloud muted">{["Month-End Close", "General Ledger", "Accounts Payable", "Accounts Receivable", "Internal Controls", "Audit Coordination", "Budgeting", "Cash Flow", "ERP / SAP / Oracle", "Advanced Excel", "Power BI", "VAT / ZATCA", "SOCPA"].map((word) => <span key={word}>{word}</span>)}</div><p>أضيفي الأداة أو الامتثال فقط إذا مارسته فعلًا ويمكنك شرحه في مقابلة.</p></article></div>
          <KeywordChecker />
        </div>
      </section>

      <section className="section content-section" id="content">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">08 — حضور لمدة 90 يومًا</span><h2>منشور جيد كل أسبوع يكفي للبداية</h2></div><p>الخطة تحتوي على 36 فكرة و12 مسودة. لا تنشريها كما هي؛ أضيفي موقفًا حقيقيًا أو رأيًا شخصيًا حتى تبدو بصوت غيداء.</p></div>
          <div className="pillars"><article className="reveal"><span>01</span><h3>IFRS والتقارير المالية</h3><p>شرح عملي، أخطاء شائعة، وكيف تتحول القاعدة إلى تقرير واضح.</p></article><article className="reveal"><span>02</span><h3>العمليات والتسويات</h3><p>الإقفال، جودة البيانات، التسويات البنكية، والرقابة العملية.</p></article><article className="reveal"><span>03</span><h3>المحاسبة ودعم القرار</h3><p>كيف تساعد الأرقام الإدارة، والقيادة الهادئة داخل فرق المحاسبة.</p></article></div>
          <div className="calendar-table reveal"><div className="calendar-head"><b>الأسبوع</b><b>منشور تعليمي</b><b>قصة أو أداة</b><b>تفاعل نوعي</b></div>{contentCalendar.map(([week, one, two, three]) => <div className="calendar-row" key={week}><span>{week}</span><p>{one}</p><p>{two}</p><p>{three}</p></div>)}</div>
          <div className="ready-posts"><div className="subsection-heading reveal"><span>12 مسودة للبداية</span><h3>خذي الفكرة، ثم اكتبيها بصوتك وتجربتك</h3></div>{readyPosts.map((post, index) => <details className="ready-post reveal" key={post.title}><summary><span>{String(index + 1).padStart(2, "0")}</span><h4>{post.title}</h4><b>عرض المسودة</b></summary><div><pre>{post.text}</pre><CopyButton text={post.text} label="نسخ المسودة" /></div></details>)}</div>
        </div>
      </section>

      <section className="section outreach-section" id="outreach">
        <div className="shell">
          <div className="section-heading light-heading reveal"><div><span className="section-kicker">09 — بناء العلاقات</span><h2>تواصلي مع أشخاص مناسبين، لا مع أكبر عدد</h2></div><p>ابدئي بتفاعل حقيقي، ثم أرسلي دعوة قصيرة لها سبب واضح. تجنبي الأدوات التي ترسل الرسالة نفسها للجميع.</p></div>
          <div className="outreach-routine reveal"><div><b>15 دقيقة</b><span>قراءة منشورين من المجال</span></div><div><b>3 تعليقات</b><span>نوعية أسبوعيًا</span></div><div><b>5–10</b><span>علاقات مناسبة أسبوعيًا</span></div><div><b>1 متابعة</b><span>بعد القبول بلا ضغط</span></div></div>
          <div className="outreach-templates">{outreachTemplates.map((template) => <article className="outreach-card reveal" key={template.audience}><span>{template.audience}</span><div><small>قبل الاتصال</small><p>{template.before}</p></div><div><small>رسالة الدعوة</small><p>{template.invite}</p><CopyButton text={template.invite} /></div><div><small>بعد القبول</small><p>{template.followup}</p><CopyButton text={template.followup} /></div></article>)}</div>
        </div>
      </section>

      <section className="section plan-section" id="plan">
        <div className="shell">
          <div className="section-heading light-heading reveal"><div><span className="section-kicker">10 — خطة 30/60/90 يومًا</span><h2>ما الذي يُنفذ أولًا، وما الذي يمكن تأجيله؟</h2></div><p>الأسبوع الأول لتصحيح المعلومات وكتابة الملف. بعد ذلك نضيف الأدلة، ثم نبدأ بالنشر وبناء العلاقات تدريجيًا.</p></div>
          <ProgressChecklist />
          <AnalyticsTracker />
        </div>
      </section>

      <section className="section references-section" id="references">
        <div className="shell">
          <div className="section-heading reveal"><div><span className="section-kicker">11 — المراجع</span><h2>لماذا جاءت هذه التوصيات بهذه الصورة؟</h2></div><p>المراجع هنا تشرح وظائف أقسام LinkedIn وتعرض أمثلة سوقية حديثة للمسميات القريبة. هي نقطة تحقق، وليست وصفة جاهزة أو ضمانًا للقبول.</p></div>
          <div className="reference-grid">{sourceLinks.map((source, index) => <a className="reference-card reveal" href={source.url} target="_blank" rel="noreferrer" key={source.title}><span>{String(index + 1).padStart(2, "0")}</span><small>{source.type}</small><h3>{source.title}</h3><p>{source.note}</p><b>فتح المرجع ↗</b></a>)}</div>
          <div className="reference-note reveal"><b>تاريخ المراجعة: 14 أغسطس 2026</b><p>قد تُغلق الإعلانات الوظيفية أو تتغير متطلباتها. تُستخدم الأمثلة لفهم اللغة المتكررة في السوق وقت إعداد التقرير، ثم يُراجع كل إعلان جديد على حدة.</p></div>
        </div>
      </section>

      <section className="section services-showcase" id="services">
        <div className="services-glow services-glow-one" />
        <div className="services-glow services-glow-two" />
        <div className="shell services-shell">
          <div className="services-heading reveal"><span>12 — خطوة إضافية بعد LinkedIn</span><h2>LinkedIn يعرّف بها.<br /><em>والموقع الشخصي يكمل الصورة.</em></h2><p>ليس كل شخص بحاجة إلى موقع. لكن إذا أرادت غيداء جمع شهاداتها ودراسات الحالة ونماذج العمل في مكان واحد، فالموقع الشخصي سيكون مفيدًا.</p></div>

          <div className="portfolio-story reveal">
            <div className="portfolio-copy">
              <span className="portfolio-label">مثال توضيحي</span>
              <h3>صفحة واحدة تجمع<br />ما لا يتسع له LinkedIn.</h3>
              <p>يمكن أن يضم الموقع نبذة قصيرة، الخبرة، شهادة IFRS، ودراستين أو ثلاثًا من واقع العمل بعد حذف البيانات الحساسة. الرابط يصبح جاهزًا للإرسال مع أي تقديم وظيفي.</p>
              <div className="portfolio-benefits"><span>نبذة مختصرة</span><span>شهادات قابلة للتحقق</span><span>نماذج عمل آمنة</span><span>بيانات التواصل</span></div>
              <a className="portfolio-link" href="https://www.turkialmalki.com/" target="_blank" rel="noreferrer">شاهد مثالًا لموقع شخصي منشور ↗</a>
            </div>
            <a className="portfolio-browser" href="https://www.turkialmalki.com/" target="_blank" rel="noreferrer" aria-label="فتح مثال لموقع شخصي منشور">
              <div className="browser-bar"><i /><i /><i /><span>yourname.com</span></div>
              <div className="browser-canvas">
                <div className="browser-nav"><b>Ghaidaa Emam</b><span>الخبرة&nbsp;&nbsp; الشهادات&nbsp;&nbsp; التواصل</span></div>
                <div className="browser-tags"><span>IFRS</span><span>التقارير المالية</span><span>التسويات</span><span>التمويل الأصغر</span></div>
                <h3>أحوّل المعلومات المالية<br />إلى <em>صورة أوضح للقرار.</em></h3>
                <div className="browser-stats"><div><b>خبرة</b><span>المسار المهني</span></div><div><b>اعتماد</b><span>الشهادات</span></div><div><b>أعمال</b><span>دراسات الحالة</span></div></div>
                <div className="browser-projects"><span>Financial Reporting</span><span>Bank Reconciliation</span><span>IFRS Practice</span></div>
              </div>
              <div className="browser-cursor">↖</div>
            </a>
          </div>

          <div className="services-ticker" aria-hidden="true"><div><span>CV REVIEW</span><i>✦</i><span>LINKEDIN</span><i>✦</i><span>PORTFOLIO</span><i>✦</i><span>REPORTS</span><i>✦</i><span>MVP</span><i>✦</i><span>PRESENTATIONS</span><i>✦</i></div></div>

          <div className="service-catalog reveal">
            <div className="catalog-intro"><span>الخدمات المتاحة</span><h3>مساعدة حسب<br />ما تحتاجينه.</h3><p>يمكن البدء بمراجعة بسيطة، أو تنفيذ الملف والموقع كاملين.</p><a href="https://www.turkialmalki.com/services" target="_blank" rel="noreferrer">تفاصيل الخدمات والأسعار ↗</a></div>
            <div className="service-rows">{services.map((service) => <a href="https://www.turkialmalki.com/services" target="_blank" rel="noreferrer" className="service-row" key={service.number}><span>{service.number}</span><div><h4>{service.title}</h4><p>{service.description}</p></div><b>{service.price}</b><i>↗</i></a>)}</div>
          </div>

          <div className="contact-stage reveal">
            <div><span>بعد قراءة التقرير</span><h2>ابدئي بما تحتاجينه<br />الآن فقط.</h2></div>
            <div className="contact-links">
              <a href="mailto:turkialmalki202200@gmail.com"><span>البريد الإلكتروني</span><b>turkialmalki202200@gmail.com</b><i>↗</i></a>
              <a href="https://www.linkedin.com/in/turki-almalki-a4815b178/" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Turki Almalki</b><i>↗</i></a>
              <a href="https://www.turkialmalki.com/" target="_blank" rel="noreferrer"><span>الموقع الشخصي</span><b>turkialmalki.com</b><i>↗</i></a>
              <a href="https://www.turkialmalki.com/services" target="_blank" rel="noreferrer"><span>الخدمات</span><b>ابدئي من هنا</b><i>↗</i></a>
            </div>
          </div>
          <p className="services-disclaimer">الأسعار المعروضة هي الأسعار المنشورة وقت إعداد التقرير وقد تتغير. هذا التقرير استشاري لتحسين العرض المهني، ولا يضمن التوظيف أو ترتيب الظهور.</p>
        </div>
      </section>

      <footer className="site-footer"><div className="shell footer-grid"><div><b>Turki Almalki</b><span>LinkedIn · CV · Portfolio</span></div><p>مراجعة مهنية مكتوبة خصيصًا لملف غيداء إمام.</p><span>© 2026</span></div></footer>
    </main>
  );
}
