/* Reusable quiz component. No dependencies.

   Multiple choice (options are shuffled on load so position gives no hints):

   <div class="quiz">
     <p class="q">Question</p>
     <pre><code>optional code</code></pre>
     <ul class="options">
       <li data-correct>Correct answer</li>
       <li>Distractor</li>
     </ul>
     <p class="explain">Explanation shown after answering.</p>
   </div>

   Written answer (active recall: the user types, not recognizes):

   <div class="quiz" data-accept="Quito|quito">
     <p class="q">Question</p>
     <p class="explain">Explanation.</p>
   </div>

   data-accept lists the valid answers separated by |. Leading and trailing spaces are ignored. */

(function () {
  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function setFeedback(quiz, ok, explain) {
    var fb = quiz.querySelector(".feedback");
    fb.className = "feedback " + (ok ? "ok" : "no");
    fb.textContent = (ok ? "Correct. " : "Not yet. ") + (explain ? explain.textContent : "");
  }

  function initChoice(quiz) {
    var ul = quiz.querySelector(".options");
    var explain = quiz.querySelector(".explain");
    if (explain) explain.style.display = "none";
    var items = shuffle(Array.prototype.slice.call(ul.children));
    ul.innerHTML = "";
    items.forEach(function (li) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      btn.textContent = li.textContent;
      var isCorrect = li.hasAttribute("data-correct");
      btn.addEventListener("click", function () {
        if (isCorrect) {
          btn.classList.add("correct");
          Array.prototype.forEach.call(ul.querySelectorAll("button"), function (b) { b.disabled = true; });
          setFeedback(quiz, true, explain);
        } else {
          btn.classList.add("wrong");
          btn.disabled = true;
          var fb = quiz.querySelector(".feedback");
          fb.className = "feedback no";
          fb.textContent = "Not yet. Try another option.";
        }
      });
      var wrap = document.createElement("li");
      wrap.appendChild(btn);
      ul.appendChild(wrap);
    });
  }

  function initPredict(quiz) {
    var accepted = quiz.getAttribute("data-accept").split("|").map(function (s) { return s.trim(); });
    var explain = quiz.querySelector(".explain");
    if (explain) explain.style.display = "none";
    var row = document.createElement("div");
    row.className = "predict";
    var input = document.createElement("input");
    input.type = "text";
    input.setAttribute("aria-label", "Your answer");
    input.autocomplete = "off";
    input.spellcheck = false;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Check";
    function check() {
      var ok = accepted.indexOf(input.value.trim()) !== -1;
      if (ok) {
        setFeedback(quiz, true, explain);
        input.disabled = true;
        btn.disabled = true;
      } else {
        var fb = quiz.querySelector(".feedback");
        fb.className = "feedback no";
        fb.textContent = "Not yet. Read the code again, line by line.";
      }
    }
    btn.addEventListener("click", check);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
    row.appendChild(input);
    row.appendChild(btn);
    quiz.appendChild(row);
  }

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".quiz"), function (quiz) {
      var fb = document.createElement("p");
      fb.className = "feedback";
      fb.setAttribute("role", "status");
      quiz.appendChild(fb);
      if (quiz.hasAttribute("data-accept")) initPredict(quiz);
      else initChoice(quiz);
    });
  });
})();
