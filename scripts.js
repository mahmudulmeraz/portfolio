/* ---------------- VIDEO ENGINE ---------------- */
(function(){
 const hero=document.getElementById('heroVideo');
 const status=document.getElementById('heroVideoStatus');

 function setStatus(t){if(status)status.textContent=t}
 if(hero){
   hero.muted=true; hero.defaultMuted=true; hero.playsInline=true;
   hero.addEventListener('loadedmetadata',()=>setStatus('VIDEO / READY'));
   hero.addEventListener('playing',()=>setStatus('VIDEO / PLAYING'));
   hero.addEventListener('error',()=>setStatus('VIDEO / ERROR — CHECK ASSET PATH'));
   const start=()=>hero.play().catch(()=>setStatus('VIDEO / CLICK OR SCROLL TO PLAY'));
   if(hero.readyState>=2) start(); else hero.addEventListener('canplay',start,{once:true});
   ['pointerdown','touchstart','scroll'].forEach(e=>window.addEventListener(e,start,{once:true,passive:true}));
 }

 const chapters=[...document.querySelectorAll('.video-chapter')];
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     const v=entry.target.querySelector('.chapter-video');
     if(!v)return;
     if(entry.isIntersecting && entry.intersectionRatio>.45){
       chapters.forEach(ch=>{const ov=ch.querySelector('.chapter-video');if(ov!==v){ov.pause();ov.currentTime=0}});
       v.muted=true;
       v.play().catch(()=>{});
     }else v.pause();
   });
 },{threshold:[.1,.45,.8]});
 chapters.forEach(ch=>observer.observe(ch));

 function updateChapterProgress(){
   chapters.forEach(ch=>{
     const v=ch.querySelector('.chapter-video'),bar=ch.querySelector('.chapter-progress i');
     if(v && bar && v.duration) bar.style.width=((v.currentTime/v.duration)*100)+'%';
   });
   requestAnimationFrame(updateChapterProgress);
 }
 requestAnimationFrame(updateChapterProgress);
})();

/* ---------------- SCROLL BUILD SYSTEM ---------------- */
const buildStages = [

  {
    title: "Research before pixels.",
    text:
      "The first layer is understanding. Goals, audience, competitors, positioning, content and the actual business problem shape what gets designed next.",
    image:
      "assets/build-01-research.jpg",
    label:
      "RESEARCH / 01",
    artifactTitle:
      "Understand<br>before building.",
    chip:
      "SYSTEM / RESEARCH"
  },

  {
    title: "Structure before styling.",
    text:
      "Information architecture, content hierarchy and user flows create the framework that makes the experience intuitive.",
    image:
      "assets/build-02-structure.jpg",
    label:
      "STRUCTURE / 02",
    artifactTitle:
      "Shape the<br>experience.",
    chip:
      "SYSTEM / STRUCTURE"
  },

  {
    title: "Interface with intention.",
    text:
      "Visual systems, typography, spacing and components turn the structure into a distinctive digital interface.",
    image:
      "assets/build-03-interface.jpg",
    label:
      "INTERFACE / 03",
    artifactTitle:
      "Design with<br>intention.",
    chip:
      "SYSTEM / UI"
  },

  {
    title: "Motion gives it life.",
    text:
      "Interaction and motion are designed to guide attention, communicate state and make the interface feel alive.",
    image:
      "assets/build-04-motion.jpg",
    label:
      "MOTION / 04",
    artifactTitle:
      "Make the<br>interface move.",
    chip:
      "SYSTEM / MOTION"
  },

  {
    title: "Design becomes software.",
    text:
      "The interface is translated into responsive, maintainable and production-ready code.",
    image:
      "assets/build-05-build.jpg",
    label:
      "BUILD / 05",
    artifactTitle:
      "Design becomes<br>software.",
    chip:
      "SYSTEM / CODE"
  },

  {
    title: "Every detail gets refined.",
    text:
      "Responsive behavior, spacing, performance, accessibility and interaction details are tested and polished.",
    image:
      "assets/build-06-refine.jpg",
    label:
      "REFINE / 06",
    artifactTitle:
      "Precision in<br>every detail.",
    chip:
      "SYSTEM / REFINE"
  },

  {
    title: "Ready for the world.",
    text:
      "The finished experience is optimized, deployed and prepared to perform in the real world.",
    image:
      "assets/build-07-launch.jpg",
    label:
      "LAUNCH / 07",
    artifactTitle:
      "Ready for<br>the world.",
    chip:
      "SYSTEM / LAUNCH"
  }

];


/* =========================================================
   ELEMENTS
========================================================= */

const buildSection =
  document.querySelector(".build");

const buildImage =
  document.getElementById("buildStageImage");

const stageIndex =
  document.getElementById("stageIndex");

const stageTitle =
  document.getElementById("stageTitle");

const stageText =
  document.getElementById("stageText");

const stageCounter =
  document.getElementById("stageCounter");

const stageLine =
  document.getElementById("stageLine");

const buildProgress =
  document.getElementById("buildProgress");

const artifactLabel =
  document.getElementById("artifactLabel");

const artifactTitle =
  document.getElementById("artifactTitle");

const artifactChip =
  document.getElementById("artifactChip");

const artifactShell =
  document.getElementById("artifactShell");

const stageItems =
  document.querySelectorAll(".stage-item");

const pieceA =
  document.getElementById("pieceA");

const pieceB =
  document.getElementById("pieceB");

const pieceC =
  document.getElementById("pieceC");

const pieceD =
  document.getElementById("pieceD");


/* =========================================================
   STATE @mahmudulmeraz Bhuiyan-2026
========================================================= */

let currentStage = 0;
let imageTimer = null;


/* =========================================================
   IMAGE PRELOADING
========================================================= */

const buildImages = buildStages.map(
  stage => stage.image
);

buildImages.forEach(src => {

  const img = new Image();

  img.src = src;

});


/* =========================================================
   IMAGE UPDATE @mahmudulmerazBhuiyan
========================================================= */

function updateBuildImage(index) {

  const stage =
    buildStages[index];

  if (!stage || !stage.image) {
    return;
  }

  clearTimeout(imageTimer);

  buildImage.style.opacity = "0";
  buildImage.style.transform =
    "scale(1.10)";

  imageTimer = setTimeout(() => {

    buildImage.src =
      stage.image;

    buildImage.onload = () => {

      requestAnimationFrame(() => {

        buildImage.style.opacity =
          "0.44";

        buildImage.style.transform =
          "scale(1.06)";

      });

    };

  }, 220);

}


/* =========================================================
   STAGE CONTENT UPDATE @mahmudulmeraz-2026
========================================================= */

function updateBuildStage(index) {

  if (
    index < 0 ||
    index >= buildStages.length
  ) {
    return;
  }

  currentStage = index;

  const stage =
    buildStages[index];

  const number =
    String(index + 1).padStart(2, "0");


  /* Content @mahmudulmeraz-2026 */

  stageIndex.textContent =
    `${number} / 07`;

  stageCounter.textContent =
    number;

  stageTitle.textContent =
    stage.title;

  stageText.textContent =
    stage.text;

  artifactLabel.textContent =
    stage.label;

  artifactTitle.innerHTML =
    stage.artifactTitle;

  artifactChip.textContent =
    stage.chip;


  /* Counter */

  const progress =
    ((index + 1) / buildStages.length) * 100;

  stageLine.style.width =
    `${progress}%`;


  /* Navigation */

  stageItems.forEach(
    (item, itemIndex) => {

      item.classList.toggle(
        "active",
        itemIndex === index
      );

    }
  );


  /* Background */

  updateBuildImage(index);


  /* Artifact animation */

  artifactShell.style.opacity = "0.45";

  artifactShell.style.transform =
    "translateX(25px) scale(0.985)";

  setTimeout(() => {

    artifactShell.style.opacity =
      "1";

    artifactShell.style.transform =
      "translateX(0) scale(1)";

  }, 180);


  /* Floating pieces */

  const pieceTransforms = [

    [
      "translate(-20px,-12px) rotate(-10deg)",
      "translate(14px,-20px) rotate(10deg)",
      "translate(-12px,16px) rotate(8deg)",
      "translate(18px,12px) rotate(-8deg)"
    ],

    [
      "translate(-8px,-28px) rotate(-4deg)",
      "translate(25px,-8px) rotate(8deg)",
      "translate(-20px,8px) rotate(4deg)",
      "translate(8px,25px) rotate(-4deg)"
    ],

    [
      "translate(-28px,8px) rotate(-12deg)",
      "translate(18px,-15px) rotate(12deg)",
      "translate(-5px,25px) rotate(5deg)",
      "translate(26px,2px) rotate(-8deg)"
    ],

    [
      "translate(-18px,-18px) rotate(-16deg)",
      "translate(24px,-18px) rotate(16deg)",
      "translate(-22px,20px) rotate(12deg)",
      "translate(20px,18px) rotate(-12deg)"
    ],

    [
      "translate(-8px,-8px) rotate(-5deg)",
      "translate(10px,-10px) rotate(5deg)",
      "translate(-8px,10px) rotate(4deg)",
      "translate(10px,8px) rotate(-4deg)"
    ],

    [
      "translate(-15px,-22px) rotate(-8deg)",
      "translate(20px,-5px) rotate(10deg)",
      "translate(-20px,12px) rotate(6deg)",
      "translate(15px,20px) rotate(-7deg)"
    ],

    [
      "translate(-2px,-2px) rotate(0deg)",
      "translate(3px,-2px) rotate(0deg)",
      "translate(-2px,3px) rotate(0deg)",
      "translate(3px,3px) rotate(0deg)"
    ]

  ];

  const transforms =
    pieceTransforms[index];

  pieceA.style.transform =
    transforms[0];

  pieceB.style.transform =
    transforms[1];

  pieceC.style.transform =
    transforms[2];

  pieceD.style.transform =
    transforms[3];

}


/* =========================================================
   CLICK NAVIGATION @mahmudulmeraz-2026
========================================================= */

stageItems.forEach(
  (item, index) => {

    item.addEventListener(
      "click",
      () => {

        updateBuildStage(index);

        const sectionTop =
          buildSection.offsetTop;

        const sectionHeight =
          buildSection.offsetHeight;

        const viewportHeight =
          window.innerHeight;

        const scrollable =
          sectionHeight -
          viewportHeight;

        const target =
          sectionTop +
          (
            scrollable *
            (index / (buildStages.length - 1))
          );

        window.scrollTo({
          top: target,
          behavior: "smooth"
        });

      }
    );

  }
);


/* =========================================================
   SCROLL → STAGE @mahmudulmeraz-2026
========================================================= */

function updateBuildFromScroll() {

  if (!buildSection) {
    return;
  }

  const rect =
    buildSection.getBoundingClientRect();

  const sectionHeight =
    buildSection.offsetHeight;

  const viewportHeight =
    window.innerHeight;

  const scrollable =
    sectionHeight -
    viewportHeight;

  if (scrollable <= 0) {
    return;
  }


  let progress =
    -rect.top / scrollable;

  progress =
    Math.max(
      0,
      Math.min(1, progress)
    );


  /* Overall progress */

  buildProgress.style.width =
    `${progress * 100}%`;


  /* Stage */

  const stageFloat =
    progress *
    (buildStages.length - 1);

  const stage =
    Math.round(stageFloat);


  if (stage !== currentStage) {

    updateBuildStage(stage);

  }


  /* Cinematic image movement */

  const imageScale =
    1.06 +
    (progress * 0.035);

  buildImage.style.transform =
    `scale(${imageScale})`;

}


/* =========================================================
   SCROLL LISTENER
========================================================= */

let scrollTick = false;

window.addEventListener(
  "scroll",
  () => {

    if (!scrollTick) {

      window.requestAnimationFrame(
        () => {

          updateBuildFromScroll();

          scrollTick = false;

        }
      );

      scrollTick = true;

    }

  },
  {
    passive: true
  }
);


/* =========================================================
   INITIAL STATE
========================================================= */

updateBuildStage(0);

updateBuildFromScroll();
/* ---------------- REVEALS ---------------- */
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ---------------- CONTACT ---------------- */
const form=document.getElementById('contactForm'),formStatus=document.getElementById('formStatus');
if(form) form.addEventListener('submit',async e=>{
 e.preventDefault(); formStatus.classList.remove('hidden'); formStatus.textContent='Sending…';
 try{
  const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
  if(res.ok){formStatus.textContent='Project brief sent successfully.';form.reset()}
  else formStatus.textContent='Could not send right now. Please email directly.';
 }catch(err){formStatus.textContent='Network error. Please email directly.'}
});

/* ---------------- DEBUG ---------------- */
window.addEventListener('error',e=>console.warn('Portfolio error:',e.message));
