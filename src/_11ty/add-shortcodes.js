// WARNING - changes to this file will require restarting the dev server
// as it is loaded from elventy.js

// return the string as entered. Only used so VS Code lit-html extension works
// without associated runtime error
// TODO find better way without runtime impact
function html(strings, ...expressions) {
  return strings.reduce(
    (result, currentString, i) =>
      `${result}${currentString}${expressions[i] ? `${expressions[i]}` : ''}`,
    '',
  )
}

/* global exports */
exports.addShortcodes = function (eleventyConfig) {
  eleventyConfig.addShortcode('homeLink', function () {
    // prettier-ignore
    return `<a href="/">← Home</a>`
  })

  /* widgets */
  eleventyConfig.addShortcode('randomNote', function (
    text = 'Random Note',
    scale = 'chromatic-enharmonic',
  ) {
    // prettier-ignore
    return html`
<button type="button" class="random-note widget"
  x-data="CLIENT.randomNote_data('${scale}')" x-on:click="getNote">
  ${text} <span x-text="\`\${note}\`"><span>
</button>`
  })

  eleventyConfig.addShortcode('metronome', function (
    bpm = 100,
    min = 30,
    max = 250,
    step = 5,
  ) {
    // prettier-ignore
    return html`
<span
  x-data="CLIENT.metronome_data(${bpm}, ${min}, ${max}, ${step})"
  class="metronome widget"
  x-on:click="onClick($el, $event)">
  <button><</button>
  <label>
    <span x-text="\`\${bpm} bpm\`"></span>
    <input type="checkbox" x-model="checked" x-ref="cb" />
  </label>
  <button>></button>
</span>`
  })

  eleventyConfig.addShortcode('seekVideo', function (time, videoNum) {
    // prettier-ignore
    return html`
  <button type="button" class="seek-video widget"
          onclick="CLIENT.seekVideo(this, '${time}', '${videoNum}')">
    ${time}
  </button>
   `
  })

  eleventyConfig.addShortcode('timer', function (
    time = 5,
    useURLTime = false,
    s = true,
    h = false,
  ) {
    console.log(time)
    // prettier-ignore
    return html`
<div
  x-data="CLIENT.timer_data(${time}, ${useURLTime})"
  x-init="()=>{btnAction()}"
  class="timer widget">
  <div style="display: flex; justify-content: space-around; width:100%">
    <button x-on:click="btnAction" x-text="\`\${btnText()}\`"></button>
    <button x-on:click="reset">Reset</button>
  </div>
  <span
    class="time"
    x-text="\`\${format(time, ${h.toString()}, true)}\`"
  ></span>
  <span
    class="elapsed"
    x-bind:class="{ 'expired': isExpired() }"
    x-text="\`\${format(elapsedTime, ${h.toString()}, ${s.toString()})}\`">
  </span>
</div>
    `
  })

  eleventyConfig.addPairedNunjucksShortcode('abc', function (
    content = '',
    title = '',
    artist = '',
    key = 'c',
    meter = '4/4',
    tempo = '4/4=100',
    rhythm = '',
    unitnotelength = '1/8',
  ) {
    // prettier-ignore
    return `
\`\`\`abc
X: 1
K: ${key} bass
M: ${meter}
Q: ${tempo}
L: ${unitnotelength}
C: ${artist}
T: ${title}
R: ${rhythm}
${content}
\`\`\`
`
  })
}
