# Math Rendering Quick Reference

One-page cheat sheet for writing math in this blog.

## Enable Math

Add to front matter:
```yaml
math: true
```

## Syntax

| Type | Syntax | Example | Output |
|------|--------|---------|--------|
| Inline | `$...$` | `$x^2$` | x² |
| Display | `$$...$$` | `$$x^2$$` | (centered) |

## Common Commands

### Greek Letters
```latex
$\alpha$ $\beta$ $\gamma$ $\delta$ $\epsilon$ $\theta$ $\lambda$ $\mu$
$\pi$ $\sigma$ $\phi$ $\omega$
$\Gamma$ $\Delta$ $\Theta$ $\Lambda$ $\Pi$ $\Sigma$ $\Phi$ $\Omega$
```

### Superscripts & Subscripts
```latex
$x^2$          → x²
$x_i$          → xᵢ
$x^{10}$       → x¹⁰ (braces for multiple chars)
$x_{ij}$       → xᵢⱼ
```

### Fractions
```latex
$\frac{a}{b}$                  → a/b
$\frac{numerator}{denominator}$
```

### Operators
```latex
$\sum_{i=1}^n$     → Σ
$\prod_{i=1}^n$    → Π
$\int_a^b$         → ∫
$\lim_{x \to 0}$   → lim
$\frac{d}{dx}$     → d/dx
$\frac{\partial}{\partial x}$  → ∂/∂x
```

### Relations
```latex
$=$  $\neq$  $\approx$  $\equiv$
$<$  $\leq$  $>$  $\geq$
$\in$  $\notin$  $\subset$  $\subseteq$
$\cup$  $\cap$  $\emptyset$
```

### Logic
```latex
$\forall$  $\exists$  $\implies$  $\iff$
$\land$  $\lor$  $\neg$
```

### Sets (Shortcuts)
```latex
$\RR$  → ℝ (real numbers)
$\NN$  → ℕ (natural numbers)
$\ZZ$  → ℤ (integers)
$\QQ$  → ℚ (rational numbers)
$\CC$  → ℂ (complex numbers)
```

### Brackets
```latex
$\left( \frac{x}{y} \right)$    → ( x/y ) auto-sized
$\left[ ... \right]$            → [ ... ]
$\left\{ ... \right\}$          → { ... }
$\left| ... \right|$            → | ... |
$\left\| ... \right\|$          → ‖ ... ‖
```

### Accents
```latex
$\hat{x}$      → x̂
$\bar{x}$      → x̄
$\tilde{x}$    → x̃
$\vec{v}$      → v⃗
$\dot{x}$      → ẋ
$\ddot{x}$     → ẍ
```

### Special Functions
```latex
$\sin$ $\cos$ $\tan$ $\log$ $\ln$ $\exp$
$\min$ $\max$ $\sup$ $\inf$
```

### Spacing
```latex
$a\,b$      → thin space
$a\:b$      → medium space
$a\;b$      → thick space
$a\quad b$  → quad space
$a\qquad b$ → double quad
```

## Complex Examples

### Matrix
```latex
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

### Cases (Piecewise)
```latex
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$
```

### Aligned Equations
```latex
$$
\begin{align}
f(x) &= (x+1)^2 \\
&= x^2 + 2x + 1
\end{align}
$$
```

### System of Equations
```latex
$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$
```

## Custom Macros

Shortcuts available in this blog:

```latex
$\RR$ $\NN$ $\ZZ$ $\QQ$ $\CC$     → Number sets
$\abs{x}$                         → |x|
$\norm{v}$                        → ‖v‖
$\set{x > 0}$                     → {x > 0}
$\bra{\psi}$                      → ⟨ψ| (Dirac notation)
$\ket{\phi}$                      → |φ⟩ (Dirac notation)
$\braket{\psi}{\phi}$             → ⟨ψ|φ⟩ (inner product)
```

## Common Mistakes

### ❌ Wrong
```latex
$ x^2$        (space after $)
$x^2 $        (space before $)
x^10          (missing braces for multi-char)
sum           (missing backslash)
\left( x      (unmatched delimiter)
```

### ✅ Correct
```latex
$x^2$         (no spaces)
$x^{10}$      (braces for multi-char)
\sum          (backslash required)
\left( x \right)  (matched delimiters)
```

## Escaping

```latex
\$100         → $100 (literal dollar)
\%            → %
\#            → #
\&            → &
\_            → _
\{            → {
\}            → }
```

## Text in Math

```latex
$x = 5 \text{ meters}$
$\text{if } x > 0$
```

## Testing

1. Add `math: true` to front matter
2. Write equation
3. Run: `bundle exec jekyll serve`
4. Check browser console (F12) for errors
5. Should see: "MathJax 3 loaded and ready"

## Resources

- Full guide: `/Users/ybang_mac/Development/blog/MATH_RENDERING_GUIDE.md`
- Examples: `/Users/ybang_mac/Development/blog/_posts/2025-11-02-math-rendering-examples.md`
- [LaTeX Symbols](http://tug.ctan.org/info/symbols/comprehensive/symbols-a4.pdf)
- [Detexify](http://detexify.kirelabs.org/classify.html) - Draw to find symbol

## Need Help?

Right-click any equation on the blog to:
- Copy as LaTeX
- View in different formats
- Access help menu
