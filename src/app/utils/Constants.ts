export class Constants {

    //Api BASE URLS 
    public static readonly BASE_URL: String = "https://exlmobility-uat.exlservice.com/CVMAPI";



    //Validation Messages
    public static readonly MSG_USENAME_EMPTY = 'Username should not be empty';
    public static readonly MSG_PASSWORD_EMPTY = 'Password should not be empty';
    public static readonly MSG_INVALID_USERNAME = 'Invalid Username';
    public static readonly MSG_INVALID_PASSWORD = 'Invalid Password';
    public static readonly MSG_UNSAFE_VALUE = 'It seems you have entered an unsafe input.Please enter a valid input.';
    public static readonly MSG_INTERNET_ERROR = "Internet connection not found; Please check your connection and try again...";



    public static readonly UnconditionError= "Oops! Something went wrong; please try again...";
    public static readonly LoginAgain= "You need to login again";
    public static readonly NoVisitFound= "Visit not available";
    public static readonly ValidationFillAllOption= "Please select Request Type and enter/write Request information";
    public static readonly ValidationRequestType= "Please select Request Type";
    public static readonly ValidationRequestInfo= "Please enter/write information";
    public static readonly LoaderWaitingMsg= "Please wait...";
    public static readonly RequestFailed= "Request failed; Please try again...";
    public static readonly EventNotAvailable= "No event available";
    public static readonly NoAgendaAvailable= "No agenda available for selected visit";
    public static readonly NoEmergencyContact= "No emergency contacts available";
    public static readonly EventAddressWrong= "Sorry; Event address is wrong. Unable to show direction";
    public static readonly  ValidationFeedbackAll= "Please select feedback category and give your comment";
    public static readonly ValidationFeedbackOption= "Please select feedback Category";
    public static readonly ValidationFeedbackComment= "Please give your comment";
    public static readonly FoodGuideNotFound= "Food guide not available";
    public static readonly WebUrlNotAvailable= "Web url not available";
    public static readonly  ValidationEmailBlank= "Please enter Email Id";
    public static readonly  ValidationEmailValid= "Please enter valid Email Id";
    public static readonly  ValidationUserPwdBlank= "Please enter User Name and Password";
    public static readonly  ValidationUserBlank= "Please enter User Name";
    public static readonly  ValidationPwdBlank= "Please enter the Password";
    public static readonly ValidationUserNameLength= "Please enter valid User Name (User Name must be at least 1 characters long)";
    public static readonly  ValidationMPinBlank= "Please enter your mPIN";
    public static readonly ValidationWrongMPin= "You have entered wrong mPIN";
    public static readonly ValidationConfirmMPin= "Please confirm mPIN";
    public static readonly ValidationEnteredMPinWrong= "Your entered mPIN and confirm mPIN doesn\'t match";
    public static readonly MPinSavedMsg= "Your mPIN saved successfully";
    public static readonly MPinForgotMsg= "Are you sure you want to reset your mPIN?";
    public static readonly VisitPlaceNotFound= "Visit Place not available";
    public static readonly LogoutConfimMsg= "Do you really want to sign out; If you will sign out then for further use you need to login again";
    public static readonly TravelNotFound= "Travel detail not available";
    public static readonly VisitorNotFound= "No visitor profile found";


    //SSL Pinning stuff-UAT
    public static readonly SERVER_URL: String = "https://exlmobility-uat.exlservice.com";
    public static readonly SERVER_FINGERPRINT: any = "F4 C6 63 DF B2 E6 4B 98 C4 EC 7B AE 5B D9 35 3A 57 F5 67 DD 48 7D CE 7D 55 C5 CD D1 EE E8 2A 27";


    //SSL Pinning stuff-PROD
    // public static readonly SERVER_URL: String = "https://exlmobility.exlservice.com";
    // public static readonly SERVER_FINGERPRINT: any = "F4 C6 63 DF B2 E6 4B 98 C4 EC 7B AE 5B D9 35 3A 57 F5 67 DD 48 7D CE 7D 55 C5 CD D1 EE E8 2A 27";

    // invalid certificate for testing
    //  public static readonly SERVER_FINGERPRINT: any = "C6 2D 93 39 C2 9F 82 8E 1E BE FD DC 2D 7B 7D 24 31 1A 59 E1 0B 4B C8 04 6E 21 F6 FA A2 37 11 45";


    public static readonly BASE_IMAGE_URL = 'https://exlmobility.exlservice.com/CVMAPI/CVM_Images/'

}