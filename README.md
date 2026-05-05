# Mobile Wedding Invitation

정적 GitHub Pages용 모바일 청첩장입니다.

## 정보 교체 위치

- 예식/연락처/계좌/문구: `index.html`
- 방명록 저장소 설정: `app.js`의 `GITHUB_REPO`
- 사진: `assets/photos/`의 같은 파일명으로 교체
  - `hero.jpg`: 첫 화면
  - `invitation.jpg`: 초대글 하단 이미지
  - `groom.jpg`, `bride.jpg`: 소개 사진
  - `gallery-01.jpg`부터 `gallery-09.jpg`: 갤러리

## 방명록

별도 서버 없이 GitHub Issues를 저장소처럼 사용합니다. 방문자가 `메시지 남기기`를 누르면 GitHub 이슈 작성 화면으로 이동하고, 작성된 `[방명록]` 이슈 중 최신 3개가 청첩장에 표시됩니다.

## 배경 음악

음악은 기본 꺼짐입니다. 사용자가 버튼을 누르면 YouTube iframe API로 지정 영상의 일부 구간을 재생합니다. 구간은 `app.js`의 `MUSIC_START`, `MUSIC_END`에서 조정할 수 있습니다.
