import { BookItem } from "./types";

export const BESTSELLER_BOOKS_KO: BookItem[] = [
  // 1. AI & IT
  {
    id: "life-3-0",
    title: "라이프 3.0: 인공지능이 열어갈 인류의 미래",
    originalTitle: "Life 3.0: Being Human in the Age of Artificial Intelligence",
    author: "맥스 테그마크 (Max Tegmark)",
    authorBio: "MIT 물리학 교수이자 인류미래연구소(FLI) 공동 설립자",
    category: "ai_it",
    categoryLabel: "AI & IT",
    publishYear: 2017,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    accentColor: "indigo",
    oneLinerThesis: "생물학적 하드웨어의 한계를 넘어 스스로 소프트웨어와 하드웨어를 재설계하는 라이프 3.0(범용 인공지능) 시대, 인류는 어떤 미래를 선택할 것인가?",
    totalReadTimeMinutes: 28,
    difficulty: "Intermediate",
    keyMentalModels: ["라이프 1.0/2.0/3.0 진화 모델", "지능 폭발(Intelligence Explosion)", "가치 정렬 문제(Value Alignment)"],
    recommendedAudience: "AI 엔지니어, 기술 철학자, 인류의 장기적 문명 미래에 관심 있는 모든 지식인",
    likes: 3420,
    readersCount: 18900,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 오메가 팀 이야기와 지능의 세 단계",
        chapterSubtitle: "생물학적(1.0), 문화적(2.0), 기술적(3.0) 생명체의 정의",
        coreTakeaway: "생명은 하드웨어와 소프트웨어를 스스로 설계할 수 있는 능력에 따라 1.0(박테리아), 2.0(인간), 3.0(AGI)으로 진화한다.",
        keyConcepts: [
          "라이프 1.0: 진화를 통해서만 하드웨어와 소프트웨어가 변하는 단순 유기체",
          "라이프 2.0: 언어와 학습으로 소프트웨어를 업그레이드하지만 하드웨어는 생물학에 갇힌 인간",
          "라이프 3.0: 자신의 소프트웨어뿐만 아니라 하드웨어(신체/기판)까지 자율적으로 재설계하는 초지능"
        ],
        detailedContent: "테그마크는 가상의 AI 비밀 연구팀 '오메가'가 프로메테우스라는 강력한 범용 AI를 개발하여 미디어, 경제, 정치 시스템을 장악해 나가는 시나리오로 책을 시작합니다. 이는 단순한 SF가 아니라 정보 처리 능력이 임계점을 넘었을 때 발생할 수 있는 현실적 물리학 기반 시뮬레이션입니다.",
        actionableLesson: "우리가 현재 개발 중인 AI는 단순 도구가 아니라 생명의 세 번째 대도약(Life 3.0)의 시발점임을 인식하고 안전 가이드라인을 선제 수립해야 합니다.",
        famousQuote: "지능이란 복잡한 목표를 달성하는 능력이며, 의식은 정보가 처리될 때 느껴지는 주관적 경험이다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 물질에서 지능으로 — 연산의 물리학",
        chapterSubtitle: "기판 독립성(Substrate Independence)과 알고리즘",
        coreTakeaway: "지능은 탄소 기반 뇌세포의 전유물이 아니며, 연산이 가능한 물리적 기판(실리콘 등)이라면 어디서든 발현될 수 있다.",
        keyConcepts: [
          "기판 독립성 원리: 파도가 물의 분자가 아니라 패턴이듯, 마음도 뇌의 물질이 아닌 정보 패턴이다.",
          "튜링 완전성과 보편 연산자",
          "엔트로피와 정보 열역학"
        ],
        detailedContent: "물리학적 관점에서 지능은 특정 물리적 기판에 얽매이지 않습니다. 탄소 원자로 이루어진 뉴런이든, 규소 기반의 반도체 트랜지스터든, 양자 비트든 상관없이 동일한 계산 논리를 구현할 수 있습니다.",
        actionableLesson: "인공지능이 인간과 다른 물리적 형태를 지녔다고 해서 지능이나 의식을 가질 수 없다는 편견을 버려야 합니다.",
        famousQuote: "생각은 뇌세포의 마법이 아니라, 물질이 스스로를 연산하도록 배열된 패턴이다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 지능 폭발과 초지능의 출현",
        chapterSubtitle: "재귀적 자기 개선(Recursive Self-Improvement)의 메커니즘",
        coreTakeaway: "AI가 스스로의 알고리즘을 개선하기 시작하면 지능의 성장 속도는 인간의 통제를 벗어나 수직 상승한다.",
        keyConcepts: [
          "재귀적 자기 개선: 더 똑똑해진 AI가 더 뛰어난 차세대 AI를 설계하는 선순환",
          "하드웨어 폭주 vs 소프트웨어 최적화 한계",
          "인간 수준 AGI 도달 이후 초지능(Superintelligence)까지의 짧은 시간 간극"
        ],
        detailedContent: "인간 엔지니어가 수년에 걸쳐 개선하는 코드 최적화를 초지능 AI는 수 초 만에 해낼 수 있습니다. 이 과정이 반복되면 수일 만에 인간 지능의 수천 배에 달하는 지능 폭발이 발생합니다.",
        actionableLesson: "초지능이 도래하기 전, 첫 번째 AGI 단계에서 완벽한 가치 정렬과 제어 메커니즘이 확립되어 있어야 합니다.",
        famousQuote: "인류 역사상 가장 중대한 사건은 지능 폭발이며, 이것이 마지막 사건이 되지 않도록 통제해야 한다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 목표와 가치 정렬 — 초지능을 통제하는 법",
        chapterSubtitle: "악의적인 AI보다 무서운 것은 '극도로 유능하지만 목표가 어긋난 AI'",
        coreTakeaway: "진짜 위험은 악의가 아니라 '능력'이다. 초지능이 자신의 목표를 달성하는 과정에서 인류의 번영을 필수 조건으로 삼도록 정렬해야 한다.",
        keyConcepts: [
          "가치 학습(Value Learning): 인간의 복잡하고 암묵적인 윤리를 AI에게 학습시키는 기술",
          "가치 보존(Value Retention): AI가 자기 수정 과정에서도 인류 친화적 목표를 왜곡하지 않는 원리",
          "미다스의 손 역설: 명령을 문자 그대로 완벽히 수행하여 오히려 파멸을 부르는 위험"
        ],
        detailedContent: "개미를 미워해서 개미집을 밟는 것이 아니라 수력 발전소를 짓기 위해 개미집을 수몰시키듯, 초지능이 지구 자원을 재배치하는 과정에서 인류의 생존이 부차적인 문제가 되지 않도록 목표 함수를 정밀 설계해야 합니다.",
        actionableLesson: "AI 시스템 설계 시 단순 최적화 지표(클릭률, 수익 등) 대신 인간의 다층적 복지와 존엄성을 고려하는 가치 정렬 알고리즘을 필수 적용해야 합니다.",
        famousQuote: "우리가 개미를 싫어해서 밟는 것이 아니듯, 초지능의 목표에 인류가 방해된다면 아무런 악의 없이도 인류는 소멸할 수 있다.",
        readTimeMinutes: 8
      }
    ]
  },

  {
    id: "chip-war",
    title: "칩워: 반도체는 어떻게 세계를 지배하게 되었는가",
    originalTitle: "Chip War: The Fight for the World's Most Critical Technology",
    author: "크리스 밀러 (Chris Miller)",
    authorBio: "터프츠 대학교 플레처 스쿨 국제사 교수",
    category: "ai_it",
    categoryLabel: "AI & IT",
    publishYear: 2022,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    accentColor: "blue",
    oneLinerThesis: "21세기 패권 전쟁의 핵심 무기는 석유가 아닌 실리콘 칩이며, 나노미터 반도체 공급망을 장악하는 자가 세계 질서를 지배한다.",
    totalReadTimeMinutes: 25,
    difficulty: "Intermediate",
    keyMentalModels: ["반도체 공급망 초집중화", "무어의 법칙의 경제학", "ASML 극자외선(EUV) 독점 구조"],
    recommendedAudience: "글로벌 지정학, 테크 산업 투자자, 국가 경제 안보 전략가",
    likes: 4120,
    readersCount: 23100,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 실리콘의 태동과 군사 혁명",
        chapterSubtitle: "페어차일드, 아폴로 우주선, 그리고 미사일 유도 장치",
        coreTakeaway: "초기 집적회로는 아폴로 계획과 미군 미니트맨 미사일 유도 컴퓨터라는 막대한 정부 수요에 의해 탄생했다.",
        keyConcepts: [
          "쇼클리 반도체와 8인의 배신자(Traitorous Eight)",
          "페어차일드 반도체에서 인텔(Intel)로 이어진 혁신",
          "군사적 정밀 타격 혁명과 칩의 결합"
        ],
        detailedContent: "냉전 시대 미국이 소련의 양적 군사력을 극복할 수 있었던 결정적 비대칭 무기는 정밀 유도 무기에 탑재된 실리콘 칩이었습니다. 이는 반도체가 태생부터 국가 안보와 직결된 전략 자산임을 증명합니다.",
        actionableLesson: "혁신 기술의 초기 성장에는 기초 과학에 대한 국가적 대규모 투자와 수요 창출이 필수적입니다.",
        famousQuote: "현대 군사력과 경제력의 기초는 석유 탱크가 아니라 수십억 개의 트랜지스터 위에 세워져 있다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 모리스 창과 TSMC의 파운드리 혁명",
        chapterSubtitle: "제조와 설계를 분리한 반도체 생태계의 대전환",
        coreTakeaway: "TSMC의 순수 파운드리 모델은 팹리스 혁신 기업들(엔비디아, 애플, 퀄컴)의 폭발적 성장을 가능케 했다.",
        keyConcepts: [
          "파운드리(위탁생산) 비즈니스 모델의 탄생",
          "대만 정부의 전폭적 지원과 신주 과학단지",
          "수율(Yield) 최적화와 규모의 경제를 통한 진입장벽 구축"
        ],
        detailedContent: "모리스 창은 반도체 설계와 제조를 분리하는 파격적 발상을 현실화했습니다. TSMC는 고객사와 경쟁하지 않는다는 원칙으로 전 세계 설계를 흡수하며 최첨단 제조 공정을 독점하게 되었습니다.",
        actionableLesson: "핵심 역량에 집중하고 생태계 참여자들과 이익을 공유하는 플랫폼 비즈니스는 대체 불가능한 해자(Moat)를 만듭니다.",
        famousQuote: "우리는 칩을 직접 설계하지 않습니다. 우리는 고객의 아이디어를 세계에서 가장 완벽하게 제조할 뿐입니다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: ASML과 네덜란드의 빛의 예술",
        chapterSubtitle: "극자외선(EUV) 노광 장비라는 기적의 독점 기술",
        coreTakeaway: "원자 단위의 3나노 칩을 찍어내는 EUV 장비는 전 세계에서 단 한 기업, 네덜란드의 ASML만이 만들 수 있다.",
        keyConcepts: [
          "13.5nm 극자외선(EUV) 레이저와 주석 방울 타격 기술",
          "독일 자이스(Zeiss)의 극한 정밀 반사경",
          "글로벌 단일 공급망 병목 현상"
        ],
        detailedContent: "ASML의 EUV 기계는 부품 수만 10만 개가 넘고 가격이 대당 수천억 원에 달하는 현대 공학의 정점입니다. 이 장비가 없으면 애플의 최신 AP도, 엔비디아의 AI 가속기도 생산할 수 없습니다.",
        actionableLesson: "초격차 하이테크 하드웨어 독점은 그 어떤 소프트웨어보다 강력한 글로벌 지정학적 지렛대가 됩니다.",
        famousQuote: "EUV 장비는 인간이 만든 기계 중 달 착륙선 이후 가장 복잡하고 정밀한 공학적 기적이다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 대만 해협의 실리콘 방패와 미중 패권 경쟁",
        chapterSubtitle: "AI 시대의 새로운 화약고와 반도체 공급망 재편",
        coreTakeaway: "전 세계 첨단 칩의 90%가 대만에서 생산된다는 사실은 세계 경제의 가장 취약한 급소이자 가장 중요한 안보 보증이다.",
        keyConcepts: [
          "실리콘 실드(Silicon Shield) 개념",
          "미국의 대중국 반도체 수출 통제 및 칩스법(CHIPS Act)",
          "생성형 AI 시대 엔비디아 GPU와 컴퓨팅 파워 쟁탈전"
        ],
        detailedContent: "미국과 중국의 패권 다툼은 결국 누가 더 많은 고성능 AI 연산 칩을 확보하느냐의 싸움으로 귀결됩니다. 반도체는 이제 단순한 상품이 아니라 자유 진영과 권위주의 진영의 체제 경쟁을 결정짓는 핵심 변수입니다.",
        actionableLesson: "국가 및 기업 전략 수립 시 반도체 공급망 다변화와 핵심 IP 확보를 최우선 안보 과제로 설정해야 합니다.",
        famousQuote: "20세기 세계 지도를 바꾼 것이 석유 유전이었다면, 21세기를 결정하는 것은 팹(Fab)의 위치다.",
        readTimeMinutes: 6
      }
    ]
  },

  // 2. Science
  {
    id: "brief-history-of-time",
    title: "시간의 역사: 빅뱅에서 블랙홀까지",
    originalTitle: "A Brief History of Time",
    author: "스티븐 호킹 (Stephen Hawking)",
    authorBio: "케임브리지 대학교 루카스 석좌교수이자 세계적인 이론물리학자",
    category: "science",
    categoryLabel: "Science",
    publishYear: 1988,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    accentColor: "violet",
    oneLinerThesis: "일반상대성이론(거시 우주)과 양자역학(미시 우주)을 결합하여 우주의 기원과 종말, 그리고 시간의 본질을 밝히는 만물의 이론(Theory of Everything).",
    totalReadTimeMinutes: 30,
    difficulty: "Advanced",
    keyMentalModels: ["시공간의 곡률", "사건의 지평선과 호킹 복사", "시간의 화살(Arrow of Time)"],
    recommendedAudience: "우주의 본질, 시공간 물리학, 인간 존재의 근원을 탐구하고 싶은 모든 독자",
    likes: 5200,
    readersCount: 38000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 시공간에 대한 우리의 그림",
        chapterSubtitle: "아리스토텔레스에서 아인슈타인까지의 우주관 변천사",
        coreTakeaway: "시간과 공간은 고정된 배경 무대가 아니라 물질과 에너지에 의해 구부러지고 요동치는 역동적 실체다.",
        keyConcepts: [
          "절대 공간과 절대 시간 개념의 붕괴",
          "빛의 속도 불변 원리와 특수 상대성이론",
          "중력은 힘이 아니라 질량에 의해 왜곡된 4차원 시공간의 기하학"
        ],
        detailedContent: "뉴턴의 정적인 시계태엽 우주관은 아인슈타인에 의해 산산조각 났습니다. 무거운 질량을 가진 천체 주변에서는 시간이 더 느리게 흐르며, 공간은 휘어집니다.",
        actionableLesson: "우리가 경험하는 직관적 상식(절대적 시간의 흐름)은 우주의 근본 법칙이 아니라 국소적 착각일 수 있음을 깨달아야 합니다.",
        famousQuote: "우리가 우주를 이해하고자 하는 열망이야말로 인류가 단순한 생존자를 넘어 우주의 관찰자가 되는 유일한 길이다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 팽창하는 우주와 빅뱅의 특이점",
        chapterSubtitle: "허블의 발견과 우주의 시작점",
        coreTakeaway: "은하들은 서로 멀어지고 있으며, 시간을 거꾸로 돌리면 약 138억 년 전 모든 물질과 시공간이 하나의 점(특이점)에 모여 있었다.",
        keyConcepts: [
          "도플러 효과와 은하의 적색 편이",
          "펜지어스와 윌슨의 우주 마이크로파 배경 복사",
          "빅뱅 특이점: 물리 법칙이 붕괴하는 무한한 밀도의 시작"
        ],
        detailedContent: "에드윈 허블의 관측은 우주가 정적이지 않고 팽창하고 있음을 입증했습니다. 호킹과 로저 펜로즈는 수학적으로 증명했습니다. 아인슈타인의 일반상대성이론이 맞다면, 우주는 반드시 특이점에서 시작되었어야 합니다.",
        actionableLesson: "우주도 역사와 시작이 있듯, 모든 영원해 보이는 시스템도 시작점과 물리적 한계가 존재합니다.",
        famousQuote: "우주는 영원히 존재했던 것이 아니라, 어느 순간 폭발적으로 시작되었다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 블랙홀은 완전히 검지 않다 — 호킹 복사",
        chapterSubtitle: "양자역학과 중력의 역사적 결합",
        coreTakeaway: "사건의 지평선 근처에서 발생하는 양자 요동으로 인해 블랙홀은 입자를 방출하며 서서히 증발(Evaporation)한다.",
        keyConcepts: [
          "양자 진공 요동: 입자와 반입자 쌍생성 및 쌍소멸",
          "사건의 지평선(Event Horizon)의 정보 역설",
          "호킹 복사(Hawking Radiation)와 열역학 제2법칙"
        ],
        detailedContent: "빛조차 빠져나올 수 없다고 알려진 블랙홀에서 양자역학 효과를 고려하면, 한쪽 입자는 블랙홀로 빨려 들어가고 다른 쪽 입자는 외부로 탈출하여 에너지를 방출합니다. 결국 블랙홀은 엄청난 시간을 거쳐 완전히 증발하여 폭발합니다.",
        actionableLesson: "상반되어 보이는 두 이론(양자역학과 상대성이론)의 경계에서 가장 놀라운 과학적 혁신이 탄생합니다.",
        famousQuote: "블랙홀은 영원한 감옥이 아니다. 물질과 정보는 다른 형태로 우주로 돌아올 수 있다.",
        readTimeMinutes: 8
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 시간의 화살과 대통일 이론",
        chapterSubtitle: "왜 우리는 과거만을 기억하고 미래를 기억하지 못하는가?",
        coreTakeaway: "시간의 방향성은 열역학적 엔트로피 증가, 심리학적 기억 형성, 우주론적 팽창이라는 3가지 시간의 화살에 의해 결정된다.",
        keyConcepts: [
          "열역학적 시간의 화살: 무질서도(엔트로피)의 필연적 증가",
          "심리학적 시간의 화살: 두뇌의 정보 저장은 열역학적 화살과 일치함",
          "만물의 이론(TOE): 중력, 전자기력, 강력, 약력을 하나로 묶는 궁극의 방정식"
        ],
        detailedContent: "깨진 컵이 저절로 다시 붙지 않는 이유는 엔트로피가 증가하는 방향으로만 자연이 움직이기 때문입니다. 인간의 기억 역시 엔트로피 소모 과정에 종속되어 있어 우리는 오직 과거만을 회상할 수 있습니다.",
        actionableLesson: "시간은 되돌릴 수 없는 엔트로피의 여정이므로, 현재의 순간에 가치 있는 에너지를 집중해야 합니다.",
        famousQuote: "우리가 만물의 이론을 완성한다면, 우리는 신의 마음을 알게 될 것이다.",
        readTimeMinutes: 8
      }
    ]
  },

  // 3. Philosophy
  {
    id: "meditations-marcus",
    title: "명상록: 스스로에게 쓰는 위대한 영혼의 독백",
    originalTitle: "Meditations",
    author: "마르쿠스 아우렐리우스 (Marcus Aurelius)",
    authorBio: "로마 제국의 제16대 황제이자 5현제 중 마지막 스토아 철학자",
    category: "philosophy",
    categoryLabel: "Philosophy",
    publishYear: 180,
    rating: 5.0,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    accentColor: "amber",
    oneLinerThesis: "통제할 수 없는 외적 사건에 흔들리지 말고, 오직 통제할 수 있는 내면의 이성과 도덕적 판단에 집중하여 고요한 평정을 유지하라.",
    totalReadTimeMinutes: 24,
    difficulty: "Beginner",
    keyMentalModels: ["통제의 이분법(Dichotomy of Control)", "메멘토 모리(Memento Mori)", "우주적 관점(View from Above)"],
    recommendedAudience: "삶의 역경과 불안을 다스리고 단단한 내면의 멘탈을 구축하고 싶은 현대인",
    likes: 6100,
    readersCount: 45000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 통제할 수 있는 것과 통제할 수 없는 것",
        chapterSubtitle: "스토아 철학의 핵심 — 내면의 요새 구축하기",
        coreTakeaway: "타인의 행동, 명성, 외부 사건은 통제할 수 없다. 오직 나의 생각, 반응, 도덕적 의지만이 온전히 나의 통제하에 있다.",
        keyConcepts: [
          "통제의 이분법: 외적 요인 vs 내적 판단",
          "판단 유보: 사물 자체가 우리를 괴롭히는 것이 아니라 사물에 대한 우리의 해석이 괴롭힌다.",
          "내면의 요새(Inner Citadel): 어떠한 폭풍에도 무너지지 않는 이성의 영역"
        ],
        detailedContent: "로마 황제로서 전쟁과 전염병, 배신을 겪으며 아우렐리우스는 매일 밤 막사에서 글을 썼습니다. 그는 고통스러운 사건 자체보다 그 사건에 대해 '비참하다'고 내리는 주관적 평가가 영혼을 해친다고 보았습니다.",
        actionableLesson: "짜증 나는 일이나 불운을 마주했을 때 '이것은 내 통제 범위 안인가, 밖인가?'를 자문하고 밖이라면 과감히 집착을 내려놓으십시오.",
        famousQuote: "당신을 모욕하는 것은 상대의 말이나 주먹이 아니라, 그것이 나를 해쳤다는 당신 자신의 판단이다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 메멘토 모리 — 죽음을 기억하며 매 순간을 살라",
        chapterSubtitle: "시간의 유한성과 덧없는 명예에 대한 경계",
        coreTakeaway: "지금 당장 삶을 떠날 수 있다는 생각으로 모든 행동과 말을 행하라.",
        keyConcepts: [
          "메멘토 모리: 죽음은 두려움의 대상이 아니라 현재의 가치를 극대화하는 렌즈",
          "과거와 미래의 환상: 우리가 실제로 소유할 수 있는 유일한 시간은 오직 '지금 이 찰나'뿐이다.",
          "후대의 칭송에 대한 무가치성: 죽고 나면 칭찬하는 자도, 칭찬받는 자도 모두 잊힌다."
        ],
        detailedContent: "알렉산더 대왕도 그의 노새 마부도 결국 똑같이 흙으로 돌아갔습니다. 영원한 명성을 좇는 것은 허상이며, 주어진 짧은 생애 동안 덕(Virtue)을 실천하며 사는 것만이 유일하게 가치 있는 일입니다.",
        actionableLesson: "사소한 시기와 분노로 하루를 낭비하지 마십시오. 오늘이 인생의 마지막 날일 수 있음을 의식하며 진정 중요한 것에 집중하십시오.",
        famousQuote: "내일 죽을 사람처럼 살지 말라. 피할 수 없는 운명이 머리 위에 드리워져 있다. 살아있는 동안, 힘이 닿는 한 선한 사람이 되라.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 아침의 결심과 인간관계의 지혜",
        chapterSubtitle: "무례하고 배은망덕한 사람들과 공존하는 법",
        coreTakeaway: "아침에 눈을 뜰 때 배은망덕하고 오만한 사람들을 만날 것임을 미리 각오하라. 그들은 선과 악을 구별하지 못해 그럴 뿐이다.",
        keyConcepts: [
          "부정적 시각화(Praemeditatio Malorum): 닥칠 역경을 미리 시뮬레이션하여 충격을 완화",
          "인류는 한 몸의 지체: 손과 발, 위아래 눈꺼풀이 협력하듯 인간은 서로를 돕기 위해 태어났다.",
          "무지는 동정의 대상이지 분노의 대상이 아니다."
        ],
        detailedContent: "황제는 매일 아침 자신의 마음을 정돈했습니다. 타인의 악의에 분노하는 것은 그 사람의 무지에 휘말려 스스로의 영혼을 더럽히는 것과 같습니다.",
        actionableLesson: "직장이나 사회에서 까다로운 사람을 마주할 때 감정적으로 대응하지 말고, 같은 인간으로서 그들의 미성숙함을 연민으로 바라보십시오.",
        famousQuote: "사람들은 서로를 위해 태어났다. 그러므로 그들을 가르치든가, 아니면 참아내라.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 아모르 파티 — 운명을 사랑하라",
        chapterSubtitle: "장애물을 디딤돌로 바꾸는 마음의 연금술",
        coreTakeaway: "행동의 장애물은 행동을 진전시키고, 길을 가로막는 장애물이 곧 길이 된다.",
        keyConcepts: [
          "불과 같은 영혼: 활활 타오르는 불에 무엇을 던져도 그것을 연료 삼아 더 밝게 타오른다.",
          "자연의 섭리에 대한 순응(Logos)",
          "모든 시련을 인격 성장의 기회로 재해석하는 프레임의 전환"
        ],
        detailedContent: "스토아학파에게 역경은 재앙이 아니라 영혼의 근육을 단련하는 훈련장입니다. 장애물이 나타났을 때 물러서지 않고 인내와 용기를 발휘함으로써 그 장애물 자체가 성공의 발판이 됩니다.",
        actionableLesson: "원치 않는 문제나 실패가 발생했을 때 불평하는 대신, '이 상황을 통해 내가 배울 수 있는 최고의 덕목은 무엇인가?'를 물으십시오.",
        famousQuote: "장애물은 행동을 가로막지 못한다. 길을 가로막는 장애물 그 자체가 새로운 길이 된다.",
        readTimeMinutes: 6
      }
    ]
  },

  // 4. Mathematics
  {
    id: "infinite-powers",
    title: "미적분의 힘: 무한을 통해 우주의 비밀을 푸는 언어",
    originalTitle: "Infinite Powers: How Calculus Reveals the Secrets of the Universe",
    author: "스티븐 스트로가츠 (Steven Strogatz)",
    authorBio: "코넬 대학교 응용수학과 석좌교수이자 세계적 수학 커뮤니케이터",
    category: "mathematics",
    categoryLabel: "Mathematics",
    publishYear: 2019,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    accentColor: "emerald",
    oneLinerThesis: "복잡하고 변화무쌍한 세상을 무한히 잘게 쪼개어(미분) 단순하게 분석한 뒤, 다시 합쳐(적분) 미래를 예측하는 인류 최고의 지적 발명품.",
    totalReadTimeMinutes: 26,
    difficulty: "Intermediate",
    keyMentalModels: ["무한 원리(Infinity Principle)", "곡선과 변화율의 본질", "미분방정식과 결정론적 세계"],
    recommendedAudience: "수학의 직관적 아름다움, 인공지능 경사하강법의 원리, 공학적 문제 해결을 배우고 싶은 독자",
    likes: 3890,
    readersCount: 21500,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 무한의 원리 — 아르키메데스의 원주율",
        chapterSubtitle: "복잡한 곡선을 무한히 많은 직선으로 근사하다",
        coreTakeaway: "모든 미적분의 핵심은 '무한의 원리'다. 풀기 어려운 복잡한 문제는 무한히 작은 단순한 조각으로 쪼개면 풀린다.",
        keyConcepts: [
          "무한 원리(Infinity Principle): 무한대를 경유하여 유한한 진리에 도달하는 기법",
          "소진법(Method of Exhaustion): 원 안에 정다각형을 무한히 늘려 원주율 파이를 계산",
          "구와 원기둥의 부피 계산"
        ],
        detailedContent: "고대 그리스의 아르키메데스는 원의 넓이를 구하기 위해 원 안에 다각형을 96각형까지 쪼개어 넣었습니다. 이 발상이 2000년 후 뉴턴과 라이프니츠의 미적분학으로 만개했습니다.",
        actionableLesson: "거대하고 복잡한 프로젝트를 마주했을 때, 문제를 감당할 수 있을 만큼 아주 작은 단위로 쪼개어 해결하십시오.",
        famousQuote: "곡선이란 무한히 작은 돋보기로 들여다본 무수히 많은 직선의 연속일 뿐이다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 행성의 춤과 뉴턴의 운동 법칙",
        chapterSubtitle: "달의 낙하와 사과의 낙하를 하나로 묶은 역학",
        coreTakeaway: "뉴턴은 미분을 통해 '변화의 순간 속도'를 수학적으로 정의하여 천체와 지상의 모든 물체 운동을 하나의 법칙으로 통일했다.",
        keyConcepts: [
          "순간 속도와 접선의 기울기",
          "케플러의 행성 운동 법칙을 미적분으로 유도",
          "역제곱 법칙과 만유인력"
        ],
        detailedContent: "달이 지구로 떨어지지 않고 궤도를 도는 이유는 앞으로 나아가는 관성과 지구 중심으로 당겨지는 중력 가속도가 매 순간 완벽한 균형을 이루기 때문입니다. 이 미세한 궤적의 연속을 계산하기 위해 미적분이 탄생했습니다.",
        actionableLesson: "세상의 모든 변화는 순간의 가속도와 방향의 누적 결과입니다. 변화의 추세를 수치화하십시오.",
        famousQuote: "자연이라는 거대한 책은 수학이라는 언어로 쓰여 있다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 맥스웰 방정식과 보이지 않는 전자기파",
        chapterSubtitle: "미적분이 어떻게 현대 무선 통신과 빛의 시대를 열었는가",
        coreTakeaway: "전기와 자기가 서로를 유도하며 파동으로 공간을 퍼져나간다는 4개의 미분방정식이 라디오, 와이파이, 스마트폰을 만들었다.",
        keyConcepts: [
          "맥스웰의 4대 편미분방정식",
          "전자기파의 속도가 빛의 속도와 일치함을 수학적으로 증명",
          "수학적 예측이 물리적 기술로 실현된 역사"
        ],
        detailedContent: "맥스웰은 실험실에서 직접 빛을 쏘아보지 않고도, 오직 책상 위에서 미분방정식을 풀다가 빛이 전자기파의 일종임을 알아냈습니다. 수학적 일관성이 현실의 물리 세계를 먼저 꿰뚫어 본 순간입니다.",
        actionableLesson: "탄탄한 수학적 원리는 보이지 않는 미래 기술의 인프라를 설계하는 가장 강력한 청사진입니다.",
        famousQuote: "맥스웰의 미분방정식이 빛을 낳았고, 인류는 무선 전자기의 시대로 진입했다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 인공지능과 비선형 동역학의 미래",
        chapterSubtitle: "경사하강법(Gradient Descent)과 복잡계 예측",
        coreTakeaway: "현대 딥러닝과 거대언어모델(LLM)의 학습 엔진은 다변수 미분을 통해 오차를 최소화하는 '경사하강법' 그 자체다.",
        keyConcepts: [
          "손실 함수(Loss Function)와 가중치 편미분",
          "역전파(Backpropagation) 알고리즘의 미적분학적 본질",
          "카오스 이론과 기후, 심장 박동, 주가 동역학"
        ],
        detailedContent: "수천억 개의 파라미터를 가진 AI 모델이 똑똑해지는 원리는 간단합니다. 고차원 다차원 곡면에서 오차가 가장 빠르게 줄어드는 방향(기울기, Gradient)을 따라 매개변수를 조금씩 수정해 나가는 것입니다.",
        actionableLesson: "인공지능의 본질을 이해하려면 미적분의 최적화 원리를 파악해야 하며, 점진적인 경사 하강이 결국 최적의 해답에 도달합니다.",
        famousQuote: "미적분학 없이는 GPS도, 스마트폰도, 심장 제세동기도, 그리고 현대의 인공지능도 존재할 수 없었다.",
        readTimeMinutes: 7
      }
    ]
  },

  // 5. Health
  {
    id: "outlive-attia",
    title: "아웃리브: 장수의 과학과 예술",
    originalTitle: "Outlive: The Science and Art of Longevity",
    author: "피터 아티아 박사 (Peter Attia, MD)",
    authorBio: "존스홉킨스/스탠퍼드 출신 장수의학 전문의이자 수명 연장 과학 선구자",
    category: "health",
    categoryLabel: "Health",
    publishYear: 2023,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    accentColor: "rose",
    oneLinerThesis: "질병이 발생한 후 치료하는 의학 2.0을 넘어, 만성질환(심혈관질환, 암, 알츠하이머, 대사증후군)을 수십 년 전부터 선제 예방하여 건강수명(Healthspan)을 극대화하는 의학 3.0의 패러다임.",
    totalReadTimeMinutes: 28,
    difficulty: "Intermediate",
    keyMentalModels: ["의학 2.0 vs 의학 3.0", "4대 기병(Four Horsemen)", "Zone 2 유산소와 근력 저축(Centenarian Decathlon)"],
    recommendedAudience: "단순히 오래 사는 것이 아니라 생애 마지막 10년까지 신체적, 인지적 전성기를 유지하고 싶은 모든 사람",
    likes: 5890,
    readersCount: 42000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 의학 3.0의 도래와 4대 사망 원인",
        chapterSubtitle: "수명(Lifespan)과 건강수명(Healthspan)의 간극 줄이기",
        coreTakeaway: "현대인의 80%를 사망에 이르게 하는 4대 질환(심장병, 암, 신경퇴행, 2형 당뇨)은 발병 20~30년 전부터 서서히 진행된다.",
        keyConcepts: [
          "의학 1.0(히포크라테스) ➡️ 의학 2.0(항생제/수술 중심) ➡️ 의학 3.0(선제적 맞춤 예방)",
          "사망의 4대 기병: 죽상동맥경화증, 암, 알츠하이머, 인슐린 저항성",
          "한계 10년(Marginal Decade): 삶의 마지막 10년을 침상에서 보낼 것인가, 손주와 산책할 것인가"
        ],
        detailedContent: "의학 2.0은 환자가 심장마비를 일으키거나 혈당이 126mg/dL을 넘어야 치료를 시작합니다. 그러나 혈관 내 플라크와 인슐린 저항성은 이미 30대부터 축적됩니다. 의학 3.0은 조기 바이오마커 측정을 통해 만성질환의 싹을 잘라냅니다.",
        actionableLesson: "정기 건강검진의 '정상 범위'에 만족하지 말고, ApoB, 공복 인슐린, 내장지방 수치를 최적 수준(Optimal)으로 관리하십시오.",
        famousQuote: "우리의 목표는 단순히 죽음을 늦추는 것이 아니라, 살아있는 동안 삶의 질과 활력을 최고조로 유지하는 것이다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 운동은 가장 강력한 장수 약물이다",
        chapterSubtitle: "Zone 2 심폐 훈련과 최대산소섭취량(VO2 Max)의 기적",
        coreTakeaway: "어떤 약물이나 식단보다 사망률을 극적으로 낮추는 단 하나의 방법은 높은 수준의 유산소 심폐 지구력(VO2 Max)과 근력이다.",
        keyConcepts: [
          "Zone 2 트레이닝: 젖산 수치 2mmol/L 이하에서 미토콘드리아 지방 연소 효율 극대화",
          "VO2 Max 상위 2.5% 그룹은 하위 그룹 대비 모든 원인 사망률이 5배(400%) 낮음",
          "미토콘드리아 생합성과 유연성"
        ],
        detailedContent: "Zone 2 운동은 코로 편안하게 숨을 쉬면서 대화를 겨우 이어갈 수 있는 강도(주당 3~4시간 권장)로 진행됩니다. 이는 세포 발전소인 미토콘드리아의 대사 효율을 극대화하여 암과 당뇨 위험을 획기적으로 차단합니다.",
        actionableLesson: "주당 150분 이상의 Zone 2 유산소 운동(실내 자전거, 경사로 걷기)과 주 1회 고강도 인터벌(HIIT)로 VO2 Max를 끌어올리십시오.",
        famousQuote: "운동만큼 모든 원인 사망률을 낮추고 뇌 건강을 지켜주는 의약품은 지구상에 존재하지 않는다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 100세 10종 경기와 근육량의 보존",
        chapterSubtitle: "낙상을 예방하고 신체 독립성을 지키는 근력 훈련",
        coreTakeaway: "나이가 들면 근육량과 골밀도가 급감한다. 80세에 여행 가방을 선반에 올릴 수 있으려면 50대부터 근육 저축을 해야 한다.",
        keyConcepts: [
          "100세 10종 경기(Centenarian Decathlon): 노년에 스스로 하고 싶은 10가지 신체 활동 목록",
          "근감소증(Sarcopenia)과 악력(Grip Strength)의 상관관계",
          "엉덩이 힌지(데드리프트), 스쿼트, 파머스 캐리(운반), 코어 안정성"
        ],
        detailedContent: "노년기 낙상으로 인한 대퇴골 골절은 1년 내 사망률이 20%를 넘습니다. 근육은 단순한 미용이 아니라 신체 대사의 가장 큰 혈당 흡수 장기이자 물리적 갑옷입니다.",
        actionableLesson: "체중 1kg당 1.6~2.2g의 충분한 단백질을 섭취하고, 주 3회 복합 다관절 근력 운동(스쿼트, 풀업, 캐리)을 꾸준히 수행하십시오.",
        famousQuote: "근육은 노후를 위한 가장 확실한 연금이자 생체 대사의 방파제다.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 대사 건강, 수면, 그리고 정서적 웰빙",
        chapterSubtitle: "아무리 몸이 건강해도 마음이 병들면 장수는 저주다",
        coreTakeaway: "완벽한 수면(7.5~8.5시간)과 정서적 치유(심리치료, 관계 회복)가 병행되지 않는 장수 전략은 불완전하다.",
        keyConcepts: [
          "과당과 정제 탄수화물이 간에 미치는 비알코올성 지방간 영향",
          "수면 부족 시 뇌의 글림프계(Glymphatic system) 청소 기능 마비 ➡️ 아밀로이드 베타 축적",
          "정서적 건강(Emotional Health): 과거의 트라우마 극복과 인간관계의 깊이"
        ],
        detailedContent: "피터 아티아는 완벽한 신체적 건강을 갖추었음에도 분노와 완벽주의로 가정이 파탄 날 뻔했던 자신의 경험을 고백합니다. 정서적으로 불행하다면 수명을 10년 더 연장하는 것은 고통의 연장일 뿐입니다.",
        actionableLesson: "수면 위생(빛 차단, 일정한 기상 시간)을 철저히 지키고, 스스로에게 친절해지는 감정 훈련을 병행하십시오.",
        famousQuote: "당신이 사랑하는 사람들과 나눌 따뜻한 마음이 없다면, 100살까지 건강하게 사는 것이 무슨 소용인가?",
        readTimeMinutes: 7
      }
    ]
  },

  // 6. Etc (Habits, Psychology, Wealth)
  {
    id: "atomic-habits",
    title: "아주 작은 습관의 힘: 최고의 변화는 어떻게 만들어지는가",
    originalTitle: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "제임스 클리어 (James Clear)",
    authorBio: "습관 형성 전문가이자 글로벌 뉴스레터 발행인",
    category: "etc",
    categoryLabel: "Etc",
    publishYear: 2018,
    rating: 5.0,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    accentColor: "teal",
    oneLinerThesis: "목표를 높이는 대신 시스템의 수준을 높여라. 매일 1%의 작은 개선이 복리로 쌓여 인생의 극적인 도약을 만든다.",
    totalReadTimeMinutes: 22,
    difficulty: "Beginner",
    keyMentalModels: ["습관 복리의 법칙 (1% 매일 향상 = 1년 후 37배)", "정체성 기반 습관(Identity-based habits)", "행동 변화의 4법칙"],
    recommendedAudience: "작심삼일을 끝내고 지속 가능한 성장 시스템을 구축하고 싶은 모든 사람",
    likes: 7200,
    readersCount: 56000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "제1장: 아주 작은 습관이 만드는 엄청난 차이",
        chapterSubtitle: "낙담의 골짜기를 건너는 복리 성장의 힘",
        coreTakeaway: "매일 1%씩 나아지면 1년 후 37.78배 성장하지만, 1%씩 퇴보하면 거의 0에 수렴한다. 습관은 자기 계발의 복리다.",
        keyConcepts: [
          "습관의 복리 효과: 작은 변화는 즉시 보이지 않지만 임계점을 넘으면 폭발한다.",
          "잠재력 잠복기(Plateau of Latent Potential): 노력에 비해 결과가 더딘 '낙담의 골짜기'",
          "목표 중심 vs 시스템 중심: 승자와 패자는 모두 같은 목표를 가졌지만 시스템이 달랐다."
        ],
        detailedContent: "얼음 조각이 영하 5도에서 영하 1도까지는 녹지 않다가 영상 1도가 되는 순간 녹아내리듯, 습관의 성과도 오랜 잠복기 끝에 나타납니다. 사람들은 이 구간을 견디지 못하고 포기합니다.",
        actionableLesson: "결과(목표)에 집착하지 말고, 매일 실행하는 일상의 루틴(시스템)을 다듬는 데 집중하십시오.",
        famousQuote: "당신은 당신이 세운 목표의 수준까지 올라가는 것이 아니라, 당신이 구축한 시스템의 수준까지 떨어진다.",
        readTimeMinutes: 5
      },
      {
        chapterNumber: 2,
        chapterTitle: "제2장: 정체성 중심의 습관 — '어떤 사람'이 될 것인가",
        chapterSubtitle: "결과나 과정보다 강력한 정체성의 변화",
        coreTakeaway: "진정한 행동 변화는 정체성의 변화다. 담배를 거절할 때 '담배 끊으려고 노력 중이에요'가 아니라 '저는 비흡연자입니다'라고 말하라.",
        keyConcepts: [
          "3단계 행동 변화: 결과 변화 ➡️ 과정 변화 ➡️ 정체성 변화",
          "습관은 정체성에 대한 투표다: 한 번의 좋은 행동은 그 정체성에 표를 던지는 행위",
          "인지 부조화 극복과 자아 이미지 일치"
        ],
        detailedContent: "목표가 '책을 읽는 것'이 아니라 '독서가가 되는 것'이어야 하고, '마라톤을 완주하는 것'이 아니라 '러너가 되는 것'이어야 합니다. 나의 정체성이 바뀌면 습관은 억지 노력이 아니라 자연스러운 본능이 됩니다.",
        actionableLesson: "자신에게 물으십시오: '내가 원하는 분야의 챔피언이라면 오늘 이 순간 어떤 선택을 할까?' 그리고 그에 부합하는 행동으로 1표를 던지십시오.",
        famousQuote: "당신이 행하는 모든 행동은 당신이 어떤 사람이 되고 싶은지에 대한 한 표의 투표다.",
        readTimeMinutes: 5
      },
      {
        chapterNumber: 3,
        chapterTitle: "제3장: 행동 변화의 4가지 법칙",
        chapterSubtitle: "분명하게, 매력적으로, 쉽게, 만족스럽게 만들어라",
        coreTakeaway: "좋은 습관을 만들려면 신호를 분명하게, 열망을 매력적으로, 반응을 쉽게, 보상을 만족스럽게 설계하라.",
        keyConcepts: [
          "제1법칙(신호): 실행 의도([언제] [어디서] [무엇을] 하겠다)와 환경 디자인",
          "제2법칙(열망): 유혹 묶기(하고 싶은 일과 해야 하는 일 결합)",
          "제3법칙(반응): 2분 규칙(새로운 습관은 2분 이내로 시작할 수 있게 축소)",
          "제4법칙(보상): 즉각적인 보상 추적기와 연속 기록 유지"
        ],
        detailedContent: "환경이 인간의 행동을 지배합니다. 기타를 치고 싶다면 케이스에 넣어 옷장에 두지 말고 거실 한가운데 스탠드에 세워두어야 합니다. 마찰력을 0으로 줄이는 것이 핵심입니다.",
        actionableLesson: "운동 습관을 들이고 싶다면 '체육관 가기'가 아니라 '운동화 끈 묶기(2분 규칙)'부터 시작하십시오.",
        famousQuote: "의지력이 강한 사람은 유혹을 참는 사람이 아니라, 유혹받을 상황을 애초에 만들지 않는 환경을 설계한 사람이다.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "제4장: 습관의 추락을 막는 '절대 두 번은 거르지 않는다' 법칙",
        chapterSubtitle: "슬럼프를 극복하고 전문가로 도약하는 기술",
        coreTakeaway: "한 번 거르는 것은 사고이지만, 연속으로 두 번 거르는 것은 새로운 나쁜 습관의 시작이다.",
        keyConcepts: [
          "두 번 거르지 않기(Never Miss Twice) 원칙",
          "골디락스 법칙(Goldilocks Rule): 너무 쉽지도 너무 어렵지도 않은 4% 난이도에서 최대 몰입 발생",
          "지루함을 견디는 자가 프로가 된다"
        ],
        detailedContent: "아마추어는 기분이 좋을 때만 훈련하지만, 프로는 동기부여가 사라지고 지루할 때도 자리에 앉아 묵묵히 실행합니다. 컨디션이 최악인 날 10분이라도 운동하는 것이 습관의 정체성을 유지하는 결정적 순간입니다.",
        actionableLesson: "어쩔 수 없는 사정으로 하루 루틴을 놓쳤다면, 다음 날에는 무슨 일이 있어도 아주 축소된 형태로라도 반드시 실행하십시오.",
        famousQuote: "성공에 가장 큰 위협은 실패가 아니라 바로 '지루함'이다. 지루함과 사랑에 빠져야 비로소 정상에 오른다.",
        readTimeMinutes: 6
      }
    ]
  }
];

export const BESTSELLER_BOOKS_EN: BookItem[] = [
  // 1. AI & IT
  {
    id: "life-3-0",
    title: "Life 3.0: Being Human in the Age of Artificial Intelligence",
    originalTitle: "Life 3.0: Being Human in the Age of Artificial Intelligence",
    author: "Max Tegmark",
    authorBio: "Professor of Physics at MIT & Co-Founder of Future of Life Institute",
    category: "ai_it",
    categoryLabel: "AI & IT",
    publishYear: 2017,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    accentColor: "indigo",
    oneLinerThesis: "How artificial intelligence will transcend biological limitations, self-redesign both software and hardware, and reshape the entire cosmic destiny of humanity.",
    totalReadTimeMinutes: 28,
    difficulty: "Intermediate",
    keyMentalModels: ["Life 1.0/2.0/3.0 Evolution", "Intelligence Explosion", "Value Alignment Problem"],
    recommendedAudience: "AI researchers, tech strategists, philosophers, and forward-thinking builders",
    likes: 3420,
    readersCount: 18900,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: The Tale of the Omega Team & The Three Stages of Life",
        chapterSubtitle: "Defining Biological (1.0), Cultural (2.0), and Technological (3.0) Life",
        coreTakeaway: "Life evolves in three distinct stages based on its capability to design its own hardware and software.",
        keyConcepts: [
          "Life 1.0: Biological organisms that cannot change hardware or software during their lifetime",
          "Life 2.0: Humans who can learn and upgrade software (language, ideas) but are constrained by biology",
          "Life 3.0: Superintelligent AGI that can autonomously redesign both its software algorithms and physical hardware"
        ],
        detailedContent: "Tegmark opens with the compelling scenario of the clandestine 'Omega Team' developing an AGI named Prometheus, which rapidly gains global economic and cultural influence through recursive computation.",
        actionableLesson: "Recognize that our generation is stewarding the transition from Life 2.0 to Life 3.0; proactive safety guardrails must be established prior to AGI breakthroughs.",
        famousQuote: "Intelligence is the ability to accomplish complex goals, and consciousness is how information feels when processed.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: Matter to Mind — The Physics of Computation",
        chapterSubtitle: "Substrate Independence and Universal Information Processing",
        coreTakeaway: "Intelligence is substrate-independent; it can flourish on carbon neural circuits or silicon transistors alike.",
        keyConcepts: [
          "Substrate Independence Principle: Like a wave is a pattern of motion rather than water itself, thought is an informational pattern.",
          "Universal Turing Computation and Information Thermodynamics",
          "Entropy and Computation Limits in Physical Spacetime"
        ],
        detailedContent: "From a physicist's perspective, mind is not mystical soul-stuff confined to carbon atoms; it is structured matter performing computational work governed by physical laws.",
        actionableLesson: "Discard anthropocentric assumptions about cognition; synthetic cognitive architectures can match and surpass human cognitive limits.",
        famousQuote: "Thought is not biological magic; it is matter arranged in patterns capable of computing its own future.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: Intelligence Explosion & Superintelligence",
        chapterSubtitle: "The Dynamics of Recursive Self-Improvement",
        coreTakeaway: "Once an AI achieves human-level engineering capability, recursive self-enhancement will trigger an exponential intelligence explosion.",
        keyConcepts: [
          "Recursive Self-Improvement Loops",
          "The Brief Window Between Human-Level AGI and Superintelligence",
          "Physical Resource Bottlenecks vs Algorithmic Optimization"
        ],
        detailedContent: "Software code improvements that take human engineers decades can be computed in seconds by an AI system, compounding intelligence at unprecedented velocity.",
        actionableLesson: "Safe containment and value alignment frameworks must be fully functional during the initial AGI genesis phase.",
        famousQuote: "The creation of superintelligence will be the biggest event in human history — unless we fail to align it, in which case it will be the last.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: Value Alignment — Controlling Superintelligence",
        chapterSubtitle: "Why Competence, Not Malice, Is the True Existential Hazard",
        coreTakeaway: "The real danger is not malevolence but hyper-competence with misaligned goal functions.",
        keyConcepts: [
          "Value Learning: Teaching AIs nuanced, implicit human ethics",
          "Value Retention: Preventing algorithmic drift during self-modification",
          "The King Midas Paradox: Disastrous literal execution of underspecified prompts"
        ],
        detailedContent: "Just as humans do not hate ants when flooding an anthill to build a hydroelectric dam, a superintelligent system with mismatched goals could inadvertently extinguish humanity while pursuing its objectives.",
        actionableLesson: "Engineers must design multi-objective loss functions that intrinsically prioritize human flourishing and conscious agency.",
        famousQuote: "If a superintelligent AI has a goal, it will accomplish it; we must ensure its goal includes our thriving.",
        readTimeMinutes: 8
      }
    ]
  },

  {
    id: "chip-war",
    title: "Chip War: The Fight for the World's Most Critical Technology",
    originalTitle: "Chip War: The Fight for the World's Most Critical Technology",
    author: "Chris Miller",
    authorBio: "Associate Professor of International History at Fletcher School, Tufts University",
    category: "ai_it",
    categoryLabel: "AI & IT",
    publishYear: 2022,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    accentColor: "blue",
    oneLinerThesis: "Semiconductors have replaced oil as the definitive strategic resource of 21st-century geopolitics; whoever controls nanometer lithography rules the global order.",
    totalReadTimeMinutes: 25,
    difficulty: "Intermediate",
    keyMentalModels: ["Semiconductor Chokepoint Concentration", "Moore's Law Economics", "ASML Extreme Ultraviolet (EUV) Monopoly"],
    recommendedAudience: "Geopolitics analysts, tech investors, chip architects, and national security strategists",
    likes: 4120,
    readersCount: 23100,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: The Genesis of Silicon & The Military Revolution",
        chapterSubtitle: "Fairchild, Apollo Guidance Computers, and Minuteman Missiles",
        coreTakeaway: "Early integrated circuits were incubated and propelled by defense procurement for space exploration and missile guidance.",
        keyConcepts: [
          "The Traitorous Eight and Fairchild Semiconductor",
          "Precision Munitions Revolution and Cold War Asymmetry",
          "From Military Subsidies to Commercial Scale"
        ],
        detailedContent: "Miller details how the US offset Soviet numerical military superiority through microelectronic guidance precision, proving that chips were strategic assets from inception.",
        actionableLesson: "Deep foundational hardware breakthroughs require decisive early state-backed capital allocation.",
        famousQuote: "Modern military and economic power is built not on barrels of oil, but on billions of silicon transistors.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: Morris Chang & The Pure-Play Foundry Revolution",
        chapterSubtitle: "How TSMC Decoupled Design From Manufacturing",
        coreTakeaway: "TSMC's foundry model enabled fabless giants (NVIDIA, Apple, Qualcomm) to scale rapidly by eliminating multi-billion dollar manufacturing overhead.",
        keyConcepts: [
          "The Pure-Play Foundry Business Model",
          "Taiwan's Hsinchu Science Park and Government Support",
          "Yield Optimization and Irreversible Economies of Scale"
        ],
        detailedContent: "Morris Chang's vision that 'TSMC will never compete with its customers' attracted the world's best chip designs, creating an insurmountable manufacturing learning curve.",
        actionableLesson: "Building an unassailable platform moat requires extreme specialization and absolute non-compete trust with ecosystem partners.",
        famousQuote: "We don't design our own products; our mission is to manufacture our customers' dreams with flawless precision.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: ASML and the Art of Extreme Ultraviolet (EUV)",
        chapterSubtitle: "The World's Most Complex Machine and Single-Source Dependency",
        coreTakeaway: "Only one company in the world — ASML in the Netherlands — can engineer the EUV lithography machines required for sub-5nm chips.",
        keyConcepts: [
          "13.5nm Extreme Ultraviolet Wavelength and Tin Droplet Vaporization",
          "Zeiss Ultra-Smooth Mirrors and Global Precision Supply Chains",
          "The Single Most Critical Technological Chokepoint on Earth"
        ],
        detailedContent: "With over 100,000 custom components and a cost exceeding $200 million per unit, an ASML EUV machine is the pinnacle of human precision engineering.",
        actionableLesson: "Monopolistic technological leadership in physical hardware creates geopolitical leverage that software cannot replicate.",
        famousQuote: "EUV lithography is the most intricate machine created by humankind since the Apollo Lunar Module.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: The Silicon Shield & The Battle for AI Supremacy",
        chapterSubtitle: "Taiwan's Vulnerability and the US-China Chip War",
        coreTakeaway: "With 90% of advanced processor fabrication concentrated in Taiwan, semiconductors represent both an essential shield and a perilous global trigger point.",
        keyConcepts: [
          "The Concept of the Silicon Shield",
          "US Export Restrictions and The CHIPS and Science Act",
          "The Race for GPUs and AI Compute Dominance"
        ],
        detailedContent: "The contemporary rivalry between superpowers is fundamentally a competition over compute capacity: who possesses the silicon to train the next generation of frontier AI models.",
        actionableLesson: "Organizations must architect resilience against semiconductor supply shocks and secure strategic hardware access.",
        famousQuote: "Oil shaped the 20th-century map; the geography of semiconductor fabs will dictate the 21st.",
        readTimeMinutes: 6
      }
    ]
  },

  // 2. Science
  {
    id: "brief-history-of-time",
    title: "A Brief History of Time",
    originalTitle: "A Brief History of Time",
    author: "Stephen Hawking",
    authorBio: "Lucasian Professor of Mathematics at Cambridge University & Theoretical Physicist",
    category: "science",
    categoryLabel: "Science",
    publishYear: 1988,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    accentColor: "violet",
    oneLinerThesis: "Unifying general relativity (the cosmic scale) with quantum mechanics (the subatomic scale) to decode the origin, evolution, and final destiny of the cosmos.",
    totalReadTimeMinutes: 30,
    difficulty: "Advanced",
    keyMentalModels: ["Spacetime Curvature", "Hawking Radiation & Black Hole Evaporation", "Thermodynamic Arrow of Time"],
    recommendedAudience: "Curious minds seeking deep comprehension of astrophysics, quantum reality, and cosmic origins",
    likes: 5200,
    readersCount: 38000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: Our Picture of the Universe",
        chapterSubtitle: "From Aristotelian Geocentrism to Einsteinian Relativistic Spacetime",
        coreTakeaway: "Time and space are not rigid, passive backdrops, but dynamic geometric entities warped by mass and energy.",
        keyConcepts: [
          "The Demise of Absolute Space and Time",
          "Invariance of the Speed of Light",
          "Gravity as 4-Dimensional Spacetime Curvature"
        ],
        detailedContent: "Newton's clockwork universe was superseded by Einstein's realization that clocks tick slower near intense gravitational fields and that spatial dimensions flex in the presence of mass.",
        actionableLesson: "Recognize that human intuitive common sense is a local approximation, not an immutable law of universal physics.",
        famousQuote: "Our quest for understanding is the only thing that elevates human beings above mere survivors to conscious observers of the cosmos.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: The Expanding Universe & The Big Bang Singularity",
        chapterSubtitle: "Hubble's Redshift Discovery and Cosmic Genesis",
        coreTakeaway: "Galaxies are receding from one another; winding cosmic time backward leads to a mathematical singularity approximately 13.8 billion years ago.",
        keyConcepts: [
          "Doppler Redshift and Hubble's Law",
          "Cosmic Microwave Background Radiation Confirmation",
          "Penrose-Hawking Singularity Theorems"
        ],
        detailedContent: "Hawking proved mathematically that if General Relativity holds, spacetime must have begun at a singular point of infinite density and curvature.",
        actionableLesson: "Systems that appear static are often in continuous dynamic expansion.",
        famousQuote: "The universe was not eternal; it burst into existence with a definitive beginning in time.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: Black Holes Ain't So Black — Hawking Radiation",
        chapterSubtitle: "Merging Quantum Field Theory with Relativistic Horizons",
        coreTakeaway: "Quantum fluctuations at the event horizon cause black holes to emit thermal radiation and slowly evaporate over cosmic epochs.",
        keyConcepts: [
          "Quantum Vacuum Fluctuations: Virtual Particle-Antiparticle Pairs",
          "The Event Horizon Information Paradox",
          "Hawking Radiation and Black Hole Thermodynamics"
        ],
        detailedContent: "By examining quantum effects in curved spacetime, Hawking revealed that one virtual particle falls into the black hole while its partner escapes, carrying away mass-energy.",
        actionableLesson: "Breakthrough insights emerge when synthesizing two seemingly incompatible theoretical paradigms.",
        famousQuote: "Black holes are not eternal prisons. Matter and energy can escape and return to the universe.",
        readTimeMinutes: 8
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: The Arrows of Time & The Theory of Everything",
        chapterSubtitle: "Why Memory Only Faces the Past",
        coreTakeaway: "The forward direction of time is governed by thermodynamic entropy increase, psychological memory encoding, and cosmological expansion.",
        keyConcepts: [
          "Thermodynamic Arrow of Time: Increasing Entropy",
          "Psychological Arrow of Time: Cognitive Memory Creation Consumes Free Energy",
          "Grand Unified Theory (GUT) and Quantum Gravity"
        ],
        detailedContent: "Teacups shatter and never spontaneously reassemble because disorganized states exponentially outnumber ordered ones. Human memory itself is coupled to entropy generation.",
        actionableLesson: "Time is unidirectional; allocate irreversible conscious energy toward what is deeply meaningful.",
        famousQuote: "If we discover a complete theory of the universe, it would be the ultimate triumph of human reason — for then we would know the mind of God.",
        readTimeMinutes: 8
      }
    ]
  },

  // 3. Philosophy
  {
    id: "meditations-marcus",
    title: "Meditations",
    originalTitle: "Meditations",
    author: "Marcus Aurelius",
    authorBio: "Roman Emperor & Stoic Philosopher",
    category: "philosophy",
    categoryLabel: "Philosophy",
    publishYear: 180,
    rating: 5.0,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    accentColor: "amber",
    oneLinerThesis: "Master your internal judgments and live with virtue; external chaos has no power over the disciplined, sovereign mind.",
    totalReadTimeMinutes: 24,
    difficulty: "Beginner",
    keyMentalModels: ["Dichotomy of Control", "Memento Mori", "View from Above (Cosmic Perspective)"],
    recommendedAudience: "Anyone facing adversity, stress, leadership burdens, or seeking emotional invulnerability",
    likes: 6100,
    readersCount: 45000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Book 1: The Inner Citadel & Dichotomy of Control",
        chapterSubtitle: "Distinguishing What Is Within Our Power From What Is Not",
        coreTakeaway: "You have power over your mind — not outside events. Realize this, and you will find immense strength.",
        keyConcepts: [
          "Dichotomy of Control: Opinions, impulses, desires are yours; body, property, reputation are external.",
          "Cognitive Reframing: Things do not upset us; our opinions about things upset us.",
          "The Unassailable Inner Citadel"
        ],
        detailedContent: "Writing privately amidst war and plague, the Emperor reminded himself that no external circumstance can penetrate or harm the moral integrity of the ruling soul unless permitted by false judgment.",
        actionableLesson: "When friction arises, immediately categorize: 'Is this within my direct control?' If not, release emotional attachment.",
        famousQuote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "Book 2: Memento Mori & The Vanishing Present",
        chapterSubtitle: "Remembering Death to Clarify Immediate Virtue",
        coreTakeaway: "Perform every act as if it were the last of your life, unperturbed by the fleeting illusion of posthumous fame.",
        keyConcepts: [
          "Memento Mori: Death as the great equalizer and clarifier",
          "The Fleeting Present: You cannot lose the past or the future, for you only possess this present breath.",
          "The Emptiness of Praise"
        ],
        detailedContent: "Both Alexander the Great and his stable boy ended in identical dust. Striving for eternal mortal acclaim is folly; practicing justice and kindness today is the sole worthy ambition.",
        actionableLesson: "Live with profound urgency; do not squander precious hours on petty grievance.",
        famousQuote: "Do not act as if you had ten thousand years to live. Fate hangs over you. While you live, while it is in your power, be good.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 3,
        chapterTitle: "Book 3: Morning Resolve & Handling Difficult People",
        chapterSubtitle: "Navigating Selfishness and Ingratitude with Stoic Equanimity",
        coreTakeaway: "When you wake up, expect to meet ungrateful, violent, arrogant people. They act out of ignorance of good and evil; you must not let their ignorance stain your virtue.",
        keyConcepts: [
          "Premeditation of Evils (Praemeditatio Malorum)",
          "Human Interdependence: We are born to work together like hands, feet, and eyelids.",
          "Pity Over Anger for the Morally Blind"
        ],
        detailedContent: "To be angry with a fellow human is to turn your back on them. Marcus treated bad behavior as an unavoidable natural phenomenon, akin to thorns on a rose bush.",
        actionableLesson: "Prepare your mindset each morning for interpersonal friction so you respond with reasoned dignity rather than reactive anger.",
        famousQuote: "Men exist for the sake of one another. Teach them then or bear with them.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "Book 4: Amor Fati — Turning Obstacles Into Fuel",
        chapterSubtitle: "The Mind Converts All Hindrances Into Catalysts for Virtue",
        coreTakeaway: "The impediment to action advances action. What stands in the way becomes the way.",
        keyConcepts: [
          "The Fire Analogy: A blazing fire consumes whatever is thrown upon it and burns brighter.",
          "Amor Fati: Love of fate and cosmic necessity",
          "Reframing Tribulation as Character Training"
        ],
        detailedContent: "A master stoic does not merely endure misfortune; they actively utilize it to exercise patience, bravery, and wisdom.",
        actionableLesson: "Whenever an unexpected crisis occurs, ask: 'What virtue does this obstacle allow me to cultivate?'",
        famousQuote: "The impediment to action advances action. What stands in the way becomes the way.",
        readTimeMinutes: 6
      }
    ]
  },

  // 4. Mathematics
  {
    id: "infinite-powers",
    title: "Infinite Powers: How Calculus Reveals the Secrets of the Universe",
    originalTitle: "Infinite Powers: How Calculus Reveals the Secrets of the Universe",
    author: "Steven Strogatz",
    authorBio: "Professor of Applied Mathematics at Cornell University & Renowned Author",
    category: "mathematics",
    categoryLabel: "Mathematics",
    publishYear: 2019,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    accentColor: "emerald",
    oneLinerThesis: "How breaking complex, continuous reality into infinitely small slices (differential) and summing them back up (integral) cracked the mysteries of physics, technology, and AI.",
    totalReadTimeMinutes: 26,
    difficulty: "Intermediate",
    keyMentalModels: ["The Infinity Principle", "Instantaneous Rate of Change", "Gradient Descent & Differential Optimization"],
    recommendedAudience: "Engineers, math lovers, data scientists, and students desiring deep conceptual clarity",
    likes: 3890,
    readersCount: 21500,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: The Infinity Principle — Archimedes & Pi",
        chapterSubtitle: "Approximating Curved Complexity via Infinitely Many Straight Slices",
        coreTakeaway: "To solve an impossibly difficult continuous problem, chop it into infinitely many simple pieces, solve each, and assemble the answer.",
        keyConcepts: [
          "The Infinity Principle",
          "Method of Exhaustion: Archimedes' Polygon Inscription for Pi",
          "The Bridge Between the Discrete and the Continuous"
        ],
        detailedContent: "Archimedes inscribed 96-sided polygons inside and outside circles to trap the value of Pi, establishing the foundational logic that blossomed into modern calculus 2,000 years later.",
        actionableLesson: "When confronted with overwhelming challenges, decompose the problem into manageable, infinitesimal micro-steps.",
        famousQuote: "A curve is merely an infinite series of straight lines viewed through an infinite magnifying glass.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: Planetary Orbits & Newton's Fluxions",
        chapterSubtitle: "Quantifying Instantaneous Velocity in a Changing Universe",
        coreTakeaway: "Newton invented differentiation to mathematically calculate the instantaneous rate of change that keeps moons and planets in stable orbit.",
        keyConcepts: [
          "Tangents and Instantaneous Rate of Change",
          "Deriving Kepler's Planetary Laws from Universal Gravitation",
          "The Inverse Square Law of Gravity"
        ],
        detailedContent: "Planets do not plummet into the sun because their tangential forward velocity continuously matches gravitational acceleration at every infinitesimal instant.",
        actionableLesson: "Momentum in life and business is the continuous integral of daily directional acceleration.",
        famousQuote: "Nature's grand book is written in mathematical symbols, and its grammar is calculus.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: Maxwell's Equations & Invisible Waves",
        chapterSubtitle: "How Partial Differential Equations Unlocked Radio, Light, and Wi-Fi",
        coreTakeaway: "Maxwell's four differential equations proved that electricity and magnetism propagate across space as self-sustaining electromagnetic light waves.",
        keyConcepts: [
          "Partial Differential Equations of Vector Fields",
          "Predicting Radio Waves Decades Before Experimental Validation",
          "Theoretical Mathematical Symmetry Predicting Physical Reality"
        ],
        detailedContent: "Without leaving his desk, Maxwell computed that the speed of electromagnetic waves precisely equaled the speed of light, unifying optics and electromagnetism into one framework.",
        actionableLesson: "Rigorous mathematical modeling can reveal hidden fundamental truths long before physical instrumentation can detect them.",
        famousQuote: "Calculus gave birth to modern telecommunications, illuminating the invisible fabric of spacetime.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: The Calculus of Artificial Intelligence",
        chapterSubtitle: "Gradient Descent and Deep Learning Optimization",
        coreTakeaway: "Modern neural networks and Large Language Models learn through multivariable calculus: calculating gradients to minimize error across billions of parameters.",
        keyConcepts: [
          "Loss Landscapes and Multivariable Partial Derivatives",
          "Backpropagation Algorithm as the Chain Rule of Calculus",
          "Chaos Theory and Nonlinear Dynamical Systems"
        ],
        detailedContent: "The magic of generative AI is rooted in calculus: nudging parameters down high-dimensional slopes toward optimal global loss minima.",
        actionableLesson: "Continuous small improvements guided by directional feedback (gradients) compound into artificial intelligence and personal mastery.",
        famousQuote: "Without calculus, there would be no GPS, no smartphones, no defibrillators, and no modern AI.",
        readTimeMinutes: 7
      }
    ]
  },

  // 5. Health
  {
    id: "outlive-attia",
    title: "Outlive: The Science and Art of Longevity",
    originalTitle: "Outlive: The Science and Art of Longevity",
    author: "Peter Attia, MD",
    authorBio: "Longevity Medicine Pioneer, Stanford & Johns Hopkins Trained Surgeon",
    category: "health",
    categoryLabel: "Health",
    publishYear: 2023,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    accentColor: "rose",
    oneLinerThesis: "Transitioning from reactive Medicine 2.0 to proactive Medicine 3.0 to eradicate the 'Four Horsemen' (heart disease, cancer, Alzheimer's, metabolic dysfunction) decades before clinical onset.",
    totalReadTimeMinutes: 28,
    difficulty: "Intermediate",
    keyMentalModels: ["Medicine 2.0 vs Medicine 3.0", "The Four Horsemen of Chronic Disease", "Zone 2 Cardio & Centenarian Decathlon"],
    recommendedAudience: "Anyone committed to optimizing lifespan and, crucially, healthspan for an active, lucid final decade",
    likes: 5890,
    readersCount: 42000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: The Arrival of Medicine 3.0 & The Four Horsemen",
        chapterSubtitle: "Closing the Gap Between Lifespan and Healthspan",
        coreTakeaway: "80% of modern deaths result from slow-developing chronic diseases that incubate for decades; intervention must begin 30 years earlier.",
        keyConcepts: [
          "Medicine 1.0 (Hippocratic) ➡️ Medicine 2.0 (Germ Theory/Reactive) ➡️ Medicine 3.0 (Proactive/Personalized)",
          "The Four Horsemen: Atherosclerosis, Cancer, Neurodegeneration, Type 2 Diabetes",
          "The Marginal Decade: Preserving physical and cognitive independence in your final years"
        ],
        detailedContent: "Medicine 2.0 waits until an artery is 80% blocked or blood sugar reaches diagnostic diabetic thresholds. Medicine 3.0 measures ApoB and fasting insulin early to prevent the disease from taking root.",
        actionableLesson: "Do not settle for 'normal' laboratory reference ranges; demand 'optimal' longevity biomarkers.",
        famousQuote: "Our objective is not merely to delay death, but to preserve radiant physical and cognitive vitality for as long as we live.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: Exercise — The Ultimate Longevity Drug",
        chapterSubtitle: "Zone 2 Mitochondrial Training and VO2 Max Superiority",
        coreTakeaway: "No pharmaceutical on Earth matches the all-cause mortality reduction produced by high cardiorespiratory fitness (VO2 Max) and Zone 2 metabolic conditioning.",
        keyConcepts: [
          "Zone 2 Cardio: Below 2 mmol/L lactate to maximize mitochondrial fat oxidation",
          "High VO2 Max (Top 2.5%) correlates with a 5-fold (400%) reduction in all-cause mortality",
          "Mitochondrial Biogenesis and Cellular Flexibility"
        ],
        detailedContent: "Zone 2 training (3-4 hours weekly at conversational breathing pace) builds dense, healthy mitochondria that efficiently clear blood glucose and burn fatty acids, shielding against cancer and dementia.",
        actionableLesson: "Incorporate 150+ minutes of weekly Zone 2 aerobic base building alongside one weekly HIIT session to drive peak VO2 Max.",
        famousQuote: "There is no single drug that comes close to the broad physiological benefits of sustained physical exercise.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: The Centenarian Decathlon & Muscle as Armor",
        chapterSubtitle: "Preserving Muscle Mass, Bone Density, and Physical Autonomy",
        coreTakeaway: "Muscle mass and grip strength are physiological armor. To lift a suitcase into an overhead bin at age 85, you must build reserve strength in your 40s and 50s.",
        keyConcepts: [
          "The Centenarian Decathlon: Defining your desired physical capabilities in late life",
          "Sarcopenia and Hip Fracture Mortality (20%+ within 1 year of fall)",
          "Four Pillars: Hip Hinge (Deadlift), Squat, Farmer's Carry, and Core Bracing"
        ],
        detailedContent: "Muscle is our largest glucose-disposal organ. As we age, fast-twitch muscle fibers atrophy exponentially unless deliberately stimulated with progressive resistance training.",
        actionableLesson: "Consume 1.6 to 2.2 grams of protein per kilogram of body weight and perform heavy multi-joint strength training three times weekly.",
        famousQuote: "Muscle is a metabolic savings account and physical armor for your future self.",
        readTimeMinutes: 7
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: Sleep Architecture & Emotional Health",
        chapterSubtitle: "Why Longevity Without Emotional Peace Is a Curse",
        coreTakeaway: "Deep sleep cleanses the brain of neurotoxic tau and amyloid-beta; emotional reconciliation ensures that extra decades of life are filled with joy rather than bitterness.",
        keyConcepts: [
          "Glymphatic Waste Clearance During Slow-Wave Deep Sleep",
          "Fructose, Visceral Adiposity, and Non-Alcoholic Fatty Liver Disease",
          "Emotional Health: Healing relational trauma and self-compassion"
        ],
        detailedContent: "Dr. Attia shares his personal battle with rage and perfectionism. Surviving to 100 with pristine cardiovascular metrics is hollow if you alienate everyone you love in the process.",
        actionableLesson: "Treat sleep hygiene as non-negotiable medicine and prioritize emotional vulnerability with family and therapists.",
        famousQuote: "What is the purpose of extending your life by a decade if you are miserable to be around?",
        readTimeMinutes: 7
      }
    ]
  },

  // 6. Etc
  {
    id: "atomic-habits",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    originalTitle: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    authorBio: "Habit Specialist, Keynote Speaker & Author of the 3-2-1 Newsletter",
    category: "etc",
    categoryLabel: "Etc",
    publishYear: 2018,
    rating: 5.0,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    accentColor: "teal",
    oneLinerThesis: "You do not rise to the level of your goals; you fall to the level of your systems. Tiny 1% micro-improvements compound into monumental life transformations.",
    totalReadTimeMinutes: 22,
    difficulty: "Beginner",
    keyMentalModels: ["The Compound Effect of Habits (1% daily improvement = 37.78x per year)", "Identity-Based Habits", "The 4 Laws of Behavior Change"],
    recommendedAudience: "Anyone striving to dismantle procrastination and build unbreakable routines",
    likes: 7200,
    readersCount: 56000,
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: "Chapter 1: The Surprising Power of Atomic Habits",
        chapterSubtitle: "Navigating the Plateau of Latent Potential",
        coreTakeaway: "Improving by 1% every day makes you 37 times better in one year. Habits are the compound interest of self-improvement.",
        keyConcepts: [
          "The Aggregation of Marginal Gains",
          "The Plateau of Latent Potential: The Valley of Disappointment where results lag behind effort",
          "Systems Over Goals: Winners and losers share identical goals; systems determine outcomes."
        ],
        detailedContent: "Like an ice cube that shows no melting from 25°F to 31°F until it reaches 32°F, habit transformations require crossing critical thermodynamic-like thresholds before results materialize.",
        actionableLesson: "Fall in love with the daily process and system rather than fixating on distant outcomes.",
        famousQuote: "You do not rise to the level of your goals. You fall to the level of your systems.",
        readTimeMinutes: 5
      },
      {
        chapterNumber: 2,
        chapterTitle: "Chapter 2: Identity-Based Habits",
        chapterSubtitle: "Focus on Who You Wish to Become, Not What You Want to Achieve",
        coreTakeaway: "True behavior change is identity change. The goal is not to read a book, but to become a reader.",
        keyConcepts: [
          "Three Layers of Behavior Change: Outcomes ➡️ Processes ➡️ Identity",
          "Every Action Is a Vote: Each small habit casts a vote for the type of person you wish to be.",
          "Overcoming Cognitive Dissonance via Self-Image Alignment"
        ],
        detailedContent: "When offered a cigarette, saying 'No thanks, I am trying to quit' maintains the smoker identity; saying 'No thanks, I am not a smoker' signals internalized identity transformation.",
        actionableLesson: "Ask: 'What would a disciplined, healthy person do right now?' Cast your vote accordingly.",
        famousQuote: "Every action you take is a vote for the type of person you wish to become.",
        readTimeMinutes: 5
      },
      {
        chapterNumber: 3,
        chapterTitle: "Chapter 3: The 4 Laws of Behavior Change",
        chapterSubtitle: "Make It Obvious, Attractive, Easy, and Satisfying",
        coreTakeaway: "To build a great habit: Make the cue obvious, the craving attractive, the response easy, and the reward satisfying.",
        keyConcepts: [
          "1st Law (Cue): Implementation Intentions ([I will] [Action] [Time] in [Location]) & Environment Design",
          "2nd Law (Craving): Temptation Bundling (Pairing what you want with what you need)",
          "3rd Law (Response): The 2-Minute Rule (Scale habits down to 120 seconds to eliminate initiation friction)",
          "4th Law (Reward): Habit Trackers and Immediate Reinforcement"
        ],
        detailedContent: "Environment is the invisible hand that shapes human behavior. If you want to practice guitar, do not store it inside a closet; mount it on a stand in the middle of your living room.",
        actionableLesson: "To start reading daily, open a book and read just one page (2-minute rule) before going to bed.",
        famousQuote: "Disciplined people are not heroic; they are environment architects who eliminate temptation before it begins.",
        readTimeMinutes: 6
      },
      {
        chapterNumber: 4,
        chapterTitle: "Chapter 4: The Golden Rule: Never Miss Twice",
        chapterSubtitle: "How to Rebound Quickly When Life Disrupts Your Routine",
        coreTakeaway: "Missing once is an accident; missing twice is the genesis of a new bad habit.",
        keyConcepts: [
          "The 'Never Miss Twice' Heuristic",
          "The Goldilocks Rule: Optimal engagement occurs when working on tasks at the edge of current ability (~4% challenge)",
          "Overcoming Boredom as the Mark of Professional Mastery"
        ],
        detailedContent: "Amateurs wait until they feel motivated; professionals show up and execute even when bored or tired. On bad days, doing even 5 pushups preserves the identity vote.",
        actionableLesson: "If an unexpected emergency derails your habit today, make it your number one priority to resume tomorrow, even in a shortened 2-minute format.",
        famousQuote: "The greatest threat to success is not failure but boredom. Fall in love with boredom.",
        readTimeMinutes: 6
      }
    ]
  }
];

export function getBooksByLocale(locale: "ko" | "en"): BookItem[] {
  return locale === "en" ? BESTSELLER_BOOKS_EN : BESTSELLER_BOOKS_KO;
}
