const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const birthdayAudio = $('#birthdayAudio');
let audioStarted = false;

// Soft reveal as each chapter enters the screen.
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), {threshold:.12});
$$('.reveal').forEach(el => revealObserver.observe(el));

// Reading progress.
const progressBar = $('#progressBar');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${max > 0 ? scrollY/max*100 : 0}%`;
}, {passive:true});

// Gallery lightbox: click a memory to view it larger.
const photos = [
  {src:'assets/memory-01.webp', caption:'My favourite people, my favourite place.'},
  {src:'assets/memory-02.webp', caption:'A simple moment, a beautiful memory.'},
  {src:'assets/memory-03.webp', caption:'Your love is in the little things.'},
  {src:'assets/memory-04.webp', caption:'A memory I will always keep close.'},
  {src:'assets/amma-portrait.webp', caption:'The beautiful heart behind it all.'}
];
let photoIndex = 0;
const lightbox = $('#lightbox');
function showPhoto(index){ photoIndex=(index+photos.length)%photos.length; $('#lightboxImage').src=photos[photoIndex].src; $('#lightboxCaption').textContent=photos[photoIndex].caption; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); }
function closePhoto(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');}
$$('.memory-card').forEach(card=>card.addEventListener('click',()=>showPhoto(Number(card.dataset.photo))));
$('#lightboxClose').addEventListener('click',closePhoto);
$('#prevPhoto').addEventListener('click',()=>showPhoto(photoIndex-1));
$('#nextPhoto').addEventListener('click',()=>showPhoto(photoIndex+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePhoto();});
addEventListener('keydown',e=>{if(e.key==='Escape')closePhoto();if(lightbox.classList.contains('open')&&e.key==='ArrowRight')showPhoto(photoIndex+1);if(lightbox.classList.contains('open')&&e.key==='ArrowLeft')showPhoto(photoIndex-1);});

// Cake interaction: blow out the flames, then play the supplied birthday audio on cut.
let candlesBlown = false;
$('#blowBtn').addEventListener('click',()=>{
  if(candlesBlown)return;
  candlesBlown=true; $$('.candle').forEach(c=>c.classList.remove('lit'));
  $('#cakeStatus').textContent='Wish made! Now let’s cut the cake together. ♡';
  $('#blowBtn').textContent='♡ Wish made'; $('#blowBtn').disabled=true; $('#cutBtn').disabled=false;
  burstConfetti(65);
});
$('#cutBtn').addEventListener('click',async()=>{
  $('#cakeStatus').textContent='Happy Birthday, Amma! Enjoy your special song. ♡';
  $('#cutBtn').textContent='Cake cut! ♥'; $('#cutBtn').disabled=true;
  try { birthdayAudio.currentTime=0; await birthdayAudio.play(); audioStarted=true; $('#soundToggle span').textContent='Playing'; }
  catch(err){ $('#cakeStatus').textContent='Tap the Sound button to play your birthday song. ♡'; }
  burstConfetti(150);
});
$('#soundToggle').addEventListener('click',async()=>{
  if(birthdayAudio.paused){try{await birthdayAudio.play();$('#soundToggle span').textContent='Playing';}catch(e){$('#soundToggle span').textContent='Tap again';}}
  else{birthdayAudio.pause();$('#soundToggle span').textContent='Sound';}
});

function burstConfetti(count=80){
  const layer=$('#confettiLayer'); const colors=['#ff75c8','#ffd47b','#a879ff','#64d8ff','#7de4ae','#ff765f','#ffffff'];
  for(let i=0;i<count;i++){const piece=document.createElement('i');piece.className='confetti';piece.style.left=Math.random()*100+'%';piece.style.background=colors[Math.floor(Math.random()*colors.length)];piece.style.animationDelay=(Math.random()*.8)+'s';piece.style.animationDuration=(2.4+Math.random()*2)+'s';piece.style.transform=`rotate(${Math.random()*360}deg)`;layer.appendChild(piece);setTimeout(()=>piece.remove(),5200);}
}

// Five-question quiz: a blend of the gift's story and simple web-technology questions.
const questions=[
  {q:'Who is the birthday star of this little website?',a:['Amma','The teddy bear','The cake'],correct:0,why:'Of course — this whole surprise is made for Amma. ❤️'},
  {q:'How many family photographs are featured in the memory gallery?',a:['Three','Five','Ten'],correct:1,why:'Five special photographs, each holding a memory.'},
  {q:'Which technology gives the cake buttons their interactive behaviour?',a:['HTML','CSS','JavaScript'],correct:2,why:'JavaScript makes the candles, cake buttons and quiz respond to clicks.'},
  {q:'Which part of a web page controls colours, layout and visual styling?',a:['CSS','Audio file','Image name'],correct:0,why:'CSS styles the page — from glowing colours to responsive layouts.'},
  {q:'What is the main purpose of this birthday surprise?',a:['To show off code','To celebrate and thank Amma','To sell a cake'],correct:1,why:'The code is just the wrapping. The love inside is the real gift.'}
];
let questionIndex=0, score=0, selected=null, answers=[];
function renderQuestion(){
  const q=questions[questionIndex]; selected=null;
  $('#quizCount').textContent=`QUESTION ${String(questionIndex+1).padStart(2,'0')} / 05`;
  $('#quizTrack').style.width=`${questionIndex/5*100}%`;
  $('#scoreLabel').textContent=`♡ ${score}`;
  $('#quizContent').innerHTML=`<h3 class="question">${q.q}</h3><div class="answers">${q.a.map((a,i)=>`<button class="answer" data-answer="${i}">${String.fromCharCode(65+i)}. &nbsp; ${a}</button>`).join('')}</div><p class="cake-status" id="answerFeedback" aria-live="polite"></p>`;
  $$('.answer').forEach(btn=>btn.addEventListener('click',()=>{
    if(selected!==null)return; selected=Number(btn.dataset.answer); const right=selected===q.correct; if(right)score++;
    answers.push(right); $$('.answer').forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add('correct');else if(i===selected)b.classList.add('wrong');});
    $('#answerFeedback').textContent=(right?'Correct! ':'Not quite. ')+q.why;
    $('#scoreLabel').textContent=`♡ ${score}`; $('#nextQuestion').disabled=false;
    $('#nextQuestion').textContent=questionIndex===4?'See my result ✨':'Next question →';
  }));
  $('#nextQuestion').disabled=true;
}
renderQuestion();
$('#nextQuestion').addEventListener('click',()=>{
  if(selected===null)return;
  if(questionIndex<4){questionIndex++;renderQuestion();}
  else showQuizResult();
});
function showQuizResult(){
  $('#quizContent').hidden=true;$('.quiz-actions').hidden=true;$('#quizTrack').style.width='100%';
  const result=$('#quizResult');result.hidden=false;
  if(score===5){result.innerHTML=`<div class="final-heart">✦</div><h3>5 out of 5! Perfect!</h3><p>You unlocked the special surprise. A little reminder: you are loved more than words can say.</p><button class="primary-btn" id="unlockButton">Unlock the surprise ♡</button>`;$('#unlockButton').addEventListener('click',()=>{document.querySelector('#finalMessage').hidden=false;burstConfetti(130);$('#finalMessage').scrollIntoView({behavior:'smooth',block:'center'});});}
  else{result.innerHTML=`<h3>${score} out of 5 — lovely try!</h3><p>The best part is not the score. It is celebrating you, Amma. You can try again for the special surprise.</p><button class="primary-btn" id="retryQuiz">Try again ♡</button>`;$('#retryQuiz').addEventListener('click',()=>{questionIndex=0;score=0;answers=[];$('#quizContent').hidden=false;$('.quiz-actions').hidden=false;result.hidden=true;renderQuestion();});}
}
$('#finalSurprise').addEventListener('click',()=>{ $('#finalMessage').hidden=false;burstConfetti(100);$('#finalMessage').scrollIntoView({behavior:'smooth',block:'center'}); });
