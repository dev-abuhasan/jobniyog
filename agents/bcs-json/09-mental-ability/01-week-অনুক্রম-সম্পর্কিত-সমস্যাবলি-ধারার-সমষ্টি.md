# স্টেপ ০১ - অনুক্রম সম্পর্কিত সমস্যাবলি

## Case 01: সমান্তর অনুক্রম (AP)

### n-তম পদ
$$
\boxed{a_n=a+(n-1)d}
$$

### প্রথম n পদের সমষ্টি
$$
\boxed{S_n=\frac{n}{2}[2a+(n-1)d]}
$$

অথবা,
$$
\boxed{S_n=\frac{n}{2}(a+l)}
$$

### শেষ পদ
$$
\boxed{l=a+(n-1)d}
$$

### ৩টি পদ AP হলে
$$
\boxed{a-d,\ a,\ a+d}
$$

$$
\boxed{2(\text{মধ্যপদ})=\text{প্রথমপদ}+\text{শেষপদ}}
$$

---

## Case 02: গুণোত্তর অনুক্রম (GP)

### n-তম পদ
$$
\boxed{a_n=ar^{n-1}}
$$

### প্রথম n পদের সমষ্টি
$$
\boxed{S_n=\frac{a(r^n-1)}{r-1}}
$$

অথবা,
$$
\boxed{S_n=\frac{a(1-r^n)}{1-r}}
$$

### অসীম ধারার সমষ্টি
যদি $|r|<1$,
$$
\boxed{S_\infty=\frac{a}{1-r}}
$$

### ৩টি পদ GP হলে
$$
\boxed{\frac{a}{r},\ a,\ ar}
$$

$$
\boxed{(\text{মধ্যপদ})^2=\text{প্রথমপদ}\times\text{শেষপদ}}
$$

### Geometric Mean
$$
\boxed{GM=\sqrt{ab}}
$$

---

## Case 03: অনুক্রমের বর্গ ও ঘন

### স্বাভাবিক সংখ্যার যোগফল
$$
\boxed{1+2+\cdots+n=\frac{n(n+1)}{2}}
$$

### বর্গের যোগফল
$$
\boxed{1^2+2^2+\cdots+n^2=
\frac{n(n+1)(2n+1)}{6}}
$$

### ঘনের যোগফল
$$
\boxed{1^3+2^3+\cdots+n^3=
\left[\frac{n(n+1)}{2}\right]^2}
$$

### বিজোড় সংখ্যার যোগফল
$$
\boxed{1+3+\cdots+(2n-1)=n^2}
$$

### জোড় সংখ্যার যোগফল
$$
\boxed{2+4+\cdots+2n=n(n+1)}
$$

### গুরুত্বপূর্ণ সূত্র
$$
\boxed{a^2-b^2=(a-b)(a+b)}
$$

$$
\boxed{a^3+b^3=(a+b)(a^2-ab+b^2)}
$$

$$
\boxed{a^3-b^3=(a-b)(a^2+ab+b^2)}
$$

---

## Case 04: মিশ্র অনুক্রম

### Pattern শনাক্ত করার নিয়ম

1. Difference পরীক্ষা করো
2. Second Difference পরীক্ষা করো
3. Ratio পরীক্ষা করো
4. বিজোড় ও জোড় পদ আলাদা করো
5. যোগ/বিয়োগের Pattern দেখো
6. গুণ/ভাগের Pattern দেখো
7. আগের ১/২টি পদের সাথে সম্পর্ক দেখো

### Fibonacci Pattern
$$
\boxed{a_n=a_{n-1}+a_{n-2}}
$$

উদাহরণ:
$$
1,1,2,3,5,8,\ldots
$$

### Second Difference
প্রথম Difference ধ্রুবক না হলে আবার Difference নাও।
Second Difference ধ্রুবক হলে সাধারণত Quadratic Pattern হয়।