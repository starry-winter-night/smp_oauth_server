my-oauth-server/
├── src/
│   ├── domain/                          # 도메인 계층: 핵심 비즈니스 로직과 엔티티를 정의합니다.
│   │   ├── entities/                    # 엔티티: 애플리케이션의 주요 객체를 정의합니다.
│   │   │   ├── User.ts                  # 핵심 동작을 정의 (입금 출금)
│   │   │   └── ...
│   │   └── services/                    # 도메인 서비스: 비즈니스 로직을 처리합니다.
│   │       ├── AuthService.ts           # 엔티티를 묶는 규칙(상호작용) 
│   │       └── ...                      # 핵심 동작을 이용한 서비스 (입금 서비스, 출금 서비스, 둘을 묶은 송금 서비스)
│   ├── application/                     # 애플리케이션 계층: 유스케이스를 정의하고 실행합니다.
│   │   ├── usecases/                    # 유스케이스: 특정 비즈니스 로직을 처리합니다.
│   │   │   ├── AuthenticateUser.ts      # 요청을 받아서 일련의 과정을 처리한다. excute를 사용한다.
│   │   │   └── ...
│   │   └── interfaces/                  # 인터페이스: 리포지토리 인터페이스를 정의합니다.
│   │       ├── IUserRepository.ts
│   │       └── ...
│   ├── infrastructure/                  # 인프라스트럭처 계층: 외부 시스템과의 통신을 처리합니다.
│   │   ├── repository/                  # 리포지토리 구현: 데이터베이스와 상호작용하는 코드를 포함합니다.
│   │   │   ├── UserRepositoryImpl.ts
│   │   │   └── ...
│   │   ├── container/                  
│   │   └── database/                    # 데이터베이스 설정: 데이터베이스 연결 설정을 포함합니다.
│   │       └── mongoose.ts
│   ├── adapters/                        # 어댑터 계층: 외부와의 인터페이스를 처리합니다.
│   │   ├── controllers/                 # 컨트롤러: HTTP 요청을 처리하고 유스케이스를 호출합니다.
│   │   │   ├── AuthController.ts
│   │   │   └── ...
│   │   ├── dtos/                        # DTO: 데이터 전송 객체를 정의합니다.
│   │   │   ├── UserDTO.ts
│   │   │   └── ...
│   │   ├── mappers/                     # 매퍼: 엔티티와 DTO 간의 변환을 처리합니다.
│   │   │   ├── UserMapper.ts
│   │   │   └── ...
│   │   ├── routes/                      # API 라우트: API 엔드포인트를 정의합니다.
│   │   │   ├── authRoutes.ts
│   │   │   └── ...
│   ├── utils/                           # 유틸리티: 헬퍼 함수와 공통 모듈을 포함합니다.
│   │   ├── HashUtil.ts
│   │   └── ...
├── public/                              # 정적 파일: HTML, CSS, 이미지 등을 포함합니다.
│   └── ...
├── styles/                              # 스타일 파일: CSS 파일을 포함합니다.
│   └── ...
├── .gitignore                           # Git 무시 파일: Git에서 무시할 파일을 정의합니다.
├── package.json                         # 프로젝트 설정: 프로젝트의 종속성과 스크립트를 정의합니다.
└── README.md                            # README 파일: 프로젝트에 대한 설명을 포함합니다.
