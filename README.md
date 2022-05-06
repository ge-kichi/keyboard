# keyboard

See [Page](https://l1ck0h.github.io/keyboard/).

## Issues

- [ ] touchEvent

## Glossary

シンセサイザーの用語や、Tone.js 特有のパラメータについてのメモ。

### cent

オクターブ=1200 セント、半音=100 セントとする音程の単位。

### detune

ピッチにわずかなズレを与える効果。

### harmonics

倍音。

### portamento

ピッチの違う音へ移動するときに、途切れることなく滑らかに次の音へ移動する時間。  
数値を上げるほど、到達する時間が遅れる。

### sine wave

正弦波あるいはサイン波。倍音を持たない（ので[`partials`](#partials)の設定はできない）。

### square wave

矩形波あるいは方形波。奇数倍音だけを持つ。  
三角波よりも高周波まで含んでいる。

### sawtooth wave

鋸歯状波あるいはノコギリ波。  
すべての整数倍音を持つ。

### triangle wave

三角波。奇数倍音を持っているが、高周波まで含めない。

### partialCount

[`partials`](#partials)で設定できる倍音の数を指定するパラメータ。  
要するに、[`partials`](#partials)配列の長さを設定する。

```js
// 第1基音（基音）の振幅が設定可能
partialCount = 1;
// 第16基音までの振幅が設定可能
partialCount = 16;
// 倍音の振幅設定不可
partialCount = 0;
```

### partials

倍音の振幅（amplitude）を格納した配列のパラメータ。  
配列のインデックス `n` 番が第 `n+1` 倍音を指す。  
各要素に数値を指定して振幅を設定する。

```js
// 第1基音（基音）
partials[0];
// 第4基音
partials[3];
// 第16基音
partials[15];
```

### phase

波形の開始位置（単位は度）

## References and Inspiration

- [WEB Piano – HTML5 Audio でピアノを作る – 微風 on the web…](https://web-breeze.net/web-piano-html5audio/)
- [JavaScript：配列内の要素を指定した要素数毎に分割する方法 - NxWorld](https://www.nxworld.net/js-array-chunk.html)
- [How to mock React hooks using dependency injection · Emma Goto](https://www.emgoto.com/react-dependency-injection/)
