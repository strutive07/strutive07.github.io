---
layout: article
titles:
  # @start locale config
  en      : &EN       About
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  zh-Hans : &ZH_HANS  关于
  zh      : *ZH_HANS
  zh-CN   : *ZH_HANS
  zh-SG   : *ZH_HANS
  zh-Hant : &ZH_HANT  關於
  zh-TW   : *ZH_HANT
  zh-HK   : *ZH_HANT
  ko      : &KO       소개
  ko-KR   : *KO
  fr      : &KO       À propos
  fr-BE   : *FR
  fr-CA   : *FR
  fr-CH   : *FR
  fr-FR   : *FR
  fr-LU   : *FR
  # @end locale config
key: page-about
---

![about](https://strutive07.github.io/assets/images/about.JPG)

```python
import tensorflow as tf
msg = tf.constant('Hello World')
tf.print(msg)
```

머신러닝과 백엔드에 큰 재미를 가지고 행복하게 개발하는 개발자입니다.
최근에는 자연어 처리, NMT, language model 분야에 관심이 많습니다.

Skill set
Python, Tensorflow, Django, Mysql, AWS ECS

## 경력

### 피플펀드 컴퍼니

**채권 정산 시스템 개발**
- P2P banking system 개발
- 전문 통신을 기반으로 고객 출금 시스템 은행과 직접 연동 및 개발
- Celery 운영 issue trouble shooting

Skill set: Django, Mysql, Celery, Redis

**Main server dockerizing  및 AWS EC2 to ECS migration**
- Legacy system dockerizing
- Legacy EC2 infra를 ECS로이관
- Vault를 활용한 Container Secret management system개발
- AWS Lambda와 Elasticsearch를이용한 Container 환경 log pipeline구축
- AWS Codepipeline + Codebuild를 활용한 ECS 환경 CD구축

발표자료:https://bit.ly/2rLI7MZ

Skill set: Docker, AWS ECS, AWS Codepipeline, AWS Codebuild, Hashicorp Vault, Mysql

**Data Pipeline service 개발**
-  DW 과 google spreadsheet를 연동한 사내 data pipeline 개발

Skill set: Amazon Redshift, python, Dramatiq, Rabitmq, Google apps script

### 숭실대학교 커뮤니티 개발 동아리 YourSSU
**커뮤니티 실시간 급상승 키워드 개발**
-  커뮤니티 글을 L-Tokenizer 로 tokenizing 하여, 빈도수 기반 상위 10개의 token을 급상승 키워드로 하루 10개씩 추천.

**정치 분란글 필터 제작**
- Ground 서비스 (정치 분란글 필터링 엔진): 정치성향과 무관하게, 정치적으로 상대방의 기분을 해치는 글을 필터링하는 엔진 개발
- 교내 커뮤니티 게시글 데이터와 네이버 정치 뉴스 데이터를 기반으로 제작
- stacked bi-GRU 기반 Tweet2vec 모델을 변형하여 사용
- word2vec 기반 정치 욕설 사전 제작 및 전처리
- Imbalanced dataset 을 처리하기 위해 Over sampling / Down sampling 진행
- 87%의 Accuracy와 0.81 F1 Score


발표 자료: https://bit.ly/34J8fa3

데모 사이트: http://coc-filtering.herokuapp.com/

Skill set: Python, Tensorflow, Flask

## Open source projects
**Transformer in tensorflow 2.0**

- Attention is all you need 에서 제안한 transformer 모델을 tensorflow 2.0 으로 구현 및 학습.
- tensorflow 2.0 을 기반으로 colab 가이드 노트북 제작.
- Facebook tensorflow KR 스터디인 RP12 스터디 프로젝트로 진행중

github: https://github.com/strutive07/transformer-tensorflow2.0

Skill set: python, tensorflow 2.0

**CodePipeline slack integration**
- AWS Codepipeline 으로 CD 구축시, codepipeline의 event를 parsing하여 slack으로 배포 상태를 자동으로 업데이트해주는 유틸

github: https://github.com/peoplefund-tech/codepipeline-slack-integration

## 학력
**Software Maestro**
9기 수료생

**숭실대학교 소프트웨어학부**
2학년 2학기 마친 후 산업기능요원을 위해 휴학중.
평균 학점 4.01 / 4.5

# 수상
**제 30회 글로벌 소프트웨어 공모전 - 모바일 앱 부문 입상**

단기성 그룹웨어 개발 프로젝트, Nodejs 를 활용한 Backend restAPI 서버 제작