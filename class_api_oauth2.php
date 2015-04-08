
<?php
//****************************************************************************************************
//
// Получение Токена для доступа к API Google Apps
//
//****************************************************************************************************

// Текущий действующий Токен
// include 'php/class_api_oauth2.php';
// $oAPI_OAuth = new API_OAuth;
// $accessToken = $oAPI_OAuth->GetToken();

//****************************************************************************************************

// Class API_OAuth
// include 'php/class_api_oauth2.php';

// Экземпляр Класса
// $oAPI_OAuth = new API_OAuth;

// Текущий действующий Токен
// $accessToken = $oAPI_OAuth->GetToken();

// Остаточное время жизни действующего Токена
// $timeExp = $oAPI_OAuth->GetExpiresIn();

// Новый Токен
// $newToken = $oAPI_OAuth->GetNewToken();

//****************************************************************************************************

class API_OAuth {

// Фейковый Юзер, от имени которого приложение получает права доступа
const BEHALF_USER_EMAIL = 'api.oauth@montessori.ua';

// Из Google Developers Console из раздела Service Account
const SERVICE_ACCOUNT_EMAIL_ADDRESS = '962958126115-1cs7r8osai7aup7n8fa41hv1kd6rng51@developer.gserviceaccount.com';

// Из Google Developers Console из раздела Service Account
// Ключ подписи
// Получен из JSON key. Заменены \n и \u003d
// Кнопки генерации ключа есть только у собственника домена
const SERVICE_ACCOUNT_SIGNKEY = <<<EOD
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKOiW8GoKt26cwrb
fDvp+x/UrKzLFND6ld8CFBsRb6K7rynyKrgO3wp+q/UN/QvV+Bdrcw9x6TMBfVjr
sSqNKdQAXJFj5MTIkX3+vAyvL6zhGQrvH280lVSWJaXA1TRSHUvlJqQBg2TY6Rpu
UGygsLBHi5SwzykNDClpJjsapfq1AgMBAAECgYAueIl+cffaiHzrdHHPwh9jZs6z
M+lxf/jYIIr9NPJzUMHqM7AWHYMSQ+8p5RMcLWQLoqRGmp8TsTSb8DOcVgKukjpT
RB4kEomQeQ5J21ffuFk14I9liM6w/HMkx66Sy3CzZpjNSEDlsM7I/AAzPQFEkg2J
Klw8G2UBkfx3PjNugQJBAM5E92sYEDjq3WhzW3rhSv2boyq4gsNh7+se98SKsET9
2HObfsYgI87G/V9xY6pOUS+QVjcP1ZCbV6zCDHclirkCQQDLFe4r1lS1wYt6oHYX
niv3uUoknImgZ0Az6OXYX3+tV847u55B9b2wAbz1N2eh3oapQXVGc3odMFMZA5u0
BoHdAkEAoDRWilotN1fLUTXPhlf3G5RHHYYjIccuRUpPG9qv31XdSKUryIvr480P
u5Jg20Rqr+uF2sw0jlTouqgYcG27GQJBAKIEcOpQJ2yJZ/kAorXc3j7Xd6sVp0Zs
mO/Q0e144qcr8b/9whflMNuFx3XqKacdnFjTe/gkkDtRHjpKgqFwv5ECQBYwjs/j
+YvgB/f8wzgt8A1QmoqWC6vpLA0Zw99nfLQWUJ5tJHefLJiXjRvhO7t8g/kk+Bc7
9AL0vGmpxkV8nVs=
-----END PRIVATE KEY-----
EOD;

//****************************************************************************************************
// Текущий действующий Токен
// ( проверяет существующий или создаёт новый )
// Возвращает Токен, выделенный из JSON-ответа сервера
//****************************************************************************************************

public function GetToken() {

     if ( empty( $_SESSION['AppToken'] ) ) {
         $timeExp = 0;
     }
     else {
         // Остаточное время жизни действующего Токена
         $timeExp = self::GetExpiresIn();
     }

     // Если < минуты ИЛИ его вообще нет, то запрашиваем новый Токен 
     if ( $timeExp < 60 ) {

         // Новый Токен
         $newToken = self::GetNewToken();
         $_SESSION['AppToken'] = $newToken;
         return $newToken;
     }
     // Если Токен уже есть и его срок не истёк
     else {
         return $_SESSION['AppToken'];
     }
}

//****************************************************************************************************
// Запрос нового Токена
// Возвращает Токен, выделенный из JSON-ответа сервера
//****************************************************************************************************

public function GetNewToken() {

     ///// Заголовок

     $JWT_header = '{"alg":"RS256","typ":"JWT"}';

     ///// Набор требований

     $JWT_claim_set = '{';

     // Email address of the "client_id" ( from "Service Account" )
     $JWT_claim_set = $JWT_claim_set . '"iss":"' . self::SERVICE_ACCOUNT_EMAIL_ADDRESS . '",';

     // Области доступа (Scopes) (через пробел)
     $JWT_claim_set = $JWT_claim_set . '"scope":"https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.group.readonly",';

     // Token
     $JWT_claim_set = $JWT_claim_set . '"aud":"https://accounts.google.com/o/oauth2/token",';

     // Время окончания действия
     $utcExp = time() + 60*60;
     $JWT_claim_set = $JWT_claim_set . '"exp":' . $utcExp . ',';

     // Время начала действия
     $utcIat = time();
     $JWT_claim_set = $JWT_claim_set . '"iat":' . $utcIat . ',';

     // От имени и по поручению
     //$JWT_claim_set = $JWT_claim_set . '"sub":"api.oauth@montessori.ua"';
     $JWT_claim_set = $JWT_claim_set . '"sub":"' . self::BEHALF_USER_EMAIL . '"';
   
     $JWT_claim_set = $JWT_claim_set . '}';

     ///// Сигнатура

     // Подписываемые данные
     $signData = base64_encode( $JWT_header ) . '.' . base64_encode( $JWT_claim_set );

     // Сюда будет возвращён результат
     $JWT_signature = "";

     // Ключ подписи
     $signKey = self::SERVICE_ACCOUNT_SIGNKEY;

     // Алгоритм подписи
     $signAlgo = "SHA256";

     // Подписывание
     openssl_sign( $signData, $JWT_signature, $signKey, $signAlgo );

     ///// Кодирование
     $JWT_base64 = base64_encode( $JWT_header ) . '.' . base64_encode( $JWT_claim_set ) . '.' . base64_encode( $JWT_signature );

     ///// POST Запрос Токена
     $url = 'https://accounts.google.com/o/oauth2/token';

     // массив для переменных, которые будут переданы в строке с запросом
     $paramsArray = array(
         'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer', 
         'assertion' => $JWT_base64
     ); 
     // преобразуем массив в URL-кодированную строку
     $vars = http_build_query( $paramsArray );
     // создаем параметры контекста
     $options = array(
                     'http' => array(  
                         'method'  => 'POST',  // метод передачи данных
                         'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок 
                         'content' => $vars,  // переменные
                     )  
     );  
     $context  = stream_context_create( $options );  // создаём контекст потока
     $txtResponse = file_get_contents( $url, false, $context );  //отправляем запрос

     // Декодирование ответа - получение Токена
     $JWT_array = json_decode( $txtResponse, true );
     $pAccessToken = $JWT_array["access_token"];

     return $pAccessToken;
}

//****************************************************************************************************
// Запрос остатка времени жизни Токена
// Возвращает Время(сек), выделенное из JSON-ответа сервера
//****************************************************************************************************

public function GetExpiresIn() {

     $txtRequest = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" . urlencode( $_SESSION['AppToken'] );
     $txtResponse = file_get_contents( $txtRequest );

     // Декодирование ответа
     $JWT_array = json_decode( $txtResponse, true );
     $pExpiresIn = $JWT_array["expires_in"];

     return $pExpiresIn;
}

//****************************************************************************************************

}

//****************************************************************************************************
?>
