export class Constants {

    //Api BASE URLS 
    public static readonly BASE_URL: String = "https://exlmobility-uat.exlservice.com/CVMAPI";
    
 

    //Validation Messages
    public static readonly MSG_USENAME_EMPTY = 'Username should not be empty';
    public static readonly MSG_PASSWORD_EMPTY = 'Password should not be empty';
    public static readonly MSG_INVALID_USERNAME = 'Invalid Username';
    public static readonly MSG_INVALID_PASSWORD = 'Invalid Password';
    public static readonly MSG_UNSAFE_VALUE = 'It seems you have entered an unsafe input.Please enter a valid input.';
    public static readonly MSG_INTERNET_ERROR = "No internet connectivity";
  

    //SSL Pinning stuff-UAT
    public static readonly SERVER_URL: String = "https://exlmobility-uat.exlservice.com";
    public static readonly SERVER_FINGERPRINT: any = "F4 C6 63 DF B2 E6 4B 98 C4 EC 7B AE 5B D9 35 3A 57 F5 67 DD 48 7D CE 7D 55 C5 CD D1 EE E8 2A 27";


    //SSL Pinning stuff-PROD
    // public static readonly SERVER_URL: String = "https://exlmobility.exlservice.com";
    // public static readonly SERVER_FINGERPRINT: any = "F4 C6 63 DF B2 E6 4B 98 C4 EC 7B AE 5B D9 35 3A 57 F5 67 DD 48 7D CE 7D 55 C5 CD D1 EE E8 2A 27";

    // invalid certificate for testing
    //  public static readonly SERVER_FINGERPRINT: any = "C6 2D 93 39 C2 9F 82 8E 1E BE FD DC 2D 7B 7D 24 31 1A 59 E1 0B 4B C8 04 6E 21 F6 FA A2 37 11 45";


}