---
layout: post
title: "Math Rendering Examples - MathJax Guide"
date: 2025-11-02
author: "Your Name"
math: true
categories: [tutorial, mathematics]
tags: [latex, mathjax, examples]
excerpt: "A comprehensive guide to writing mathematical equations in this blog using MathJax and LaTeX syntax."
---

# Math Rendering Examples

This post demonstrates how to write beautiful mathematical equations using MathJax 3 and LaTeX syntax. This is both a tutorial and a test page for math rendering.

## Table of Contents
1. [Inline Math](#inline-math)
2. [Display Math](#display-math)
3. [Common Symbols](#common-symbols)
4. [Advanced Features](#advanced-features)
5. [Tips and Best Practices](#tips-and-best-practices)

---

## Inline Math

Use single dollar signs `$...$` for inline math that flows with text.

**Example:** The famous equation $E = mc^2$ shows the relationship between energy and mass. In calculus, we often work with derivatives like $\frac{dy}{dx}$ or integrals like $\int_a^b f(x)\,dx$.

**Source:**
```latex
The famous equation $E = mc^2$ shows the relationship...
derivatives like $\frac{dy}{dx}$ or integrals like $\int_a^b f(x)\,dx$.
```

The Pythagorean theorem states that $a^2 + b^2 = c^2$ for a right triangle. The quadratic formula is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$.

---

## Display Math

Use double dollar signs `$$...$$` for centered display equations.

**Example: Quadratic Formula**

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

**Source:**
```latex
$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$
```

**Example: Integral Definition**

$$
\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x
$$

**Example: Cauchy's Integral Formula**

$$
f(a) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z-a}\,dz
$$

---

## Common Symbols

### Greek Letters

Lowercase: $\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\theta$, $\lambda$, $\mu$, $\pi$, $\sigma$, $\phi$, $\omega$

Uppercase: $\Gamma$, $\Delta$, $\Theta$, $\Lambda$, $\Pi$, $\Sigma$, $\Phi$, $\Omega$

**Source:**
```latex
$\alpha$, $\beta$, $\gamma$, $\Gamma$, $\Delta$, $\Omega$
```

### Mathematical Operators

- Sum: $\sum_{i=1}^n x_i$
- Product: $\prod_{i=1}^n x_i$
- Integral: $\int_a^b f(x)\,dx$
- Double integral: $\iint_D f(x,y)\,dA$
- Limit: $\lim_{x \to \infty} f(x)$
- Derivative: $\frac{d}{dx} f(x)$ or $f'(x)$
- Partial derivative: $\frac{\partial f}{\partial x}$

### Set Theory

- Element of: $x \in A$
- Subset: $A \subseteq B$
- Union: $A \cup B$
- Intersection: $A \cap B$
- Empty set: $\emptyset$
- Common sets: $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$

**Note:** This blog includes convenient macros like `\RR`, `\NN`, `\ZZ`, `\QQ`, `\CC`:

The real numbers $\RR$ contain the rationals $\QQ$ which contain the integers $\ZZ$ which contain the natural numbers $\NN$.

### Logic and Relations

- Implies: $A \implies B$
- If and only if: $A \iff B$
- For all: $\forall x \in X$
- Exists: $\exists x \in X$
- Not equal: $a \neq b$
- Approximately: $a \approx b$
- Less/greater: $a < b$, $a \leq b$, $a > b$, $a \geq b$

---

## Advanced Features

### Matrices

$$
A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

**Source:**
```latex
$$
A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$
```

### Systems of Equations

$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$

**Source:**
```latex
$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$
```

### Aligned Equations

$$
\begin{align}
f(x) &= (x+1)^2 \\
&= x^2 + 2x + 1 \\
&= x^2 + 2x + 1
\end{align}
$$

**Source:**
```latex
$$
\begin{align}
f(x) &= (x+1)^2 \\
&= x^2 + 2x + 1
\end{align}
$$
```

### Fractions and Binomials

Complex fraction: $\frac{\frac{1}{x}+\frac{1}{y}}{xy}$

Binomial coefficient: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$

### Calculus

**Taylor Series:**

$$
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots
$$

**Fundamental Theorem of Calculus:**

$$
\int_a^b f'(x)\,dx = f(b) - f(a)
$$

**Green's Theorem:**

$$
\oint_C (L\,dx + M\,dy) = \iint_D \left(\frac{\partial M}{\partial x} - \frac{\partial L}{\partial y}\right)\,dA
$$

### Linear Algebra

**Eigenvalue equation:**

$$
A\mathbf{v} = \lambda\mathbf{v}
$$

**Determinant:**

$$
\det(A) = \begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
$$

### Special Functions

- Square root: $\sqrt{x}$, $\sqrt[n]{x}$
- Absolute value: $|x|$ or $\lvert x \rvert$
- Norm: $\|v\|$ or $\lVert v \rVert$
- Ceiling/Floor: $\lceil x \rceil$, $\lfloor x \rfloor$

**Custom macros available:**
- Absolute value: $\abs{x}$
- Norm: $\norm{v}$
- Set: $\set{x \in \RR : x > 0}$

### Probability and Statistics

**Normal distribution:**

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

**Bayes' Theorem:**

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
$$

### Accents and Decorations

- Hat: $\hat{x}$, $\widehat{xy}$
- Bar: $\bar{x}$, $\overline{AB}$
- Tilde: $\tilde{x}$, $\widetilde{xy}$
- Vector: $\vec{v}$, $\overrightarrow{AB}$
- Dot: $\dot{x}$, $\ddot{x}$

---

## Tips and Best Practices

### 1. Enable Math in Front Matter

Always add `math: true` to your post's front matter:

```yaml
---
layout: post
title: "Your Post Title"
math: true
---
```

### 2. Escaping Dollar Signs

If you need to write a literal dollar sign (like $100), escape it: `\$100` → \$100

### 3. Spacing in LaTeX

Use these for proper spacing:
- `\,` for thin space: $\int_a^b f(x)\,dx$
- `\quad` for medium space: $x \quad y$
- `\qquad` for large space: $x \qquad y$

### 4. Multiline Equations

For multiple lines, use `align` or `gather`:

$$
\begin{gather}
x + y = 5 \\
2x - y = 1
\end{gather}
$$

### 5. Text in Math Mode

Use `\text{}` for text within equations:

$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

### 6. Common Mistakes to Avoid

**Mistake:** Using `*` for multiplication
**Fix:** Use `\times` or `\cdot`: $a \times b$ or $a \cdot b$

**Mistake:** Unbalanced delimiters
**Fix:** Always match `\left` with `\right`:

$$
\left( \frac{x^2}{y^3} \right)
$$

**Mistake:** Missing backslashes
**Fix:** All LaTeX commands need `\`: `\sum` not `sum`

### 7. Performance Tips

- Only enable math on posts that need it (`math: true`)
- Avoid excessive inline math (it's slower than display math)
- Use `$$` for important equations that deserve emphasis

### 8. Accessibility

MathJax automatically generates accessible content for screen readers. Right-click any equation to access:
- Copy equation as LaTeX
- View in different formats
- Speech output settings

---

## Testing Checklist

When writing a math-heavy post, test:

- [ ] Inline math renders correctly
- [ ] Display math is centered and properly sized
- [ ] Math doesn't overflow on mobile devices
- [ ] Copy-paste works (right-click equation)
- [ ] No console errors in browser
- [ ] Dark mode (if applicable) doesn't break rendering
- [ ] Screen reader accessibility (if possible)

---

## Additional Resources

- [MathJax Documentation](https://docs.mathjax.org/)
- [LaTeX Mathematics Guide](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
- [Detexify](http://detexify.kirelabs.org/classify.html) - Draw symbols to find LaTeX commands
- [Comprehensive LaTeX Symbol List](https://www.ctan.org/pkg/comprehensive)

---

## Complex Example: Schrödinger Equation

Let's end with a complex equation from quantum mechanics:

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$

Where:
- $\Psi(\mathbf{r},t)$ is the wave function
- $\hbar$ is the reduced Planck constant
- $m$ is particle mass
- $V(\mathbf{r},t)$ is the potential energy
- $\nabla^2$ is the Laplacian operator

**Source:**
```latex
$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) =
\left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$
```

---

**Happy equation writing!** If you encounter any rendering issues, check the browser console for errors and ensure your LaTeX syntax is correct.
