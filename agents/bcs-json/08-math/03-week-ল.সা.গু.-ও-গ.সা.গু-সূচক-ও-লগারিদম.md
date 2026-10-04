
### স্টেপ ০৫ - পাটিগণিতীয় ল.সা.গু. ও গ.সা.গু.

**১. মৌলিক উৎপাদক পদ্ধতি**
প্রতিটিকে আলাদা ভেঙে **সবচেয়ে বেশি বার থাকা** মৌলিক সংখ্যাগুলো গুণ করতে হয়:

* $৮ = \mathbf{২ \times ২ \times ২}$
* $১২ = ২ \times ২ \times \mathbf{৩}$
* $৩০ = ২ \times ৩ \times \mathbf{৫}$

$$\text{ল.সা.গু.} = \mathbf{২ \times ২ \times ২} \times \mathbf{৩} \times \mathbf{৫} = \mathbf{১২০}$$

**২. ইউক্লিডীয় পদ্ধতি (ভাগ পদ্ধতি)**
কমপক্ষে **২টি** সংখ্যাকে ভাগ যায় এমন মৌলিক সংখ্যা দিয়ে একসাথে ভাগ করতে হয়:

$$\begin{array}{r|l}
২ & ৮,\ ১২,\ ৩০ \\
\hline
২ & ৪,\ ৬,\ ১৫ \\
\hline
৩ & ২,\ ৩,\ ১৫ \\
\hline
  & ২,\ ১,\ ৫
\end{array}$$

$$\text{ল.সা.গু.} = \text{বাইরের সবগুলোর গুণফল} = ২ \times ২ \times ৩ \times ২ \times ১ \times ৫ = \mathbf{১২০}$$


# 📌 গ.সা.গু. (GCD) নির্ণয়: ১২, ১৮, ৩০

### ১. মৌলিক উৎপাদক পদ্ধতি

প্রতিটিকে আলাদা ভেঙে **সবকটির মধ্যে মিল আছে (Common)** এমন সর্বনিম্ন পাওয়ারের মৌলিক সংখ্যাগুলো গুণ করতে হয়:

* $১২ = \mathbf{২} \times ২ \times \mathbf{৩}$
* $১৮ = \mathbf{২} \times \mathbf{৩} \times ৩$
* $৩০ = \mathbf{২} \times \mathbf{৩} \times ৫$

$$\text{গ.সা.গু.} = \mathbf{২ \times ৩} = \mathbf{৬}$$

### ২. ইউক্লিডীয় পদ্ধতি (ভাগ পদ্ধতি)

**সবকটি** সংখ্যাকে একসাথে ভাগ যায় এমন মৌলিক সংখ্যা দিয়েই কেবল ভাগ করতে হয় (যেখানে সবগুলোকে ভাগ যাবে না, সেখানে থেমে যেতে হবে):

$$\begin{array}{r|l}
২ & ১২,\ ১৮,\ ৩০ \\
\hline
৩ & ৬,\ ৯,\ ১৫ \\
\hline
  & ২,\ ৩,\ ৫
\end{array}$$

$$\text{গ.সা.গু.} = \text{শুধুমাত্র বামপাশের ভাজকগুলোর গুণফল} = ২ \times ৩ = \mathbf{৬}$$


### ৩. ভগ্নাংশের ল.সা.গু. ও গ.সা.গু.

* **ল.সা.গু.** $= \frac{\text{লবগুলোর ল.সা.গু.}}{\text{হরগুলোর গ.সা.গু.}}$

* **গ.সা.গু.** $= \frac{\text{লবগুলোর গ.সা.গু.}}{\text{হরগুলোর ল.সা.গু.}}$

*(মনে রাখার টেকনিক: যা বের করতে বলবে, লব-এর ক্ষেত্রে **সেটাই** হবে; আর হর-এর ক্ষেত্রে তার **উল্টোটা** হবে।)*


TODO: Losagu and gosagu er relation uttoron book 32 Page

# স্টেপ ০৬ - সূচক ও লগারিদম।

**অধ্যায় ১৪: সূচক ও লগারিদম**

## **বিগত বিসিএস প্রিলিমিনারি প্রশ্নের আলোকে বিষয়বস্তু ও গুরুত্ব**

| টপিক | Type | গুরুত্ব | বিসিএস পরীক্ষা |
| :--- | :--- | :---: | :--- |
| **সূচক** | সূত্রাবলি ও তার প্রয়োগ | ⭐⭐⭐ | ৪৬, ৪৫, ৪৪, ৩৩(২টি), ৩১, ২৬, ১৭ ও ১৪তম বিসিএস[cite: 9] |
| | সরলফল | ⭐⭐ | ৩৪, ৩৩ ও ১৩তম বিসিএস[cite: 9] |
| | সূচকীয় সমীকরণ সমাধান | ⭐⭐⭐ | ৪৩, ৪১, ৪০, ৩৯, ৩৮, ৩৬ ও ৩৩(২টি)তম বিসিএস[cite: 9] |
| **লগারিদম** | লগারিদমের মান নির্ণয় | ⭐⭐⭐ | ৪৫, ৪৩, ৪১, ৪০, ৩৬, ৩৫, ৩২, ৩১, ৩০ ও ১৩তম বিসিএস[cite: 9] |
| | $\log$-এর ভিত্তি/ঘাত -এর মান নির্ণয় | ⭐⭐⭐ | ৪৯, ৪৮, ৪৭, ৪৬, ৪৪, ৪২, ৩৮ ও ৩৭তম বিসিএস[cite: 9] |
| | সরলমান নির্ণয় | ⭐⭐⭐ | ৪৪ ও ৩৫তম বিসিএস[cite: 9] |

---

## **১৪.১: সূচক**

বীজগণিতের এ পর্যায়ে আমরা সূচকের (Exponent/Power) সাথে পরিচিত হবো যা বড় সংখ্যাকে ছোট আকারে প্রকাশ করতে বিশেষভাবে ব্যবহৃত হয়। আমরা জানি, সূচক হলো একই সংখ্যা বা রাশির বারবার গুণের গাণিতিক প্রকাশ। সূচকের সাহায্যে বোঝা যায় কোন সংখ্যা আমরা কতবার গুণ করেছি।[cite: 9]

যেমন: $x^3$ এর অর্থ $x$ কে $3$ বার গুণ করা হয়েছে এবং $9$ হলো $x^3$ এর সহগ। অনুরূপভাবে $(ab + bc)^3$ এর মানে হচ্ছে, $(ab + bc)$ রাশিকে $3$ বার গুণ করতে হবে।[cite: 9]

$$\text{সহগ/Co-efficient} \longleftarrow \mathbf{9x^3} \longrightarrow \text{সূচক/Power}$$
$$\uparrow$$
$$\text{ভিত্তি/Base}$$[cite: 9]

### **সূচক সম্পর্কিত সূত্রাবলি ও উদাহরণ:**

| ক্রমিক নং | সূচক সম্পর্কিত সূত্রাবলি | উদাহরণ |
| :---: | :--- | :--- |
| **০১** | $a^m \times a^n = a^{m+n}$[cite: 9] <br> $a^m \times a^n \times a^p = a^{m+n+p}$[cite: 9] <br> $a^m \times a^{-n} = a^{m+(-n)} = a^{m-n} ; a \neq 0$[cite: 9] | $x^2 \times x^3 = x^{2+3} = x^5$[cite: 9] <br> $x^2 \times x^3 \times x^4 = x^{2+3+4} = x^9$[cite: 9] <br> $x^6 \times x^{-4} = x^{6+(-4)} = x^2$[cite: 9] |
| **০২** | $a^m \div a^n = a^{m-n}$[cite: 9] | $x^{10} \div x^3 = x^{10-3} = x^7$[cite: 9] |
| **০৩** | $a^0 = 1, a \neq 0$[cite: 9] | $9^0 = 1 ; (1000909)^0 = 1 ; (0.1)^0 = 1$[cite: 9] |
| **০৪** | $(a^m)^n = a^{mn} = (a^n)^m$[cite: 9] | $(x^2)^5 = (x^5)^2 = x^{5 \times 2} = x^{10}$[cite: 9] |
| **০৫** | $\sqrt[n]{a^m} = a^{\frac{m}{n}}$[cite: 9] | $\sqrt[3]{x^2} = x^{\frac{2}{3}} ; \sqrt{p^8} = p^{\frac{8}{2}} = p^4$[cite: 9] |
| **০৬** | $a^{-m} = \frac{1}{a^m}$[cite: 9] <br> $\left(\frac{a}{b}\right)^{-m} = \frac{1}{\left(\frac{a}{b}\right)^m} = \left(\frac{b}{a}\right)^m ; a, b \neq 0$[cite: 9] | $a^{-2} = \frac{1}{a^2}$[cite: 9] <br> $\left(\frac{2}{3}\right)^{-3} = \frac{1}{\left(\frac{2}{3}\right)^3} = \left(\frac{3}{2}\right)^3$[cite: 9] |
| **০৭** | $(ab)^m = a^m b^m$[cite: 9] <br> $\left(\frac{a}{b}\right)^m = \frac{a^m}{b^m} ; b \neq 0$[cite: 9] | $(ab)^5 = a^5 \cdot b^5$[cite: 9] <br> $\left(\frac{a}{b}\right)^5 = \frac{a^5}{b^5}$[cite: 9] |
| **০৮** | $a^x = a^y \text{ হলে, } x = y$[cite: 9] <br> $a^x = b^x \text{ হলে, } a = b$[cite: 9] | $a^m = a^n \text{ হলে, } m = n$[cite: 9] <br> $p^3 = q^3 \text{ হলে, } p = q$[cite: 9] |

---

### **Type 01: মান নির্ণয়**

সূচকের সাধারণ সূত্রাবলি ও বৈশিষ্ট্য প্রয়োগ করে সূচকীয় রাশি বা সূচক মান নিরূপণ করা যায়।[cite: 10]

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। $\frac{1}{2} \times 2^{x-3} + 1 = 5$ হলে $x$ এর মান কত? [৪৬তম বিসিএস]**[cite: 10]  
(ক) $3$  (খ) $4$  (গ) $5$  (ঘ) $6$[cite: 10]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } \frac{1}{2} \times 2^{x-3} + 1 = 5$$[cite: 10]
  $$\Rightarrow 2^{-1} \times 2^{x-3} = 5 - 1$$[cite: 10]
  $$\Rightarrow 2^{x-3-1} = 4 \Rightarrow 2^{x-4} = 2^2$$[cite: 10]
  $$\Rightarrow x - 4 = 2 \Rightarrow x = 4 + 2 \Rightarrow x = 6$$[cite: 10]  
  **উত্তর:** **(ঘ)**[cite: 10]

**০২। $2^{x+7} = 4^{x+2}$ হলে $x$ এর মান কত? [৪৫তম বিসিএস]**[cite: 10]  
(ক) $2$  (খ) $3$  (গ) $4$  (ঘ) $6$[cite: 10]  
* **সমাধান:**  
  $$2^{x+7} = 4^{x+2} \Rightarrow 2^{x+7} = (2^2)^{x+2}$$[cite: 10]
  $$\Rightarrow 2^{x+7} = 2^{2x+4}$$[cite: 10]
  $$\Rightarrow x + 7 = 2x + 4 \quad [a^x = a^y \text{ হলে } x = y]$$[cite: 10]
  $$\Rightarrow 2x + 4 = x + 7 \Rightarrow 2x - x = 7 - 4 \Rightarrow x = 3$$[cite: 10]  
  **উত্তর:** **(খ)**[cite: 10]

**০৩। যদি $\sqrt[4]{x^3} = 2$ হয়, তাহলে $x^{\frac{3}{2}} = ?$ [৪৪তম বিসিএস]**[cite: 10]  
(ক) $8$  (খ) $16$  (গ) $4$  (ঘ) $64$[cite: 10]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } \sqrt[4]{x^3} = 2 \Rightarrow x^{\frac{3}{4}} = 2$$[cite: 10]
  $$\Rightarrow \left(x^{\frac{3}{4}}\right)^2 = 2^2 \quad [\text{বর্গ করে}]$$[cite: 10]
  $$\therefore x^{\frac{3}{2}} = 4$$[cite: 10]  
  **উত্তর:** **(গ)**[cite: 10]

**০৪। $(\sqrt{3} \times \sqrt[3]{4})^6 =$ কত? [৩৩তম বিসিএস]**[cite: 10]  
(ক) $12$  (খ) $48$  (গ) $36$  (ঘ) $144$[cite: 10]  
* **সমাধান:**  
  $$(\sqrt{3} \times \sqrt[3]{4})^6 = \left(3^{\frac{1}{2}} \times 4^{\frac{1}{3}}\right)^6 \quad [\text{বর্গমূলের মধ্যে যে সংখ্যাটি থাকে বর্গমূল তুলে দিলে সেটি বিপরীত ঘাতে পরিণত হয়}]$$[cite: 10]
  $$= \left(12^{\frac{1}{2}}\right)^6 \quad [\text{ঘাত একই থাকলে ভিত্তি গুণ হয়ে যায়}]$$[cite: 10]
  $$= 12^3 = 144$$[cite: 10]  
  **উত্তর:** **(ঘ)**[cite: 10]

**০৫। $\sqrt[3]{\sqrt[3]{a^3}} =$ কত? [৩৩তম বিসিএস]**[cite: 10]  
(ক) $a$  (খ) $1$  (গ) $a^{\frac{1}{3}}$  (ঘ) $a^3$[cite: 10]  
* **সমাধান:**  
  $$\sqrt[3]{\sqrt[3]{a^3}} = \sqrt[3]{(a^3)^{\frac{1}{3}}} = \sqrt[3]{a} = a^{\frac{1}{3}}$$[cite: 10]  
  **উত্তর:** **(গ)**[cite: 10]

**০৬। যদি $(64)^{\frac{2}{3}} + (625)^{\frac{1}{2}} = 3K$ হয় তবে $K$ এর মান— [৩১তম বিসিএস]**[cite: 10]  
(ক) $9\frac{2}{3}$  (খ) $11\frac{1}{3}$  (গ) $12\frac{2}{5}$  (ঘ) $13\frac{2}{3}$[cite: 10]  
* **সমাধান:**  
  $$(64)^{\frac{2}{3}} + (625)^{\frac{1}{2}} = 3K$$[cite: 10]
  $$\Rightarrow (4^3)^{\frac{2}{3}} + \{(25)^2\}^{\frac{1}{2}} = 3K$$[cite: 10]
  $$\Rightarrow 4^2 + 25 = 3K \Rightarrow 16 + 25 = 3K$$[cite: 10]
  $$\Rightarrow 3K = 41 \Rightarrow K = \frac{41}{3} = 13\frac{2}{3}$$[cite: 10]  
  **উত্তর:** **(ঘ)**[cite: 10]

**০৭। $(\sqrt{3} \cdot \sqrt{5})^4$-এর মান কত? [২৬তম বিসিএস]**[cite: 10]  
(ক) $30$  (খ) $6$  (গ) $225$  (ঘ) $15$[cite: 10]  
* **সমাধান:**  
  $$(\sqrt{3} \cdot \sqrt{5})^4 = (\sqrt{3})^4 \cdot (\sqrt{5})^4 = \left(3^{\frac{1}{2}}\right)^4 \cdot \left(5^{\frac{1}{2}}\right)^4 = 3^2 \cdot 5^2 = 9 \times 25 = 225$$[cite: 10]  
  **উত্তর:** **(গ)**[cite: 10]

**০৮। $\left(\frac{125}{27}\right)^{-\frac{2}{3}}$-এর সহজ প্রকাশ— [১৭তম বিসিএস]**[cite: 10]  
(ক) $\frac{9}{25}$  (খ) $\frac{5}{20}$  (গ) $\frac{25}{25}$  (ঘ) $\frac{3}{20}$[cite: 10]  
* **সমাধান:**  
  $$\left(\frac{125}{27}\right)^{-\frac{2}{3}} = \frac{1}{\left(\frac{125}{27}\right)^{\frac{2}{3}}} = \left(\frac{27}{125}\right)^{\frac{2}{3}} = \left(\frac{3^3}{5^3}\right)^{\frac{2}{3}} = \left\{\left(\frac{3}{5}\right)^3\right\}^{\frac{2}{3}} = \left(\frac{3}{5}\right)^2 = \frac{9}{25}$$[cite: 10]  
  **উত্তর:** **(গ)**[cite: 10]

**০৯। $a^m \cdot a^n = a^{m+n}$ কখন হবে? [১৪তম বিসিএস (শিক্ষা)]**[cite: 10]  
(ক) $m$ ধনাত্মক হলে  (খ) $n$ ধনাত্মক হলে  (গ) $m$ ও $n$ ধনাত্মক হলে  (ঘ) $m$ ধনাত্মক ও $n$ ঋণাত্মক হলে[cite: 10]  
* **সমাধান:**  
  যদি $a \in \mathbb{R}$ (বাস্তব সংখ্যার সেট) এবং $m, n \in \mathbb{N}$ (স্বাভাবিক সংখ্যার সেট) হয়, তবে সূচকের নিয়ম অনুযায়ী $a^m \times a^n = a^{m+n}$[cite: 10]  
  **উত্তর:** **(গ)**[cite: 10]

---

#### **Type 01: নমুনা প্রশ্ন ও সমাধান**

**০১। কোন শর্তে $a^0 = 1$?**[cite: 11]  
(ক) $a = 0$  (খ) $a \neq 0$  (গ) $a < 0$  (ঘ) কোনটিই নয়[cite: 11]  
* **সমাধান:**  
  $a^0 = 1$ যেখানে $a \neq 0$[cite: 11]  
  **উত্তর:** **(খ)**[cite: 11]

**০২। $\left(\frac{x}{2}\right)^{a+1} = 1$ হলে, $a$-এর মান কত?**[cite: 11]  
(ক) $0$  (খ) $2$  (গ) $1$  (ঘ) $-1$[cite: 11]  
* **সমাধান:**  
  $$\left(\frac{x}{2}\right)^{a+1} = 1 \Rightarrow \left(\frac{x}{2}\right)^{a+1} = \left(\frac{x}{2}\right)^0 \Rightarrow a + 1 = 0 \Rightarrow a = -1$$[cite: 11]  
  **উত্তর:** **(ঘ)**[cite: 11]

**০৩। $100^x = 10$ হলে, $x$-এর মান কত?**[cite: 11]  
(ক) $\frac{1}{2}$  (খ) $\frac{1}{4}$  (গ) $\frac{1}{3}$  (ঘ) $1$[cite: 11]  
* **সমাধান:**  
  $$100^x = 10 \Rightarrow (10^2)^x = 10 \Rightarrow (10)^{2x} = (10)^1 \Rightarrow 2x = 1 \Rightarrow x = \frac{1}{2}$$[cite: 11]  
  **উত্তর:** **(ক)**[cite: 11]

**০৪। $x\sqrt{0.09} = 3$ হলে, $x$ এর মান—**[cite: 11]  
(ক) $\frac{3}{10}$  (খ) $\frac{1}{3}$  (গ) $10$  (ঘ) $\frac{10}{3}$[cite: 11]  
* **সমাধান:**  
  $$x\sqrt{0.09} = 3 \Rightarrow x = \frac{3}{\sqrt{0.09}} \Rightarrow x^2 = \frac{3^2}{0.09} \quad [\text{বর্গ করে}]$$[cite: 11]
  $$\Rightarrow x^2 = \frac{9 \times 100}{9} \Rightarrow x^2 = 102 \Rightarrow x = 10 \quad [\text{বর্গমূল করে}]$$[cite: 11]  
  **উত্তর:** **(গ)**[cite: 11]

**০৫। যদি $x, y$ বাস্তব সংখ্যা এবং $x \neq 0, y \neq 0$ হয়, তবে $x^0 + y^0$ এর মান—**[cite: 11]  
(ক) $x + y$  (খ) $2$  (গ) $0$  (ঘ) $x^2 + y^2$[cite: 11]  
* **সমাধান:**  
  $$x^0 + y^0 = x^1 + y^1 = x + y$$[cite: 11]  
  **উত্তর:** **(ক)**[cite: 11]

**০৬। $1 - \left(1 - \frac{1}{a}\right)^{-1} \div \left(\frac{a-1}{a}\right)^{-1}$ এর মান কত?**[cite: 11]  
(ক) $-\frac{1}{a}$  (খ) $-1$  (গ) $0$  (ঘ) $\frac{1}{a}$[cite: 11]  
* **সমাধান:**  
  $$1 - \left(1 - \frac{1}{a}\right)^{-1} \div \left(\frac{a-1}{a}\right)^{-1} = 1 - \left\{\left(\frac{a-1}{a}\right)^{-1} \div \left(\frac{a-1}{a}\right)^{-1}\right\} = 1 - 1 = 0$$[cite: 11]  
  **উত্তর:** **(গ)**[cite: 11]

**০৭। $2^{x+2} = 16$ হলে, $5^{x-2}$ এর মান কত?**[cite: 11]  
(ক) $5$  (খ) $2$  (গ) $1$  (ঘ) $0$[cite: 11]  
* **সমাধান:**  
  $$2^{x+2} = 16 \Rightarrow 2^{x+2} = 2^4 \Rightarrow x + 2 = 4 \Rightarrow x = 2$$[cite: 11]
  $$\therefore 5^{x-2} = 5^{2-2} = 5^0 = 1$$[cite: 11]  
  **উত্তর:** **(গ)**[cite: 11]

**০৮। $x^a = y, y^b = z, z^c = x$ হলে, $abc$ এর মান কত?**[cite: 11]  
(ক) $0$  (খ) $1$  (গ) $2$  (ঘ) $3$[cite: 11]  
* **সমাধান:**  
  $$z^c = x \Rightarrow (y^b)^c = x \Rightarrow y^{bc} = x \Rightarrow (x^a)^{bc} = x \Rightarrow x^{abc} = x^1 \Rightarrow abc = 1$$[cite: 11]  
  **উত্তর:** **(খ)**[cite: 11]

**০৯। যদি $3^{x+2} = 243$ হয়, তবে $3^{x-2}$ এর মান—**[cite: 11]  
(ক) $2$  (খ) $3$  (গ) $0$  (ঘ) $1$[cite: 11]  
* **সমাধান:**  
  $$3^{x+2} = 243 \Rightarrow 3^x \cdot 3^2 = 243 \Rightarrow 3^x = \frac{243}{9} \Rightarrow 3^x = 27 \Rightarrow 3^x = 3^3 \therefore x = 3$$[cite: 11]
  $$\therefore 3^{x-2} = 3^{3-2} = 3^1 = 3$$[cite: 11]  
  **উত্তর:** **(খ)**[cite: 11]

**১০। $\sqrt[4]{x} = 0.1$ হলে, $x =$ কত?**[cite: 11]  
(ক) $0.1$  (খ) $0.01$  (গ) $0.001$  (ঘ) $0.0001$[cite: 11]  
* **সমাধান:**  
  $$\sqrt[4]{x} = 0.1 \Rightarrow x^{\frac{1}{4}} = \frac{1}{10} \Rightarrow x = \left(\frac{1}{10}\right)^4 \Rightarrow x = \frac{1}{10000} \therefore x = 0.0001$$[cite: 11]  
  **উত্তর:** **(ঘ)**[cite: 11]

**১১। $\frac{0.15 \times 10^p}{0.3 \times 10^q} = 5 \times 10^7$ হলে, $p - q =$ কত?**[cite: 11]  
(ক) $6$  (খ) $7$  (গ) $8$  (ঘ) $9$[cite: 11]  
* **সমাধান:**  
  $$\frac{0.15 \times 10^p}{0.3 \times 10^q} = 5 \times 10^7 \Rightarrow 0.5 \times 10^{p-q} = 5 \times 10^7$$[cite: 11]
  $$\Rightarrow 10^{p-q} = \frac{5 \times 10^7}{0.5} \Rightarrow 10^{p-q} = 10^8 \therefore p - q = 8$$[cite: 11]  
  **উত্তর:** **(গ)**[cite: 11]

---

### **Type 02: সরলফল**

সূচকীয় রাশিকে তুলনামূলক সরল রাশিতে পরিণত করা বা মান নির্ণয় করার প্রক্রিয়াই সরলফল নির্ণয় প্রক্রিয়া।[cite: 11]

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। $\frac{5^{n+2} + 35 \times 5^{n-1}}{4 \times 5^n}$ এর মান কত? [৩৪তম বিসিএস]**[cite: 11]  
(ক) $4$  (খ) $8$  (গ) $5$  (ঘ) $7$[cite: 11]  
* **সমাধান:**  
  $$\frac{5^{n+2} + 35 \times 5^{n-1}}{4 \times 5^n} = \frac{5^n \cdot 5^2 + 35 \times 5^n \times \frac{1}{5}}{4 \times 5^n} = \frac{5^n(25 + 7)}{4 \times 5^n} = \frac{32}{4} = 8$$[cite: 11]  
  **উত্তর:** **(খ)**[cite: 11]

**০২। $4^x + 4^x + 4^x + 4^x$ এর মান নিচের কোনটি? [৩৩তম বিসিএস]**[cite: 12]  
(ক) $16^x$  (খ) $4^{4x}$  (গ) $2^{2x+2}$  (ঘ) $2^{8x}$[cite: 12]  
* **সমাধান:**  
  $$4^x + 4^x + 4^x + 4^x = 4^x(1 + 1 + 1 + 1) = 4^x \cdot 4^1 = 4^{x+1} = (2^2)^{x+1} = 2^{2x+2}$$[cite: 12]  
  **উত্তর:** **(গ)**[cite: 12]

**০৩। $[2 - 3(2 - 3)^{-1}]^{-1}$ এর মান কত? [১৩তম বিসিএস]**[cite: 12]  
(ক) $5$  (খ) $-5$  (গ) $\frac{1}{5}$  (ঘ) $-\frac{1}{5}$[cite: 12]  
* **সমাধান:**  
  $$[2 - 3(2 - 3)^{-1}]^{-1} = [2 - 3(-1)^{-1}]^{-1} = \left[2 - 3 \times \frac{1}{-1}\right]^{-1} = [2 + 3]^{-1} = 5^{-1} = \frac{1}{5}$$[cite: 12]  
  **উত্তর:** **(গ)**[cite: 12]

---

#### **Type 02: নমুনা প্রশ্ন ও সমাধান**

**০১। $[2 - (3 - 1)^{-1}]^{-1} = ?$**[cite: 12]  
(ক) $1$  (খ) $\frac{1}{2}$  (গ) $-\frac{1}{2}$  (ঘ) $-1$[cite: 12]  
* **সমাধান:**  
  $$[2 - (3 - 1)^{-1}]^{-1} = \left[2 - \left(\frac{1}{2}\right)\right]^{-1} = [2 - 3]^{-1} = [-1]^{-1} = \frac{1}{-1} = -1$$[cite: 12]  
  **উত্তর:** **(ঘ)**[cite: 12]

**০২। $5^{-3} + 5^{-3} + 5^{-3} + 5^{-3} + 5^{-3} = ?$**[cite: 12]  
(ক) $25^{-15}$  (খ) $25^{-3}$  (গ) $5^{-2}$  (ঘ) $5^{-15}$[cite: 12]  
* **সমাধান:**  
  $$5^{-3} + 5^{-3} + 5^{-3} + 5^{-3} + 5^{-3} = 5^{-3}(1 + 1 + 1 + 1 + 1) = 5^{-3} \times 5 = 5^{-3+1} = 5^{-2}$$[cite: 12]  
  **উত্তর:** **(গ)**[cite: 12]

**০৩। $9 \cdot 2^n - 2 \cdot 2^{n-1} = ?$**[cite: 12]  
(ক) $2^{n+3}$  (খ) $2^{n-3}$  (গ) $2^n$  (ঘ) $2^{-n}$[cite: 12]  
* **সমাধান:**  
  $$9 \cdot 2^n - 2 \cdot 2^{n-1} = 9 \cdot 2^n - 2 \cdot 2^n \cdot 2^{-1} = 9 \cdot 2^n - 2 \cdot \frac{2^n}{2} = 2^n(9 - 1) = 2^n \cdot 8 = 2^n \cdot 2^3 = 2^{n+3}$$[cite: 12]  
  **উত্তর:** **(ক)**[cite: 12]

**০৪। $\frac{3^{m+1}}{(3^m)^{m-1}} \div \frac{9^{m+1}}{(3^{m-1})^{m+1}}$ এর মান কত?**[cite: 13]  
(ক) $0$  (খ) $1$  (গ) $\frac{1}{9}$  (ঘ) $\frac{1}{3}$[cite: 13]  
* **সমাধান:**  
  $$\frac{3^{m+1}}{(3^m)^{m-1}} \div \frac{9^{m+1}}{(3^{m-1})^{m+1}} = \frac{3^{m+1}}{3^{m^2-m}} \div \frac{(3^2)^{m+1}}{3^{m^2-1}} = 3^{m+1-m^2+m} \div \frac{3^{2m+2}}{3^{m^2-1}}$$[cite: 13]
  $$= 3^{2m+1-m^2} \div 3^{2m+2-m^2+1} = 3^{2m+1-m^2-2m-3+m^2} = 3^{-2} = \frac{1}{3^2} = \frac{1}{9}$$[cite: 13]  
  **উত্তর:** **(গ)**[cite: 13]

**০৫। $\left[\left\{1 - (1 - p)^{-1}\right\}^{-1} + (1 - \frac{1}{p})^{-1}\right]^{-1} =$ কত?**[cite: 12]  
(ক) $1$  (খ) $-1$  (গ) $\frac{1}{p}$  (ঘ) $(p - 1)$[cite: 12]  
* **সমাধান:**  
  $$\left[\left\{1 - (1 - \frac{1}{p})\right\}^{-1} \div \left(1 - \frac{1}{p}\right)^{-1}\right] = \left[\left\{1 - \left(\frac{p-1}{p}\right)\right\}^{-1} \div \left(\frac{p-1}{p}\right)^{-1}\right]$$[cite: 12]
  $$= \left[\left\{\frac{p-p+1}{p}\right\}^{-1} \div \left(\frac{p-1}{p}\right)\right] = \left[\left\{\frac{1}{p}\right\}^{-1} \div \frac{p}{p-1}\right] = \left[\frac{1}{\frac{1}{p}} \div \frac{p}{p-1}\right]$$[cite: 12]
  $$= \left[p \times \frac{p-1}{p}\right] = (p - 1)$$[cite: 12]  
  **উত্তর:** **(ঘ)**[cite: 12]

**০৬। $\sqrt{x^{-1} \cdot y} \sqrt{y^{-1} \cdot z} \sqrt{z^{-1} \cdot x}$ এর মান কত?**[cite: 12]  
(ক) $0$  (খ) $1$  (গ) $xyz$  (ঘ) $\sqrt{xyz}$[cite: 12]  
* **সমাধান:**  
  $$\sqrt{x^{-1} \cdot y} \sqrt{y^{-1} \cdot z} \sqrt{z^{-1} \cdot x} = \sqrt{\frac{y}{x}} \cdot \sqrt{\frac{z}{y}} \cdot \sqrt{\frac{x}{z}} = \sqrt{\frac{y \cdot z \cdot x}{x \cdot y \cdot z}} = \sqrt{1} = 1$$[cite: 12]  
  **উত্তর:** **(খ)**[cite: 12]

**০৭। $\frac{9^{x-4}}{3^{x-2}} - 2$ এর মান কত?**[cite: 12]  
(ক) $3^x$  (খ) $3^x + 2$  (গ) $2^x - 2$  (ঘ) $2^x$[cite: 12]  
* **সমাধান:**  
  $$\frac{9^{x-4}}{3^{x-2}} - 2 = \frac{(3^x)^2 - (2)^2}{3^x - 2} - 2 = \frac{(3^x + 2)(3^x - 2)}{(3^x - 2)} - 2 = 3^x + 2 - 2 = 3^x$$[cite: 12]  
  **উত্তর:** **(ক)**[cite: 12]

**০৮। $\frac{2^{x+4} - 4 \times 2^{x+1}}{2^{x+2} \div 2} = ?$**[cite: 12]  
(ক) $4$  (খ) $2$  (গ) $6$  (ঘ) $8$[cite: 12]  
* **সমাধান:**  
  $$\frac{2^{x+4} - 4 \times 2^{x+1}}{2^{x+2} \div 2} = \frac{2^x \cdot 2^4 - 4 \times 2^x \times 2^1}{\frac{2^x \cdot 2^2}{2}} = \frac{16 \cdot 2^x - 8 \cdot 2^x}{\frac{4 \cdot 2^x}{2}} = \frac{8 \cdot 2^x}{2 \cdot 2^x} = 4$$[cite: 12]  
  **উত্তর:** **(ক)**[cite: 12]

**০৯। $\frac{(x^{p+q}) (x^{q+r}) (x^{p+r})}{(x^{2r}) (x^{2p}) (x^{2q})}$ এর মান কত?**[cite: 12]  
(ক) $0$  (খ) $1$  (গ) $\frac{1}{2}$  (ঘ) $-1$[cite: 12]  
* **সমাধান:**  
  $$\frac{(x^{p+q}) (x^{q+r}) (x^{p+r})}{(x^{2r}) (x^{2p}) (x^{2q})} = \frac{x^{p+q+q+r+p+r}}{x^{2r+2p+2q}} = \frac{x^{2p+2q+2r}}{x^{2p+2q+2r}} = x^{2p+2q+2r-2p-2q-2r} = x^0 = 1$$[cite: 12]  
  **উত্তর:** **(খ)**[cite: 12]

---

### **Type 03: সূচকীয় সমীকরণ সমাধান**

সূচকের সাধারণ সূত্রাবলি ও সরলফল নির্ণয়ের প্রক্রিয়ার মিলিত ব্যবহারে সূচকীয় সমীকরণ সমাধান করা হয়।[cite: 13]

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। $4^x + 4^{1-x} = 4$ হলে, $x =$ কত? [৪৩তম বিসিএস]**[cite: 13]  
(ক) $\frac{1}{4}$  (খ) $\frac{1}{3}$  (গ) $\frac{1}{2}$  (ঘ) $1$[cite: 13]  
* **সমাধান:**  
  $$4^x + 4^{1-x} = 4 \Rightarrow 4^x + 4^1 \cdot 4^{-x} = 4 \Rightarrow 4^x + \frac{4}{4^x} = 4$$[cite: 13]
  $$4^x = p \text{ ধরে, } p + \frac{4}{p} = 4 \Rightarrow \frac{p^2 + 4}{p} = 4 \Rightarrow p^2 - 4p + 4 = 0$$[cite: 13]
  $$\Rightarrow p^2 - 2 \cdot p \cdot 2 + 2^2 = 0 \Rightarrow (p - 2)^2 = 0 \Rightarrow p = 2$$[cite: 13]
  $$\Rightarrow 4^x = 2 \Rightarrow 2^{2x} = 2^1 \Rightarrow 2x = 1 \therefore x = \frac{1}{2}$$[cite: 13]  
  **উত্তর:** **(গ)**[cite: 13]

**০২। $5^x + 8 \cdot 5^x + 16 \cdot 5^x = 1$ হলে, $x$ এর মান কত? [৪১তম বিসিএস]**[cite: 13]  
(ক) $-3$  (খ) $-2$  (গ) $-1$  (ঘ) $-\frac{1}{2}$[cite: 13]  
* **সমাধান:**  
  $$5^x + 8 \cdot 5^x + 16 \cdot 5^x = 1 \Rightarrow 5^x(1 + 8 + 16) = 1$$[cite: 13]
  $$\Rightarrow 25 \cdot 5^x = 1 \Rightarrow 5^{x+2} = (5)^0 \Rightarrow x + 2 = 0 \therefore x = -2$$[cite: 13]  
  **উত্তর:** **(খ)**[cite: 13]

**০৩। $x^{\sqrt{x}} = (x\sqrt{x})^x$ হলে, $x$ এর মান কত? [৪০তম বিসিএস]**[cite: 13]  
(ক) $\frac{3}{4}$  (খ) $\frac{4}{5}$  (গ) $\frac{9}{4}$  (ঘ) $\frac{2}{3}$[cite: 13]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } x^{\sqrt{x}} = (x\sqrt{x})^x \Rightarrow (x^x)^{\sqrt{x}} = \left(x \cdot x^{\frac{1}{2}}\right)^x = \left(x^{\frac{3}{2}}\right)^x = (x^x)^{\frac{3}{2}}$$[cite: 13]
  $$\therefore (x^x)^{\sqrt{x}} = (x^x)^{\frac{3}{2}} \Rightarrow \sqrt{x} = \frac{3}{2} \Rightarrow x = \left(\frac{3}{2}\right)^2 = \frac{9}{4}$$[cite: 13]  
  **উত্তর:** **(গ)**[cite: 13]

**০৪। $125(\sqrt{5})^{2x} = 1$ হলে $x$ এর মান কত? [৩৯তম বিসিএস (স্বাস্থ্য)]**[cite: 13]  
(ক) $3$  (খ) $-3$  (গ) $7$  (ঘ) $9$[cite: 13]  
* **সমাধান:**  
  $$125(\sqrt{5})^{2x} = 1 \Rightarrow 5^3 \left(5^{\frac{1}{2}}\right)^{2x} = 1 \Rightarrow 5^3 \cdot 5^{2x \cdot \frac{1}{2}} = 5^0 \Rightarrow 5^{3+x} = 5^0$$[cite: 13]
  $$\Rightarrow 3 + x = 0 \therefore x = -3$$[cite: 13]  
  **উত্তর:** **(খ)**[cite: 13]

**০৫। $2^x + 2^{1-x} = 3$ হলে, $x =$ কত? [৩৮তম বিসিএস]**[cite: 13]  
(ক) $(1, 2)$  (খ) $(0, 2)$  (গ) $(1, 3)$  (ঘ) $(0, 1)$[cite: 13]  
* **সমাধান:**  
  $$2^x + 2^{1-x} = 3 \text{ বা, } 2^x + \frac{2^1}{2^x} = 3$$[cite: 13]
  $$\Rightarrow a + \frac{2}{a} = 3 \quad [2^x = a \text{ ধরে}]$$[cite: 13]
  $$\Rightarrow a^2 + 2 = 3a \Rightarrow a^2 - 3a + 2 = 0 \Rightarrow a^2 - 2a - a + 2 = 0$$[cite: 13]
  $$\Rightarrow a(a - 2) - 1(a - 2) = 0 \Rightarrow (a - 2)(a - 1) = 0$$[cite: 13]
  $$\text{হয়, } a - 2 = 0 \Rightarrow a = 2 \Rightarrow 2^x = 2^1 \Rightarrow x = 1$$[cite: 13]
  $$\text{অথবা } a - 1 = 0 \Rightarrow a = 1 \Rightarrow 2^x = 2^0 \Rightarrow x = 0$$[cite: 13]
  $$\therefore x = (0, 1)$$[cite: 13]  
  **উত্তর:** **(ঘ)**[cite: 13]

**০৬। যদি $(25)^{2x+3} = 5^{3x+6}$ হয়, তবে $x =$ কত? [৩৬তম বিসিএস]**[cite: 13]  
(ক) $0$  (খ) $1$  (গ) $-1$  (ঘ) $4$[cite: 13]  
* **সমাধান:**  
  $$(25)^{2x+3} = 5^{3x+6} \Rightarrow \left(5^2\right)^{2x+3} = 5^{3x+6} \Rightarrow 5^{4x+6} = 5^{3x+6}$$[cite: 13]
  $$\Rightarrow 4x + 6 = 3x + 6 \Rightarrow 4x - 3x = 6 - 6 \therefore x = 0$$[cite: 13]  
  **উত্তর:** **(ক)**[cite: 13]

**০৭। যদি $\left(\frac{a}{b}\right)^{x-3} = \left(\frac{b}{a}\right)^{x-5}$ হয়, তবে $x$ এর মান কত? [৩৩তম বিসিএস]**[cite: 14]  
(ক) $8$  (খ) $3$  (গ) $5$  (ঘ) $4$[cite: 14]  
* **সমাধান:**  
  $$\left(\frac{a}{b}\right)^{x-3} = \left(\frac{b}{a}\right)^{x-5} \Rightarrow \left(\frac{a}{b}\right)^{x-3} = \left(\frac{a}{b}\right)^{5-x}$$[cite: 14]
  $$\Rightarrow x - 3 = 5 - x \Rightarrow 2x = 8 \therefore x = 4$$[cite: 14]  
  **উত্তর:** **(ঘ)**[cite: 14]

**০৮। $36 \cdot 2^{3x-8} = 3^2$ হলে, $x$ এর মান কত? [৩৩তম বিসিএস]**[cite: 14]  
(ক) $\frac{7}{3}$  (খ) $3$  (গ) $\frac{8}{3}$  (ঘ) $2$[cite: 14]  
* **সমাধান:**  
  $$36 \cdot 2^{3x-8} = 3^2 \Rightarrow 2^{3x-8} = \frac{9}{36} \Rightarrow \frac{2^{3x}}{2^8} = \frac{1}{4} \Rightarrow 2^{3x} = \frac{2^8}{4}$$[cite: 14]
  $$\Rightarrow 2^{3x} = \frac{2^8}{2^2} \Rightarrow 2^{3x} = 2^6 \Rightarrow 3x = 6 \therefore x = 2$$[cite: 14]  
  **উত্তর:** **(ঘ)**[cite: 14]

---

#### **Type 03: নমুনা প্রশ্ন ও সমাধান**

**০১। $\sqrt[3]{8x^2 \sqrt{32x \sqrt{4x^2}}} = 4$ হলে, $x$ এর মান কত?**[cite: 14]  
(ক) $2$  (খ) $1$  (গ) $3$  (ঘ) $4$[cite: 14]  
* **সমাধান:**  
  $$\sqrt[3]{8x^2 \sqrt{32x \sqrt{4x^2}}} = 4 \Rightarrow \sqrt[3]{8x^2 \sqrt{32x \cdot 2x}} = 4 \Rightarrow \sqrt[3]{8x^2 \sqrt{64x^2}} = 4$$[cite: 14]
  $$\Rightarrow \sqrt[3]{8x^2 \cdot 8x} = 4 \Rightarrow \sqrt[3]{64x^3} = 4 \Rightarrow 4x = 4 \therefore x = 1$$[cite: 14]  
  **উত্তর:** **(খ)**[cite: 14]

**০২। $8^{2x+3} = 2^{3x+6}$ হলে, $x$ এর মান—**[cite: 14]  
(ক) $-3$  (খ) $-1$  (গ) $0$  (ঘ) $4$[cite: 14]  
* **সমাধান:**  
  $$8^{2x+3} = 2^{3x+6} \Rightarrow (2^3)^{2x+3} = 2^{3x+6} \Rightarrow 2^{6x+9} = 2^{3x+6}$$[cite: 14]
  $$\Rightarrow 6x + 9 = 3x + 6 \Rightarrow 6x - 3x = 6 - 9 \Rightarrow 3x = -3 \therefore x = -1$$[cite: 14]  
  **উত্তর:** **(খ)**[cite: 14]

**০৩। $3^{mx-1} = 3a^{mx-2}$ হলে, $x$ এর মান কত?**[cite: 14]  
(ক) $\frac{2}{m}$  (খ) $2m$  (গ) $\frac{m}{2}$  (ঘ) কোনটিই নয়[cite: 14]  
* **সমাধান:**  
  $$3^{mx-1} = 3a^{mx-2} \Rightarrow \frac{3^{mx-1}}{3} = a^{mx-2} \Rightarrow 3^{mx-1-1} = a^{mx-2} \Rightarrow 3^{mx-2} = a^{mx-2}$$[cite: 14]
  $$\Rightarrow \left(\frac{3}{a}\right)^{mx-2} = 1 \Rightarrow \left(\frac{3}{a}\right)^{mx-2} = \left(\frac{3}{a}\right)^0 \Rightarrow mx - 2 = 0 \Rightarrow mx = 2 \therefore x = \frac{2}{m}$$[cite: 14]  
  **উত্তর:** **(ক)**[cite: 14]

**০৪। $3 \cdot 27^x = 9^{x+4}$ হলে, $x$ এর মান কত?**[cite: 14]  
(ক) $9$  (খ) $3$  (গ) $7$  (ঘ) $1$[cite: 14]  
* **সমাধান:**  
  $$3 \cdot 27^x = 9^{x+4} \Rightarrow 3 \cdot (3^3)^x = (3^2)^{x+4} \Rightarrow 3 \cdot 3^{3x} = 3^{2x+8} \Rightarrow 3^{3x+1} = 3^{2x+8}$$[cite: 14]
  $$\Rightarrow 3x + 1 = 2x + 8 \Rightarrow 3x - 2x = 8 - 1 \therefore x = 7$$[cite: 14]  
  **উত্তর:** **(গ)**[cite: 14]

**০৫। যদি $2^{x-6} = \frac{1}{64}$ হয়, তবে $x$ এর মান কত?**[cite: 14]  
(ক) $0$  (খ) $1$  (গ) $-2$  (ঘ) $2$[cite: 14]  
* **সমাধান:**  
  $$2^{x-6} = \frac{1}{64} \Rightarrow 2^{x-6} = 2^{-6} \Rightarrow x - 6 = -6 \Rightarrow x = -6 + 6 = 0$$[cite: 14]  
  **উত্তর:** **(ক)**[cite: 14]

**০৬। যদি $16^{2x+4} = 4^{3x+3}$ হয়, তবে $x$ এর মান কত?**[cite: 14]  
(ক) $-5$  (খ) $1$  (গ) $\frac{13}{5}$  (ঘ) $-1$[cite: 14]  
* **সমাধান:**  
  $$16^{2x+4} = 4^{3x+3} \Rightarrow (2^4)^{2x+4} = (2^2)^{3x+3} \Rightarrow 2^{8x+16} = 2^{6x+6}$$[cite: 14]
  $$\Rightarrow 8x + 16 = 6x + 6 \Rightarrow 8x - 6x = 6 - 16 \Rightarrow 2x = -10 \therefore x = -5$$[cite: 14]  
  **উত্তর:** **(ক)**[cite: 14]

**০৭। $(\sqrt{3})^{x+1} = (\sqrt[3]{3})^{2x-1}$ হলে, $x =$ কত?**[cite: 15]  
(ক) $3$  (খ) $4$  (গ) $5$  (ঘ) $6$[cite: 15]  
* **সমাধান:**  
  $$(\sqrt{3})^{x+1} = (\sqrt[3]{3})^{2x-1} \Rightarrow 3^{\frac{x+1}{2}} = 3^{\frac{2x-1}{3}} \Rightarrow \frac{x+1}{2} = \frac{2x-1}{3}$$[cite: 15]
  $$\Rightarrow 4x - 2 = 3x + 3 \Rightarrow 4x - 3x = 3 + 2 \therefore x = 5$$[cite: 15]  
  **উত্তর:** **(গ)**[cite: 15]

**০৮। $3^{x+5} = 3^{x+3} + \frac{8}{3}$ এর সমাধান নিচের কোনটি?**[cite: 15]  
(ক) $8$  (খ) $4$  (গ) $-4$  (ঘ) $16$[cite: 15]  
* **সমাধান:**  
  $$3^{x+5} = 3^{x+3} + \frac{8}{3} \Rightarrow 3^x \cdot 3^5 = 3^x \cdot 3^3 + \frac{8}{3} \Rightarrow 3^x \cdot 3^5 \cdot 3 = 3^x \cdot 3^3 \cdot 3 + \frac{8}{3} \cdot 3 \quad [\text{উভয়পক্ষকে } 3 \text{ দ্বারা গুণ করে}]$$[cite: 15]
  $$\Rightarrow 3^x \cdot 3^6 = 3^x \cdot 3^4 + 8 \Rightarrow 3^x \cdot 3^6 - 3^x \cdot 3^4 = 8 \quad [\text{পক্ষান্তর করে}]$$[cite: 15]
  $$\Rightarrow 3^x \cdot 3^4(3^2 - 1) = 8 \Rightarrow 3^{x+4} \cdot 8 = 8 \Rightarrow 3^{x+4} = 1 \Rightarrow 3^{x+4} = 3^0$$[cite: 15]
  $$\Rightarrow x + 4 = 0 \therefore x = -4$$[cite: 15]  
  **উত্তর:** **(গ)**[cite: 15]

**০৯। $\frac{5^{2x} \cdot b^{x-3}}{5^{x+3}} = a^{x-3} (a, b > 0, 5b \neq a)$ এর সমাধান নিচের কোনটি?**[cite: 15]  
(ক) $3$  (খ) $5$  (গ) $15$  (ঘ) $8$[cite: 15]  
* **সমাধান:**  
  $$\frac{5^{2x} \cdot b^{x-3}}{5^{x+3}} = a^{x-3} \Rightarrow 5^{2x-x-3} = \left(\frac{a}{b}\right)^{x-3} \quad \left[\because \frac{a^m}{a^n} = a^{m-n}\right]$$[cite: 15]
  $$\Rightarrow 5^{x-3} = \left(\frac{a}{b}\right)^{x-3} \Rightarrow \frac{5^{x-3}}{\left(\frac{a}{b}\right)^{x-3}} = 1 \Rightarrow \left(\frac{5b}{a}\right)^{x-3} = \left(\frac{5b}{a}\right)^0 \quad [\because a^0 = 1]$$[cite: 15]
  $$\Rightarrow x - 3 = 0 \therefore x = 3$$[cite: 15]  
  **উত্তর:** **(ক)**[cite: 15]

**১০। $4^{x+2} = 2^{2x+1} + 14$ এর সমাধান নিচের কোনটি?**[cite: 15]  
(ক) $0$  (খ) $4$  (গ) $16$  (ঘ) $8$[cite: 15]  
* **সমাধান:**  
  $$4^{x+2} = 2^{2x+1} + 14 \Rightarrow 4^x \cdot 4^2 = 2^{2x} \cdot 2^1 + 14 \quad [\because (a^m)^n = a^{mn}]$$[cite: 15]
  $$\Rightarrow 4^x \cdot 16 = (2^2)^x \cdot 2 + 14 \Rightarrow 4^x \cdot 16 = 4^x \cdot 2 + 14 \Rightarrow 4^x \cdot 16 - 4^x \cdot 2 = 14$$[cite: 15]
  $$\Rightarrow 4^x(16 - 2) = 14 \Rightarrow 4^x \cdot 14 = 14 \Rightarrow 4^x = 1 \quad [\text{উভয়পক্ষকে } 14 \text{ দ্বারা ভাগ করে}]$$[cite: 15]
  $$\Rightarrow 4^x = 4^0 \quad [\because a^0 = 1] \therefore x = 0$$[cite: 15]  
  **উত্তর:** **(ক)**[cite: 15]

**১১। $x$ এর মান কত হলে, $72 \cdot 3^{3x-5} = 2^3$ হবে?**[cite: 15]  
(ক) $\frac{3}{5}$  (খ) $2$  (গ) $\frac{5}{3}$  (ঘ) $1$[cite: 15]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } 72 \cdot 3^{3x-5} = 2^3 \Rightarrow 3^{3x-5} = \frac{8}{72} \Rightarrow 3^{3x-5} = \frac{1}{9}$$[cite: 15]
  $$\Rightarrow 3^{3x-5} = 3^{-2} \Rightarrow 3x - 5 = -2 \Rightarrow 3x = -2 + 5 \Rightarrow 3x = 3 \therefore x = 1$$[cite: 15]  
  **উত্তর:** **(ঘ)**[cite: 15]

**১২। $x^y = y^x$ এবং $x = 2y (x \neq 0, y \neq 0)$ হলে, $(x, y) =$ কত?**[cite: 15]  
(ক) $(8, 4)$  (খ) $(6, 3)$  (গ) $(2, 1)$  (ঘ) $(4, 2)$[cite: 15]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } x^y = y^x \Rightarrow x = y^{\frac{x}{y}} \Rightarrow 2y = y^{\frac{2y}{y}} \quad [\because x = 2y]$$[cite: 15]
  $$\Rightarrow 2y = y^2 \Rightarrow y^2 - 2y = 0 \Rightarrow y(y - 2) = 0 \Rightarrow y - 2 = 0 \quad [\because y \neq 0] \therefore y = 2$$[cite: 15]
  $$y \text{ এর মান বসিয়ে, } x = 2 \times 2 \therefore x = 4 \implies (x, y) = (4, 2)$$[cite: 15]  
  **উত্তর:** **(ঘ)**[cite: 15]

**১৩। $a^b = b^a, a = 2b, a \neq 0, b \neq 0$ হলে $(a, b) = ?$**[cite: 15]  
(ক) $(2, 4)$  (খ) $(4, 2)$  (গ) $(4, 8)$  (ঘ) $(8, 4)$[cite: 15]  
* **সমাধান:**  
  $$a^b = b^a \Rightarrow (2b)^b = b^{2b} \quad [\because a = 2b] \Rightarrow 2^b \cdot b^b = b^{2b}$$[cite: 15]
  $$\Rightarrow 2^b = \frac{b^{2b}}{b^b} = b^{2b-b} = b^b \therefore b = 2$$[cite: 15]
  $$\text{সুতরাং } a = 2 \times 2 = 4 \implies (a, b) = (4, 2)$$[cite: 15]  
  **উত্তর:** **(খ)**[cite: 15]


# ⚡ সূচক (Exponents) MCQ Shortcuts

### ১. Value Substitution (মান বসানোর নিয়ম)
* **কৌশল:** রাশিযুক্ত প্রশ্নে $n = 0$ বা $n = 1$ ধরে দ্রুত মান বের করা।
* **উদাহরণ:** $\frac{2^{n+4} - 2 \cdot 2^n}{2^{n+2}}$ এ $n = 0$ বসালে:
  $$\frac{2^4 - 2 \cdot 1}{2^2} = \frac{16 - 2}{4} = \frac{14}{4} = 3.5$$

### ২. Base Matching (বেস মিলানো)
* **কৌশল:** $a^x = a^y \implies x = y$
* **মনে রাখার পাওয়ার:**
  * $2$ এর পাওয়ার: $2^5 = 32, 2^6 = 64, 2^7 = 128, 2^8 = 256, 2^{10} = 1024$
  * $3$ এর পাওয়ার: $3^3 = 27, 3^4 = 81, 3^5 = 243, 3^6 = 729$
  * $5$ এর পাওয়ার: $5^3 = 125, 5^4 = 625$
* **উদাহরণ:** $2^{2x+1} = 128 \implies 2^{2x+1} = 2^7 \implies 2x+1 = 7 \implies x = 3$

### ৩. Option Test (অপশন ব্যাক-ক্যালকুলেশন)
* **কৌশল:** অপশনের মানগুলো সমীকরণে বসিয়ে $LHS = RHS$ চেক করা।
* **উদাহরণ:** $3^{x+2} + 3^{x-1} = 84 \implies$ অপশন থেকে $x = 2$ বসালে: $3^4 + 3^1 = 81 + 3 = 84$ ✅

### ৪. Same Base Power Addition (যোগের শর্টকাট)
* **কৌশল:** একই সংখ্যার একাধিক যোগফল থাকলে পদসংখ্যা দিয়ে গুণ করা।
* **উদাহরণ:** $2^{20} + 2^{20} + 2^{20} + 2^{20} = 4 \times 2^{20} = 2^2 \times 2^{20} = 2^{22}$

### ৫. Nested Root Power (রুটের রুট তোলা)
* **কৌশল:** $\sqrt[m]{\sqrt[n]{x}} = x^{\frac{1}{m \times n}}$
* **উদাহরণ:** $\sqrt[3]{\sqrt{a^6}} = (a^6)^{\frac{1}{3 \times 2}} = a^{6/6} = a$

### 💡 Quick Reminders:
* $a^0 = 1$
* $a^{-n} = \frac{1}{a^n}$
---

## **১৪.২: লগারিদম**

সূচকের ঠিক উল্টো ব্যাপারটিই হলো 'logarithm' যা বীজগণিতে বহুল ব্যবহৃত। সূচকে আমরা $y = a^x$ সমীকরণে $x$ এর বিভিন্ন মান বসিয়ে $y$ এর মান নির্ণয় করি। যেমন: $3^4$ এর মান পাই $81$। কিন্তু যদি $y$ এর মান হতে $x$ এর মান নির্ণয় করা প্রয়োজন হয় তবে লগারিদমের আশ্রয় নিতে হয়।[cite: 16]

$\log$ এর সাহায্যে আমরা পাবো $\log_3 81 = 4$।[cite: 16]  
অর্থাৎ সূচকে সংখ্যা বা রাশির ওপর ঘাত (power) বসানোর পর উত্তর পেয়েছি কিন্তু $\log$ এর ক্ষেত্রে উত্তরের সাথে $\log$ যুক্ত করে আমরা ঘাত বা power নির্ণয় করতে পেরেছি।[cite: 16]

$\log_3 81$ কে আমরা পড়ব logarithm base 3 of 81 বা log 81 base 3 ($81$ এর $3$ ভিত্তিক log) এভাবে।[cite: 16]

স্কটিশ গণিতবিদ জন নেপিয়ার (1550-1617) 'Logarithm' শব্দটির ধারণা দেন।[cite: 16]

প্রসঙ্গতঃ উল্লেখ্য যে, $\log$ এর base খালি থাকার অর্থ একই base রয়েছে এবং $\log$ এর সাধারণ base $10$ ধরে নেয়া হয়।[cite: 16]

* **Natural logarithm:** লগারিদমের base $e$ হলে একে বলা হয় 'Natural logarithm'। একে নেপিয়ারিয়ান লগারিদম বা $e$ ভিত্তিক লগারিদম বা তত্ত্বীয় লগারিদমও বলে। $e$ একটি অমূলদ সংখ্যা যার মান $2.7182818284..........$[cite: 16]  
  Natural logarithm কে বেশিরভাগ ক্ষেত্রে $\log_e$ না লিখে $\ln$ লেখা হয় $[\log_e(y) = \ln(y)]$।[cite: 16]
* **Common logarithm:** ইংল্যান্ডের গণিতবিদ হেনরি ব্রিগস ১৬২৪ সালে $10$ কে ভিত্তি ধরে লগারিদমের টেবিল (লগ টেবিল বা লগ সারণি) তৈরি করেন। তাঁর এই লগারিদমকে ব্রিগস লগারিদম বা $10$ ভিত্তিক লগারিদম বা ব্যবহারিক লগারিদমও বলা হয়। এই লগারিদমকে $\log_{10} x$ আকারে লেখা হয়।[cite: 16]
* **Anti logarithm:** Anti logarithm হলো logarithm এর বিপরীত। সূচক থেকে লগ-এ রূপান্তরকে লগারিদমের সংজ্ঞা বলে। অপরপক্ষে, লগ থেকে সূচকে রূপান্তরকে Anti logarithm বলা হয়।[cite: 16]  
  যেমন: $y = \log_2 5$  
  Anti $\log_2 y = 5$  
  আমরা জানি, $y = \log_2 5$ হলে $2^y = 5 \implies \text{Anti } \log_2 y = 2^y$[cite: 16]

---

### **লগের সূত্রাবলি ও উদাহরণ:**

| ক্রমিক নং | লগের সূত্রাবলি | উদাহরণ |
| :---: | :--- | :--- |
| **০১** | $\log_a(xyz) = \log_a x + \log_a y + \log_a z$[cite: 16] | $\log_2(2 \times 3 \times 7) = \log_2 2 + \log_2 3 + \log_2 7$[cite: 16] |
| **০২** | $\log_a\left(\frac{x}{y}\right) = \log_a x - \log_a y$[cite: 16] | $\log_2 \frac{7}{5} = \log_2 7 - \log_2 5$[cite: 16] |
| **০৩** | $\log_a x^m = m \log_a x$[cite: 16] | $\log_a 10^7 = 7 \log_a 10$[cite: 16] |
| **০৪** | $\log_a \sqrt[n]{x} = \frac{1}{n} \log_a x$[cite: 16] | $\log_a \sqrt[3]{7} = \log_a 7^{\frac{1}{3}} = \frac{1}{3} \log_a 7$[cite: 16] |
| **০৫** | $\log_a b \times \log_b a = 1$[cite: 16] | $\log_{10} 7 \times \log_7 10 = 1$[cite: 16] |
| **০৬** | $\log_a b = \frac{1}{\log_b a}$[cite: 16] | $\log_{10} 11 = \frac{1}{\log_{11} 10}$[cite: 16] |
| **০৭** | $\log_a 1 = 0$[cite: 16] | $\log_{10} 1 = 0, \log_{100} 1 = 0, \log_{99} 1 = 0$[cite: 16] |
| **০৮** | $\log_a a = 1$[cite: 16] | $\log_{10} 10 = 1, \log_{19} 19 = 1$[cite: 16] |
| **০৯** | $\log_a m = x$ হলে, $a^x = m$[cite: 16] | $\log_{10} 100 = 2$ হলে, $10^2 = 100$[cite: 16] |
| **১০** | $a^{\log_a b} = b$ [যে কোনো ভিত্তির power এ log থাকলে এবং log এর base মিলে গেলে ভিত্তিসহ log উঠে যায়][cite: 16] | $2^{\log_2 20} = 20$[cite: 16] |
| **১১** | $\log_a m = \log_b m \times \log_a b = \frac{\log_b m}{\log_b a}$[cite: 16] | $\log_{10} 7 = \log_3 7 \times \log_{10} 3 = \frac{\log_3 7}{\log_3 10}$[cite: 16] |
| **১২** | $\log_a b = \frac{\log_{10} b}{\log_{10} a} = \frac{1}{\log_b a}$[cite: 16] | $\log_5 6 = \frac{\log_{10} 6}{\log_{10} 5} = \frac{1}{\log_6 5}$[cite: 16] |

---

### **Type 01: লগারিদমের মান নির্ণয়**

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। যদি $\log\left(\frac{a}{b}\right) + \log\left(\frac{b}{a}\right) = \log(a + b)$ হয়, তবে— [৪৫তম বিসিএস]**[cite: 17]  
(ক) $a + b = 1$  (খ) $a - b = 1$  (গ) $a = b$  (ঘ) $a^2 - b^2 = 1$[cite: 17]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } \log\left(\frac{a}{b}\right) + \log\left(\frac{b}{a}\right) = \log(a + b)$$[cite: 17]
  $$\Rightarrow \log\left(\frac{a}{b} \times \frac{b}{a}\right) = \log(a + b) \Rightarrow \log 1 = \log(a + b)$$[cite: 17]
  $$\Rightarrow 1 = a + b \therefore a + b = 1$$[cite: 17]  
  **উত্তর:** **(ক)**[cite: 17]

**০২। $2^{\log_2 3 + \log_2 5}$ এর মান কত? [৪৩তম বিসিএস]**[cite: 17]  
(ক) $8$  (খ) $2$  (গ) $15$  (ঘ) $10$[cite: 17]  
* **সমাধান:**  
  $$2^{\log_2 3 + \log_2 5} = 2^{\log_2 3} \cdot 2^{\log_2 5} \quad [\because a^{m+n} = a^m \cdot a^n]$$[cite: 17]
  $$= 3 \cdot 5 \quad [\because n^{\log_n x} = x] = 15$$[cite: 17]  
  **উত্তর:** **(গ)**[cite: 17]

**০৩। $\log_2 \log_e \sqrt{e} e^2 = ?$ [৪১তম বিসিএস]**[cite: 17]  
(ক) $-2$  (খ) $-1$  (গ) $1$  (ঘ) $2$[cite: 17]  
* **সমাধান:**  
  $$\log_2 \log_e \sqrt{e} e^2 = \log_2 \log_{\sqrt{e}} (\sqrt{e})^4 = \log_2 4 \log_{\sqrt{e}} \sqrt{e} = \log_2 4 \log_e \sqrt{e} \cdot 1$$[cite: 17]
  $$= 2 \log_2 2 = 2$$[cite: 17]  
  **উত্তর:** **(ঘ)**[cite: 17]

**০৪। কোন শর্তে $\log_a 1 = 0$? [৪০তম বিসিএস]**[cite: 17]  
(ক) $a > 0, a \neq 1$  (খ) $a \neq 0, a > 1$  (গ) $a > 0, a = 1$  (ঘ) $a \neq 1, a < 0$[cite: 17]  
* **সমাধান:**  
  $\log_a 1 = 0$ হবে যখন, $a > 0$ এবং $a \neq 1$ (স্বতঃসিদ্ধ)।[cite: 17]  
  **উত্তর:** **(ক)**[cite: 17]

**০৫। $\log_{\sqrt{3}} 81 =$ কত? [৩৬তম বিসিএস]**[cite: 17]  
(ক) $4$  (খ) $27\sqrt{3}$  (গ) $8$  (ঘ) $\frac{1}{8}$[cite: 17]  
* **সমাধান:**  
  $$\log_{\sqrt{3}} 81 = \log_{\sqrt{3}} (\sqrt{3})^8 = 8 \times \log_{\sqrt{3}} \sqrt{3} = 8 \quad [\because \log_a a = 1]$$[cite: 17]  
  **উত্তর:** **(গ)**[cite: 17]

**০৬। $\log_3 \left(\frac{1}{9}\right)$ এর মান— [৩৫তম বিসিএস]**[cite: 17]  
(ক) $2$  (খ) $-2$  (গ) $3$  (ঘ) $-3$[cite: 17]  
* **সমাধান:**  
  $$\log_3 \left(\frac{1}{9}\right) = \log_3 \left(\frac{1}{3^2}\right) = \log_3 (3^{-2}) = -2 \cdot \log_3 3 = -2 \quad [\because \log_a a = 1]$$[cite: 17]  
  **উত্তর:** **(খ)**[cite: 17]

**০৭। $\log_2 8 =$ কত? [৩২তম বিসিএস]**[cite: 17]  
(ক) $4$  (খ) $3$  (গ) $2$  (ঘ) $1$[cite: 17]  
* **সমাধান:**  
  $$\log_2 8 = \log_2 2^3 = 3 \log_2 2 = 3 \cdot 1 = 3$$[cite: 17]  
  **উত্তর:** **(খ)**[cite: 17]

**০৮। $\log_2 \frac{1}{32}$ এর মান— [৩১তম বিসিএস]**[cite: 17]  
(ক) $\frac{1}{25}$  (খ) $-5$  (গ) $\frac{1}{5}$  (ঘ) $-\frac{1}{5}$[cite: 17]  
* **সমাধান:**  
  $$\log_2 \frac{1}{32} = \log_2 \frac{1}{2^5} = \log_2 2^{-5} = -5 \log_2 2 = (-5) \times 1 = -5$$[cite: 17]  
  **উত্তর:** **(খ)**[cite: 17]

**০৯। $\log_a \left(\frac{m}{n}\right) =$ কত? [৩০তম বিসিএস]**[cite: 17]  
(ক) $\log_a m - \log_a n$  (খ) $\log_a m + \log_a n$  (গ) $\log_a m \times \log_a n$  (ঘ) কোনটিই নয়[cite: 17]  
* **সমাধান:**  
  লগারিদমের সূত্রানুযায়ী, $\log_a \left(\frac{m}{n}\right) = \log_a m - \log_a n$[cite: 17]  
  **উত্তর:** **(ক)**[cite: 17]

**১০। $32$ এর $2$ ভিত্তিক লগারিদম কত? [১৩তম বিসিএস]**[cite: 17]  
(ক) $3$  (খ) $8$  (গ) $5$  (ঘ) $6$[cite: 17]  
* **সমাধান:**  
  $$\log_2 32 = \log_2 2^5 = 5 \log_2 2 = 5$$[cite: 17]  
  **উত্তর:** **(গ)**[cite: 17]

---

#### **Type 01: নমুনা প্রশ্ন ও সমাধান**

**০১। $\log_{2.5} 6.25$ এর মান কোনটি?**[cite: 17]  
(ক) $1$  (খ) $3$  (গ) $2$  (ঘ) $4$[cite: 17]  
* **সমাধান:**  
  $$\log_{2.5} 6.25 = \log_{2.5} (2.5)^2 = 2 \times \log_{2.5} 2.5 = 2 \times 1 = 2 \quad [\because \log_a a = 1]$$[cite: 17]  
  **উত্তর:** **(গ)**[cite: 17]

**০২। $\log_5 (\sqrt[3]{5})(\sqrt{5}) =$ কত?**[cite: 17]  
(ক) $1$  (খ) $\frac{1}{5}$  (গ) $\frac{5}{6}$  (ঘ) $\frac{6}{5}$[cite: 17]  
* **সমাধান:**  
  $$\log_5 (\sqrt[3]{5})(\sqrt{5}) = \log_5 \left(5^{\frac{1}{3}} \cdot 5^{\frac{1}{2}}\right) = \log_5 \left(5^{\frac{2+3}{6}}\right) = \log_5 \left(5^{\frac{5}{6}}\right) = \frac{5}{6} \log_5 5 = \frac{5}{6} \cdot 1 = \frac{5}{6}$$[cite: 17]  
  **উত্তর:** **(গ)**[cite: 17]

**০৩। $\ln x$ এর ক্ষেত্রে নিচের কোনটি সঠিক?**[cite: 18]  
(ক) $x > 0$  (খ) $x < 0$  (গ) $x \geq 0$  (ঘ) $x \leq 0$[cite: 18]  
* **সমাধান:**  
  $\ln x$ এর ক্ষেত্রে $x \leq 0$ হলে, $x$ এর বাস্তব মান পাওয়া যায় না। আবার $\ln x$ এর মান ঋণাত্মক হয় না। সুতরাং অপশন গুলোর মধ্যে সঠিক উত্তর হবে $x > 0$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০৪। $\log_{2\sqrt{5}} 20$ এর মান -**[cite: 18]  
(ক) $2$  (খ) $\sqrt{5}$  (গ) $3$  (ঘ) $4$[cite: 18]  
* **সমাধান:**  
  $$\log_{2\sqrt{5}} 20 = \log_{2\sqrt{5}} (2\sqrt{5})^2 = 2 \log_{2\sqrt{5}} 2\sqrt{5} = 2 \times 1 = 2$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০৫। $\log_4 2 =$ কত?**[cite: 18]  
(ক) $-3$  (খ) $2$  (গ) $\frac{1}{2}$  (ঘ) $3$[cite: 18]  
* **সমাধান:**  
  $$\log_4 2 = \log_4 \sqrt{4} = \log_4 4^{\frac{1}{2}} = \frac{1}{2} \log_4 4 = \frac{1}{2} \times 1 = \frac{1}{2}$$[cite: 18]  
  **উত্তর:** **(গ)**[cite: 18]

**০৬। $3^{\log_3 20 - \log_3 5}$ এর মান কত?**[cite: 18]  
(ক) $3$  (খ) $4$  (গ) $5$  (ঘ) $20$[cite: 18]  
* **সমাধান:**  
  $$3^{\log_3 20 - \log_3 5} = 3^{\log_3 \frac{20}{5}} = 3^{\log_3 4} = 4 \quad [\because n^{\log_n x} = x]$$[cite: 18]  
  **উত্তর:** **(খ)**[cite: 18]

**০৭। $2^{\log_2 20} \div 3^{\log_3 5 + \log_3 6}$ এর মান কত?**[cite: 18]  
(ক) $\frac{2}{3}$  (খ) $\frac{3}{2}$  (গ) $\frac{2}{5}$  (ঘ) $\frac{5}{6}$[cite: 18]  
* **সমাধান:**  
  $$2^{\log_2 20} \div 3^{\log_3 5 + \log_3 6} = 20 \div 3^{\log_3 5 \times 6} = 20 \div 30 = \frac{2}{3}$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

---

### **Type 02: $\log$-এর ভিত্তি/ঘাত -এর মান নির্ণয়**

$\log_x y = p$ হলে, $x^p = y$। এখানে, $x, y$ এবং $p$ এর যেকোনো দুইটি রাশির মান জানা থাকলে অপর রাশির মান নির্ণয় করা সম্ভব।[cite: 18]

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। $\log_x 4 = -2$ হলে $x =$ কত? [৪৯তম বিসিএস (শিক্ষা)]**[cite: 18]  
(ক) $\frac{1}{2}$  (খ) $-\frac{1}{2}$  (গ) $2$  (ঘ) $-2$[cite: 18]  
* **সমাধান:**  
  $$\log_x 4 = -2 \Rightarrow x^{-2} = 4 [\log_x y = p \text{ হলে, } x^p = y]$$[cite: 18]
  $$\Rightarrow x^2 = 4^{-1} = \frac{1}{4} \quad [\text{উভয় পক্ষের ঘাতকে } -1 \text{ দ্বারা গুণ করে}]$$[cite: 18]
  $$\therefore x = \frac{1}{2}$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০২। যদি $\log_{10} x = -3$ হয়, তবে $x$ এর মান কত? [৪৮তম বিসিএস (স্বাস্থ্য)]**[cite: 18]  
(ক) $0.1$  (খ) $0.01$  (গ) $0.001$  (ঘ) $0.0001$[cite: 18]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } \log_{10} x = -3 \Rightarrow x = 10^{-3} \quad [\log_x y = p \text{ হলে, } x^p = y]$$[cite: 18]
  $$\Rightarrow x = \frac{1}{10^3} = \frac{1}{1000} \therefore x = 0.001$$[cite: 18]  
  **উত্তর:** **(গ)**[cite: 18]

**০৩। যদি $\log_x 324 = 4$ হয়, তবে $x$ এর মান কত? [৪৭তম বিসিএস]**[cite: 18]  
(ক) $3\sqrt{2}$  (খ) $4\sqrt{2}$  (গ) $5\sqrt{2}$  (ঘ) $\sqrt{2}$[cite: 18]  
* **সমাধান:**  
  $$\text{এখানে, } \log_x 324 = 4 \Rightarrow x^4 = 324 \quad [\log_x y = p \text{ হলে, } x^p = y]$$[cite: 18]
  $$\Rightarrow x^4 = (3\sqrt{2})^4 \therefore x = 3\sqrt{2}$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০৪। $\log_{\sqrt{8}} x = 3\frac{1}{3}$ হলে $x$ এর মান কত? [৪৬তম বিসিএস]**[cite: 18]  
(ক) $32$  (খ) $8$  (গ) $3$  (ঘ) $\sqrt{8}$[cite: 18]  
* **সমাধান:**  
  $$\text{দেওয়া আছে, } \log_{\sqrt{8}} x = 3\frac{1}{3} \Rightarrow \log_{\sqrt{8}} x = \frac{10}{3}$$[cite: 18]
  $$\Rightarrow x = (\sqrt{8})^{\frac{10}{3}} \quad [\because \log_x y = p \text{ হলে, } x^p = y]$$[cite: 18]
  $$\Rightarrow x = \left(8^{\frac{1}{2}}\right)^{\frac{10}{3}} \Rightarrow x = 8^{\frac{1}{2} \times \frac{10}{3}} \Rightarrow x = 8^{\frac{5}{3}} \Rightarrow x = (2^3)^{\frac{5}{3}}$$[cite: 18]
  $$\Rightarrow x = 2^{3 \times \frac{5}{3}} \Rightarrow x = 2^5 \therefore x = 32$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০৫। যদি $\log_{10} x = -1$ হয়, তাহলে নিচের কোনটি $x$ এর মান? [৪৪তম বিসিএস]**[cite: 18]  
(ক) $0.1$  (খ) $0.01$  (গ) $\frac{1}{10000}$  (ঘ) $0.001$[cite: 18]  
* **সমাধান:**  
  $$\text{প্রদত্ত রাশি, } \log_{10} x = -1 \Rightarrow x = 10^{-1} \quad [\because \log_x y = p \text{ হলে, } x^p = y]$$[cite: 18]
  $$\therefore x = \frac{1}{10} = 0.1$$[cite: 18]  
  **উত্তর:** **(ক)**[cite: 18]

**০৬। $\log_x \frac{1}{9} = -2$ হলে, $x$ এর মান কোনটি? [৪২তম বিসিএস]**[cite: 19]  
(ক) $3$  (খ) $2$  (গ) $\frac{1}{3}$  (ঘ) $-\frac{1}{3}$[cite: 19]  
* **সমাধান:**  
  $$\log_x \frac{1}{9} = -2 \Rightarrow x^{-2} = \frac{1}{9} \Rightarrow \frac{1}{x^2} = \frac{1}{9} \Rightarrow x^2 = 9 \therefore x = 3$$[cite: 19]  
  **উত্তর:** **(ক)**[cite: 19]

**০৭। $\log_x \left(\frac{1}{8}\right) = -2$ হলে, $x =$ কত? [৩৮তম বিসিএস]**[cite: 19]  
(ক) $2$  (খ) $\sqrt{2}$  (গ) $2\sqrt{2}$  (ঘ) $4$[cite: 19]  
* **সমাধান:**  
  $$\log_x \left(\frac{1}{8}\right) = -2 \Rightarrow x^{-2} = \frac{1}{8} \quad [\because \log_x y = p \text{ হলে, } x^p = y]$$[cite: 19]
  $$\Rightarrow \frac{1}{x^2} = \frac{1}{8} \Rightarrow x^2 = 8 \Rightarrow x^2 = (2\sqrt{2})^2 \therefore x = 2\sqrt{2} \quad [\text{ পাওয়ার বা ঘাত সমান }]$$[cite: 19]  
  **উত্তর:** **(গ)**[cite: 19]

**০৮। $\log_x \left(\frac{3}{2}\right) = -\frac{1}{2}$ হলে, $x$-এর মান— [৩৭তম বিসিএস]**[cite: 19]  
(ক) $\frac{4}{9}$  (খ) $\frac{9}{4}$  (গ) $\sqrt{\frac{3}{2}}$  (ঘ) $\sqrt{\frac{2}{3}}$[cite: 19]  
* **সমাধান:**  
  $$\log_x \left(\frac{3}{2}\right) = -\frac{1}{2} \Rightarrow (x)^{-\frac{1}{2}} = \frac{3}{2} \Rightarrow \frac{1}{x^{\frac{1}{2}}} = \frac{3}{2} \Rightarrow \frac{1}{\sqrt{x}} = \frac{3}{2}$$[cite: 19]
  $$\Rightarrow \frac{1}{x} = \frac{9}{4} \therefore x = \frac{4}{9}$$[cite: 19]  
  **উত্তর:** **(ক)**[cite: 19]

---

#### **Type 02: নমুনা প্রশ্ন ও সমাধান**

**০১। $\log_y \sqrt[3]{3} = \frac{1}{15}$ হলে, $y$ এর মান কত?**[cite: 19]  
(ক) $9$  (খ) $27$  (গ) $81$  (ঘ) $243$[cite: 19]  
* **সমাধান:**  
  $$\log_y \sqrt[3]{3} = \frac{1}{15} \Rightarrow y^{\frac{1}{15}} = \sqrt[3]{3} \Rightarrow y^{\frac{1}{15}} = 3^{\frac{1}{3}} \Rightarrow y = 3^{\frac{15}{3}} \Rightarrow y = 3^5 \therefore y = 243$$[cite: 19]  
  **উত্তর:** **(ঘ)**[cite: 19]

**০২। $\log_x 324 = 4$ হলে, $x$ এর মান কত?**[cite: 19]  
(ক) $3\sqrt{2}$  (খ) $2\sqrt{3}$  (গ) $5\sqrt{2}$  (ঘ) $2\sqrt{5}$[cite: 19]  
* **সমাধান:**  
  $$\log_x 324 = 4 \Rightarrow x^4 = 324 \Rightarrow x^4 = (3\sqrt{2})^4 \therefore x = 3\sqrt{2}$$[cite: 19]  
  **উত্তর:** **(ক)**[cite: 19]

**০৩। $\log_x \frac{1}{16} = -2$ হলে, $x$ এর মান কত?**[cite: 19]  
(ক) $3$  (খ) $5$  (গ) $4$  (ঘ) $6$[cite: 19]  
* **সমাধান:**  
  $$\log_x \frac{1}{16} = -2 \Rightarrow x^{-2} = \frac{1}{16} \Rightarrow x^{-2} = 4^{-2} \therefore x = 4$$[cite: 19]  
  **উত্তর:** **(গ)**[cite: 19]

**০৪। $\log_x \left(\frac{1}{27}\right) = -3$ হলে, $x$ এর মান -**[cite: 19]  
(ক) $-3$  (খ) $3$  (গ) $-\frac{1}{3}$  (ঘ) $\frac{1}{3}$[cite: 19]  
* **সমাধান:**  
  $$\log_x \left(\frac{1}{27}\right) = -3 \Rightarrow x^{-3} = \frac{1}{27} \Rightarrow x^{-3} = \frac{1}{3^3} \Rightarrow x^{-3} = 3^{-3} \therefore x = 3 \quad [\text{যেহেতু power বা ঘাত সমান}]$$[cite: 19]  
  **উত্তর:** **(খ)**[cite: 19]

---

### **Type 03: সরলমান নির্ণয়**

লগারিদমের ধর্ম ও সাধারণ সূত্রাবলি ব্যবহার করে সরলমান নির্ণয় করা সম্ভব।[cite: 19]

#### **বিগত BCS প্রিলি পরীক্ষার প্রশ্ন ও সমাধান**

**০১। $2\log_{10} 5 + \log_{10} 36 - \log_{10} 9 = ?$ [৪৪তম বিসিএস]**[cite: 19]  
(ক) $2$  (খ) $100$  (গ) $37$  (ঘ) $4.6$[cite: 19]  
* **সমাধান:**  
  $$2\log_{10} 5 + \log_{10} 36 - \log_{10} 9 = \log_{10} 5^2 + \log_{10} 36 - \log_{10} 9 \quad [\because n\log_a M = \log_a M^n]$$[cite: 19]
  $$= \log_{10} 25 + \log_{10} 36 - \log_{10} 9 = \log_{10} \left(\frac{25 \times 36}{9}\right)$$[cite: 19]
  $$\left[\because \log_a M + \log_a N = \log_a(MN) \text{ এবং } \log_a M - \log_a N = \log_a\left(\frac{M}{N}\right)\right]$$[cite: 19]
  $$= \log_{10}(25 \times 4) = \log_{10} 100 = \log_{10}(10)^2 = 2 \log_{10} 10 = 2 \times 1 = 2$$[cite: 19]  
  **উত্তর:** **(ক)**[cite: 19]

**০২। $\log_a x = 1, \log_a y = 2$ এবং $\log_a z = 3$ হলে, $\log_a \left(\frac{x^3 y^2}{z}\right)$ এর মান কত? [৩৫তম বিসিএস]**[cite: 19]  
(ক) $1$  (খ) $2$  (গ) $4$  (ঘ) $5$[cite: 19]  
* **সমাধান:**  
  $$\log_a \left(\frac{x^3 y^2}{z}\right) = \log_a(x^3 y^2) - \log_a z \quad \left[\because \log_a \frac{M}{N} = \log_a M - \log_a N\right]$$[cite: 19]
  $$= \log_a x^3 + \log_a y^2 - \log_a z \quad [\because \log_a MN = \log_a M + \log_a N]$$[cite: 19]
  $$= 3\log_a x + 2\log_a y - \log_a z = 3 \times 1 + 2 \times 2 - 3 \quad [\text{মান বসিয়ে}] = 3 + 4 - 3 = 4$$[cite: 19]  
  **উত্তর:** **(গ)**[cite: 19]


  # ⚡ লগারিদম (Logarithm) MCQ Shortcuts for BCS

### ১. Direct Base-Value Relation (ভিত্তি ও পাওয়ারের শর্টকাট)
* **মূল নীতি:** $\log_a x = p \iff a^p = x$ (লগের ভিত্তি ডানপাশের সংখ্যার পাওয়ার হয়ে যায়)।
* **কৌশল:** সরাসরি $\log$ তুলে দিয়ে বেসের ওপর ডানপাশের মান বসিয়ে দিন।
* **উদাহরণ:** $\log_x 324 = 4 \implies x^4 = 324 \implies x^4 = (3\sqrt{2})^4 \therefore x = 3\sqrt{2}$

### ২. Base and Argument Equalization (ভিত্তি ও সংখাক মান এক বানানো)
* **কৌশল:** $\log_a a = 1$ এবং $\log_a a^n = n$
* **শর্টকাট রুল:** লগের নিচের সংখ্যা (Base) ও উপরের সংখ্যা সমান করতে পারলে **পাওয়ারই সরাসরি উত্তর**।
* **উদাহরণ:** $\log_2 32 = \log_2 (2^5) \implies \mathbf{5}$ *(সরাসরি পাওয়ার ৫ ই উত্তর!)*
* **উদাহরণ (রুট থাকলে):** $\log_{\sqrt{3}} 81 = \log_{\sqrt{3}} (\sqrt{3})^8 \implies \mathbf{8}$

### ৩. Power on Base Property (ভিত্তির ওপর পাওয়ার থাকলে)
* **কৌশল:** $\log_{a^k} b = \frac{1}{k} \log_a b$ (ভিত্তির পাওয়ার সামনে এসে উল্টে $\frac{1}{k}$ হয়ে গুণ হয়)।
* **উদাহরণ:** $\log_4 2 = \log_{2^2} 2 = \frac{1}{2} \log_2 2 = \frac{1}{2} \times 1 = \mathbf{\frac{1}{2}}$

### ৪. Exponential-Log Cancellation ($a^{\log_a x}$ প্যাটার্ন)
* **কৌশল:** পাওয়ারের বেস আর লগের বেস একই হলে তারা পরস্পরকে ভ্যানিশ করে দেয়: $a^{\log_a x} = x$
* **উদাহরণ 1:** $2^{\log_2 15} = \mathbf{15}$
* **উদাহরণ 2:** $3^{\log_3 20 - \log_3 5} = 3^{\log_3 \left(\frac{20}{5}\right)} = 3^{\log_3 4} = \mathbf{4}$

### ৫. Fraction to Negative Power (ভগ্নাংশ থাকলে নেগেটিভ পাওয়ার)
* **কৌশল:** লগের ভেতরের মান $\frac{1}{N}$ আকারে থাকলে পাওয়ারকে মাইনাস (Negative) ধরে এক লাইনে হিসাব করুন।
* **উদাহরণ:** $\log_2 \left(\frac{1}{32}\right) = \log_2 (2^{-5}) \implies \mathbf{-5}$
* **উদাহরণ:** $\log_3 \left(\frac{1}{9}\right) = \log_3 (3^{-2}) \implies \mathbf{-2}$

---

### 💡 BCS এর জন্য অতি-প্রয়োজনীয় স্বতঃসিদ্ধ ও শর্ত (১ সেকেন্ডের প্রশ্ন):
1. **$\log_a 1 = 0$ হওয়ার শর্ত:** $a > 0$ এবং $a \neq 1$
2. **$\log_a 0$ এর মান:** অসংজ্ঞায়িত (Undefined)
3. **$\ln x$ সংজ্ঞায়িত হওয়ার শর্ত:** $x > 0$ (ঋণাত্মক বা শূন্যের লগ হয় না)
4. **গুণ $\to$ যোগ:** $\log (ab) = \log a + \log b$
5. **ভাগ $\to$ বিয়োগ:** $\log \left(\frac{a}{b}\right) = \log a - \log b$