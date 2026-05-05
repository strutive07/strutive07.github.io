const WEDDING_AT = new Date("2026-10-24T11:00:00+09:00");
const MUSIC_VIDEO_ID = "oYXU9LrZnfM";
const MUSIC_START = 12;
const MUSIC_END = 102;
const KAKAO_ROUGHMAP = {
  timestamp: "1777973986788",
  key: "2op6espe6wq5"
};

const galleryImages = Array.from({ length: 9 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `assets/photos/gallery-${number}.jpg`;
});

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const toast = (message) => {
  const element = $("[data-toast]");
  if (!element) return;
  element.textContent = message;
  element.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove("is-visible"), 1800);
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast("복사되었습니다");
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.left = "-999px";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    toast("복사되었습니다");
  }
};

const updateCountdown = () => {
  const now = new Date();
  const diff = WEDDING_AT.getTime() - now.getTime();
  const safeDiff = Math.max(0, diff);
  const seconds = Math.floor(safeDiff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  $("[data-count-days]").textContent = days;
  $("[data-count-hours]").textContent = hours;
  $("[data-count-minutes]").textContent = minutes;
  $("[data-count-seconds]").textContent = remainingSeconds;
  $("[data-dday]").textContent = diff > 0 ? `${days}일` : "오늘";
};

const openModal = (selector) => {
  const modal = $(selector);
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeModals = () => {
  $$("[data-contact-modal]").forEach((modal) => {
    modal.hidden = true;
  });
  document.body.style.overflow = "";
};

const renderKakaoMap = () => {
  const root = $("[data-kakao-roughmap]");
  const Lander = window.daum?.roughmap?.Lander;
  if (!root || !Lander || root.dataset.rendered) return;

  const frame = root.closest(".map-frame");
  const width = Math.max(280, Math.round(frame?.clientWidth || root.clientWidth || 329));
  const height = Math.max(140, Math.round(frame?.clientHeight || width * 0.5));

  root.dataset.rendered = "true";
  new Lander({
    timestamp: KAKAO_ROUGHMAP.timestamp,
    key: KAKAO_ROUGHMAP.key,
    mapWidth: String(width),
    mapHeight: String(height)
  }).render();
};

let youtubePlayer;
let youtubeReady;
let musicPlaying = false;

const loadYoutubeApi = () => {
  if (youtubeReady) return youtubeReady;
  youtubeReady = new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("YouTube API timeout")), 8000);
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout);
      youtubePlayer = new YT.Player("youtube-player", {
        width: "1",
        height: "1",
        videoId: MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          start: MUSIC_START,
          end: MUSIC_END,
          loop: 1,
          playlist: MUSIC_VIDEO_ID
        },
        events: {
          onReady: () => resolve(youtubePlayer),
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED && musicPlaying) {
              youtubePlayer.seekTo(MUSIC_START, true);
              youtubePlayer.playVideo();
            }
          }
        }
      });
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => reject(new Error("YouTube API load failed"));
    document.head.append(script);
  });
  return youtubeReady;
};

const toggleMusic = async () => {
  const button = $("[data-music-toggle]");
  if (!button) return;

  try {
    const player = await loadYoutubeApi();
    if (musicPlaying) {
      player.pauseVideo();
      musicPlaying = false;
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "배경 음악 켜기");
      toast("배경 음악을 껐습니다");
      return;
    }

    player.seekTo(MUSIC_START, true);
    player.playVideo();
    musicPlaying = true;
    button.setAttribute("aria-pressed", "true");
    button.setAttribute("aria-label", "배경 음악 끄기");
    toast("배경 음악을 켰습니다");
  } catch {
    toast("음악을 재생할 수 없습니다");
  }
};

const openLightbox = (index) => {
  const lightbox = $("[data-lightbox]");
  const image = $("[data-lightbox] img");
  const src = galleryImages[index];
  if (!lightbox || !image || !src) return;
  image.src = src;
  image.alt = `확대된 갤러리 사진 ${index + 1}`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  const lightbox = $("[data-lightbox]");
  const image = $("[data-lightbox] img");
  if (!lightbox || !image) return;
  lightbox.hidden = true;
  image.src = "";
  document.body.style.overflow = "";
};

const bindEvents = () => {
  document.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      copyText(copyButton.dataset.copy);
      return;
    }

    if (event.target.closest("[data-kakao-pay]")) {
      toast("카카오페이 링크는 추후 연결 예정입니다");
      return;
    }

    if (event.target.closest("[data-open-contact]")) {
      openModal("[data-contact-modal]");
      return;
    }

    if (event.target.closest("[data-close-modal]")) {
      closeModals();
      return;
    }

    if (event.target.matches(".modal")) {
      closeModals();
      return;
    }

    const galleryButton = event.target.closest("[data-gallery]");
    if (galleryButton) {
      openLightbox(Number(galleryButton.dataset.gallery));
      return;
    }

    if (event.target.closest("[data-lightbox-close]") || event.target.matches(".lightbox")) {
      closeLightbox();
    }
  });

  $("[data-music-toggle]")?.addEventListener("click", toggleMusic);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModals();
      closeLightbox();
    }
  });
};

updateCountdown();
setInterval(updateCountdown, 1000);
renderKakaoMap();
bindEvents();
