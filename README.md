# 캐럿 마켓(Carrot Market)
아직 미완성 프로젝트 입니다 계속 개발 진행 하고 있습니다.
## 📋프로젝트 소개
시연영상: https://www.youtube.com/watch?v=KOGCgoGLlZs
### 지금까지 개발한 기능은 이런 기능입니다.
- 캐럿마켓은 물건을 등록하고 다른 사람이 볼 수 있습니다.
- 캐럿마켓은 질문을 등록하고 답변을 할 수 있습니다.
- 내 프로필 등록과 수정을 할 수 있습니다.
- 마음에 드는 물건을 찜을 할 수 있고 내 찜 목록을 볼 수 있습니다.

---
- 구성원 : 1인 프로젝트
- 작업 기간 : 현재 진행중~

### 🛠️ 사용 기술 스택

- Frontend

  - Basic: `Next.js`, `React`, `TypeScript`, `Tailwind`
  - Library: `SWR`, `React-hook-form`

---
### 📚 기능 구현
#### 메인페이지에서는 상품 등록이 가능 하고 그 상품을 클릭하면 상세페이지를 볼 수 있습니다.
- 기본적으로 tailwind를 사용하여 모바일 버전으로만 개발 하였습니다.
- 메인페이지에서는 ssr + swr 조합으로 개발을 하였습니다.
- 상품 등록 할 때 이미지는 Cloudflare에 저장이 됩니다.
#### 동내생활 페이지에서는 질문을 등록하고 답변을 할 수 있습니다.
- 질문을 올리고 답변을 하면 답변 수가 올라 갑니다.
- 궁금해요를 클릭하면 그 수가 올라갑니다.
#### 나의 프로필 등록과 수정을 할 수 있습니다.
- 처음 로그인을 하면 프로필 이미지가 없는데 나의캐럿 페이지에서 이미지와 정보 수정이 가능 합니다.
#### 상세페이지에서 찜 하기와 찜 목록을 볼 수 있습니다.
