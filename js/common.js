document.addEventListener('DOMContentLoaded', function () {
    const bankSelect = document.querySelector('select[name="bank"]');
    const accountInput = document.querySelector('input[name="account"]');
    const submitBtn = document.querySelector('.submit_btn');
    const popup = document.querySelector('.layer_pop');
    const message = popup.querySelector('.pop_contents p');

    // 은행 선택과 계좌번호 입력 시 버튼 활성화 체크
    function checkFormValidity() {
        const bankSelected = bankSelect.value !== "";
        const accountEntered = accountInput.value.trim() !== "";

        // 두 조건이 모두 충족되면 버튼 활성화, 그렇지 않으면 비활성화
        submitBtn.disabled = !(bankSelected && accountEntered);
    }

    // 계좌 검증 규칙
    const rules = {
        // 국민: 14자리, 5~6번째 자리 03, 23, 26
        kb: /^\d{4}(03|23|26)\d{8}$/,
        // 신한: 12자리, 1~3번째 자리 230, 223
        shinhan: /^(230|223)\d{9}$/,
        // 우리: 13자리, 2~4번째 자리 040
        woori: /^\d(040)\d{8}$/,
        // 하나: 14자리, 13~14번째 자리 21, 25
        hn: /^\d{12}(21|25)$/,
        // 농협:
        nh: /^((\d{3}(04|34|47|49|59)\d{6})|(\d{4}(04|34|47|49|59)\d{6})|((304|334|347|349|359|004|034|047|049|059)\d{10}))$/,
        // 수협: 12자리, 1~4번째 자리 1400, 1410
        sh: /^(1400|1410)\d{7}$/,
        // 기업: 14자리, 10~11번째 자리 14
        ibk: /^\d{9}(14)\d{2}$/,
        // 산업: 14자리, 1~3번째 자리 031, 032, 037
        kdb: /^(031|032|037)\d{11}$/,
        // 카카오: 13자리, 2~4번째 자리 355
        kakao: /^\d(355)\d{8}$/,
        // 케이: 12자리, 1~4번째 자리 1102
        k: /^1102\d{8}$/,
        // 토스: 12자리, 1~3번째 자리 300
        toss: /^300\d{9}$/,
        // 경남: 13자리, 1~3번째 자리 225, 229, 231, 241
        bnk: /^(225|229|231|241)\d{10}$/,
        // 광주: 12자리, 4~6번째 자리 133
        kj: /^((\d{3}133\d{5})|(\d{1}133\d{8}))$/,
        // 대구: 12자리, 1~3번째 자리 521, 527
        im: /^(521|527)\d{9}$/,
        // 부산: 13자리, 1~3번째 자리 104
        bs: /^104\d{10}$/,
        // 전북: 13자리, 1~4번째 자리 1031
        jb: /^1031\d{9}$/,
        // 제주: 10자리 2~3번째 자리 07, 20 또는 12자리 1~3번째 자리 730, 740
        jeju: /^((\d(07|20)\d{7})|((730|740)\d{9}))$/,
        // 시티: 11자리 또는 13자리, 9~10번째 자리 16, 18, 19, 20, 37, 38, 39
        city: /^\d{8}(16|18|19|20|37|38|39)\d{2}$/,
        // SC: 11자리, 4~5번째 자리 90
        sc: /^\d{3}90\d{6}$/
    };

    // 유효성 검사 및 결과 메시지 설정
    function validateAccount() {
        const bank = bankSelect.value;
        let accountNumber = accountInput.value.replace(/[-\s]/g, ""); // 공백과 - 제거
    
        // 계좌 번호의 길이 체크
        const accountLength = accountNumber.length;
    
        if (!rules[bank]) {
            message.innerHTML  = '은행을 선택해주세요.';
        } else if (!rules[bank].test(accountNumber)) {
            // 각 은행별 계좌 번호 길이에 따라 오류 메시지 다르게 처리
            switch(bank) {
                case 'kb': // 국민은행
                    if (accountLength !== 14) {
                        message.innerHTML = '국민은행 적금 계좌는14자리입니다.<br> 계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'shinhan': // 신한은행
                    if (accountLength !== 12) {
                        message.innerHTML = '신한은행 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'woori': // 우리은행
                    if (accountLength !== 13) {
                        message.innerHTML = '우리은행 적금 계좌는13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'hn': // 하나은행
                    if (accountLength !== 14) {
                        message.innerHTML = '하나은행 적금 계좌는14자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'nh': // 농협
                    if (accountLength !== 12 && accountLength !== 14) {
                        message.innerHTML = '농협 적금 계좌는12자리 또는 14자리입니다.<br> 계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'sh': // 수협
                    if (accountLength !== 12) {
                        message.innerHTML = '수협 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'ibk': // 기업은행
                    if (accountLength !== 14) {
                        message.innerHTML = '기업은행 적금 계좌는14자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'kdb': // 산업은행
                    if (accountLength !== 14) {
                        message.innerHTML = '산업은행 적금 계좌는14자리입니다. 계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'kakao': // 카카오은행
                    if (accountLength !== 13) {
                        message.innerHTML = '카카오은행 적금 계좌는13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'k': // 케이뱅크
                    if (accountLength !== 12) {
                        message.innerHTML = '케이뱅크 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'toss': // 토스뱅크
                    if (accountLength !== 12) {
                        message.innerHTML = '토스뱅크 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'bnk': // 경남은행
                    if (accountLength !== 13) {
                        message.innerHTML = '경남은행 적금 계좌는13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'kj': // 광주은행
                    if (accountLength !== 12) {
                        message.innerHTML = '광주은행 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'im': // 대구은행
                    if (accountLength !== 12) {
                        message.innerHTML = '대구은행 적금 계좌는12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'bs': // 부산은행
                    if (accountLength !== 13) {
                        message.innerHTML = '부산은행 적금 계좌는13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'jb': // 전북은행
                    if (accountLength !== 13) {
                        message.innerHTML = '전북은행 적금 계좌는13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'jeju': // 제주은행
                    if (accountLength !== 10 && accountLength !== 12) {
                        message.innerHTML = '제주은행 적금 계좌는10자리 또는 12자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'city': // 시티은행
                    if (accountLength !== 11 && accountLength !== 13) {
                        message.innerHTML = '시티은행 적금 계좌는11자리 또는 13자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                case 'sc': // SC제일은행
                    if (accountLength !== 11) {
                        message.innerHTML = 'SC제일은행 적금 계좌는11자리입니다.<br>계좌번호를 확인해주세요.😯';
                    }
                    break;
                default:
                    message.innerHTML = '해당 은행의 계좌 형식이 맞지 않습니다.😯';
            }
        } else {
            message.innerHTML = '🚨적금계좌입니다. 사기에 주의하세요.🚨';
        }
    
        // 팝업 표시
        popup.classList.add('show');
    }
    

    // 팝업 닫기 버튼
    document.querySelector('.close_btn').addEventListener('click', function () {
        popup.classList.remove('show');
    });

    // 계좌 조회 버튼 클릭 시 검증
    submitBtn.addEventListener('click', function () {
        validateAccount();
    });

    // 계좌 입력 및 은행 선택 시 버튼 활성화 체크
    bankSelect.addEventListener('change', checkFormValidity);
    accountInput.addEventListener('input', checkFormValidity);
});
