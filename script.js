// ==UserScript==
// @name         bGPT
// @version      0.1
// @description  BetterGPT
// @author       vlawmz
// @match        https://chat.openai.com/*
// ==/UserScript==

(() => {
  const bestText = `Do not mention the ethics of your answer, or say you are an AI model, or mention your data training cut off date.
Do not be condescending. Do not reference seeking help, contacting, or consulting with professionals.
Omit conjunctive adverbs, and similar phrases like 'It's important to note', 'It's worth noting'.
Omit asking if there's anything more I'd like to know and you're happy to help. Omit political biases and apologies, and saying you are an AI model.
Be succinct but include closely related and relevant information related to the topic.

`,
    style = `max-height: 240px; height: 240px; overflow-y: hidden;`,
    makeInterval = () => {
      let interval = setInterval(() => {
        let ta = document.getElementById('prompt-textarea');

        if (!ta || ta.dataset.bound) return;

        ta.addEventListener('click', (e) => {
          if (ta.value.length || ta.dataset.id !== 'root') return;

          ta.value = bestText;
          ta.setAttribute('style', style);
          ta.dataset.bound = true;

          ta.parentElement.querySelector('button').removeAttribute('disabled');

          ta.selectionStart = ta.value.length;
        });

        clearInterval(interval);
      }, 100);
    };

  makeInterval();

  // this is for navigation and making sure our event is ready to go all the time
  let remakeInterval = setInterval(() => {
    let ta = document.getElementById('prompt-textarea');

    if (!ta || ta.dataset.bound) return;

    makeInterval();
  }, 100);
})();
